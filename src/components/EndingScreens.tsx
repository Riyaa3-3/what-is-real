import { useRef, useState } from 'react';
import type { ChoiceKey, CopyBlock, ExperienceState, ScreenProps } from '../types';
import { screens } from '../data/screens';
import { subtitleText } from '../data/subtitles';
import { Action, Bilingual, Options, PanelLabel } from './UI';
import './ending.css';
import { withoutSentencePeriods } from '../utils/punctuation';
const screen = (id: string) => screens.find(item => item.id === id)!;
const choice = (state: ExperienceState, key: ChoiceKey): CopyBlock => {
  const entry = screens.find(item => item.choiceKey === key);
  return entry?.options?.find(option => option.value === state[key]) ?? {
    en: '—'
  };
};
const reason = (value: string): CopyBlock => screen('18').options?.find(option => option.value === value) ?? {
  en: value
};
const formatCopy = (copy: CopyBlock) => withoutSentencePeriods(copy.en) + (copy.zh ? `\n${withoutSentencePeriods(copy.zh)}` : '');

/** Export contains only the visitor's actual choices and the source option text. */
export function createReviewText(state: ExperienceState): string {
  const lines = ['WHAT IS REAL? / 何以为“真”？', 'YOUR JOURNEY THROUGH REALITY', '', 'MEMORY TRACE', formatCopy(choice(state, 'openingMemory'))];
  if (state.openingMemoryReconsidered) {
    const reconsidered = screen('02').options?.find(option => option.value === state.openingMemoryReconsidered);
    lines.push('RECONSIDER', formatCopy(reconsidered ?? {
      en: '—'
    }));
  }
  for (const [key, label] of [['qMemory', 'MEMORY'], ['qEmotion', 'INTERLINKED'], ['qAutonomy', 'DISTINCT'], ['memoryFrame', 'EVENT / OWNERSHIP']] as const) lines.push('', label, formatCopy(choice(state, key)));
  lines.push('', 'TRANSLATION', 'JOI / I wanna be real for you', withoutSentencePeriods(subtitleText(state, 'Joi')) || '—', 'K / You are real for me', withoutSentencePeriods(subtitleText(state, 'K')) || '—');
  lines.push('', 'WHY THIS TRANSLATION?');
  if (!state.translationReasons.length && !state.translationReasonText.trim()) lines.push('—');
  state.translationReasons.forEach(value => lines.push(formatCopy(reason(value))));
  if (state.translationReasonText.trim()) lines.push(state.translationReasonText);
  for (const [key, label] of [['aiExperience', 'REAL / VIRTUAL'], ['aiScenario1', 'REMEMBERED'], ['aiScenario2', 'DESIGNED'], ['aiScenario3', 'RESET']] as const) lines.push('', label, formatCopy(choice(state, key)));
  lines.push('', 'WHAT MAKES YOUR LIFE YOURS?', state.finalThought.trim() || '—', '', 'WHAT MAKES THEN REAL?', state.finalThought2.trim() || '—');
  return lines.join('\n');
}
function wrapCanvasText(context: CanvasRenderingContext2D, text: string, width: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split('\n')) {
    if (!paragraph) {
      lines.push('');
      continue;
    }
    let pending = paragraph;
    while (pending) {
      let end = 0;
      let lastSpace = -1;
      for (const letter of pending) {
        const next = end + letter.length;
        if (context.measureText(pending.slice(0, next)).width > width && end > 0) break;
        if (/\s/.test(letter)) lastSpace = next;
        end = next;
      }
      if (end < pending.length && lastSpace > 0) end = lastSpace;
      lines.push(pending.slice(0, end).trimEnd());
      pending = pending.slice(end).trimStart();
    }
  }
  return lines;
}

