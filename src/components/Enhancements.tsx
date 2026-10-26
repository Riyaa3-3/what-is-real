import { useEffect, useRef, useState } from 'react';
import type { ScreenData } from '../types';
import './enhancements.css';

export function ChapterInterlude({data,reduced,finish}:{data:ScreenData;reduced:boolean;finish:()=>void}) {
  useEffect(()=>{if(reduced)return;const t=setTimeout(finish,2050);return()=>clearTimeout(t)},[reduced,finish]);
  return <div className={`chapter-interlude interlude-${data.theme}`} role="region" aria-label={`Entering ${data.chapter}`}>
    <div className="interlude-noise" aria-hidden="true"/><span className="interlude-status">SYSTEM / CHAPTER TRANSFER</span>
    <div className="interlude-heading"><span>INCOMING SIGNAL / {data.number}</span><h1>{data.chapter}</h1><p lang="zh-CN">{data.zhTitle.split('·')[0].trim()}</p><div className="interlude-meter"/></div>
    <button onClick={finish}>{reduced?'CONTINUE':'SKIP TRANSITION'} ↗</button>
  </div>
}
export function SignalLayer({reduced}:{reduced:boolean}) {
  const [pulse,setPulse]=useState(0);
  useEffect(()=>{
    if(reduced)return;
    const activate=(ev:Event)=>{if(ev.target instanceof Element && ev.target.closest('button,input,textarea,select'))setPulse(v=>v+1)};
    document.addEventListener('pointerdown',activate);return()=>document.removeEventListener('pointerdown',activate);
  },[reduced]);
  return <div className={`signal-field ${reduced?'signal-static':''}`} aria-hidden="true"><i/><i/><div className="signal-sweep"/><svg viewBox="0 0 240 30"><polyline points="0,15 22,15 28,5 34,25 43,11 49,15 95,15 102,8 111,23 120,15 170,15 176,9 186,22 193,15 240,15"/></svg>{pulse>0&&<div key={pulse} className="signal-pulse"/>}</div>;
}
// Add only original, public-domain, or licensed files inside public/audio/.
export const chapterAudio:Record<string,string>={
  'INTERLINKED':'','WHOSE MEMORY?':'','TRANSLATING REAL':'',
  'THE OTHER SIDE OF REAL':'','REAL / VIRTUAL':'','WHAT IS REAL?':''
};
export const baselineAudio:Record<string,string>={ambient:'',cells:'',interlinked:'',within:'',response:''};
const baselineIds=new Set(['03','04','05','06']);
type Track={audio:HTMLAudioElement;path:string};
export function useExperienceAudio(screenId:string,chapter:string){
  const [enabled,setEnabled]=useState(false),[volume,setVolume]=useState(.35);
  const active=useRef<Track|null>(null);
  const fading=useRef<Track|null>(null);
  const cues=useRef<HTMLAudioElement[]>([]);
  const audioCtx=useRef<AudioContext|null>(null);
  const fadeFrame=useRef<number|null>(null);
  const latest=useRef({enabled,volume});latest.current={enabled,volume};
  const [cueCount,setCueCount]=useState(0);
  const halt=(track:Track|null)=>{if(track){track.audio.pause();track.audio.removeAttribute('src');track.audio.load();}};
  const stopCues=()=>{for(const cue of cues.current){cue.pause();cue.removeAttribute('src');}cues.current=[];};
  useEffect(()=>{
    const inBaseline=baselineIds.has(screenId);
    const file=inBaseline?baselineAudio.ambient:chapterAudio[chapter];
    const id=inBaseline?'baseline:'+file:'chapter:'+chapter+':'+file;
    stopCues();
    if(!enabled || !file){
      halt(active.current);halt(fading.current);
      active.current=null;fading.current=null;
      if(fadeFrame.current!==null)cancelAnimationFrame(fadeFrame.current);
      return;
    }
    if(active.current?.path===id)return;
    if(fadeFrame.current!==null)cancelAnimationFrame(fadeFrame.current);
    halt(fading.current);
    const prior=active.current;fading.current=prior;
    const next=new Audio(import.meta.env.BASE_URL+(file.startsWith('/') ? file.slice(1) : file));
    next.loop=true;next.volume=0;active.current={audio:next,path:id};
    void next.play().catch(()=>{});
    const begun=performance.now(),priorVolume=prior?.audio.volume??0;
    const fade=(now:number)=>{
      const ratio=Math.min(1,(now-begun)/850);
      if(active.current?.audio===next)next.volume=ratio*latest.current.volume;
      if(prior){prior.audio.volume=priorVolume*(1-ratio);}
      if(ratio<1)fadeFrame.current=requestAnimationFrame(fade);
      else {halt(prior);if(fading.current===prior)fading.current=null;fadeFrame.current=null;}
    };
    fadeFrame.current=requestAnimationFrame(fade);
  },[chapter,enabled,screenId]);
  useEffect(()=>{
    if(active.current)active.current.audio.volume=volume;
    if(fading.current)fading.current.audio.volume=Math.min(fading.current.audio.volume,volume);
  },[volume]);
  useEffect(()=>{
    const visibility=()=>{
      if(document.hidden){active.current?.audio.pause();fading.current?.audio.pause();stopCues();}
      else if(latest.current.enabled && active.current)void active.current.audio.play().catch(()=>{});
    };
    document.addEventListener('visibilitychange',visibility);
    return ()=>{document.removeEventListener('visibilitychange',visibility);stopCues();halt(active.current);halt(fading.current);if(fadeFrame.current!==null)cancelAnimationFrame(fadeFrame.current);if(audioCtx.current)void audioCtx.current.close();};
  },[]);
  const cue=(key:string)=>{
    if(!latest.current.enabled)return;
    stopCues();
    const file=baselineAudio[key];
    if(file){
      const sound=new Audio(import.meta.env.BASE_URL+(file.startsWith('/') ? file.slice(1) : file));
      sound.volume=latest.current.volume;cues.current=[sound];
      sound.addEventListener('ended',()=>{cues.current=cues.current.filter(c=>c!==sound);},{once:true});
      void sound.play().catch(()=>{});
    }else{
      // Minimal locally generated system acknowledgement; not film audio.
      try{
        const ctx=audioCtx.current??new AudioContext();audioCtx.current=ctx;
        if(ctx.state==='suspended')void ctx.resume();
        const osc=ctx.createOscillator(),gain=ctx.createGain();
        osc.type='triangle';osc.frequency.value=key==='response'?460:185;
        gain.gain.setValueAtTime(Math.max(.001,latest.current.volume*.025),ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.075);
        osc.connect(gain).connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.075);
      }catch{/* audio optional */}
    }
    setCueCount(v=>v+1);
  };
  return {enabled,setEnabled,volume,setVolume,cue,cueCount};
}
export function AudioControls({enabled,setEnabled,volume,setVolume}:{enabled:boolean;setEnabled:(value:boolean)=>void;volume:number;setVolume:(value:number)=>void}){
  return <div className="audio-controls"><button className="utility sound-toggle" aria-pressed={enabled} onClick={()=>setEnabled(!enabled)}>SOUND {enabled?'ON':'OFF'}</button><label>VOL <input aria-label="Sound volume" type="range" min="0" max="1" step=".05" disabled={!enabled} value={volume} onChange={e=>setVolume(Number(e.target.value))}/></label></div>;
}
