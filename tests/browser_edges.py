"""Browser edge checks. Requires Python Playwright and /usr/bin/chromium.
Run: python tests/browser_edges.py [http://127.0.0.1:5173]
Artifacts are saved under the repository work/qa directory.
"""
import json,time,sys
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:5173'
ART=Path(__file__).resolve().parents[1]/'work/qa';ART.mkdir(parents=True,exist_ok=True)
result={'console_errors':[],'page_errors':[]}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 c=b.new_context(viewport={'width':1440,'height':900},reduced_motion='no-preference')
 page=c.new_page();page.on('pageerror',lambda e:result['page_errors'].append(str(e)));page.on('console',lambda m: result['console_errors'].append(m.text) if m.type=='error' else None)
 page.goto(BASE)
 seq=[];maximum=0;title_at=None;t=time.monotonic()
 while time.monotonic()-t<3.7:
  n=page.locator('.signal-word').count();maximum=max(n,maximum)
  if n:
   word=page.locator('.signal-word').inner_text()
   if not seq or seq[-1]!=word:seq.append(word)
  if page.locator('.cover-copy h1').count() and title_at is None:title_at=time.monotonic()-t
  page.wait_for_timeout(35)
 assert seq==['Real?','Virtual?','Feeling?','Love?'],seq
 assert maximum==1,maximum
 result['intro']={'observed_order':seq,'max_concurrent_words':maximum,'title_first_seen_seconds_after_goto':round(title_at,2)}
 page.goto(BASE+'/#04');page.wait_for_timeout(150)
 partial=page.locator('.baseline-question').inner_text()
 full=page.locator('.baseline-question').get_attribute('aria-label')
 assert len(partial)<len(full),[partial,full]
 page.get_by_role('button',name='SKIP TYPING ↗',exact=True).click()
 assert full in page.locator('.baseline-question').inner_text()
 result['typewriter_skip']=True
 page.goto(BASE+'/#02');page.locator('.option').nth(1).focus();page.keyboard.press('Space')
 expect(page.locator('.option').nth(1)).to_have_attribute('aria-pressed','true')
 outline=page.locator('.option').nth(1).evaluate('(e)=>({style:getComputedStyle(e).outlineStyle,width:getComputedStyle(e).outlineWidth})')
 assert outline['style']!='none' and outline['width']!='0px',outline
 result['keyboard_option_focus_and_space']=outline
 page.get_by_role('button',name='Open chapters and display mode',exact=True).click()
 expect(page.locator('.chapter-dialog[open]')).to_be_visible();page.keyboard.press('Escape');expect(page.locator('.chapter-dialog[open]')).to_have_count(0)
 page.get_by_role('button',name='Open chapters and display mode',exact=True).click();page.get_by_role('button',name='STUDY MODE',exact=True).click();page.locator('.chapter-list button').filter(has_text='YOUR JOURNEY THROUGH REALITY').click()
 expect(page.locator('.screen-29')).to_be_visible()
 state=page.evaluate("JSON.parse(sessionStorage.getItem('what-is-real.v1.2'))")
 assert state['openingMemory']=='B' and state.get('qMemory') is None and state.get('subtitleJoi') is None
 assert '我想为你变得真实。' not in page.locator('main').inner_text()
 result['research_unanswered_no_fabrication']=True
 page.goto(BASE+'/#17');page.locator('.subtitle-row-joi .subtitle-choice').nth(0).click();page.locator('.subtitle-row-k .subtitle-choice').nth(1).click();page.locator('main button.action').click();expect(page.locator('.screen-18')).to_be_visible();page.go_back();expect(page.locator('.screen-17')).to_be_visible()
 expect(page.locator('.subtitle-row-joi .subtitle-choice').nth(0)).to_have_attribute('aria-pressed','true');expect(page.locator('.subtitle-row-k .subtitle-choice').nth(1)).to_have_attribute('aria-pressed','true')
 result['browser_back_preserves_subtitles']=True
 page.locator('.sound-toggle').click();expect(page.locator('.sound-toggle')).to_have_attribute('aria-pressed','true');page.locator('.sound-toggle').click();expect(page.locator('.sound-toggle')).to_have_attribute('aria-pressed','false')
 page.locator('.motion-toggle').click();expect(page.locator('.experience')).to_have_class(__import__('re').compile('.*reduced-motion.*'))
 result['sound_and_manual_motion_controls']=True
 page.goto(BASE+'/#31');page.get_by_role('button',name=__import__('re').compile('RESTART')).click();expect(page.locator('.screen-00')).to_be_visible()
 state=page.evaluate("JSON.parse(sessionStorage.getItem('what-is-real.v1.2'))")
 assert state.get('openingMemory') is None and state.get('subtitleJoi') is None and state['baselineOriginal']=={'cells':0,'interlinked':0,'within':0}
 result['restart_clears_session_choices']=True
 c.close()
 c=b.new_context(viewport={'width':390,'height':844},reduced_motion='reduce');page=c.new_page();page.goto(BASE+'/#17')
 page.locator('.subtitle-row-joi .subtitle-choice').nth(1).click();page.locator('.subtitle-row-k .subtitle-choice').nth(1).click();page.locator('main button.action').click();page.locator('.reason-options .option').nth(0).click();page.locator('main button.action').click();expect(page.locator('.screen-19')).to_be_visible()
 page.locator('.annotation-index button').nth(0).click();expect(page.locator('.translation-note-dialog[open]')).to_be_visible()
 focus_cycle=[]
 for _ in range(4):
  page.keyboard.press('Tab')
  focus=page.locator('.translation-note-dialog').evaluate('(dialog)=>({inside:dialog.contains(document.activeElement),tag:document.activeElement.tagName,cls:document.activeElement.className})')
  focus_cycle.append(focus)
  assert focus['inside'] or focus['tag']=='BODY',focus
 page.keyboard.press('Escape');expect(page.locator('.translation-note-dialog[open]')).to_have_count(0)
 assert page.locator('.annotation-index button').nth(0).evaluate('(e)=>e===document.activeElement')
 result['mobile_drawer_native_focus_containment_escape_return']=focus_cycle
 page.goto(BASE+'/#17')
 result['mobile_small_controls']=page.evaluate('''()=>[...document.querySelectorAll('button,input,textarea')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.width<44||r.height<44)}).map(e=>({text:e.textContent,cls:e.className,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))''')
 page.set_viewport_size({'width':844,'height':390});page.goto(BASE+'/#17');assert page.evaluate('document.documentElement.scrollWidth')==844
 result['landscape_844x390_no_horizontal_page_overflow']=True
 page.set_viewport_size({'width':720,'height':450})
 reflow={}
 ids=[f'{i:02d}' for i in range(21)]+[str(i) for i in range(22,30)]+['30a','30b','31']
 for sid in ids:
  page.goto(BASE+'/#'+sid)
  reflow[sid]=page.evaluate('({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth})')
 assert all(v['viewport']==v['scrollWidth'] for v in reflow.values()),reflow
 result['desktop_200percent_equivalent_reflow_720x450']=reflow
 b.close()
(ART/'edge-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print(json.dumps(result,ensure_ascii=False,indent=2))
