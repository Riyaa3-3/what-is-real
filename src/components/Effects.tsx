import './effects.css';
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
export function Texture() {
  return <div className="film-texture" aria-hidden="true"><div className="film-grain" /><div className="film-scanlines" /></div>;
}
export function CoverVisual() {
  return <div className="cover-visual" aria-hidden="true">
  <div className="cover-atmosphere" /><div className="cover-orbit orbit-one" /><div className="cover-orbit orbit-two" />
  <div className="cover-beam beam-one" /><div className="cover-beam beam-two" />
  <div className="cover-city"><img src={asset('city-strip.webp')} width="1024" height="241" alt="" fetchPriority="high" /><div className="city-shade" /></div>
  <svg className="cover-perspective" viewBox="0 0 1440 360" preserveAspectRatio="none"><g fill="none" stroke="currentColor" strokeWidth=".6"><path d="M0 250H1440M0 275H1440M0 320H1440M0 358H1440" />{Array.from({
          length: 13
        }, (_, i) => <path key={i} d={`M720 170L${i * 160 - 240} 360`} />)}</g></svg>
  <div className="cover-registration"><i /><i /><i /><i /></div>
</div>;
}
function Fingerprint() {
  return <svg className="fingerprint" viewBox="0 0 400 500" fill="none" aria-hidden="true">
  <defs><linearGradient id="fingerprintInk" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d4d27b" /><stop offset="1" stopColor="#668488" /></linearGradient></defs>
  <g stroke="url(#fingerprintInk)" strokeWidth="1.35" opacity=".82">{Array.from({
        length: 28
      }, (_, i) => {
        const d = i * 4.7;
        return <path key={i} d={`M${55 + d * .65} ${405 - d * .3}C${-25 + d * .72} ${105 + d * .55} ${113 + d * .28} ${17 + d * .7} 211 ${31 + d * 1.1}C${397 - d * .25} ${65 + d * .53} ${406 - d * .7} ${306 - d * .26} ${302 - d * .5} ${437 - d * .18}`} />;
      })}<path d="M192 440C263 368 154 322 167 215C178 126 258 131 269 221C277 299 210 353 237 409" /></g>
  <g stroke="currentColor" opacity=".5"><path d="M25 80V35H75M325 35H375V80M25 420V465H75M325 465H375V420M200 8V26M200 474V492M4 250H23M377 250H396" /><path d="M36 250H364" opacity=".25" /></g>
</svg>;
}
function HorseOutline() {
  return <svg className="horse-outline" viewBox="0 0 400 350" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.2"><path d="M70 281L84 183L137 179L211 168L244 109L281 73L297 87L300 121L276 137L264 182L274 283L255 283L237 217L203 210L175 281L156 281L172 210L119 214L92 284Z" /><path d="M84 183L58 165L43 179L57 198L79 205M119 214L119 278M244 109L264 119L281 73M137 179L148 204L211 194" /><path d="M44 302H326M85 292V314M279 292V314" opacity=".5" /></g></svg>;
}
function IdentityVisual({
  echo = false
}: {
  echo?: boolean;
}) {
  return <div className={`scene-visual identity-visual ${echo ? 'identity-echo' : ''}`} aria-hidden="true">
  <div className="identity-sweep" /><div className="biometric-plate"><span className="visual-label">SUBJECT: N-001</span><Fingerprint /><div className="scan-cursor" /><div className="segmented-meter">{Array.from({
          length: 24
        }, (_, i) => <i key={i} />)}</div></div>
  <div className="biometric-ghost"><Fingerprint /></div><div className="identity-strips"><i /><i /><i /></div>
  {echo && <><div className="memory-echo-person" /><HorseOutline /></>}
</div>;
}
function Speaker() {
  return <div className="baseline-speaker" aria-hidden="true"><div className="speaker-body"><div className="speaker-cone" /><div className="speaker-grille">{Array.from({
          length: 12
        }, (_, i) => <i key={i} />)}</div><div className="speaker-spine" /><div className="speaker-signal"><i /><i /><i /></div></div><span>recite your baseline</span></div>;
}
function BaselineVisual({
  screenId
}: {
  screenId: string;
}) {
  return <div className={`scene-visual baseline-visual ${screenId === '06' ? 'aperture-closing' : ''}`} aria-hidden="true"><Speaker /><div className="optical-aperture"><div /><div /><div /><i /></div><div className="calibration-ticks">{Array.from({
        length: 21
      }, (_, i) => <i key={i} style={{
        height: i % 5 === 0 ? '18px' : '7px'
      }} />)}</div>{screenId === '07' && <HorseOutline />}{screenId === '09' && <div className="identity-code"><span>N-001</span><i /><span>N-001</span></div>}</div>;
}
function Hologram({
  className = ''
}: {
  className?: string;
}) {
  return <svg className={`hologram-figure ${className}`} viewBox="0 0 400 600" fill="none" aria-hidden="true"><defs><clipPath id="hologramClip"><path d="M170 110C172 60 242 48 257 106C264 135 258 166 244 187L253 221C315 238 337 299 345 389L365 576H61L81 385C90 293 104 247 168 224L181 189C164 167 164 136 170 110Z" /></clipPath><linearGradient id="hologramGlow" x1="0" y1="0" x2="0" y2="1"><stop stopColor="currentColor" stopOpacity=".08" /><stop offset=".4" stopColor="currentColor" stopOpacity=".35" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs><g clipPath="url(#hologramClip)"><rect width="400" height="600" fill="url(#hologramGlow)" />{Array.from({
        length: 60
      }, (_, i) => <path key={i} stroke="currentColor" strokeOpacity={i % 5 === 0 ? '.65' : '.25'} strokeWidth={i % 5 === 0 ? '.9' : '.5'} d={`M0 ${i * 10}H400`} />)}{Array.from({
        length: 14
      }, (_, i) => <path key={i} stroke="currentColor" strokeOpacity=".13" d={`M${i * 31} 0L${i * 31 - 75} 600`} />)}</g><path d="M170 110C172 60 242 48 257 106C264 135 258 166 244 187L253 221C315 238 337 299 345 389L365 576M61 576L81 385C90 293 104 247 168 224L181 189C164 167 164 136 170 110" stroke="currentColor" strokeOpacity=".45" /><ellipse cx="210" cy="582" rx="150" ry="13" stroke="currentColor" strokeOpacity=".3" /></svg>;
}
function EmotionVisual() {
  return <div className="scene-visual emotion-visual" aria-hidden="true"><Hologram /><div className="emotion-wave">{Array.from({
        length: 40
      }, (_, i) => <i key={i} style={{
        height: `${8 + Math.abs(Math.sin(i * .7)) * 28}px`
      }} />)}</div></div>;
}
function MemoryVisual({
  screenId
}: {
  screenId: string;
}) {
  if (screenId === '13') return <div className="scene-visual classification-visual" aria-hidden="true"><div /><i /><div /></div>;
  return <div className={`scene-visual memory-visual memory-${screenId}`} aria-hidden="true"><div className="archive-mat"><div className="archive-image"><img src={asset('memory-horse.webp')} width="800" height="1000" loading="lazy" decoding="async" alt="" /><div className="archive-lens" /></div><div className="archive-reticle" /><div className="archive-perforations">{Array.from({
          length: 10
        }, (_, i) => <i key={i} />)}</div><span className="visual-label">MEMORY FILE / 001</span></div><div className="archive-hairline" /></div>;
}
function PortraitVisual({
  joi = false
}: {
  joi?: boolean;
}) {
  return <div className={`scene-visual portrait-visual ${joi ? 'portrait-joi' : 'portrait-k'}`} aria-hidden="true"><div className="portrait-frame"><img src={asset(joi ? 'joi-portrait.webp' : 'k-portrait.webp')} width="741" height="1572" loading="lazy" decoding="async" alt="" />{joi && <img className="projection-offset" src={asset('joi-portrait.webp')} width="741" height="1572" loading="lazy" decoding="async" alt="" />}<div className="portrait-fade" /><div className="portrait-crosshair" /></div><div className="portrait-axis" /><span className="visual-label">{joi ? 'JOI' : 'K'}</span></div>;
}
function EmptyChat({
  screenId
}: {
  screenId: string;
}) {
  const reset = screenId === '25';
  return <div className={`scene-visual virtual-visual ${reset ? 'chat-reset' : ''}`} aria-hidden="true"><div className="virtual-orbit" /><div className="virtual-person"><Hologram /></div><div className="relationship-frame"><div className="relationship-header"><i /><span /><span /></div><div className="relationship-body">{!reset && <><i className="branch-line" /><div className="branch-choice" /><div className="branch-choice" /><div className="relationship-bar"><i /></div></>}</div><div className="relationship-footer"><i /><i /><i /></div></div><div className="empty-chat"><div className="chat-header"><i /><span /><b /></div><div className="chat-content">{!reset && <div className="empty-bubble"><i /></div>}{screenId === '22' && <div className="empty-bubble secondary-bubble"><i /></div>}</div><div className="chat-input"><span /><i /></div></div><svg className="network-links" viewBox="0 0 600 600"><g stroke="currentColor" fill="none" strokeWidth=".7"><path d="M40 140L260 80L530 210L400 500L160 420Z" /><path d="M40 140L400 500M260 80L160 420M530 210L160 420" /></g>{[[40, 140], [260, 80], [530, 210], [400, 500], [160, 420]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="3" fill="currentColor" />)}</svg></div>;
}
function SnowVisual() {
  return <div className="scene-visual snow-visual" aria-hidden="true"><svg viewBox="0 0 600 600" fill="none"><g stroke="currentColor" strokeWidth="1" opacity=".25"><path d="M40 518H580M82 482H545V518M126 444H507V482M168 407H469V444M210 372H429V407M253 339H390V372" /><path d="M82 482L253 339M545 482L390 339" /></g><path d="M348 309C335 294 317 294 308 307L291 332L279 335L282 343L311 340L335 347L360 343L360 332L345 329Z" fill="currentColor" opacity=".3" />{Array.from({
        length: 34
      }, (_, i) => <circle className="snow-particle" key={i} cx={30 + i * 149 % 540} cy={i * 97 % 550} r={i % 4 === 0 ? 1.7 : 1} fill="currentColor" opacity={.12 + i % 4 * .08} style={{
        animationDelay: `${-(i % 9)}s`,
        animationDuration: `${18 + i % 7}s`
      }} />)}</svg></div>;
}
export function SceneVisual({
  screenId
}: {
  screenId: string;
}) {
  if (screenId === '00') return <CoverVisual />;
  if (screenId === '01' || screenId === '02') return <IdentityVisual echo={screenId === '02'} />;
  if (['03', '04', '05', '06', '07', '09', '10'].includes(screenId)) return <BaselineVisual screenId={screenId} />;
  if (screenId === '08') return <EmotionVisual />;
  if (['11', '12', '13'].includes(screenId)) return <MemoryVisual screenId={screenId} />;
  if (screenId === '14' || screenId === '15') return <PortraitVisual joi={screenId === '15'} />;
  if (['22', '23', '24', '25'].includes(screenId)) return <EmptyChat screenId={screenId} />;
  if (screenId === '27') return <SnowVisual />;
  return null;
}
