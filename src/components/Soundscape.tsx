import { useCallback, useEffect, useRef, useState } from 'react';
import { BACKGROUND_KEY, baselineClip } from '../data/audioCueMap';
import { audioFileUrl, hasAudioPack, installAudioPack, restoreAudioPack } from '../audio/pack';
import './soundscape.css';

/**
 * BGM and film dialogue are independent HTMLAudioElement channels.
 * Neither navigation nor voice playback interrupts/restarts the looping BGM.
 */
export function useExperienceAudio(screenId: string, questionIndex: number) {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [musicVolume, setMusicVolume] = useState(.38);
  const [voiceVolume, setVoiceVolume] = useState(.92);
  const [packReady, setPackReady] = useState(false);
  const [packLoading, setPackLoading] = useState(true);
  const [packError, setPackError] = useState('');
  const [revision, setRevision] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const background = useRef<HTMLAudioElement | null>(null);
  const dialogue = useRef<HTMLAudioElement | null>(null);
  const settings = useRef({ musicEnabled, voiceEnabled });
  settings.current = { musicEnabled, voiceEnabled };

  useEffect(() => {
    let mounted = true;
    void restoreAudioPack().then(found => {
      if (mounted) {
        setPackReady(found);
        setPackLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  // A browser can block autoplay with sound. The very first real interaction
  // retries both channels, without ever marking them OFF in the interface.
  useEffect(() => {
    const resume = () => {
      if (settings.current.musicEnabled && background.current?.paused) {
        void background.current.play().catch(() => {});
      }
      if (settings.current.voiceEnabled && dialogue.current?.paused &&
        dialogue.current.currentTime === 0) {
        void dialogue.current.play().catch(() => {});
      }
    };
    document.addEventListener('pointerdown', resume);
    document.addEventListener('keydown', resume);
    return () => {
      document.removeEventListener('pointerdown', resume);
      document.removeEventListener('keydown', resume);
    };
  }, []);

  useEffect(() => {
    if (packLoading || !musicEnabled) {
      background.current?.pause();
      background.current = null;
      setMusicPlaying(false);
      return;
    }
    const player = new Audio(audioFileUrl(BACKGROUND_KEY));
    background.current = player;
    player.loop = true;
    player.preload = 'auto';
    player.volume = musicVolume;
    const onPlay = () => setMusicPlaying(true);
    const onPause = () => setMusicPlaying(false);
    player.addEventListener('playing', onPlay);
    player.addEventListener('pause', onPause);
    void player.play().catch(() => {
      // Expected in many browsers until the visitor's first click.
    });
    return () => {
      player.removeEventListener('playing', onPlay);
      player.removeEventListener('pause', onPause);
      player.pause();
      player.removeAttribute('src');
      player.load();
      if (background.current === player) background.current = null;
    };
  }, [musicEnabled, packLoading, revision]);

  useEffect(() => {
    if (background.current) background.current.volume = musicVolume;
  }, [musicVolume]);

  const stopVoice = useCallback(() => {
    const player = dialogue.current;
    if (player) {
      player.pause();
      player.currentTime = 0;
      player.removeAttribute('src');
      player.load();
      dialogue.current = null;
    }
  }, []);

  useEffect(() => {
    stopVoice();
    if (packLoading || !voiceEnabled) return;
    const clip = baselineClip(screenId, questionIndex);
    if (!clip) return;
    const player = new Audio(audioFileUrl(clip));
    player.volume = voiceVolume;
    player.loop = false;
    player.preload = 'auto';
    dialogue.current = player;
    // An audio clip ending NEVER advances the question or changes the page.
    void player.play().catch(() => {});
    return () => {
      if (dialogue.current === player) stopVoice();
      else player.pause();
    };
  }, [screenId, questionIndex, voiceEnabled, packLoading, revision, stopVoice]);

  useEffect(() => {
    if (dialogue.current) dialogue.current.volume = voiceVolume;
  }, [voiceVolume]);

  const replayVoice = useCallback(() => {
    if (!settings.current.voiceEnabled) return;
    const player = dialogue.current;
    if (!player) return;
    player.currentTime = 0;
    void player.play().catch(() => {});
  }, []);

  const importPack = useCallback(async (file: Blob) => {
    setPackError('');
    try {
      await installAudioPack(file);
      setPackReady(hasAudioPack());
      setRevision(n => n + 1);
    } catch (error) {
      setPackError(error instanceof Error ? error.message : 'Failed to import audio pack.');
      throw error;
    }
  }, []);

  // Only the visitor's response button advances the baseline sequence.
  const cue = useCallback((key: string) => {
    if (key === 'response') stopVoice();
    else if (key === 'replay') replayVoice();
  }, [stopVoice, replayVoice]);

  return {
    cue,
    musicEnabled, setMusicEnabled,
    voiceEnabled, setVoiceEnabled,
    musicVolume, setMusicVolume,
    voiceVolume, setVoiceVolume,
    packReady, packLoading, packError, musicPlaying,
    importPack, stopVoice, replayVoice
  };
}

type SoundProps = ReturnType<typeof useExperienceAudio>;

export function AudioControls(props: SoundProps) {
  const [importing, setImporting] = useState(false);
  const upload = async (file?: File) => {
    if (!file) return;
    setImporting(true);
    try { await props.importPack(file); }
    catch { /* Explanation is shown in the panel. */ }
    finally { setImporting(false); }
  };
  return <details className="audio-console">
    <summary className="utility audio-console-trigger" aria-label="Audio and imported soundtracks">
      <span aria-hidden="true">♫</span> AUDIO {props.musicEnabled ? 'ON' : 'OFF'}
    </summary>
    <div className="audio-console-panel">
      <div className="audio-console-heading">AUDIO CONTROL / <span>WHAT IS REAL?</span></div>
      <div className="audio-console-row">
        <button type="button" aria-pressed={props.musicEnabled} onClick={() => props.setMusicEnabled(!props.musicEnabled)}>
          MUSIC {props.musicEnabled ? 'ON' : 'OFF'}
        </button>
        <label><span>LEVEL</span>
          <input type="range" min="0" max="1" step=".05" value={props.musicVolume}
            onChange={event => props.setMusicVolume(Number(event.target.value))}
            disabled={!props.musicEnabled} aria-label="Background music volume" />
        </label>
      </div>
      <div className="audio-console-row">
        <button type="button" aria-pressed={props.voiceEnabled} onClick={() => props.setVoiceEnabled(!props.voiceEnabled)}>
          FILM VOICE {props.voiceEnabled ? 'ON' : 'OFF'}
        </button>
        <label><span>LEVEL</span>
          <input type="range" min="0" max="1" step=".05" value={props.voiceVolume}
            onChange={event => props.setVoiceVolume(Number(event.target.value))}
            disabled={!props.voiceEnabled} aria-label="Film dialogue volume" />
        </label>
      </div>
      <div className="audio-console-divider" />
      <label className="audio-import-control">
        {importing ? 'IMPORTING AUDIO…' : 'IMPORT 9-TRACK AUDIO PACK ↗'}
        <input type="file" accept=".wiraudio,application/octet-stream"
          disabled={importing}
          onChange={event => {
            void upload(event.currentTarget.files?.[0]);
            event.currentTarget.value = '';
          }} />
      </label>
      <div className="audio-import-status" role="status">
        {props.packLoading ? 'CHECKING LOCAL AUDIO…'
          : props.packReady ? '✓ ALL 9 TRACKS READY ON THIS DEVICE'
          : 'LOCAL AUDIO PACK NOT INSTALLED'}
      </div>
      {props.packError && <div className="audio-import-error" role="alert">{props.packError}</div>}
      <div className="audio-console-help" lang="zh-CN">
        首次试听请导入本次提供的音频包；以后会保存在当前浏览器中。浏览器如限制自动播放，点击进入体验即可启动音乐。
      </div>
      {!props.musicPlaying && props.musicEnabled && <div className="audio-console-help">MUSIC ON / FIRST USER GESTURE MAY BE REQUIRED</div>}
    </div>
  </details>;
}
