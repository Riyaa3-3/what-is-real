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
const chapterAudio:Record<string,string>={
  'INTERLINKED':'','WHOSE MEMORY?':'','TRANSLATING REAL':'',
  'THE OTHER SIDE OF REAL':'','REAL / VIRTUAL':'','WHAT IS REAL?':''
};
/* Relative to public/. Fill in only with audio licensed for the intended publication. */
const baselineAudio:Record<string,string>={ambient:'',cells:'',interlinked:'',within:'',response:''};
const baselineIds=new Set(['03','04','05','06']);
export function useExperienceAudio(screenId:string,chapter:string){
  const [enabled,setEnabled]=useState(false),[volume,setVolume]=useState(.35);
  const current=useRef<HTMLAudioElement|null>(null);
  const [cueCount,setCueCount]=useState(0);
  const active=useRef({enabled,volume});active.current={enabled,volume};
  useEffect(()=>{
    const existing=current.current;
    if(existing){existing.pause();existing.src='';current.current=null}
    if(!enabled)return;
    const path=baselineIds.has(screenId)?baselineAudio.ambient:chapterAudio[chapter];
    if(!path)return;
    const element=new Audio(import.meta.env.BASE_URL+path.replace(/^\//,''));
    element.loop=true;element.volume=0;current.current=element;
    let frame=0;const start=performance.now();
    void element.play().then(()=>{
      const fade=(now:number)=>{if(current.current!==element)return;element.volume=Math.min(active.current.volume,Math.max(0,(now-start)/700*active.current.volume));if(now-start<700)frame=requestAnimationFrame(fade)};
      frame=requestAnimationFrame(fade);
    }).catch(()=>{});
    return()=>{cancelAnimationFrame(frame);element.pause();element.src='';if(current.current===element)current.current=null};
  },[chapter,enabled,screenId]);
  useEffect(()=>{if(current.current)current.current.volume=volume},[volume]);
  const cue=(key:string)=>{
    if(!active.current.enabled)return;
    const path=baselineAudio[key];
    if(path){const sound=new Audio(import.meta.env.BASE_URL+path.replace(/^\//,''));sound.volume=active.current.volume;void sound.play().catch(()=>{});}
    setCueCount(v=>v+1);
  };
  return {enabled,setEnabled,volume,setVolume,cue,cueCount};
}
export function AudioControls({enabled,setEnabled,volume,setVolume}:{enabled:boolean;setEnabled:(value:boolean)=>void;volume:number;setVolume:(value:number)=>void}){
  return <div className="audio-controls"><button className="utility sound-toggle" aria-pressed={enabled} onClick={()=>setEnabled(!enabled)}>SOUND {enabled?'ON':'OFF'}</button><label>VOL <input aria-label="Sound volume" type="range" min="0" max="1" step=".05" disabled={!enabled} value={volume} onChange={e=>setVolume(Number(e.target.value))}/></label></div>;
}
