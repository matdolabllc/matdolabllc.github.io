"""Add the selected Voice A to the 60-second portrait film.

Kokoro-82M v1.0 / af_heart. The portrait picture and approved scene timing stay intact.
Requires the local Kokoro runtime/models used for the approved auditions.
Set VOICE_MODEL_DIR, VIDEO_OUTPUT_DIR and MARKETING_DIR for another checkout.
"""
from pathlib import Path
import hashlib
import json
import os
import re
import subprocess
import textwrap
import numpy as np
import onnxruntime as ort
import soundfile as sf
from kokoro_onnx import Kokoro

HERE=Path(__file__).resolve().parent
MARKETING=Path(os.environ.get('MARKETING_DIR','C:/Users/stanchan/Documents/GitHub-Matdo/matdo-grade/Marketing'))
FILM=Path(os.environ.get('FILM_BUILD_DIR',str(MARKETING/'build/film')))
OUT=Path(os.environ.get('VIDEO_OUTPUT_DIR',str(HERE/'full-narration')))
MODELS=Path(os.environ.get('VOICE_MODEL_DIR',str(HERE/'models')))
OUT.mkdir(parents=True,exist_ok=True)
SR=48000
TOTAL=60
VOICE='af_heart'
SPEED=.94
STEM='matdo-grade-film-mobile-master'
CUES=[
    (.40,6.85,'No answer key? Checking homework can mean solving every problem yourself.'),
    (7.40,17.30,'With Matdo Grade, take a photo to see which answers need another look.'),
    (18.30,25.70,'See the correct answer, and understand where the student went wrong.'),
    (26.40,31.65,'Help them understand, so they can do the work themselves.'),
    (32.35,35.65,'More time for what matters.'),
    (44.25,48.80,"Saved on your device. We don't store your homework."),
    (49.25,52.75,'Free trial. Try it tonight.'),
    (53.40,59.10,'Matdo Grade. For parents. By parents.'),
]

def run(cmd,args):
    r=subprocess.run([cmd,*map(str,args)],capture_output=True,text=True)
    if r.returncode: raise RuntimeError(f'{cmd}: {r.stderr}')
    return r.stdout+r.stderr

def ff(*args): return run('ffmpeg',['-y','-hide_banner',*args])

def normalize(source,destination,target,tp):
    measured=ff('-i',source,'-af',f'loudnorm=I={target}:TP={tp}:LRA=8:print_format=json','-f','null','-')
    values=json.loads(re.findall(r'\{\s*"input_i"[\s\S]*?\}',measured)[-1])
    filt=(f'loudnorm=I={target}:TP={tp}:LRA=8:measured_I={values["input_i"]}:'
          f'measured_TP={values["input_tp"]}:measured_LRA={values["input_lra"]}:'
          f'measured_thresh={values["input_thresh"]}:offset={values["target_offset"]}:'
          'linear=true:print_format=json')
    result=ff('-i',source,'-af',filt,'-ar',SR,'-ac',2,'-c:a','pcm_s24le',destination)
    return measured+'\nSECOND PASS\n'+result

opts=ort.SessionOptions()
opts.log_severity_level=3
opts.intra_op_num_threads=4
opts.inter_op_num_threads=1
model=MODELS/'kokoro-v1.0.fp16.onnx'
presets=MODELS/'voices-v1.0.bin'
session=ort.InferenceSession(str(model),sess_options=opts,providers=['CPUExecutionProvider'])
tts=Kokoro.from_session(session,str(presets))
raw=np.zeros(TOTAL*24000,dtype=np.float32)
spoken=[]
subtitles=[]

def phones(text):
    return tts.tokenizer.phonemize(text.replace('Matdo','Matt dough'),'en-us').replace('mˈæt dˈoʊ','mˈætdoʊ')

