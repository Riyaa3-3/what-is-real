import { useCallback, useEffect, useRef, useState } from 'react';
import { BACKGROUND_KEY, baselineClip } from '../data/audioCueMap';
import { resolveHostedAudioUrl } from '../audio/hosted';
import './soundscape.css';

/**
 * The public website serves its nine MP3s from GitHub Pages.
 * No user upload, browser-local audio pack or IndexedDB is needed.
 */
function hostedAudioUrl(key: string): string {
  const appRoot = new URL(import.meta.env.BASE_URL, document.baseURI);
  return resolveHostedAudioUrl(key, appRoot.href);
}

type AudioStatus = 'loading' | 'playing' | 'awaiting-gesture' | 'error' | 'off';

export function useExperienceAudio(screenId: string, questionIndex: number) {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [musicVolume, setMusicVolume] = useState(.25);
  const [voiceVolume, setVoiceVolume] = useState(.92);
  const [musicStatus, setMusicStatus] = useState<AudioStatus>('loading');
  const [voiceError, setVoiceError] = useState(false);
  const background = useRef<HTMLAudioElement | null>(null);
  const dialogue = useRef<HTMLAudioElement | null>(null);
  const settings = useRef({ musicEnabled, voiceEnabled });
  settings.current = { musicEnabled, voiceEnabled };

  const playMusic = useCallback(() => {
    const player = background.current;
    if (!settings.current.musicEnabled || !player) return;
    void player.play().then(() => {
      if (background.current === player) setMusicStatus('playing');
    }).catch((reason: unknown) => {
      if (background.current !== player) return;
      if (reason instanceof DOMException && reason.name === 'NotAllowedError') {
        setMusicStatus('awaiting-gesture');
      } else if (player.error?.code === 4) {
        setMusicStatus('error');
      } else {
        setMusicStatus('awaiting-gesture');
      }
    });
  }, []);

  const playVoice = useCallback(() => {
    const player = dialogue.current;
    if (!settings.current.voiceEnabled || !player) return;
    void player.play().catch(() => {
      if (player.error) setVoiceError(true);
      // A blocked autoplay may resume on the next visitor click.
    });
  }, []);

  useEffect(() => {
    const gesture = () => {
      if (settings.current.musicEnabled && background.current?.paused) playMusic();
      if (settings.current.voiceEnabled && dialogue.current?.paused &&
          dialogue.current.currentTime === 0) playVoice();
    };
    document.addEventListener('pointerdown', gesture);
    document.addEventListener('keydown', gesture);
    return () => {
      document.removeEventListener('pointerdown', gesture);
      document.removeEventListener('keydown', gesture);
    };
  }, [playMusic, playVoice]);

  useEffect(() => {
    if (!musicEnabled) {
      setMusicStatus('off');
      return;
    }
    const player = new Audio(hostedAudioUrl(BACKGROUND_KEY));
    background.current = player;
    player.loop = true;
    player.preload = 'auto';
    player.volume = musicVolume;
    setMusicStatus('loading');
    const playing = () => setMusicStatus('playing');
    const error = () => setMusicStatus('error');
    player.addEventListener('playing', playing);
    player.addEventListener('error', error);
    playMusic();
    return () => {
      player.removeEventListener('playing', playing);
      player.removeEventListener('error', error);
      player.pause();
      player.removeAttribute('src');
      player.load();
      if (background.current === player) background.current = null;
    };
  }, [musicEnabled, playMusic]);

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
    setVoiceError(false);
    if (!voiceEnabled) return;
    const clip = baselineClip(screenId, questionIndex);
    if (!clip) return;
    const player = new Audio(hostedAudioUrl(clip));
    player.volume = voiceVolume;
    player.loop = false;
    player.preload = 'auto';
    dialogue.current = player;
    const error = () => setVoiceError(true);
    player.addEventListener('error', error);
    playVoice();
    // Audio ending never advances the question; only the user response does.
    return () => {
      player.removeEventListener('error', error);
      if (dialogue.current === player) stopVoice();
      else player.pause();
    };
  }, [screenId, questionIndex, voiceEnabled, stopVoice, playVoice]);

  useEffect(() => {
    if (dialogue.current) dialogue.current.volume = voiceVolume;
  }, [voiceVolume]);

  const replayVoice = useCallback(() => {
    const player = dialogue.current;
    if (!settings.current.voiceEnabled || !player) return;
    player.currentTime = 0;
    playVoice();
  }, [playVoice]);

  const cue = useCallback((key: string) => {
    if (key === 'response') stopVoice();
    else if (key === 'replay') replayVoice();
  }, [stopVoice, replayVoice]);

  return {
    cue, musicEnabled, setMusicEnabled,
    voiceEnabled, setVoiceEnabled,
    musicVolume, setMusicVolume, voiceVolume, setVoiceVolume,
    musicStatus, voiceError, playMusic, replayVoice,
  };
}

type SoundProps = ReturnType<typeof useExperienceAudio>;

export function AudioControls(props: SoundProps) {
  return <details className="audio-console">
    <summary className="utility audio-console-trigger" aria-label="Music and film dialogue controls">
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
      <div className="audio-import-status" role="status">
        {props.musicStatus === 'playing' ? '● MUSIC PLAYING — HOSTED SOUNDTRACK'
          : props.musicStatus === 'awaiting-gesture' ? '● SOUND READY — TAP TO START'
          : props.musicStatus === 'loading' ? '● CONNECTING TO SOUNDTRACK…'
          : props.musicStatus === 'error' ? '⚠ BACKGROUND AUDIO UNAVAILABLE'
          : 'MUSIC IS OFF'}
      </div>
      {props.musicEnabled && props.musicStatus !== 'playing' && props.musicStatus !== 'error' &&
        <button type="button" className="audio-pack-export" onClick={props.playMusic}>
          ▶ START SOUND
        </button>}
      {props.voiceError && <div className="audio-import-error" role="alert">
        FILM AUDIO UNAVAILABLE — please check your connection.
      </div>}
      <div className="audio-console-help" lang="zh-CN">
        背景音乐和电影测试原声已经内置在正式网站中，无需下载或导入文件。部分浏览器需要首次点击才能开始有声播放。
      </div>
    </div>
  </details>;
}
