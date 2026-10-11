const $=s=>document.querySelector(s),canvas=$('#sky'),ctx=canvas.getContext('2d');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let w=innerWidth,h=innerHeight,dpr=1,elapsed=0,started=false,playing=false,last=0,scene=-1;
const audio=$('#soundtrack'),audioOffset=23;let soundFailed=false,pendingAudioTime=23;audio.volume=.8;
const duration=126,particles=[],stars=Array.from({length:150},()=>({x:Math.random(),y:Math.random()*.88,r:Math.random()*1.1+.2,p:Math.random()*6.28}));
const scenes=[
{name:'Inicio',title:'Primera fila.<br><em>Sin hacer cola.</em>',sub:'Ponte cómoda. Hoy el show viene hasta ti.',label:'01 · QUE EMPIECE LA SORPRESA',shape:'stars',color:270},
{name:'BTS',title:'Siete luces.<br><em>Muchísima emoción.</em>',sub:'RM · Jin · SUGA · j-hope · Jimin · V · Jung Kook',label:'02 · UN CIELO MUY BTS',shape:'bts',color:275},
{name:'Dynamite',title:'Sube la música.<br><em>Se vale cantar.</em>',sub:'Y si te sabes la coreografía… este es tu momento.',label:'03 · UN POQUITO DE DYNAMITE',shape:'star',color:40},
{name:'ARMY',title:'Tu emoción<br><em>también cuenta.</em>',sub:'Estés donde estés, sigues siendo parte de ARMY.',label:'04 · TU LUZ TAMBIÉN ESTÁ AQUÍ',shape:'army',color:295},
{name:'Universo',title:'Una vuelta<br><em>por el universo.</em>',sub:'Porque una amiga tan ARMY merece un show a lo grande.',label:'05 · SIGUIENTE PARADA: LAS ESTRELLAS',shape:'planet',color:250},
{name:'Sonríe',title:'A ver esa<br><em>sonrisita.</em>',sub:'Esa era la misión de esta pequeña sorpresa.',label:'06 · MISIÓN: SACARTE UNA SONRISA',shape:'smile',color:45},
{name:'Para ti',title:'Te quiero.<br><em>Que siga el show.</em>',sub:'Y seguiré intentando sacarte una sonrisa. ✦',label:'07 · POR MUCHAS MÁS RISAS',shape:'final',color:280}];
function resize(){w=$('#experience').clientWidth;h=$('#experience').clientHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);setTargets(started?scenes[Math.max(0,scene)].shape:'bts');} 
const points=[];
function line(x1,y1,x2,y2,n=50){for(let i=0;i<n;i++){let t=i/(n-1);points.push({x:x1+(x2-x1)*t,y:y1+(y2-y1)*t});}}
function textShape(text,y=0,size=120){const c=document.createElement('canvas');c.width=650;c.height=180;const g=c.getContext('2d');g.font='700 '+size+'px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText(text,325,90);const data=g.getImageData(0,0,650,180).data;for(let yy=0;yy<180;yy+=6)for(let xx=0;xx<650;xx+=6)if(data[(yy*650+xx)*4+3]>100)points.push({x:(xx-325)*.9,y:(yy-90)*.9+y});}
function setTargets(shape){points.length=0;
if(shape==='final'){textShape('SONRÍE',-10,100);for(let i=0;i<240;i++){let t=i/240*Math.PI*2;points.push({x:Math.cos(t)*260,y:Math.sin(t)*105});}}
if(shape==='smile'){for(let j=0;j<3;j++)for(let i=0;i<200;i++){let t=i/200*Math.PI*2;points.push({x:Math.cos(t)*(126+j*5),y:Math.sin(t)*(126+j*5)});}for(let side of [-1,1])for(let j=0;j<3;j++)line(side*44+j*3,-46,side*44+j*3,-22,20);for(let j=0;j<4;j++)for(let i=0;i<70;i++){let t=.2+(Math.PI-.4)*i/69;points.push({x:Math.cos(t)*(70+j*3),y:Math.sin(t)*(64+j*3)+6});}}
if(shape==='bts'){for(let side of [-1,1]){const a=side===-1?[[-95,-100],[-12,-66],[-12,115],[-95,80]]:[[95,-100],[12,-66],[12,115],[95,80]];for(let i=0;i<4;i++)line(...a[i],...a[(i+1)%4],60);for(let t=0;t<1;t+=.075)line(a[0][0]+(a[1][0]-a[0][0])*t,a[0][1]+(a[1][1]-a[0][1])*t,a[3][0]+(a[2][0]-a[3][0])*t,a[3][1]+(a[2][1]-a[3][1])*t,30);}}
if(shape==='army')textShape('ARMY',0,130);
if(shape==='planet'){for(let j=0;j<7;j++)for(let i=0;i<90;i++){let t=i/90*Math.PI*2;points.push({x:Math.cos(t)*(110-j*8),y:Math.sin(t)*110});}for(let j=0;j<3;j++)for(let i=0;i<190;i++){let t=i/190*Math.PI*2,x=Math.cos(t)*(215+j*5),y=Math.sin(t)*45;points.push({x:x*.95-y*.3,y:x*.3+y*.95});}}
if(shape==='star'||shape==='stars'){const count=shape==='star'?1:7;for(let k=0;k<count;k++){const cx=count===1?0:(k-3)*66,cy=count===1?0:Math.sin(k*.85)*35;for(let layer=0;layer<3;layer++){const a=[];for(let i=0;i<10;i++){let t=i*Math.PI/5-Math.PI/2,r=(i%2? .45:1)*(count===1?160:28)*(1-layer*.13);a.push([cx+Math.cos(t)*r,cy+Math.sin(t)*r]);}for(let i=0;i<10;i++)line(...a[i],...a[(i+1)%10],count===1?28:10);}}}
const stage=$('#stage').getBoundingClientRect(),root=$('#experience').getBoundingClientRect();
const spanX=Math.max(...points.map(p=>p.x))-Math.min(...points.map(p=>p.x)),spanY=Math.max(...points.map(p=>p.y))-Math.min(...points.map(p=>p.y));
const scale=Math.min(stage.width*.84/Math.max(spanX,1),(stage.height-58)/Math.max(spanY,1),1.6);const cy=stage.top-root.top+(stage.height-28)/2;const total=1000;
for(let i=0;i<total;i++){const p=points[Math.floor(i/total*points.length)]||{x:0,y:0};if(!particles[i])particles[i]={x:Math.random()*w,y:h+Math.random()*100,phase:Math.random()*6.28};particles[i].tx=w/2+p.x*scale;particles[i].ty=cy+p.y*scale;}}
function setScene(n){scene=n;const s=scenes[n];$('#title').innerHTML=s.title;$('#subtitle').textContent=s.sub;$('#eyebrow').textContent='ESTA NOCHE, LA PRIMERA FILA ES TUYA';$('#sceneLabel').textContent=s.label;$('#chapter').textContent=String(n+1).padStart(2,'0')+' / 07 · '+s.name;document.querySelectorAll('.chapters button').forEach((b,i)=>b.classList.toggle('active',i===n));setTargets(s.shape);}
function fmt(v){return Math.floor(v/60)+':'+String(Math.floor(v%60)).padStart(2,'0');}
function frame(t){const dt=Math.min((t-last)/1000||0,.06);last=t;if(playing){elapsed=Math.min(duration,soundFailed?elapsed+dt:Math.max(0,audio.currentTime-audioOffset));if(elapsed===duration){setPlaying(false);audio.pause();$('#audioStatus').textContent='¿Otra vez? Pulsa reiniciar para repetir el show.';}}
if(started){const n=Math.min(6,Math.floor(elapsed/18));if(n!==scene)setScene(n);$('#seek').value=elapsed;$('#clock').textContent=fmt(elapsed)+' / 2:06';}
ctx.clearRect(0,0,w,h);stars.forEach(s=>{ctx.fillStyle='rgba(222,205,255,'+(.25+(reduced?.2:Math.sin(t*.0007+s.p)*.2+.2))+')';ctx.beginPath();ctx.arc(s.x*w,s.y*h,s.r,0,Math.PI*2);ctx.fill();});
const hue=started?scenes[Math.max(0,scene)].color:278;ctx.globalCompositeOperation='lighter';
particles.forEach((p,i)=>{const ox=p.x,oy=p.y,ease=reduced?1:1-Math.exp(-dt*(1.7+i%7*.07));p.x+=(p.tx-p.x)*ease;p.y+=(p.ty-p.y)*ease;const shimmer=reduced?.8:.72+Math.sin(t*.002+p.phase)*.28;const radius=(w<600?1:1.25)*shimmer;const grad=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,7);grad.addColorStop(0,`hsla(${hue+i%25},95%,77%,.22)`);grad.addColorStop(1,`hsla(${hue},95%,65%,0)`);ctx.fillStyle=grad;ctx.fillRect(p.x-7,p.y-7,14,14);ctx.fillStyle=`hsla(${hue+i%25},85%,${78+i%15}%,${shimmer})`;ctx.beginPath();ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.fill();if(!reduced&&Math.abs(p.x-ox)+Math.abs(p.y-oy)>1){ctx.strokeStyle=`hsla(${hue},90%,75%,.13)`;ctx.beginPath();ctx.moveTo(ox,oy);ctx.lineTo(p.x,p.y);ctx.stroke();}});ctx.globalCompositeOperation='source-over';requestAnimationFrame(frame);}
scenes.forEach((s,i)=>{const b=document.createElement('button');b.textContent=s.name;b.setAttribute('aria-label','Ir a la escena '+s.name);b.onclick=()=>{seekShow(i*18);setScene(i);};$('#chapters').append(b);});
function setPlaying(value){playing=value;$('#play').textContent=value?'Ⅱ':'▶';$('#play').setAttribute('aria-label',value?'Pausar espectáculo':'Reproducir espectáculo');}
function seekAudio(time){pendingAudioTime=time;try{audio.currentTime=time;}catch{}}
function seekShow(time){elapsed=Math.max(0,Math.min(duration,time));seekAudio(audioOffset+elapsed);}
audio.addEventListener('loadedmetadata',()=>{seekAudio(pendingAudioTime);});
function playMusic(){
  soundFailed=false;$('#retryMusic').hidden=true;$('#audioStatus').textContent='Preparando la música…';
  const play=audio.play();
  if(play)play.catch(()=>{soundFailed=true;$('#audioStatus').textContent='Pulsa Activar música para escuchar la canción.';$('#retryMusic').hidden=false;musicPanel(true);});
}
function start(){started=true;scene=-1;$('#experience').classList.add('playing');$('#welcome').hidden=true;$('#controls').hidden=false;seekShow(0);setPlaying(true);playMusic();}
$('#start').onclick=start;
$('#play').onclick=()=>{if(playing){setPlaying(false);audio.pause();}else{if(elapsed>=duration)seekShow(0);setPlaying(true);seekAudio(audioOffset+elapsed);playMusic();}};
$('#restart').onclick=()=>{seekShow(0);setPlaying(true);playMusic();};
$('#seek').oninput=e=>seekShow(+e.target.value);
$('#retryMusic').onclick=()=>{seekAudio(audioOffset+elapsed);setPlaying(true);playMusic();};
audio.addEventListener('playing',()=>{$('#audioStatus').textContent='Dynamite está sonando. Disfruta el show.';$('#retryMusic').hidden=true;soundFailed=false;});
audio.addEventListener('waiting',()=>{$('#audioStatus').textContent='La música está cargando…';});
audio.addEventListener('error',()=>{soundFailed=true;$('#audioStatus').textContent='No se pudo cargar la canción. Comprueba tu conexión e inténtalo otra vez.';$('#retryMusic').hidden=false;});
$('#muteMusic').onclick=()=>{audio.muted=!audio.muted;$('#muteMusic').textContent=audio.muted?'Activar sonido':'Silenciar música';$('#muteMusic').setAttribute('aria-pressed',String(audio.muted));};
$('#volume').oninput=e=>{audio.volume=+e.target.value;};
$('#letter').onclick=()=>$('#letterDialog').showModal();$('#closeLetter').onclick=$('#backSky').onclick=()=>$('#letterDialog').close();$('#letterDialog').onclick=e=>{if(e.target===$('#letterDialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}};
function musicPanel(open){$('#musicPanel').hidden=!open;$('#musicToggle').setAttribute('aria-expanded',String(open));if(!open)$('#musicToggle').focus();}
$('#musicToggle').onclick=()=>musicPanel($('#musicPanel').hidden);$('#closeMusic').onclick=()=>musicPanel(false);
addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#musicPanel').hidden)musicPanel(false);});
$('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('#experience').requestFullscreen();}catch{const el=$('#toast');el.textContent='La pantalla completa no está disponible en este navegador.';el.style.opacity=1;setTimeout(()=>el.style.opacity=0,4000);}};
addEventListener('resize',resize);new ResizeObserver(resize).observe($('#stage'));resize();requestAnimationFrame(frame);