def place(start,latest_end,text,audio,timings,phonemes):
    length=len(audio)/24000
    if start+length>latest_end:
        raise ValueError(f'Line does not fit: {start:.2f}+{length:.2f} > {latest_end:.2f}: {text}')
    if not np.isfinite(audio).all() or np.max(np.abs(audio))<.001:
        raise ValueError('Invalid voice audio')
    audio=audio.copy()
    edge=min(120,len(audio)//2)
    audio[:edge]*=np.linspace(0,1,edge)
    audio[-edge:]*=np.linspace(1,0,edge)
    at=round(start*24000)
    raw[at:at+len(audio)]+=audio
    spoken.append({'start':start,'end':start+length,'latest_end':latest_end,'text':text,'phonemes':phonemes})
    sentences=re.findall(r'[^.!?]+[.!?]?',text)
    stops=[(i,t) for i,t in enumerate(timings) if t.phoneme in '.!?']
    if len(stops)==len(sentences):
        previous=0
        for sentence,(i,stop) in zip(sentences,stops):
            first=next((p for p in timings[previous:i+1] if p.phoneme.strip()),stop)
            subtitles.append({'start':start+first.start,'end':min(start+length,start+stop.end+.12),'text':sentence.strip()})
            previous=i+1
    else:
        subtitles.append({'start':start,'end':start+length,'text':text})
    print(f'{start:05.2f}-{start+length:05.2f}: {text}',flush=True)

for start,end,text in CUES:
    p=phones(text)
    audio,rate,timings=tts.create_timed(p,voice=VOICE,speed=SPEED,lang='en-us',is_phonemes=True,sentence_pause=.25)
    assert rate==24000
    place(start,end,text,audio,timings,p)

# Generate the subjects together for consistent delivery, then separate them
# at model-reported punctuation boundaries and place each on its card entrance.
subjects=['Math.','English.','Science.','Essays.']
p=phones(' '.join(subjects))
audio,rate,timings=tts.create_timed(p,voice=VOICE,speed=SPEED,lang='en-us',is_phonemes=True,sentence_pause=.35)
stops=[(i,t) for i,t in enumerate(timings) if t.phoneme=='.']
if len(stops)!=4: raise ValueError('Subject word alignment unavailable')
boundaries=[0.0]
for i,stop in stops[:-1]:
    following=next(t for t in timings[i+1:] if t.phoneme.strip() and t.phoneme not in '.!?')
    boundaries.append((stop.end+following.start)/2)
boundaries.append(len(audio)/rate)
for i,word in enumerate(subjects):
    left,right=boundaries[i:i+2]
    segment=audio[round(left*rate):round(right*rate)]
    place(36.16+2*i,37.75+2*i,word,segment,[],phones(word))

spoken.sort(key=lambda c:c['start'])
subtitles.sort(key=lambda c:c['start'])
for current,following in zip(subtitles,subtitles[1:]):
    current['end']=min(current['end'],following['start']-.001)
raw_file=OUT/'narration-A-raw.wav'
sf.write(raw_file,raw,24000,subtype='PCM_24')
voice_file=OUT/'narration-A.wav'
voice_log=normalize(raw_file,voice_file,-17,-2)
(OUT/'voice-mastering.txt').write_text(voice_log,encoding='utf8')
bed_file=OUT/'original-bed-normalized.wav'
normalize(FILM/'soundtrack-mix.wav',bed_file,-14,-1.5)
bed,rate=sf.read(bed_file,dtype='float32',always_2d=True)
vocal,vocal_rate=sf.read(voice_file,dtype='float32',always_2d=True)
assert rate==SR and vocal_rate==SR
size=TOTAL*SR
def fixed(a): return np.pad(a[:size],((0,max(0,size-len(a))),(0,0)))
bed,vocal=fixed(bed),fixed(vocal)
clock=np.arange(size)/SR
gain=np.full(size,.72,dtype=np.float32)
for c in spoken:
    entry=np.clip((clock-(c['start']-.20))/.20,0,1)
    exit=np.clip(((c['end']+.55)-clock)/.55,0,1)
    duck=np.minimum(entry,exit)
    duck=duck*duck*(3-2*duck)
    gain=np.minimum(gain,.72-(.72-.25)*duck)
premix=OUT/'narrated-premix.wav'
sf.write(premix,bed*gain[:,None]+vocal,SR,subtype='FLOAT')
mixed=OUT/'soundtrack-narrated-A.wav'
master_log=normalize(premix,mixed,-14,-1.5)
(OUT/'audio-mastering.txt').write_text(master_log,encoding='utf8')
picture=FILM/'picture-only.mp4'
if not picture.exists(): raise FileNotFoundError(f'Render the portrait picture first: {picture}')
video=OUT/f'{STEM}.mp4'
ff('-i',picture,'-i',mixed,'-map','0:v:0','-map','1:a:0','-t',TOTAL,'-c:v','copy','-c:a','aac','-b:a','192k','-ar',SR,'-movflags','+faststart',video)
ff('-i',voice_file,'-c:a','libmp3lame','-b:a','192k',OUT/'narration-A.mp3')

def stamp(seconds,separator=','):
    ms=round(seconds*1000)
    return f'{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d}{separator}{ms%1000:03d}'
def wrapped(text): return text
srt='\n'.join(f'{i+1}\n{stamp(c["start"])} --> {stamp(c["end"])}\n{wrapped(c["text"])}\n' for i,c in enumerate(subtitles))
vtt='WEBVTT\n\n'+'\n'.join(f'{stamp(c["start"],".")} --> {stamp(c["end"],".")}\n{wrapped(c["text"])}\n' for c in subtitles)
(OUT/'matdo-grade-film-mobile.srt').write_text(srt,encoding='utf8')
(OUT/'matdo-grade-film-mobile.vtt').write_text(vtt,encoding='utf8')
manifest={'voice':'A / Kokoro af_heart','speed':SPEED,'pronunciation':'MAT-doh','license':'Apache-2.0 model/presets; MIT inference library','model_sha256':hashlib.sha256(model.read_bytes()).hexdigest(),'preset_sha256':hashlib.sha256(presets.read_bytes()).hexdigest(),'duration':60,'word_count':sum(len(c['text'].split()) for c in spoken),'cues':spoken,'subtitles':subtitles,'subject_timing':'Each subject is spoken as its card joins the row at 36, 38, 40 and 42 seconds.','music_gain':{'outside_voice':.72,'during_voice':.25,'attack_seconds':.20,'release_seconds':.55},'video_picture':'Portrait picture composed from original artwork; original scene timing preserved.'}
(OUT/'narration-A.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8')
timeline_path=OUT/'timeline.json'
if timeline_path.is_file():
    timeline=json.loads(timeline_path.read_text(encoding='utf8'))
    timeline.update(voice=manifest['voice'],narration_word_count=manifest['word_count'],narration_cues=spoken,current_export=video.name)
    timeline_path.write_text(json.dumps(timeline,ensure_ascii=False,indent=2),encoding='utf8')
metadata=json.loads(run('ffprobe',['-v','error','-show_format','-show_streams','-of','json',video]))
metadata['format']['filename']=video.name
(OUT/'media-info.json').write_text(json.dumps(metadata,indent=2),encoding='utf8')
print(f'COMPLETE: {video}',flush=True)
