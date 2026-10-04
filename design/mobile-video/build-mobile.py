"""Rebuild the portrait picture, Voice A audio, and website playback files."""
import argparse
import os
from pathlib import Path
import subprocess

HERE=Path(__file__).resolve().parent
SITE=HERE.parent.parent
p=argparse.ArgumentParser(description=__doc__)
p.add_argument('--marketing',type=Path,default=SITE.parent/'matdo-grade/Marketing')
p.add_argument('--models',required=True,type=Path)
p.add_argument('--work',type=Path,default=HERE/'build')
p.add_argument('--output',type=Path,default=SITE/'public/demo')
p.add_argument('--node',default='node')
args=p.parse_args()
args.work.mkdir(parents=True,exist_ok=True)
env=os.environ.copy()
env.update(SITE_ROOT=str(SITE),MARKETING_DIR=str(args.marketing.resolve()),VIDEO_OUTPUT_DIR=str(args.work.resolve()),FILM_BUILD_DIR=str(args.work.resolve()),VOICE_MODEL_DIR=str(args.models.resolve()))
def run(*cmd): subprocess.run(list(map(str,cmd)),env=env,check=True)
run(os.sys.executable,args.marketing/'build/film/source/compose_audio.py')
run(args.node,HERE/'render-mobile.cjs')
run(os.sys.executable,HERE/'narrate-mobile.py')
run(os.sys.executable,HERE/'export-mobile.py','--input',args.work/'matdo-grade-film-mobile-master.mp4','--output',args.output)