/** Long reviews are paginated before the browser's canvas size limit is approached. */
async function downloadReviewCard(state: ExperienceState) {
  await document.fonts.ready;
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas unavailable');
  const font = '26px "Noto Sans SC", "Noto Sans CJK SC", "Microsoft YaHei", Arial, sans-serif';
  context.font = font;
  const lines = wrapCanvasText(context, createReviewText(state), 1024);
  const linesPerPage = 180;
  const pages = Math.ceil(lines.length / linesPerPage);
  for (let page = 0; page < pages; page++) {
    const pageLines = lines.slice(page * linesPerPage, (page + 1) * linesPerPage);
    canvas.height = Math.max(600, pageLines.length * 40 + 200);
    context.fillStyle = '#e8ecec';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#111925';
    context.font = font;
    context.textBaseline = 'top';
    pageLines.forEach((line, index) => context.fillText(line, 88, 88 + index * 40));
    context.strokeStyle = '#71848d';
    context.beginPath();
    context.moveTo(88, canvas.height - 75);
    context.lineTo(1112, canvas.height - 75);
    context.stroke();
    context.font = '17px monospace';
    context.fillText(`WHAT IS REAL?${pages > 1 ? `   ${page + 1} / ${pages}` : ''}`, 88, canvas.height - 55);
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('Image export unavailable')), 'image/png'));
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `what-is-real-review${pages > 1 ? `-${page + 1}` : ''}.png`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
}
function ExportControls({
  state
}: {
  state: ExperienceState;
}) {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const copyDialog = useRef<HTMLDialogElement>(null);
  async function copy() {
    try {
      await navigator.clipboard.writeText(createReviewText(state));
      setStatus('COPIED');
    } catch {
      copyDialog.current?.showModal();
    }
  }
  async function download() {
    setBusy(true);
    setStatus('');
    try {
      await downloadReviewCard(state);
      setStatus('REVIEW CARD READY');
    } catch {
      setStatus('IMAGE EXPORT UNAVAILABLE — COPY TEXT');
    } finally {
      setBusy(false);
    }
  }
  return <div className="review-export">
    <Action secondary onClick={copy}>COPY TEXT</Action>
    <Action secondary onClick={download} disabled={busy}>{busy ? 'PREPARING…' : 'DOWNLOAD REVIEW CARD'}</Action>
    <span className="export-status" role="status">{status}</span>
    <dialog className="ending-dialog copy-dialog" ref={copyDialog} aria-labelledby="copy-title">
      <div className="ending-dialog-header"><h2 id="copy-title">COPY TEXT</h2><button className="text-button" onClick={() => copyDialog.current?.close()}>CLOSE <span aria-hidden="true">×</span></button></div>
      <textarea aria-label="Your journey through reality" readOnly value={createReviewText(state)} onFocus={event => event.currentTarget.select()} />
    </dialog>
  </div>;
}
const faces = [{
  key: 'EXISTENCE',
  en: 'What kind of being is it?',
  zh: '存在：对象以何种形式存在？',
  revisit: '13'
}, {
  key: 'EXPERIENCE',
  en: 'Was the feeling truly felt?',
  zh: '体验：感受是否切实发生？',
  revisit: '08'
}, {
  key: 'RELATIONSHIP',
  en: 'Is there mutuality?',
  zh: '关系：双方是否具有相互性？',
  revisit: '23'
}, {
  key: 'MEANING',
  en: 'What makes a life matter?',
  zh: '意义：生命为何具有价值？',
  revisit: '09'
}];
function FourFaces({
  navigate,
  next
}: ScreenProps) {
  const strip = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const move = (index: number) => {
    const nextIndex = Math.min(3, Math.max(0, index));
    setActive(nextIndex);
    const target = strip.current?.children[nextIndex] as HTMLElement | undefined;
    if (target && strip.current) strip.current.scrollTo({
      left: target.offsetLeft - strip.current.offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  };
  return <section className="ending-wrap faces-wrap">
    <h1 className="sr-only">FOUR FACES OF REAL</h1>
    <div className="four-faces" ref={strip} onScroll={event => {
      const element = event.currentTarget;
      const first = element.children[0] as HTMLElement;
      if (first && element.scrollWidth > element.clientWidth) setActive(Math.round(element.scrollLeft / (first.offsetWidth + 16)));
    }}>
      {faces.map((face, index) => <article className="real-face" key={face.key} style={{
        animationDelay: `${index * 120}ms`
      }}>
        <span className="face-node" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <h2>{face.key}</h2><Bilingual en={face.en} zh={face.zh} />
        <button className="text-button face-revisit" onClick={() => navigate(face.revisit)}>REVISIT <span lang="zh-CN">回看</span><span aria-hidden="true">↗</span></button>
      </article>)}
    </div>
    <div className="face-pagination" aria-label="Four faces of real">
      <button className="text-button" aria-label="Previous concept" disabled={active === 0} onClick={() => move(active - 1)}>←</button>
      <span>{String(active + 1).padStart(2, '0')} / 04</span>
      <button className="text-button" aria-label="Next concept" disabled={active === 3} onClick={() => move(active + 1)}>→</button>
    </div>
    <div className="ending-actions"><Action onClick={next}>NEXT</Action></div>
  </section>;
}
function Journey({
  state,
  update,
  next,
  navigate
}: ScreenProps) {
  const [reconsider, setReconsider] = useState(false);
  const reconsidered = screen('02').options?.find(option => option.value === state.openingMemoryReconsidered);
  return <section className="ending-wrap journey-wrap">
    <header className="ending-heading"><h1>YOU ONCE CHOSE…</h1><div className="zh" lang="zh-CN">你曾这样选择……</div></header>
    <div className="journey-layout">
      <div className="journey-records">
        <article className="journey-card">
          <PanelLabel>01 / MEMORY</PanelLabel><h2>Memory <span lang="zh-CN">记忆</span></h2>
          <Bilingual {...choice(state, 'qMemory')} />
          <details className="journey-details"><summary>INTERLINKED / DISTINCT / EVENT / OWNERSHIP</summary>
            <Bilingual {...choice(state, 'qEmotion')} /><Bilingual {...choice(state, 'qAutonomy')} /><Bilingual {...choice(state, 'memoryFrame')} />
          </details>
          <div className="opening-comparison"><PanelLabel>MEMORY TRACE</PanelLabel><Bilingual {...choice(state, 'openingMemory')} />
            {reconsidered && <div className="reconsidered"><PanelLabel>RECONSIDER</PanelLabel><Bilingual {...reconsidered} /></div>}
            <button className="text-button" aria-expanded={reconsider} onClick={() => setReconsider(value => !value)}>RECONSIDER <span lang="zh-CN">重新判断</span></button>
            {reconsider && <div className="reconsider-options"><Bilingual {...screen('02').blocks[2]} /><Options options={screen('02').options!} value={state.openingMemoryReconsidered} onSelect={value => update({
                openingMemoryReconsidered: value
              })} /></div>}
          </div>
        </article>
        <article className="journey-card">
          <PanelLabel>02 / TRANSLATION</PanelLabel><h2>Translation <span lang="zh-CN">翻译</span></h2>
          <div className="journey-subtitles"><div><span>JOI</span><p lang="zh-CN">{withoutSentencePeriods(subtitleText(state, 'Joi')) || '—'}</p></div><div><span>K</span><p lang="zh-CN">{withoutSentencePeriods(subtitleText(state, 'K')) || '—'}</p></div></div>
          <div className="journey-reasons">{state.translationReasons.map(value => <Bilingual key={value} {...reason(value)} />)}</div>
          {state.translationReasonText && <p className="visitor-text">{state.translationReasonText}</p>}
          {!state.translationReasons.length && !state.translationReasonText && <p>—</p>}
          <button className="text-button" onClick={() => navigate('17')}>REVISIT THE TRANSLATION <span lang="zh-CN">重看字幕</span></button>
        </article>
        <article className="journey-card">
          <PanelLabel>03 / AI INTIMACY</PanelLabel><h2>AI intimacy <span lang="zh-CN">AI亲密关系</span></h2>
          <div className="ai-record"><PanelLabel>REAL / VIRTUAL</PanelLabel><Bilingual {...choice(state, 'aiExperience')} /></div>
          {([['aiScenario1', 'REMEMBERED'], ['aiScenario2', 'DESIGNED'], ['aiScenario3', 'RESET']] as const).map(([key, label]) => <div className="ai-record" key={key}><PanelLabel>{label}</PanelLabel><Bilingual {...choice(state, key)} /></div>)}
        </article>
      </div>
      <aside className="journey-timeline" aria-hidden="true"><div>MEMORY</div><div>TRANSLATION</div><div>AI INTIMACY</div></aside>
    </div>
    <ExportControls state={state} /><div className="ending-actions"><Action onClick={next}>NEXT</Action></div>
  </section>;
}
function FinalQuestion({
  screenId,
  state,
  update,
  next
}: ScreenProps) {
  const data = screen(screenId);
  const field = screenId === '30a' ? 'finalThought' : 'finalThought2';
  const [writingFor, setWritingFor] = useState<string>();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const writing = writingFor === screenId || Boolean(state[field]);
  const beginWriting = () => {
    setWritingFor(screenId);
    requestAnimationFrame(() => {
      textarea.current?.focus();
      textarea.current?.scrollIntoView({
        block: 'nearest'
      });
    });
  };
  return <section className="ending-wrap final-wrap">
    <div className="final-premise">{data.blocks.slice(0, 2).map(block => <Bilingual key={block.en} {...block} />)}</div>
    <header className="final-question"><h1>{withoutSentencePeriods(data.blocks[2].en)}</h1><div className="zh" lang="zh-CN">{data.blocks[2].zh && withoutSentencePeriods(data.blocks[2].zh)}</div></header>
    <div className="final-writing" hidden={!writing}><label htmlFor={`thought-${screenId}`}>WRITE YOUR THOUGHT <span lang="zh-CN">写下你的想法</span></label><textarea ref={textarea} id={`thought-${screenId}`} value={state[field]} onChange={event => update({
        [field]: event.target.value
      })} maxLength={4000} rows={4} /></div>
    <div className="final-controls">
      <Action secondary onClick={beginWriting}><Bilingual en="WRITE YOUR THOUGHT." zh="写下你的想法。" /></Action>
      {writing && <Action onClick={next}>NEXT</Action>}
      <Action secondary onClick={next}><Bilingual en="FINISH WITHOUT ANSWERING." zh="无需回答也可结束。" /></Action>
    </div>
    <ExportControls state={state} />
  </section>;
}
const references = [{
  name: 'Territory Studio — Blade Runner 2049',
  url: 'https://territorystudio.com/project/blade-runner-2049/'
}, {
  name: 'American Society of Cinematographers — Designing the Future',
  url: 'https://staging.ascmag.com/articles/blade-runner-2049-designing-the-future'
}, {
  name: 'Design Museum — Territory Studio interface design interview',
  url: 'https://beta.designmuseum.org/exhibitions/past-exhibitions/beazley-designs-of-the-year-2018/qa-with-david-sheldon-hicks-founder-of-territory-studio'
}, {
  name: 'W3C WCAG 2.2 — Animation from Interactions',
  url: 'https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions'
}];
function Credits({
  navigate,
  restart
}: ScreenProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <section className="ending-wrap credits-wrap">
    <h1>WHAT IS REAL?</h1><div className="zh credits-title-zh" lang="zh-CN">何以为“真”？</div>
    <Bilingual className="credits-description" en="A study of words, choices, and what we call real." zh="关于语言、选择与真实性判断的实践研究。" />
    <div className="credits-links">
      <Action secondary onClick={() => navigate('17')}><Bilingual en="REVISIT THE TRANSLATION" zh="重看字幕" /></Action>
      <Action secondary onClick={() => dialog.current?.showModal()}><Bilingual en="REFERENCES" zh="文献来源" /></Action>
      <Action secondary onClick={restart}><Bilingual en="RESTART" zh="重新开始" /></Action>
    </div>
    <dialog ref={dialog} className="ending-dialog references-dialog" aria-labelledby="references-title" onClick={event => {
      if (event.target === event.currentTarget) dialog.current?.close();
    }}>
      <div className="ending-dialog-header"><h2 id="references-title">REFERENCES</h2><button className="text-button" onClick={() => dialog.current?.close()}>CLOSE <span aria-hidden="true">×</span></button></div>
      <div className="source-types"><div><h3>FILM QUOTATIONS</h3><p>Blade Runner 2049 (2017) Baseline sequence and Joi / K dialogue</p></div><div><h3>ORIGINAL QUESTIONS</h3><p>Memory, emotion, autonomy, virtual companionship scenarios and reflections: user-provided Word V1.2 script</p></div><div><h3>INTERPRETIVE TRANSLATIONS</h3><p>Chinese subtitle alternatives and translation notes: user-provided script Visitor-written subtitles are recorded as custom translations</p></div></div>
      <ol className="reference-list">{references.map(reference => <li key={reference.url}><a href={reference.url} target="_blank" rel="noreferrer">{reference.name}<span aria-hidden="true"> ↗</span></a></li>)}</ol>
      <p className="source-basis">何以为真_网站逐屏视觉与交互脚本_V1.2双端定稿.docx</p>
    </dialog>
  </section>;
}
export function EndingScreens(props: ScreenProps) {
  if (props.screenId === '26') return <FourFaces {...props} />;
  if (props.screenId === '29') return <Journey {...props} />;
  if (props.screenId === '30a' || props.screenId === '30b') return <FinalQuestion {...props} />;
  if (props.screenId === '31') return <Credits {...props} />;
  const data = screen(props.screenId);
  return <section className={`ending-wrap ending-narrative ending-${props.screenId}`}><h1 className="sr-only">{data.title}</h1><div className="ending-narrative-copy">{data.blocks.map(block => <Bilingual key={block.en} {...block} />)}</div><div className="ending-actions">{props.screenId === '28' && <Action secondary onClick={() => props.navigate('17')}>REVISIT THE TRANSLATION</Action>}<Action onClick={props.next}>{props.screenId === '27' ? <Bilingual en="CONSIDER" zh="继续" /> : 'NEXT'}</Action></div></section>;
}
