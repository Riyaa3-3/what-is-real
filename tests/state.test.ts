import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState, restoreState, advanceBaseline} from '../src/state.ts';
import {SUBTITLE_COPY, subtitleText, subtitlesReady} from '../src/data/subtitles.ts';
import {screens} from '../src/data/screens.ts';
import {BACKGROUND_KEY, BASELINE_CLIPS, baselineClip, AUDIO_KEYS} from '../src/data/audioCueMap.ts';
import {resolveHostedAudioUrl} from '../src/audio/hosted.ts';

test('new sessions contain no invented visitor choices or subtitles', () => {
  const state = initialState();
  for (const key of ['openingMemory','qMemory','qEmotion','qAutonomy','memoryFrame','subtitleJoi','subtitleK','aiExperience','aiScenario1','aiScenario2','aiScenario3']) {
    assert.equal(state[key as keyof typeof state], undefined, key);
  }
  assert.equal(subtitleText(state,'Joi'), '');
  assert.equal(subtitleText(state,'K'), '');
  assert.equal(subtitlesReady(state), false);
  assert.deepEqual(state.baselineOriginal, {cells:0,interlinked:0,within:0});
  assert.deepEqual(state.translationReasons, []);
});

test('malformed or primitive storage recovers to a fresh experience', () => {
  for (const raw of [null, '', '{oops', 'null', '[]', '4', '"old storage"', 'true']) {
    assert.deepEqual(restoreState(raw), initialState(), String(raw));
  }
});

test('stored data retains visitor choices, original and reconsidered answers separately', () => {
  const original = {...initialState(), openingMemory:'A', openingMemoryReconsidered:'B', qMemory:'C',
    subtitleJoi:'CUSTOM' as const, customJoi:'自定义译文。', subtitleK:'B' as const,
    subtitlesConfirmed:true, translationReasons:['OPENNESS','OTHER'], translationReasonText:'My own reason.',
    finalThought:'Memory and action.', finalThought2:'A separate reflection.'};
  const restored = restoreState(JSON.stringify(original));
  assert.deepEqual(restored, original);
  assert.equal(restored.openingMemory,'A');
  assert.equal(restored.openingMemoryReconsidered,'B');
  assert.equal(subtitleText(restored,'Joi'),'自定义译文。');
});

test('counter restoration bounds integer counts and rejects malformed counter types', () => {
  assert.deepEqual(restoreState(JSON.stringify({baselineOriginal:{cells:900,interlinked:-2,within:99}})).baselineOriginal,
    {cells:3,interlinked:0,within:1});
  assert.deepEqual(restoreState(JSON.stringify({baselineOriginal:{cells:'3',interlinked:2.5,within:null}})).baselineOriginal,
    {cells:0,interlinked:0,within:0});
  assert.deepEqual(restoreState(JSON.stringify({translationReasons:['OPENNESS',8,null],customJoi:7})).translationReasons,['OPENNESS']);
  assert.equal(restoreState(JSON.stringify({customJoi:7})).customJoi,'');
});

test('baseline responses complete only the prescribed 3 + 4 + 1 sequence and never overcount on revisits', () => {
  let state=initialState();
  for(let i=0;i<3;i++) state={...state,baselineOriginal:advanceBaseline(state,'cells')};
  assert.deepEqual(state.baselineOriginal,{cells:3,interlinked:0,within:0});
  for(let i=0;i<4;i++) state={...state,baselineOriginal:advanceBaseline(state,'interlinked')};
  state={...state,baselineOriginal:advanceBaseline(state,'within')};
  assert.deepEqual(state.baselineOriginal,{cells:3,interlinked:4,within:1});
  for(const key of ['cells','interlinked','within'] as const) state={...state,baselineOriginal:advanceBaseline(state,key)};
  assert.deepEqual(state.baselineOriginal,{cells:3,interlinked:4,within:1});
});

test('all four independent standard subtitle combinations preserve the locked copy', () => {
  assert.equal(SUBTITLE_COPY.Joi.A,'我想为你变得真实。');
  assert.equal(SUBTITLE_COPY.Joi.B,'我想真正触碰到你。');
  assert.equal(SUBTITLE_COPY.K.A,'对我而言，你就是真实的。');
  assert.equal(SUBTITLE_COPY.K.B,'在我心里，你就是真实的存在。');
  for(const joi of ['A','B'] as const) for(const k of ['A','B'] as const) {
    const state={...initialState(),subtitleJoi:joi,subtitleK:k};
    assert.equal(subtitleText(state,'Joi'),SUBTITLE_COPY.Joi[joi]);
    assert.equal(subtitleText(state,'K'),SUBTITLE_COPY.K[k]);
    assert.equal(subtitlesReady(state),true);
    assert.equal(state.subtitlesConfirmed,false);
  }
});

