import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import type { ExperienceState, ScreenProps, SubtitleChoice } from '../types';
import { SUBTITLE_COPY, subtitleText, subtitlesReady, translationNotes, translationReasonOptions } from '../data/subtitles';
import { Action, Bilingual, Options, PanelLabel } from './UI';
import './subtitle.css';
import { withoutSentencePeriods } from '../utils/punctuation';
function SubtitlePreview({
  state,
  large = false
}: {
  state: ExperienceState;
  large?: boolean;
}) {
  return <div className={`subtitle-preview ${large ? 'subtitle-preview-large' : ''}`} aria-live="polite" aria-atomic="true">
    <Bilingual en="SUBTITLE PREVIEW" zh="字幕预览" className="preview-label" />
    <div className="preview-image" aria-hidden="true"><div className="preview-person preview-person-joi" /><div className="preview-person preview-person-k" /><div className="preview-connection" /></div>
    <div className="preview-captions">{(['Joi', 'K'] as const).map(speaker => <div className={`preview-caption preview-caption-${speaker.toLowerCase()}`} key={speaker}><span className="caption-speaker">{speaker.toUpperCase()}</span><p className="caption-en">{withoutSentencePeriods(SUBTITLE_COPY[speaker].en)}</p><p className="caption-zh" lang="zh-CN">{withoutSentencePeriods(subtitleText(state, speaker)) || '—'}</p></div>)}</div>
  </div>;
}
function SubtitleRow({
  speaker,
  state,
  update
}: {
  speaker: 'Joi' | 'K';
  state: ExperienceState;
  update: ScreenProps['update'];
}) {
  const choice = speaker === 'Joi' ? state.subtitleJoi : state.subtitleK;
  const custom = speaker === 'Joi' ? state.customJoi : state.customK;
  const select = (selected: SubtitleChoice) => update(speaker === 'Joi' ? {
    subtitleJoi: selected,
    subtitlesConfirmed: false
  } : {
    subtitleK: selected,
    subtitlesConfirmed: false
  });
  const setCustom = (value: string) => update(speaker === 'Joi' ? {
    customJoi: value,
    subtitlesConfirmed: false
  } : {
    customK: value,
    subtitlesConfirmed: false
  });
  return <fieldset className={`subtitle-row subtitle-row-${speaker.toLowerCase()}`}>
    <legend><span className="speaker-label">{speaker.toUpperCase()}</span><span className="dialogue-original">{withoutSentencePeriods(SUBTITLE_COPY[speaker].en)}</span></legend>
    <p className="subtitle-instruction" lang="zh-CN">选择{speaker}台词的中文字幕</p>
    <div className="subtitle-choices">{(['A', 'B'] as const).map(key => <button className={`subtitle-choice ${choice === key ? 'selected' : ''}`} aria-pressed={choice === key} onClick={() => select(key)} key={key}>
      <span className="subtitle-choice-meta"><span>{speaker.toUpperCase()} {key}</span><span aria-hidden="true">{choice === key ? '●' : '○'}</span></span>
      <span className="subtitle-choice-copy" lang="zh-CN">{withoutSentencePeriods(SUBTITLE_COPY[speaker][key])}</span>
      <span className="subtitle-choice-type" lang="zh-CN">{key === 'A' ? '保留型' : '显化型'}</span>
    </button>)}</div>
    <button className={`custom-choice ${choice === 'CUSTOM' ? 'selected' : ''}`} aria-pressed={choice === 'CUSTOM'} aria-controls={`custom-${speaker}`} aria-expanded={choice === 'CUSTOM'} onClick={() => select('CUSTOM')}>CUSTOM <span aria-hidden="true">{choice === 'CUSTOM' ? '−' : '+'}</span></button>
    {choice === 'CUSTOM' && <label className="subtitle-custom" htmlFor={`custom-${speaker}`}><span className="speaker-label">{speaker.toUpperCase()} / CUSTOM</span><textarea id={`custom-${speaker}`} value={custom} onChange={event => setCustom(event.target.value)} rows={2} maxLength={500} lang="zh-CN" aria-label={`${speaker} custom subtitle`} autoComplete="off" /></label>}
  </fieldset>;
}
function Workbench(props: ScreenProps) {
  const ready = subtitlesReady(props.state);
  return <section className="subtitle-experience subtitle-workbench" aria-labelledby="subtitle-title">
    <div className="subtitle-heading"><PanelLabel>17 / TRANSLATING REAL</PanelLabel><h1 id="subtitle-title">BUILD THE SUBTITLES</h1></div>
    <div className="subtitle-desk"><div className="subtitle-editors"><SubtitleRow speaker="Joi" state={props.state} update={props.update} /><SubtitleRow speaker="K" state={props.state} update={props.update} /></div><SubtitlePreview state={props.state} /></div>
    <div className="subtitle-actions"><span className="subtitle-combination" aria-live="polite">JOI {props.state.subtitleJoi || '—'} <span aria-hidden="true">/</span> K {props.state.subtitleK || '—'}</span><Action disabled={!ready} onClick={() => {
        props.update({
          subtitlesConfirmed: true
        });
        props.next();
      }}>CONFIRM</Action></div>
  </section>;
}
function Reasons(props: ScreenProps) {
  const {
    state,
    update
  } = props;
  const valid = subtitlesReady(state) && (state.translationReasons.length > 0 || state.translationReasonText.trim().length > 0);
  function toggle(value: string) {
    update({
      translationReasons: state.translationReasons.includes(value) ? state.translationReasons.filter(item => item !== value) : [...state.translationReasons, value]
    });
  }
  return <section className="subtitle-experience translation-reasons" aria-labelledby="reasons-title">
    <PanelLabel>18 / DECISION LOG</PanelLabel><h1 id="reasons-title">WHY THIS<br />TRANSLATION?</h1>
    <Bilingual en="What mattered most when you chose these words?" zh="选择这些表达时，你最重视什么？" className="reason-question" />
    <div className="reasons-grid"><div className="selected-subtitles"><Bilingual en="YOUR SUBTITLES" zh="你的译文" />{(['Joi', 'K'] as const).map(speaker => <div className="selected-subtitle" key={speaker}><span className="speaker-label">{speaker.toUpperCase()}</span><p className="selected-subtitle-en">{withoutSentencePeriods(SUBTITLE_COPY[speaker].en)}</p><p className="selected-subtitle-zh" lang="zh-CN">{withoutSentencePeriods(subtitleText(state, speaker)) || '—'}</p></div>)}<Action secondary onClick={() => props.navigate('17')}>BUILD THE SUBTITLES</Action></div><div className="reason-options"><Options options={translationReasonOptions} value={state.translationReasons} multiple onSelect={toggle} /><label className="reason-free-input" htmlFor="translation-reason"><Bilingual en="OTHER / Explain in your own words." zh="其他理由，自行说明。" /><textarea id="translation-reason" rows={3} maxLength={2000} value={state.translationReasonText} onChange={event => update({
            translationReasonText: event.target.value
          })} /></label></div></div>
    <div className="subtitle-actions"><Action disabled={!valid} onClick={props.next}>CONFIRM</Action></div>
  </section>;
}
function Deconstruction(props: ScreenProps) {
  const [active, setActive] = useState<number | null>(null);
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 760px)').matches);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const change = () => setMobile(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (node.open) node.close();
    if (active !== null) {
      if (mobile) node.showModal();else node.show();
      if (mobile) closeButton.current?.focus();
    }
  }, [active, mobile]);
  useEffect(() => {
    if (active === null) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActive(null);
        trigger.current?.focus();
      }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [active]);
  function openNote(index: number, event: MouseEvent<HTMLButtonElement>) {
    trigger.current = event.currentTarget;
    setActive(index);
  }
  function closeNote() {
    setActive(null);
    trigger.current?.focus();
  }
  const highlightedSubtitle = (speaker: 'Joi' | 'K') => {
    const text = withoutSentencePeriods(subtitleText(props.state, speaker));
    if (!text) return '—';
    const term = speaker === 'Joi' ? '触碰' : '存在';
    const note = speaker === 'Joi' ? 1 : 2;
    if (!text.includes(term)) return text;
    const split = text.indexOf(term);
    return <>{text.slice(0, split)}<button className={`caption-annotation ${active === note ? 'active' : ''}`} onClick={event => openNote(note, event)} aria-haspopup="dialog">{term}</button>{text.slice(split + term.length)}</>;
  };
  return <section className="subtitle-experience translation-analysis" aria-labelledby="analysis-title">
    <PanelLabel>19 / TRANSLATION DECONSTRUCTION</PanelLabel><h1 id="analysis-title">WHAT WAS<br />ADDED?</h1><p className="zh" lang="zh-CN">译者增加了哪些信息？</p>
    <div className="analysis-stage"><div className="analysis-source">{(['Joi', 'K'] as const).map(speaker => <div className="analysis-caption" key={speaker}><span className="speaker-label">{speaker.toUpperCase()}</span><p className="analysis-original">{withoutSentencePeriods(SUBTITLE_COPY[speaker].en)}</p><div className="analysis-translation" lang="zh-CN">{highlightedSubtitle(speaker)}</div></div>)}
      <div className="semantic-words"><button className={`semantic-word ${active === 1 ? 'active' : ''}`} onClick={event => openNote(1, event)} aria-haspopup="dialog"><Bilingual en="“touch you”" zh="“触碰你”" /><span aria-hidden="true">↗</span></button><button className={`semantic-word ${active === 2 ? 'active' : ''}`} onClick={event => openNote(2, event)} aria-haspopup="dialog"><Bilingual en="“being”" zh="“存在”" /><span aria-hidden="true">↗</span></button></div>
      <div className="annotation-index">{translationNotes.map((note, index) => <button key={note.value} aria-haspopup="dialog" aria-pressed={active === index} className={active === index ? 'active' : ''} onClick={event => openNote(index, event)}><span>{String(index + 1).padStart(2, '0')}</span>{note.value}<span aria-hidden="true">↗</span></button>)}</div>
    </div><div className="analysis-space" aria-hidden="true"><div className="analysis-link" /><div className="analysis-coordinate" /></div></div>
    <dialog ref={dialog} className="translation-note-dialog" aria-labelledby="translation-note-title" onCancel={event => {
      event.preventDefault();
      closeNote();
    }}>
      <div className="note-topline"><span>{active !== null ? String(active + 1).padStart(2, '0') : ''} / TRANSLATION NOTE</span><button ref={closeButton} className="note-close" aria-label="Close translation note" onClick={closeNote}>CLOSE <span aria-hidden="true">×</span></button></div>
      {active !== null && <><h2 id="translation-note-title">{translationNotes[active].value}</h2><Bilingual en={translationNotes[active].en.split(' / ')[1]} zh={translationNotes[active].zh} /><div className="note-rule" aria-hidden="true" /></>}
    </dialog>
    <div className="subtitle-actions"><Action secondary onClick={() => props.navigate('17')}>BUILD THE SUBTITLES</Action><Action onClick={props.next}>NEXT</Action></div>
  </section>;
}
export function SubtitleExperience(props: ScreenProps) {
  if (props.screenId === '17') return <Workbench {...props} />;
  if (props.screenId === '18') return <Reasons {...props} />;
  return <Deconstruction {...props} />;
}
