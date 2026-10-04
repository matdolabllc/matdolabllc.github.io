/* Portrait recomposition of the approved Matdo Grade film. No desktop edits. */
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {spawn,spawnSync}=require('node:child_process');
const {once}=require('node:events');
const runtime=process.env.CODEX_NODE_MODULES||'C:/Users/stanchan/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const {createCanvas,loadImage,GlobalFonts}=require(path.join(runtime,'@napi-rs/canvas'));
const SITE=process.env.SITE_ROOT||path.resolve(__dirname,'../..');
const MARKETING=process.env.MARKETING_DIR||path.resolve(SITE,'../matdo-grade/Marketing');
const OUT=process.env.VIDEO_OUTPUT_DIR||path.join(__dirname,'build');
const W=1080,H=1350,FPS=30,DURATION=60;
const C={cream:'#faf7ed',forest:'#153e36',sage:'#668b78',gold:'#c49a4f',orange:'#f35324',pink:'#fff0ea'};
fs.mkdirSync(OUT,{recursive:true});
GlobalFonts.registerFromPath(path.join(MARKETING,'fonts/fraunces-latin-wght-normal.woff2'),'Fraunces');
GlobalFonts.registerFromPath(path.join(MARKETING,'fonts/inter-latin-wght-normal.woff2'),'Inter');
const beats=[
 {id:'request',file:'F01.png',start:0,end:4,copy:['6:45 PM.','A school night.'],crop:[190,0,1230,782]},
 {id:'puzzled',file:'F02-v2.png',start:4,end:7,copy:['No answer key.'],crop:[250,0,1120,782]},
 {id:'capture',file:'F03-v2.png',start:7,end:12,copy:['Point your phone.','Press the shutter.'],crop:[270,0,1060,782]},
 {id:'marks',file:'F04.png',start:12,end:18,copy:['See what needs','another look.']},
 {id:'explanation',file:'F05.png',start:18,end:26,copy:['See where the','mistake happened.']},
 {id:'help',file:'F06.png',start:26,end:32,copy:['So you can help','them understand.'],crop:[260,0,1100,782]},
 {id:'dinner',file:'F07-v2.png',start:32,end:36,copy:['More time for','what matters.'],crop:[270,0,1090,782]},
 {id:'subjects',file:'F07A-subjects.png',start:36,end:44,copy:['More than math.']},
 {id:'privacy',file:'F08.png',start:44,end:49,copy:['Saved on your device.','Matdo Lab does not store homework.','Google processes grading.']},
 {id:'offer',file:'F09-v3.png',start:49,end:53,copy:['Free Trial','Paid plans for more grading.','Try it tonight.']},
 {id:'ending',file:'F10-v4.png',start:53,end:60,copy:['Matdo Grade','For Parents.','By Parents.','matdolab.com/grade']}
];
const images={},screens={},assets=[];
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
function box(ctx,x,y,w,h,r=32){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
function text(ctx,words,x,y,size=76,{font='Fraunces',color=C.forest,align='center',weight=650}={}){
 ctx.fillStyle=color;ctx.textAlign=align;ctx.font=`${weight>=600?"bold":"normal"} ${size}px "${font}"`;ctx.fillText(words,x,y);
}
function lines(ctx,words,y,size=76,gap=90,options={}){words.forEach((s,i)=>text(ctx,s,W/2,y+i*gap,size,options));}
function section(ctx,words,y=96,size=76,gap=86){lines(ctx,words,y,size,gap);}
function roundedImage(ctx,img,src,dst,r=28){
 ctx.save();box(ctx,...dst,r);ctx.clip();ctx.drawImage(img,...src,...dst);ctx.restore();
}
function family(ctx,beat,p){
 const [sx,sy,sw,sh]=beat.crop;
 const z=beat.id==='dinner'?1.02-.018*ease(p):1+.018*ease(p);
 const dw=940*z,dh=940*sh/sw*z;
 ctx.save();ctx.beginPath();ctx.rect(0,35,1080,770);ctx.clip();
 ctx.drawImage(images[beat.id],sx,sy,sw,sh,(W-dw)/2,50+(640-dh)/2,dw,dh);ctx.restore();
 section(ctx,beat.copy,795,80,85);
}
function brandPhone(ctx,x,y,w,h){
 ctx.save();ctx.shadowColor='rgba(20,50,38,.16)';ctx.shadowBlur=16;box(ctx,x,y,w,h,36);ctx.fillStyle=C.forest;ctx.fill();ctx.shadowColor='transparent';
 box(ctx,x+10,y+10,w-20,h-20,28);ctx.fillStyle=C.cream;ctx.fill();
 const mh=h*.43,mw=mh*images.mark.width/images.mark.height;
 ctx.drawImage(images.mark,x+(w-mw)/2,y+56,mw,mh);
 text(ctx,'Matdo Grade',x+w/2,y+h-58,27);ctx.restore();
}
function kitchen(ctx){
 ctx.drawImage(images.kitchen,522,0,625,782,0,0,W,H);
 ctx.fillStyle='rgba(250,247,237,.45)';ctx.fillRect(0,0,W,H);
}
function logo(ctx,y=140,h=310){const w=h*images.mark.width/images.mark.height;ctx.drawImage(images.mark,(W-w)/2,y,w,h);}
function panel(ctx,x,y,w,h,color='#fffdfa'){
 ctx.save();ctx.shadowColor='rgba(15,50,38,.13)';ctx.shadowBlur=25;ctx.shadowOffsetY=8;box(ctx,x,y,w,h);ctx.fillStyle=color;ctx.fill();ctx.restore();
}
function marks(ctx,t){
 section(ctx,['See what needs','another look.'],92,76,86);
 panel(ctx,95,225,890,690);
 // Actual marked homework, enlarged around the relevant arithmetic and marks.
 roundedImage(ctx,screens.marks,[80,635,1030,780],[115,245,850,644],20);
 const a=ease((t-.2)/.4);ctx.save();ctx.globalAlpha=a;
 // Real app Show Detail control at a legible scale.
 roundedImage(ctx,screens.marks,[48,2165,1110,143],[70,935,940,121],22);
 ctx.restore();
}
function explanation(ctx,t){
 section(ctx,['See where the','mistake happened.'],92,76,86);
 panel(ctx,60,280,960,265);
 text(ctx,"STUDENT’S",295,333,42,{font:'Inter',weight:600});text(ctx,'ANSWER',295,379,42,{font:'Inter',weight:600});
 text(ctx,'CORRECT',780,333,42,{font:'Inter',weight:600});text(ctx,'ANSWER',780,379,42,{font:'Inter',weight:600});
 box(ctx,90,376,430,123,22);ctx.fillStyle=C.pink;ctx.fill();
 text(ctx,'× −6.15',302,466,84,{font:'Inter',color:C.orange});
 text(ctx,'−6.42',780,466,84,{font:'Inter',color:C.sage});
 const a=ease((t-4)/.3);ctx.save();ctx.globalAlpha=a;
 panel(ctx,60,575,960,410);
 text(ctx,'CORRECT STEPS',540,630,40,{font:'Inter',color:C.sage});
 lines(ctx,['Add the two','negative decimals.'],700,60,72);
 lines(ctx,['−6.3 + (−0.12)','= −6.42'],880,62,70,{font:'Inter'});
 ctx.restore();
}
function subjectCards(ctx,t){
 kitchen(ctx);section(ctx,['More than math.'],92,75);
 const positions=[[175,150],[625,150],[175,570],[625,570]],cw=280,ch=406;
 for(let i=0;i<4;i++){
  const elapsed=t-i*2;if(elapsed<0)continue;
  const progress=clamp(elapsed/.26),sx=Math.max(.018,Math.abs(Math.cos(progress*Math.PI))),back=progress<.5;
  const [x,y]=positions[i];ctx.save();ctx.translate(x+cw/2,y+ch/2);ctx.scale(sx,1);
  ctx.shadowColor='rgba(10,45,32,.20)';ctx.shadowBlur=16;
  if(back){box(ctx,-cw/2,-ch/2,cw,ch,25);ctx.fillStyle=C.forest;ctx.fill();ctx.drawImage(images.mark,-73,-102,146,204);}
  else ctx.drawImage(images.cards[i],-cw/2,-ch/2,cw,ch);
  ctx.restore();
 }
}
function scene(ctx,beat,time){
 ctx.fillStyle=C.cream;ctx.fillRect(0,0,W,H);
 const t=time-beat.start,p=t/(beat.end-beat.start);
 if(beat.crop){family(ctx,beat,p);if(beat.id==='capture'){ctx.save();ctx.globalAlpha=ease((t-.65)/.38);brandPhone(ctx,815,430,205,255);ctx.restore();}return;}
 if(beat.id==='marks'){marks(ctx,t);return;}
 if(beat.id==='explanation'){explanation(ctx,t);return;}
 if(beat.id==='subjects'){subjectCards(ctx,t);return;}
 kitchen(ctx);
 if(beat.id==='privacy'){
  brandPhone(ctx,375,145,330,455);
  section(ctx,['Saved on','your device.'],705,80,83);
  lines(ctx,['Matdo Lab doesn’t store','your homework.'],880,50,55,{font:'Inter',weight:550});
  text(ctx,'Google processes grading.',540,990,42,{font:'Inter',weight:500});
 }
 if(beat.id==='offer'){
  logo(ctx);ctx.save();ctx.globalAlpha=ease((t-.2)/.35);text(ctx,'Free Trial',540,605,110);ctx.restore();
  ctx.save();ctx.globalAlpha=ease((t-.65)/.35);lines(ctx,['Paid plans for','more grading.'],768,65,82);ctx.restore();
  text(ctx,'Try it tonight.',540,985,86);
 }
 if(beat.id==='ending'){
  logo(ctx,140,310);text(ctx,'Matdo Grade',540,600,91);
  lines(ctx,['For Parents.','By Parents.'],775,96,112);
  text(ctx,'matdolab.com/grade',540,950,52,{font:'Inter',weight:600});
 }
}
const canvas=createCanvas(W,H),ctx=canvas.getContext('2d'),previous=createCanvas(W,H),pc=previous.getContext('2d');
function render(time){
 const i=Math.max(0,beats.findIndex(b=>time>=b.start&&time<b.end)),b=beats[i];
 const t=time-b.start,fade=['subjects','privacy','offer','ending'].includes(b.id)?.22:0;
 if(i>0&&t<fade){scene(pc,beats[i-1],beats[i-1].end-1/FPS);scene(ctx,b,time);ctx.save();ctx.globalAlpha=1-ease(t/fade);ctx.drawImage(previous,0,0);ctx.restore();}
 else scene(ctx,b,time);
 return canvas;
}
function run(cmd,args){const r=spawnSync(cmd,args,{encoding:'utf8',maxBuffer:8000000});if(r.status!==0)throw Error(r.stderr||String(r.error));return r.stdout+r.stderr;}
async function asset(key,file){images[key]=await loadImage(file);assets.push({key,path:path.relative(MARKETING,file).replaceAll('\\','/'),sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')});}
async function main(){
 for(const b of beats)await asset(b.id,path.join(MARKETING,'anchor-frames/direction-a',b.file));
 await asset('mark',path.join(path.dirname(MARKETING),'MatdoGrade/Assets.xcassets/MatdoMark.imageset/MatdoMark@3x.png'));
 await asset('kitchen',fs.existsSync(path.join(__dirname,'assets/kitchen.png'))?path.join(__dirname,'assets/kitchen.png'):path.join(MARKETING,'build/film/source/clean-plates/F09.png'));
 await asset('marksScreen',path.join(MARKETING,'assets/screens/marks.png'));screens.marks=images.marksScreen;
 images.cards=[[79,185,363,526],[463,185,363,526],[847,185,363,526],[1231,185,363,526]].map(b=>{const c=createCanvas(b[2],b[3]);c.getContext('2d').drawImage(images.subjects,...b,0,0,b[2],b[3]);return c;});
 const timeline={duration:60,width:W,height:H,fps:FPS,beats,safe_area:{main_copy_bottom_pixels:1056,caption_and_control_reserve_pixels:294,main_text_minimum_pixels:65},subjects:'Cumulative two-column row order: Math, English, Science, Essays, at 36,38,40,42s.',privacy:'Device storage; Matdo Lab does not store homework; Google processes grading. Matches privacy/grade sections 3,4,7.',assets};
 fs.writeFileSync(path.join(OUT,'timeline-mobile.json'),JSON.stringify(timeline,null,2));
 if(process.argv.includes('--preview')){
  const times=[1,4.8,8.5,13,19,22,28,33.5,36.6,38.6,40.6,42.6,46,50.5,55];
  const sheet=createCanvas(1170,Math.ceil(times.length/3)*510),sc=sheet.getContext('2d');sc.fillStyle=C.cream;sc.fillRect(0,0,sheet.width,sheet.height);
  for(let j=0;j<times.length;j++){const c=render(times[j]);const still=await loadImage(c.toBuffer('image/png'));c.savePng(path.join(OUT,`qa-${times[j]}.png`));sc.drawImage(still,j%3*390,Math.floor(j/3)*510,390,487.5);text(sc,`${times[j]}s`,j%3*390+195,Math.floor(j/3)*510+505,17);}
  sheet.savePng(path.join(OUT,'contact-sheet-mobile.png'));console.log('Portrait previews complete.');return;
 }
 const picture=path.join(OUT,'picture-only.mp4');
 const encoder=process.env.VIDEO_ENCODER||'h264_nvenc';
 const encoding=encoder==='libx264'?['-c:v','libx264','-preset','medium','-crf','18']:['-c:v','h264_nvenc','-preset','p6','-tune','hq','-rc','vbr','-cq','18','-b:v','0'];
 const args=['-y','-hide_banner','-loglevel','error','-f','rawvideo','-pixel_format','rgba','-video_size',`${W}x${H}`,'-framerate',String(FPS),'-i','pipe:0','-an',...encoding,'-profile:v','high','-pix_fmt','yuv420p','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-movflags','+faststart',picture];
 const ff=spawn('ffmpeg',args,{stdio:['pipe','ignore','pipe']});let error='';ff.stderr.on('data',d=>error+=d);
 const finished=new Promise((resolve,reject)=>{ff.on('error',reject);ff.on('close',code=>code===0?resolve():reject(Error(error)));});
 ff.stdin.on('error',e=>console.error(e.message));
 for(let n=0;n<DURATION*FPS;n++){if(!ff.stdin.write(render(n/FPS).data()))await once(ff.stdin,'drain');if(n%300===0)console.log(`Rendered ${n/FPS}/60 seconds`);}
 ff.stdin.end();await finished;console.log('Portrait picture complete.');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