test('both custom subtitles must be nonempty; edits cannot alter the other speaker or standard copy', () => {
  const one={...initialState(),subtitleJoi:'CUSTOM' as const,customJoi:' \n ',subtitleK:'A' as const};
  assert.equal(subtitlesReady(one),false);
  const valid={...one,customJoi:'  我的选择。  '};
  assert.equal(subtitlesReady(valid),true);
  assert.equal(subtitleText(valid,'Joi'),'我的选择。');
  assert.equal(subtitleText(valid,'K'),'对我而言，你就是真实的。');
  const both={...valid,subtitleK:'CUSTOM' as const,customK:'你在这里。'};
  assert.equal(subtitleText(both,'K'),'你在这里。');
  assert.equal(subtitleText(both,'Joi'),'我的选择。');
  assert.equal(subtitlesReady({...both,customK:'   '}),false);
  assert.equal(SUBTITLE_COPY.Joi.A,'我想为你变得真实。');
});

test('all 32 source screens retain order, missing 21 and both confirmed final questions', () => {
  const ids=[...Array.from({length:21},(_,i)=>String(i).padStart(2,'0')),...Array.from({length:8},(_,i)=>String(i+22)), '30a','30b','31'];
  assert.deepEqual(screens.map(s=>s.id),ids);
  assert.equal(new Set(screens.map(s=>s.id)).size,32);
  assert.equal(screens.find(s=>s.id==='30a')?.blocks[2].en,'WHAT MAKES YOUR LIFE YOURS?');
  assert.equal(screens.find(s=>s.id==='30b')?.blocks[2].en,'WHAT MAKES THEN REAL?');
  assert.equal(screens.find(s=>s.id==='04')?.blocks.length,3);
  assert.equal(screens.find(s=>s.id==='05')?.blocks.length,4);
  assert.ok(screens.find(s=>s.id==='16')?.blocks.every(b=>b.zh===undefined));
});

test('nine licensed audio slots match the film baseline in the exact user-selected 3+4+1 order', () => {
  assert.equal(BACKGROUND_KEY, 'background/atmosphere-loop.mp3');
  assert.equal(AUDIO_KEYS.length, 9);
  assert.equal(new Set(AUDIO_KEYS).size, 9);
  assert.deepEqual(Object.keys(BASELINE_CLIPS), ['04', '05', '06']);
  assert.deepEqual([BASELINE_CLIPS['04'].length, BASELINE_CLIPS['05'].length, BASELINE_CLIPS['06'].length], [3, 4, 1]);
  assert.equal(baselineClip('04',0), 'baseline/cells-01-institution.mp3');
  assert.equal(baselineClip('04',1), 'baseline/cells-02-cell.mp3');
  assert.equal(baselineClip('04',2), 'baseline/cells-03-duties.mp3');
  assert.equal(baselineClip('05',0), 'baseline/interlinked-01-hold-hand.mp3');
  assert.equal(baselineClip('05',1), 'baseline/interlinked-02-finger.mp3');
  assert.equal(baselineClip('05',2), 'baseline/interlinked-03-heart.mp3');
  assert.equal(baselineClip('05',3), 'baseline/interlinked-04-dream.mp3');
  assert.equal(baselineClip('06',0), 'baseline/within-cells-interlinked.mp3');
  assert.equal(baselineClip('05',4), null);
  assert.equal(baselineClip('08',0), null);
  assert.equal(baselineClip('04',-1), null);
});

test('public website resolves all nine audio files without any visitor import', () => {
  for (const key of AUDIO_KEYS) {
    const expected = 'https://riyaa3-3.github.io/what-is-real/audio/' + key;
    assert.equal(resolveHostedAudioUrl(key, 'https://riyaa3-3.github.io/what-is-real/'), expected);
    const nested = 'https://example.github.io/what-is-real/preview-v2/audio/' + key;
    assert.equal(resolveHostedAudioUrl(key, 'https://example.github.io/what-is-real/preview-v2/'), nested);
  }
  assert.throws(() => resolveHostedAudioUrl('../private.mp3', 'https://example.com/'));
});
