"""Runtime QA against the Vite server. Chromium is preinstalled; no browser download.
Requires Python Playwright and /usr/bin/chromium.
Run from any directory: python tests/browser_audit.py http://127.0.0.1:5173 [mobile|desktop]
"""
import json, re, sys
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:5173'
ART=Path(__file__).resolve().parents[1]/'work/qa'; ART.mkdir(parents=True,exist_ok=True)
IDS=[f'{i:02d}' for i in range(21)]+[str(i) for i in range(22,30)]+['30a','30b','31']
results={'base':BASE,'viewports':{},'runtime_errors':[]}

def route(page, sid):
    page.evaluate('(id)=>{location.hash=id}',sid)
    expect(page.locator(f'.screen-{sid}')).to_be_visible()
    page.wait_for_timeout(90)

def saved(page):
    return page.evaluate("JSON.parse(sessionStorage.getItem('what-is-real.v1.2'))")

def main_action(page, label=None):
    q=page.locator('main button.action')
    if label: q=q.filter(has_text=label)
    q.last.click()

def snapshot(page,name):
    page.wait_for_timeout(250)
    page.screenshot(path=str(ART/f'{name}.png'),full_page=True)

def scan_layout(page):
    return page.evaluate('''() => ({
      width:innerWidth, scrollWidth:document.documentElement.scrollWidth,
      overflow:[...document.querySelectorAll('main *')].filter(e=>{
        const s=getComputedStyle(e),r=e.getBoundingClientRect();
        return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0&&(r.right>innerWidth+2||r.left < -2)
      }).slice(0,15).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,60)})),
      smallChinese:[...document.querySelectorAll('main [lang="zh-CN"]')].filter(e=>e.getBoundingClientRect().height>0&&parseFloat(getComputedStyle(e).fontSize)<12).map(e=>({text:e.textContent,size:getComputedStyle(e).fontSize})),
      h1:document.querySelector('main h1')?.textContent
    })''')

