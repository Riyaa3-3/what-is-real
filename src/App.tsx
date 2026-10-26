import { useCallback, useEffect, useRef, useState } from 'react';
import { screens } from './data/screens';
import { advanceBaseline, initialState, restoreState, SESSION_KEY } from './state';
import type { ExperienceState, ScreenData, ScreenProps } from './types';
import { Action, Bilingual, Options, PanelLabel } from './components/UI';
import { SceneVisual, CoverVisual, Texture } from './components/Effects';
import { SubtitleExperience } from './components/SubtitleExperience';
import { EndingScreens } from './components/EndingScreens';
import { ChapterInterlude, SignalLayer } from './components/Enhancements';
import { AudioControls, useExperienceAudio } from './components/Soundscape';
function useMotionPreference() {
  const [system, setSystem] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [manual, setManual] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setSystem(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  return {
    reduced: system || manual,
    toggle: () => setManual(v => !v),
    system
  };
}
function Cover({
  next,
  reduced
}: {
  next: () => void;
  reduced: boolean;
}) {
  const [elapsed, setElapsed] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const exitTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(exitTimer.current), []);
  const initialize = () => {
    setLeaving(true);
    exitTimer.current = window.setTimeout(next, 450);
  };
  useEffect(() => {
    if (skipped) return;
    const start = performance.now();
    const timer = window.setInterval(() => {
      const ms = performance.now() - start;
      setElapsed(ms);
      if (ms >= 3350) window.clearInterval(timer);
    }, 25);
    return () => window.clearInterval(timer);
  }, [skipped]);
  const words = ['Real?', 'Virtual?', 'Feeling?', 'Love?'];
  const index = elapsed < 350 ? -1 : elapsed < 2150 ? Math.min(3, Math.floor((elapsed - 350) / 450)) : -1;
  const title = skipped || elapsed >= 2550;
  return <div className={`cover-stage ${title ? 'title-visible' : ''} ${!skipped && (elapsed < 350 || elapsed >= 2150 && elapsed < 2550) || leaving ? 'opening-blank' : ''}`}><CoverVisual /><div className="signal-shutter" aria-hidden="true" />{!title && <><div className="signal-word-zone" aria-live="off">{index >= 0 && <div key={index} className={`signal-word ${reduced ? '' : 'glitch'}`} data-text={words[index]}>{words[index]}</div>}</div><button className="skip-intro text-button" onClick={() => setSkipped(true)}>SKIP INTRO <span aria-hidden="true">↗</span></button></>}{title && <div className="cover-copy"><div className="eyebrow">MEMORY / TRANSLATION / ARTIFICIAL INTIMACY</div><h1>WHAT IS REAL<span className="title-question">?</span></h1><div className="cover-chinese" lang="zh-CN">何以为“真”？</div><Bilingual {...screens[0].blocks[1]} className="cover-subtitle" /><Action disabled={leaving} onClick={initialize}><Bilingual en="INITIALIZE EXPERIENCE" zh="进入体验" /></Action></div>}<div className="cover-coordinate" aria-hidden="true"><span>00 — SIGNAL / REAL</span><span>2049 / N-001</span></div></div>;
}
function TypeLine({
  text,
  reduced
}: {
  text: string;
  reduced: boolean;
}) {
  const [length, setLength] = useState(reduced ? text.length : 0);
  useEffect(() => {
    if (reduced) {
      setLength(text.length);
      return;
    }
    setLength(0);
    const timer = window.setInterval(() => setLength(n => {
      if (n >= text.length) {
        window.clearInterval(timer);
        return n;
      }
      return n + 1;
    }), 34);
    return () => window.clearInterval(timer);
  }, [text, reduced]);
  const complete = length >= text.length;
  return <div className="type-container"><h1 className="baseline-question" aria-label={text}><span aria-hidden="true">{text.slice(0, length)}<span className={complete ? 'cursor complete' : 'cursor'}>▍</span></span></h1>{!complete && <button className="text-button skip-typing" onClick={() => setLength(text.length)}>SKIP TYPING ↗</button>}</div>;
}
function Baseline({
  data,
  state,
  update,
  next,
  reduced,
  audioCue
}: {
  data: ScreenData;
  state: ExperienceState;
  update: ScreenProps['update'];
  next: () => void;
  reduced: boolean;
  audioCue: (key: string) => void;
}) {
  const [ready, setReady] = useState(data.id !== '06');
  useEffect(() => {
    if (data.id !== '06') return;
    const timer = window.setTimeout(() => setReady(true), 1000);
    return () => window.clearTimeout(timer);
  }, [data.id]);
  const key = data.id === '04' ? 'cells' : data.id === '05' ? 'interlinked' : 'within';
  const count = state.baselineOriginal[key];
  const index = Math.min(count, data.blocks.length - 1);
  const block = data.blocks[index];
  const repeat = () => {
    audioCue('response');
    update({
      baselineOriginal: advanceBaseline(state, key)
    });
    if (count + 1 >= data.blocks.length) next();
  };
  return <div className="baseline-stage"><div className="baseline-kicker"><span>FILM SEQUENCE / BLADE RUNNER 2049</span><span>{String(Math.min(count + 1, data.blocks.length)).padStart(2, '0')} / {String(data.blocks.length).padStart(2, '0')}</span></div>{data.id === '06' ? <h1 className="within-phrase">{block.en}</h1> : <TypeLine key={`${data.id}-${index}`} text={block.en} reduced={reduced} />}<div className="baseline-translation">{block.zh && <div className="zh" lang="zh-CN">{block.zh}</div>}</div><div className="baseline-response"><div key={count} className="response-line" aria-hidden="true">{Array.from({
          length: 36
        }, (_, i) => <i key={i} style={{
          height: `${4 + Math.sin(i * 1.7) ** 2 * 17}px`
        }} />)}</div><div className="baseline-audio-actions"><button className="text-button" onClick={() => audioCue('replay')}>↺ REPLAY AUDIO</button><Action disabled={!ready} onClick={repeat}>{data.cta}</Action></div></div></div>;
}
function GenericScreen({
  data,
  state,
  update,
  next,
  navigate
}: {
  data: ScreenData;
  state: ExperienceState;
  update: ScreenProps['update'];
  next: () => void;
  navigate: ScreenProps['navigate'];
}) {
  const [revealed, setRevealed] = useState(false);
  const [note, setNote] = useState(false);
  const noteRef = useRef<HTMLDialogElement>(null);
  const [logged, setLogged] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const confirm = () => {
    if (data.choiceKey) {
      setLogged(true);
      timer.current = window.setTimeout(next, 260);
    } else next();
  };
  const selected = data.choiceKey ? state[data.choiceKey] : undefined;
  if (data.id === '03') return <div className="baseline-intro"><PanelLabel>{data.blocks[0].en}</PanelLabel><h1>BASELINE TEST</h1><div className="zh baseline-title-zh" lang="zh-CN">{data.blocks[3].zh}</div><Bilingual {...data.blocks[4]} /><div className="film-explanation">{data.blocks.slice(1, 3).map((b, i) => <Bilingual key={i} {...b} />)}</div><div className="baseline-words">CELLS <span>/</span> INTERLINKED</div><Action onClick={next}>BEGIN TEST</Action></div>;
  if (data.id === '12') return <div className="archive-claims"><h1 className="screen-title">MEMORY / CLAIM</h1><div className="claim-pair">{data.blocks.map((b, i) => <div key={b.en} className="claim-panel"><PanelLabel>{i === 0 ? 'EVENT' : 'OWNERSHIP'}</PanelLabel><Bilingual {...b} /></div>)}</div><Options options={data.options!} value={selected} onSelect={v => update({
      memoryFrame: v
    })} /><div className="page-actions"><Action disabled={!selected} onClick={confirm}>CONFIRM</Action></div></div>;
  if (data.id === '13') return <div className="memory-separation"><div className="separation-pair"><div><PanelLabel>01 / EVENT</PanelLabel><h1>EVENT</h1><Bilingual en="Did it happen?" zh={data.blocks[0].zh} /></div><span className="not-equal" aria-hidden="true">≠</span><div><PanelLabel>02 / OWNERSHIP</PanelLabel><h1>OWNERSHIP</h1><Bilingual en="Did it happen to me?" zh={data.blocks[1].zh} /></div></div><Bilingual {...data.blocks[2]} className="memory-equation" /><button className="text-button note-link" onClick={() => {
      setNote(true);
      noteRef.current?.showModal();
    }}>⊕ TRANSLATION NOTE</button><dialog aria-label="Translation note" ref={noteRef} className="note-dialog" onClose={() => setNote(false)} onClick={e => {
      if (e.target === e.currentTarget) noteRef.current?.close();
    }}><button className="dialog-close" aria-label="Close translation note" onClick={() => noteRef.current?.close()}>×</button>{note && <><PanelLabel>TRANSLATION NOTE</PanelLabel><h2>real memories</h2><p lang="zh-CN">取自真实经历的记忆</p><div className="note-equation">EVENT ≠ OWNERSHIP</div></>}</dialog><div className="page-actions"><Action onClick={next}>NEXT</Action></div></div>;
  if (data.id === '16') return <div className="two-voices"><PanelLabel>JOI</PanelLabel><h1>I wanna be <em>real</em> for you.</h1><div className="word-bridge" aria-hidden="true" /><div className="voice-k"><PanelLabel>K</PanelLabel><h2>You are <em>real</em> for me.</h2></div><div className="page-actions"><Action onClick={next}><Bilingual en="TRANSLATE" zh="选择字幕" /></Action></div></div>;
  const question = ['02', '07', '08', '09', '22', '23', '24', '25'].includes(data.id);
  const wide = ['10', '20'].includes(data.id);
  return <div className={`narrative ${question ? 'question-screen' : ''} ${wide ? 'center-narrative' : ''} ${data.id === '15' ? 'mirror-narrative' : ''}`}><div className="copy-stack">{data.blocks.map((block, i) => {
        const main = ['02', '23', '24', '25'].includes(data.id) ? i === 2 : i === 0;
        return <div key={block.en || i} className={`${main ? 'primary-block' : ''} ${question && i === 1 ? 'scenario-block' : ''} ${data.id === '01' && i === 3 ? 'subject-block' : ''}`}>{main ? <><h1>{block.en}</h1>{block.zh && <div className="zh" lang="zh-CN">{block.zh}</div>}</> : <Bilingual {...block} />}</div>;
      })}</div>{data.id === '24' && !revealed && <Action secondary onClick={() => setRevealed(true)}>REVEAL DESIGN +</Action>}{data.id === '24' && revealed && <div className="configuration"><PanelLabel>REVEAL DESIGN</PanelLabel><div className="configuration-wire" aria-hidden="true"><i /><i /><i /></div><Bilingual {...data.blocks[1]} /></div>}{data.options && (data.id !== '24' || revealed) && <Options options={data.options} value={selected} onSelect={value => update({
      [data.choiceKey!]: value
    })} />}<div className="page-actions"><span className="response-status" role="status">{logged ? 'RESPONSE LOGGED' : ''}</span><Action disabled={!!data.choiceKey && !selected || data.id === '24' && !revealed} onClick={confirm}>{data.ctaZh ? <Bilingual en={data.cta || 'NEXT'} zh={data.ctaZh} /> : data.cta || 'NEXT'}</Action></div>{data.id === '15' && <button className="text-button viewpoint-back" onClick={() => navigate('14')}>← SWITCH PERSPECTIVE</button>}</div>;
}
export default function App() {
  const [state, setState] = useState<ExperienceState>(() => {
    try {
      return restoreState(sessionStorage.getItem(SESSION_KEY));
    } catch {
      return initialState();
    }
  });
  const validId = (id: string) => screens.some(s => s.id === id);
  const [screenId, setScreenId] = useState(() => {
    const id = location.hash.slice(1);
    return validId(id) ? id : '00';
  });
  const [interlude, setInterlude] = useState<ScreenData | null>(null);
  const {
    reduced,
    toggle,
    system
  } = useMotionPreference();
  const [study, setStudy] = useState(false);
  const [visited, setVisited] = useState<string[]>(['00', screenId]);
  const nav = useRef<HTMLDialogElement>(null);
  const main = useRef<HTMLElement>(null);
  const index = screens.findIndex(s => s.id === screenId);
  const data = screens[index];
  const update = useCallback((patch: Partial<ExperienceState>) => setState(s => ({
    ...s,
    ...patch
  })), []);
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    } catch {/* storage may be unavailable in privacy mode */}
  }, [state]);
  const baselineIndex = screenId === '04' ? state.baselineOriginal.cells : screenId === '05' ? state.baselineOriginal.interlinked : screenId === '06' ? state.baselineOriginal.within : 0;
  const audio = useExperienceAudio(screenId, Math.min(baselineIndex, Math.max(0, data.blocks.length - 1)));
  const navigate = useCallback((id: string) => {
    if (!validId(id)) return;
    const from = screens.find(item => item.id === location.hash.slice(1)) ?? screens[0];
    const to = screens.find(item => item.id === id)!;
    setInterlude(from.chapter !== to.chapter && id !== '00' ? to : null);
    history.pushState(null, '', `#${id}`);
    setScreenId(id);
    setVisited(old => old.includes(id) ? old : [...old, id]);
    nav.current?.close();
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, []);
  useEffect(() => {
    const changed = () => {
      const id = location.hash.slice(1);
      if (validId(id)) {
        setInterlude(null);
        setScreenId(id);
        setVisited(old => old.includes(id) ? old : [...old, id]);
      }
    };
    window.addEventListener('popstate', changed);
    window.addEventListener('hashchange', changed);
    return () => {
      window.removeEventListener('popstate', changed);
      window.removeEventListener('hashchange', changed);
    };
  }, []);
  useEffect(() => {
    main.current?.focus({
      preventScroll: true
    });
    document.title = `${data.title} — WHAT IS REAL?`;
  }, [screenId, data.title]);
  const next = () => {
    if (index < screens.length - 1) navigate(screens[index + 1].id);
  };
  const restart = () => {
    setState(initialState());
    setVisited(['00']);
    setStudy(false);
    navigate('00');
  };
  const closeInterlude = useCallback(() => setInterlude(null), []);
  const props: ScreenProps = {
    screenId,
    state,
    update,
    navigate,
    next,
    restart
  };
  const special = ['17', '18', '19', '26', '27', '28', '29', '30a', '30b', '31'].includes(screenId);
  return <div className={`experience theme-${data.theme} screen-${screenId} ${reduced ? 'reduced-motion' : ''}`}><a className="skip-link" href="#main-content">Skip to content</a><Texture />{interlude && <ChapterInterlude data={interlude} reduced={reduced} finish={closeInterlude} />}<header className="site-header"><button className="brand" onClick={() => nav.current?.showModal()} aria-label="Open chapter navigation"><svg viewBox="0 0 28 28" aria-hidden="true"><path d="M3 3h8v8H3zM17 3h8v8h-8zM3 17h8v8H3zM17 17h8v8h-8z" /></svg><span>WHAT IS REAL<span className="brand-q">?</span></span></button><div className="chapter-display"><span className="signal-dot" />{data.chapter}<span className="chapter-screen"> / {data.number}</span></div><div className="header-controls"><span className="subtitle-indicator">SUBTITLES: EN <span>+ 中文注释</span></span><AudioControls {...audio} /><button className="utility motion-toggle" aria-pressed={reduced} onClick={toggle} title={system ? 'System reduced motion is enabled' : 'Reduce animation'}>MOTION {reduced ? 'LOW' : 'FULL'}</button><button className="utility menu-toggle" onClick={() => nav.current?.showModal()} aria-label="Open chapters and display mode">☰</button></div></header><main id="main-content" ref={main} tabIndex={-1} className={`screen-main ${special ? 'special-main' : ''}`} key={screenId}>{screenId === '00' ? <Cover next={next} reduced={reduced} /> : <><div className="screen-caption"><span className="screen-number">{data.number}</span><div><div>{data.title}</div></div></div><SceneVisual screenId={screenId} /><SignalLayer reduced={reduced} /><div className={`content ${special ? 'special-content' : ''}`}>{['04', '05', '06'].includes(screenId) ? <Baseline data={data} {...props} reduced={reduced} audioCue={audio.cue} /> : ['17', '18', '19'].includes(screenId) ? <SubtitleExperience {...props} /> : special ? <EndingScreens {...props} /> : <GenericScreen data={data} {...props} />}</div></>}</main><footer className="site-footer"><button className="chapter-trigger" onClick={() => nav.current?.showModal()}><span className="progress-ticks" aria-hidden="true">{screens.map((s, i) => <i key={s.id} className={i <= index ? 'filled' : ''} />)}</span><span>{String(index + 1).padStart(2, '0')} / {screens.length} <span className="footer-mode">— {study ? 'STUDY MODE' : 'EXPERIENCE'}</span></span></button>{index > 0 && <button className="text-button back-button" onClick={() => navigate(screens[index - 1].id)}>← BACK</button>}</footer><dialog aria-label="Chapter navigation" ref={nav} className="chapter-dialog" onClick={e => {
      if (e.target === e.currentTarget) nav.current?.close();
    }}><div className="dialog-top"><PanelLabel>WHAT IS REAL? / CHAPTERS</PanelLabel><button className="dialog-close" aria-label="Close chapter navigation" onClick={() => nav.current?.close()}>×</button></div><div className="mode-switch"><button aria-pressed={!study} onClick={() => setStudy(false)}>EXPERIENCE</button><button aria-pressed={study} onClick={() => setStudy(true)}>STUDY MODE</button></div><p className="mode-note">{study ? 'Explore every chapter. Your previous choices are preserved.' : 'Follow the narrative. Revisit the screens you have reached.'}</p><nav className="chapter-list" aria-label="Chapters">{screens.map(s => <button key={s.id} disabled={!study && !visited.includes(s.id)} aria-current={s.id === screenId ? 'page' : undefined} onClick={() => navigate(s.id)}><span>{s.number}</span><div>{s.title}</div><span aria-hidden="true">↗</span></button>)}</nav></dialog></div>;
}
