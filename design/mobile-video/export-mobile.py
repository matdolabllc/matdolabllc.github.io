"""Export the approved portrait master as compact website playback assets."""
import argparse
import json
from pathlib import Path
import shutil
import subprocess

p=argparse.ArgumentParser(description=__doc__)
p.add_argument('--input',required=True,type=Path)
p.add_argument('--output',required=True,type=Path)
args=p.parse_args()
args.output.mkdir(parents=True,exist_ok=True)

def ff(*options):
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','warning',*map(str,options)],check=True)

common=['-i',args.input,'-vf','scale=720:900:flags=lanczos,format=yuv420p']
mp4=args.output/'matdo-grade-film-mobile.mp4'
webm=args.output/'matdo-grade-film-mobile.webm'
ff(*common,'-c:v','libx264','-preset','slow','-crf',26,'-maxrate','1600k','-bufsize','3200k','-profile:v','high','-level:v','3.1','-g',60,'-c:a','aac','-b:a','128k','-ar',48000,'-movflags','+faststart',mp4)
ff(*common,'-c:v','libvpx-vp9','-b:v',0,'-crf',36,'-deadline','good','-cpu-used',3,'-row-mt',1,'-g',60,'-c:a','libopus','-b:a','96k',webm)
ff('-ss',0.9,'-i',mp4,'-frames:v',1,'-q:v',3,'-update',1,args.output/'matdo-grade-film-mobile-poster.jpg')
shutil.copy2(args.input.parent/'matdo-grade-film-mobile.vtt',args.output/'matdo-grade-film-mobile.vtt')
report={}
for file in (mp4,webm):
    m=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(file)],text=True))
    video=next(s for s in m['streams'] if s['codec_type']=='video')
    audio=next(s for s in m['streams'] if s['codec_type']=='audio')
    assert (video['width'],video['height'],video['avg_frame_rate'])==(720,900,'30/1')
    assert abs(float(m['format']['duration'])-60)<.02 and audio['sample_rate']=='48000'
    ff('-v','error','-i',file,'-f','null','-')
    report[file.name]={'bytes':int(m['format']['size']),'duration':float(m['format']['duration']),'resolution':'720x900','video_codec':video['codec_name'],'audio_codec':audio['codec_name'],'decode_errors':0}
(args.input.parent/'web-verification-mobile.json').write_text(json.dumps(report,indent=2),encoding='utf8')
print(json.dumps(report,indent=2))