def full_journey(page, vp):
    page.goto(BASE)
    page.wait_for_selector('.cover-copy h1')
    snapshot(page,f'{vp}-cover')
    main_action(page,'INITIALIZE EXPERIENCE')
    expect(page.locator('.screen-01')).to_be_visible()
    main_action(page,'CONTINUE')
    page.locator('.option').nth(0).click();main_action(page,'CONFIRM')
    expect(page.locator('.screen-03')).to_be_visible()
    main_action(page,'BEGIN TEST')
    for _ in range(3): main_action(page,'CELLS')
    expect(page.locator('.screen-05')).to_be_visible()
    for _ in range(4): main_action(page,'INTERLINKED')
    expect(page.locator('.screen-06')).to_be_visible()
    expect(page.locator('main button.action')).to_be_enabled(timeout=2500)
    main_action(page,'REPEAT')
    expect(page.locator('.screen-07')).to_be_visible()
    for sid,idx in [('07',1),('08',2),('09',1)]:
        page.locator('.option').nth(idx).click();main_action(page,'CONFIRM')
        page.wait_for_timeout(330)
    expect(page.locator('.screen-10')).to_be_visible();main_action(page)
    expect(page.locator('.screen-11')).to_be_visible();snapshot(page,f'{vp}-memory');main_action(page)
    page.locator('.option').nth(2).click();main_action(page,'CONFIRM');page.wait_for_timeout(330)
    expect(page.locator('.screen-13')).to_be_visible()
    page.get_by_role('button',name=re.compile('TRANSLATION NOTE')).click()
    expect(page.locator('dialog[open]')).to_be_visible()
    page.keyboard.press('Escape');main_action(page)
    expect(page.locator('.screen-14')).to_be_visible();main_action(page)
    expect(page.locator('.screen-15')).to_be_visible();snapshot(page,f'{vp}-joi');main_action(page)
    expect(page.locator('.screen-16')).to_be_visible()
    assert '我想为你变得真实。' not in page.locator('main').inner_text()
    main_action(page,'TRANSLATE')
    expect(page.locator('.screen-17')).to_be_visible()
    expect(page.locator('main button.action')).to_be_disabled()
    page.locator('.subtitle-row-joi .subtitle-choice').nth(1).click()
    expect(page.locator('main button.action')).to_be_disabled()
    page.locator('.subtitle-row-k .subtitle-choice').nth(0).click()
    expect(page.locator('.preview-caption-joi .caption-zh')).to_have_text('我想真正触碰到你。')
    expect(page.locator('.preview-caption-k .caption-zh')).to_have_text('对我而言，你就是真实的。')
    snapshot(page,f'{vp}-subtitles');main_action(page,'CONFIRM')
    expect(page.locator('.screen-18')).to_be_visible()
    page.locator('.option').nth(1).click();page.locator('.option').nth(2).click()
    page.locator('#translation-reason').fill('I chose this wording for its openness. 我保留这份开放性。')
    main_action(page,'CONFIRM')
    expect(page.locator('.screen-19')).to_be_visible()
    page.get_by_role('button',name=re.compile('01CONTEXT|01 CONTEXT|CONTEXT')).last.click()
    expect(page.locator('.translation-note-dialog[open]')).to_be_visible()
    snapshot(page,f'{vp}-annotation')
    page.get_by_role('button',name='Close translation note',exact=True).click()
    main_action(page,'NEXT')
    expect(page.locator('.screen-20')).to_be_visible();main_action(page)
    expect(page.locator('.screen-22')).to_be_visible()
    page.locator('.option').nth(2).click();main_action(page,'CONFIRM');page.wait_for_timeout(330)
    expect(page.locator('.screen-23')).to_be_visible()
    page.locator('.option').nth(0).click();main_action(page,'CONFIRM');page.wait_for_timeout(330)
    expect(page.locator('.screen-24')).to_be_visible()
    assert page.locator('.option').count()==0
    page.get_by_role('button',name=re.compile('REVEAL DESIGN')).click()
    page.locator('.option').nth(1).click();main_action(page,'CONFIRM');page.wait_for_timeout(330)
    expect(page.locator('.screen-25')).to_be_visible()
    page.locator('.option').nth(3).click();main_action(page,'CONFIRM');page.wait_for_timeout(330)
    expect(page.locator('.screen-26')).to_be_visible();snapshot(page,f'{vp}-four-faces');main_action(page,'NEXT')
    expect(page.locator('.screen-27')).to_be_visible();main_action(page,'CONSIDER')
    expect(page.locator('.screen-28')).to_be_visible();main_action(page,'NEXT')
    expect(page.locator('.screen-29')).to_be_visible()
    txt=page.locator('main').inner_text()
    for required in ['我想真正触碰到你。','对我而言，你就是真实的。','I chose this wording for its openness.']:
        assert required in txt, required
    snapshot(page,f'{vp}-review')
    data=saved(page)
    assert data['baselineOriginal']=={'cells':3,'interlinked':4,'within':1},data
    assert data['openingMemory']=='A' and data['qMemory']=='B' and data['qEmotion']=='C' and data['qAutonomy']=='B'
    assert data['memoryFrame']=='BOTH'
    assert data['subtitleJoi']=='B' and data['subtitleK']=='A' and data['subtitlesConfirmed']
    assert data['aiExperience']=='C' and data['aiScenario1']=='A' and data['aiScenario2']=='B' and data['aiScenario3']=='D'
    page.get_by_role('button',name=re.compile('RECONSIDER')).click()
    page.locator('.reconsider-options .option').nth(1).click()
    assert saved(page)['openingMemory']=='A'
    assert saved(page)['openingMemoryReconsidered']=='B'
    page.get_by_role('button',name='COPY TEXT',exact=True).click()
    page.wait_for_timeout(100)
    if page.locator('.copy-dialog[open]').count():
        assert '我想真正触碰到你。' in page.locator('.copy-dialog textarea').input_value()
        page.keyboard.press('Escape')
    else:
        assert 'COPIED' in page.locator('.export-status').inner_text()
    with page.expect_download() as download_info:
        page.get_by_role('button',name='DOWNLOAD REVIEW CARD',exact=True).click()
    download=download_info.value
    download.save_as(ART/f'{vp}-review-export.png')
    assert (ART/f'{vp}-review-export.png').stat().st_size>1000
    main_action(page,'NEXT')
    expect(page.locator('.screen-30a')).to_be_visible()
    page.get_by_role('button',name=re.compile('WRITE YOUR THOUGHT')).click()
    page.locator('#thought-30a').fill('I can choose my actions. 我能够选择自己的行动。')
    main_action(page,'NEXT')
    expect(page.locator('.screen-30b')).to_be_visible()
    expect(page.get_by_role('heading',name='WHAT MAKES THEN REAL?',exact=True)).to_be_visible()
    page.get_by_role('button',name=re.compile('FINISH WITHOUT ANSWERING')).click()
    expect(page.locator('.screen-31')).to_be_visible()
    assert saved(page)['finalThought']=='I can choose my actions. 我能够选择自己的行动。'
    assert saved(page)['finalThought2']==''
    page.get_by_role('button',name=re.compile('REFERENCES')).click()
    expect(page.locator('.references-dialog[open]')).to_be_visible()
    assert page.locator('.references-dialog a').count()==4
    page.keyboard.press('Escape')
    page.get_by_role('button',name=re.compile('REVISIT THE TRANSLATION')).click()
    expect(page.locator('.screen-17')).to_be_visible()
    page.locator('.subtitle-row-joi .custom-choice').click()
    page.locator('#custom-Joi').fill('我为你存在。')
    assert saved(page)['subtitleK']=='A'
    expect(page.locator('.preview-caption-joi .caption-zh')).to_have_text('我为你存在。')
    assert saved(page)['subtitlesConfirmed']==False
    page.locator('.subtitle-row-k .custom-choice').click()
    page.locator('#custom-K').fill('   ')
    expect(page.locator('main button.action')).to_be_disabled()
    page.locator('#custom-K').fill('你对我很真实。')
    expect(page.locator('main button.action')).to_be_enabled()
    for ji,jtext in enumerate(['我想为你变得真实。','我想真正触碰到你。']):
        for ki,ktext in enumerate(['对我而言，你就是真实的。','在我心里，你就是真实的存在。']):
            page.locator('.subtitle-row-joi .subtitle-choice').nth(ji).click()
            page.locator('.subtitle-row-k .subtitle-choice').nth(ki).click()
            expect(page.locator('.preview-caption-joi .caption-zh')).to_have_text(jtext)
            expect(page.locator('.preview-caption-k .caption-zh')).to_have_text(ktext)
    page.locator('.subtitle-row-joi .custom-choice').click()
    page.locator('.subtitle-row-k .custom-choice').click()
    main_action(page,'CONFIRM')
    expect(page.locator('.screen-18')).to_be_visible()
    page.reload()
    expect(page.locator('.selected-subtitle-zh').nth(0)).to_have_text('我为你存在。')
    expect(page.locator('.selected-subtitle-zh').nth(1)).to_have_text('你对我很真实。')
    page.get_by_role('button',name='Open chapters and display mode',exact=True).click()
    page.get_by_role('button',name='STUDY MODE',exact=True).click()
    page.locator('.chapter-list button').filter(has_text='YOUR JOURNEY THROUGH REALITY').click()
    expect(page.locator('.screen-29')).to_be_visible()
    assert '我为你存在。' in page.locator('main').inner_text()
    assert saved(page)['openingMemory']=='A'
    return data

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    for vp,size in [('desktop',{'width':1440,'height':900}),('mobile',{'width':390,'height':844})]:
        if len(sys.argv)>2 and sys.argv[2]!=vp:continue
        ctx=browser.new_context(viewport=size,reduced_motion='reduce',accept_downloads=True)
        page=ctx.new_page()
        page.on('pageerror',lambda e:results['runtime_errors'].append(str(e)))
        data=full_journey(page,vp)
        layouts={}
        for sid in IDS:
            route(page,sid)
            if sid=='00':page.wait_for_timeout(3400)
            layouts[sid]=scan_layout(page)
        results['viewports'][vp]={'state':data,'layouts':layouts}
        ctx.close()
    browser.close()
(ART/('results-'+sys.argv[2]+'.json' if len(sys.argv)>2 else 'results.json')).write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps({'viewports':list(results['viewports']),'runtime_errors':results['runtime_errors'],'page_width_mismatches':[(vp,sid,x['width'],x['scrollWidth']) for vp,v in results['viewports'].items() for sid,x in v['layouts'].items() if x['width']!=x['scrollWidth']],'small_chinese':[(vp,sid,x['smallChinese']) for vp,v in results['viewports'].items() for sid,x in v['layouts'].items() if x['smallChinese']]},ensure_ascii=False,indent=2))
