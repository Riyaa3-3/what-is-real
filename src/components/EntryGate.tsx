import { AudioControls, useExperienceAudio } from './Soundscape';
import './entry-gate.css';

type AudioController = ReturnType<typeof useExperienceAudio>;

/**
 * A static, keyboard-accessible first interaction gate. It lets a visitor
 * unlock audio within a trusted click before the cinematic cover begins.
 */
export function EntryGate({
  onEnter,
  audio
}: {
  onEnter: () => void;
  audio: AudioController;
}) {
  return <div className="entry-gate" role="region" aria-label="进入体验与声音提示">
    <button className="entry-gate-surface" type="button" onClick={onEnter}
      aria-label="请单击屏幕，或打开右上角的audio，以获得更好体验">
      <span className="entry-gate-prompt" lang="zh-CN">请单击屏幕，或打开右上角的audio，以获得更好体验</span>
    </button>
    <div className="entry-gate-audio">
      <AudioControls {...audio} />
    </div>
  </div>;
}
