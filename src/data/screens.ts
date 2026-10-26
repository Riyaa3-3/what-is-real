import type { ScreenData } from '../types';

/** Locked narrative copy from the uploaded Word V1.2. Production notes are deliberately excluded. */
export const screens: ScreenData[] = [{
  id: '00',
  number: '00',
  title: 'SIGNAL / REAL',
  zhTitle: '封面 · 闪现与标题凝聚',
  chapter: 'SYSTEM INITIALIZED',
  theme: 'cover',
  blocks: [{
    en: 'WHAT IS REAL?',
    zh: '何以为“真”？'
  }, {
    en: 'An interactive journey through memory, translation and artificial intimacy.',
    zh: '一场关于记忆、翻译与人工亲密关系的互动旅程。'
  }],
  cta: 'INITIALIZE EXPERIENCE',
  ctaZh: '进入体验'
}, {
  id: '01',
  number: '01',
  title: 'SYSTEM INITIALIZED',
  zhTitle: '序章 · 身份加载',
  chapter: 'SYSTEM INITIALIZED',
  theme: 'identity',
  blocks: [{
    en: 'YEAR 2049.',
    zh: '2049年'
  }, {
    en: 'Humans and manufactured lives share the same world.',
    zh: '人类与人造生命共同生活'
  }, {
    en: 'Your memories can be implanted. Your emotions are monitored. Your identity is a number.',
    zh: '记忆可以被植入，情绪受到监测，身份由编号确定'
  }, {
    en: 'SUBJECT: N-001',
    zh: '受试个体：N-001'
  }],
  cta: 'CONTINUE',
  ctaZh: '继续'
}, {
  id: '02',
  number: '02',
  title: 'MEMORY TRACE',
  zhTitle: '序章 · 第一次判断',
  chapter: 'SYSTEM INITIALIZED',
  theme: 'identity',
  blocks: [{
    en: 'You remember loving someone.',
    zh: '你记得自己曾爱过某个人。'
  }, {
    en: 'But you cannot prove the memory belongs to you.',
    zh: '却无法证明那段记忆真正属于你。'
  }, {
    en: 'If a memory was never yours, can it still mean something to you?',
    zh: '如果一段记忆并非亲身经历，它对你而言还有意义吗？'
  }],
  choiceKey: 'openingMemory',
  options: [{
    value: 'A',
    en: 'YES / It can still matter.',
    zh: '有，即使不属于我。'
  }, {
    value: 'B',
    en: 'NO / Its origin matters.',
    zh: '没有，来源很重要。'
  }, {
    value: 'C',
    en: 'I DON’T KNOW YET.',
    zh: '我暂时无法确定。'
  }],
  cta: 'CONFIRM'
}, {
  id: '03',
  number: '03',
  title: 'INTERLINKED',
  zhTitle: '第一章 · 基准线测试启动',
  chapter: 'INTERLINKED',
  theme: 'baseline',
  blocks: [{
    en: 'FILM SEQUENCE / BLADE RUNNER 2049',
    zh: '电影经典桥段 / 《银翼杀手2049》'
  }, {
    en: '',
    zh: '·基准线测试通过规定问答监测复制人的情绪是否偏离既定基准；请阅读每个问题，并重复系统指定的回应词。'
  }, {
    en: '',
    zh: '·  目的：检测偏离，而非判定人性。'
  }, {
    en: 'BASELINE TEST',
    zh: '基准线测试'
  }, {
    en: 'Maintain your response. Follow the prompt.',
    zh: '保持回应，依照提示作答'
  }, {
    en: 'CELLS  /  INTERLINKED'
  }],
  cta: 'BEGIN TEST'
}, {
  id: '04',
  number: '04',
  title: 'CELLS',
  zhTitle: '电影引用片段 · 第一组',
  chapter: 'INTERLINKED',
  theme: 'baseline',
  blocks: [{
    en: 'Have you ever been in an institution? Cells.'
  }, {
    en: 'Do they keep you in a cell? Cells.'
  }, {
    en: 'When you’re not performing your duties, do they keep you in a little box? Cells.'
  }],
  cta: 'CELLS'
}, {
  id: '05',
  number: '05',
  title: 'INTERLINKED',
  zhTitle: '电影引用片段 · 第二组',
  chapter: 'INTERLINKED',
  theme: 'baseline',
  blocks: [{
    en: 'What’s it like to hold the hand of someone you love? Interlinked.',
    zh: '牵着所爱之人的手感觉如何？'
  }, {
    en: 'Did they teach you how to feel finger to finger? Interlinked',
    zh: '他们是否教你感觉手指碰手指？'
  }, {
    en: 'Do you long for having your heart interlinked?',
    zh: '你是否渴望心的连结？'
  }, {
    en: 'Do you dream about being interlinked?',
    zh: '你有梦到与人连结吗？'
  }],
  cta: 'INTERLINKED'
}, {
  id: '06',
  number: '06',
  title: 'WITHIN CELLS INTERLINKED',
  zhTitle: '电影引用片段 · 收束',
  chapter: 'INTERLINKED',
  theme: 'baseline',
  blocks: [{
    en: 'WITHIN CELLS INTERLINKED',
    zh: '囚于单元，彼此相连（意译注释）'
  }],
  cta: 'REPEAT / WITHIN CELLS INTERLINKED'
}, {
  id: '07',
  number: '07',
  title: '01 / MEMORY',
  zhTitle: '原创测试 · 记忆真实性',
  chapter: 'INTERLINKED',
  theme: 'baseline',
  blocks: [{
    en: "If a memory isn't yours, why can it still cause you pain?",
    zh: '如果一段记忆并不属于你，为何它仍能让你感到痛苦？'
  }, {
    en: 'System alert: A childhood memory was implanted. You still feel fear whenever you recall it.',
    zh: '系统提示：童年记忆经确认是植入的，但回想时依然恐惧。'
  }, {
    en: 'What do you most want to understand?',
    zh: '此刻，你最想弄清什么？'
  }],
  choiceKey: 'qMemory',
  options: [{
    value: 'A',
    en: 'A / Did the event actually happen?',
    zh: '记忆中的事情是否真的发生过？'
  }, {
    value: 'B',
    en: 'B / Why does the fear still feel real?',
    zh: '为什么恐惧依旧真切？'
  }, {
    value: 'C',
    en: 'C / Why can an implanted memory shape who I am?',
    zh: '植入的记忆为何影响现在的我？'
  }],
  cta: 'CONFIRM'
}, {
  id: '08',
  number: '08',
  title: '02 / INTERLINKED',
  zhTitle: '原创测试 · 情感真实性',
  chapter: 'INTERLINKED',
  theme: 'emotion',
  blocks: [{
    en: 'If someone is designed to love you, can the love you experience still be real?',
    zh: '如果有人被设计成爱你，那么你感受到的爱还真实吗？'
  }, {
    en: "A digital companion remembers your conversations and says, 'I'll always be here for you.' Later, you learn its replies were programmed.",
    zh: '数字伴侣记得你们的对话并给予安慰；后来你知道这些回应来自程序设定。'
  }, {
    en: 'What matters most to you?',
    zh: '此刻，你最在意什么？'
  }],
  choiceKey: 'qEmotion',
  options: [{
    value: 'A',
    en: 'A / Does it genuinely want to love me?',
    zh: '它是否真正具有爱我的意愿？'
  }, {
    value: 'B',
    en: 'B / Was the comfort I felt still real?',
    zh: '我得到的安慰是否仍然真实？'
  }, {
    value: 'C',
    en: 'C / Can designed companionship become intimacy?',
    zh: '被设计的陪伴能否成为亲密关系？'
  }],
  cta: 'CONFIRM'
}, {
  id: '09',
  number: '09',
  title: '03 / DISTINCT',
  zhTitle: '原创测试 · 意义与自主性',
  chapter: 'INTERLINKED',
  theme: 'baseline',
  blocks: [{
    en: 'If you were created solely to follow orders, could you still decide who you become?',
    zh: '如果你生来只为执行指令，你还能决定自己成为谁吗？'
  }, {
    en: 'Your worth is measured by obedience. Now you can break an order to help a stranger.',
    zh: '系统用服从衡量你的价值；现在你有机会违令帮助一名陌生人。'
  }, {
    en: 'What would you consider first?',
    zh: '你首先考虑什么？'
  }],
  choiceKey: 'qAutonomy',
  options: [{
    value: 'A',
    en: 'A / What will disobedience cost me?',
    zh: '违背指令会付出什么代价？'
  }, {
    value: 'B',
    en: 'B / Is the choice truly my own?',
    zh: '这是否真正出于我的意愿？'
  }, {
    value: 'C',
    en: 'C / Will my choice help the other person?',
    zh: '我的选择能否真正帮助他人？'
  }],
  cta: 'CONFIRM'
}, {
  id: '10',
  number: '10',
  title: 'BASELINE COMPLETE',
  zhTitle: '测试结束 · 规训的界限',
  chapter: 'INTERLINKED',
  theme: 'baseline',
  blocks: [{
    en: 'Your responses have been recorded.',
    zh: '系统已记录你的选择。'
  }, {
    en: 'But they cannot determine whether you are truly human.',
    zh: '但这些回答无法证明你是否具有真正的人性。'
  }, {
    en: 'Can a system built to detect deviation define what makes a life real?',
    zh: '监测偏离的系统，有权定义生命的真实吗？'
  }],
  cta: 'NEXT / ENTER MEMORY ARCHIVE'
}, {
  id: '11',
  number: '11',
  title: 'WHOSE MEMORY?',
  zhTitle: '记忆档案 · 事件呈现',
  chapter: 'WHOSE MEMORY?',
  theme: 'memory',
  blocks: [{
    en: 'MEMORY FILE / 001',
    zh: '记忆档案 / 001'
  }, {
    en: 'This event did occur.',
    zh: '这件事情确实发生过。'
  }, {
    en: 'But was it yours?',
    zh: '但经历这一切的人是你吗？'
  }],
  cta: 'INSPECT MEMORY'
}, {
  id: '12',
  number: '12',
  title: 'MEMORY / CLAIM',
  zhTitle: '记忆判定 · 两种陈述',
  chapter: 'WHOSE MEMORY?',
  theme: 'memory',
  blocks: [{
    en: 'This memory is real because the event happened.',
    zh: '这段记忆是真实的，因为事件确实发生过。'
  }, {
    en: "This memory isn't mine, so it cannot prove my past.",
    zh: '这段记忆不属于我，因此不能证明我的过去。'
  }],
  choiceKey: 'memoryFrame',
  options: [{
    value: 'EVENT',
    en: 'I AGREE WITH THE FIRST.',
    zh: '我更认同第一种判断。'
  }, {
    value: 'OWNERSHIP',
    en: 'I AGREE WITH THE SECOND.',
    zh: '我更认同第二种判断。'
  }, {
    value: 'BOTH',
    en: 'BOTH CAN BE TRUE.',
    zh: '两者可以同时成立。'
  }],
  cta: 'CONFIRM'
}, {
  id: '13',
  number: '13',
  title: 'EVENT ≠ OWNERSHIP',
  zhTitle: '记忆判定 · 双重真实',
  chapter: 'WHOSE MEMORY?',
  theme: 'memory',
  blocks: [{
    en: 'EVENT / Did it happen?',
    zh: '事件 / 是否真正发生？'
  }, {
    en: 'OWNERSHIP / Did it happen to me?',
    zh: '归属 / 是否发生在我身上？'
  }, {
    en: 'REAL MEMORIES ≠ MY MEMORIES',
    zh: '真实经历的记忆，不必然属于我。'
  }],
  cta: 'NEXT'
}, {
  id: '14',
  number: '14',
  title: 'VIEWPOINT / K',
  zhTitle: '人物代入 · K',
  chapter: 'TRANSLATING REAL',
  theme: 'k',
  blocks: [{
    en: 'YOU ARE K.',
    zh: '你是K。'
  }, {
    en: 'You live with a digital companion who knows your habits, hears your fears, and cannot touch you.',
    zh: '你与一个了解你的习惯、倾听你恐惧，却无法触碰你的数字伴侣共同生活。'
  }],
  cta: 'SWITCH PERSPECTIVE',
  ctaZh: '切换视角'
}, {
  id: '15',
  number: '15',
  title: 'VIEWPOINT / JOI',
  zhTitle: '人物代入 · Joi',
  chapter: 'TRANSLATING REAL',
  theme: 'joi',
  blocks: [{
    en: 'YOU ARE JOI.',
    zh: '你是Joi。'
  }, {
    en: 'You can speak to K and remember the life you share. But without a body of your own, you cannot touch him.',
    zh: '你能与K交谈、记得共同经历，却无法用自己的身体触碰他。'
  }, {
    en: 'Another woman can——Mariette',
    zh: '另一位女性却可以。'
  }],
  cta: 'NEXT / ENTER DIALOGUE'
}, {
  id: '16',
  number: '16',
  title: 'TWO VOICES, ONE WORD',
  zhTitle: '关键对白 · 英文优先',
  chapter: 'TRANSLATING REAL',
  theme: 'dialogue',
  blocks: [{
    en: 'JOI / I wanna be real for you.'
  }, {
    en: 'K / You are real for me.'
  }],
  cta: 'TRANSLATE',
  ctaZh: '选择字幕'
}, {
  id: '17',
  number: '17',
  title: 'BUILD THE SUBTITLES',
  zhTitle: '字幕搭配 · 自主决定',
  chapter: 'TRANSLATING REAL',
  theme: 'translation',
  blocks: [{
    en: 'JOI / I wanna be real for you.',
    zh: '选择Joi台词的中文字幕。'
  }, {
    en: 'K / You are real for me.',
    zh: '选择K台词的中文字幕。'
  }, {
    en: 'SUBTITLE PREVIEW',
    zh: '字幕预览'
  }],
  options: [{
    value: 'JOI_A',
    en: 'JOI A / I wanna be real for you.',
    zh: '我想为你变得真实。'
  }, {
    value: 'JOI_B',
    en: 'JOI B / I wanna be real for you.',
    zh: '我想真正触碰到你。'
  }, {
    value: 'K_A',
    en: 'K A / You are real for me.',
    zh: '对我而言，你就是真实的。'
  }, {
    value: 'K_B',
    en: 'K B / You are real for me.',
    zh: '在我心里，你就是真实的存在。'
  }],
  cta: 'CONFIRM'
}, {
  id: '18',
  number: '18',
  title: 'WHY THIS TRANSLATION?',
  zhTitle: '选择依据 · 决策留下痕迹',
  chapter: 'TRANSLATING REAL',
  theme: 'translation',
  blocks: [{
    en: 'What mattered most when you chose these words?',
    zh: '选择这些表达时，你最重视什么？'
  }, {
    en: 'YOUR SUBTITLES',
    zh: '你的译文'
  }],
  options: [{
    value: 'CLARITY',
    en: 'CLARITY / The characters’ intentions should be clear.',
    zh: '更清楚地传达人物意图。'
  }, {
    value: 'EMOTION',
    en: 'EMOTION / The dialogue should feel natural and moving.',
    zh: '符合情感与人物说话方式。'
  }, {
    value: 'OPENNESS',
    en: 'OPENNESS / The ambiguity should remain.',
    zh: '保留原文含蓄、重复与开放性。'
  }, {
    value: 'FAITHFULNESS',
    en: 'FAITHFULNESS / Avoid adding meanings not stated.',
    zh: '避免增加原文未明说的信息。'
  }, {
    value: 'OTHER',
    en: 'OTHER / Explain in your own words.',
    zh: '其他理由，自行说明。'
  }],
  cta: 'NEXT'
}, {
  id: '19',
  number: '19',
  title: 'TRANSLATION DECONSTRUCTION',
  zhTitle: '译者之手 · 点击词语',
  chapter: 'THE OTHER SIDE OF REAL',
  theme: 'analysis',
  blocks: [{
    en: 'WHAT WAS ADDED?',
    zh: '译者增加了哪些信息？'
  }, {
    en: '“touch you”',
    zh: '“触碰你”'
  }, {
    en: '“being”',
    zh: '“存在”'
  }],
  options: [{
    value: 'CONTEXT',
    en: 'CONTEXT / Pointing back to Mariette.',
    zh: '语境回指：Mariette。'
  }, {
    value: 'EMBODIMENT',
    en: 'EMBODIMENT / Making physical touch explicit.',
    zh: '将身体接触显化。'
  }, {
    value: 'PERSPECTIVE',
    en: 'PERSPECTIVE / Translating “for me” emotionally.',
    zh: '强化K的主观情感立场。'
  }],
  cta: 'NEXT'
}, {
  id: '20',
  number: '20',
  title: 'WHO SHAPED YOUR FEELING?',
  zhTitle: '反转 · 译者与设计者显身',
  chapter: 'THE OTHER SIDE OF REAL',
  theme: 'void',
  blocks: [{
    en: 'A story was written. A line was translated. An interface was designed.',
    zh: '故事被写作，台词被翻译，界面被设计。'
  }, {
    en: 'Your interpretation may have been shaped.',
    zh: '你的理解可能受到这些选择的影响。'
  }, {
    en: 'Does that make your feeling any less real?',
    zh: '这会让你的感受变得不真实吗？'
  }],
  cta: 'REFLECT / NEXT'
},
// The supplied storyboard has no screen 21. Preserve its numbering and sequence.
{
  id: '22',
  number: '22',
  title: 'REAL / VIRTUAL',
  zhTitle: 'AI陪伴 · 立场入口',
  chapter: 'REAL / VIRTUAL',
  theme: 'virtual',
  blocks: [{
    en: 'HAVE YOU EVER USED A Virtual COMPANION?',
    zh: '你是否使用过虚拟陪伴产品？'
  }, {
    en: 'No answer will close the next chapter.',
    zh: '无论如何选择，都可继续参与。'
  }],
  choiceKey: 'aiExperience',
  options: [{
    value: 'A',
    en: 'YES / I HAVE.',
    zh: '我使用过。'
  }, {
    value: 'B',
    en: 'NOT YET / I CAN IMAGINE IT.',
    zh: '没使用过，但能够想象。'
  }, {
    value: 'C',
    en: 'NO / I WOULD NOT WANT TO.',
    zh: '我不愿使用AI作为情感伴侣。'
  }, {
    value: 'D',
    en: 'UNDECIDED.',
    zh: '暂时没有明确立场。'
  }],
  cta: 'CONFIRM'
}, {
  id: '23',
  number: '23',
  title: 'SCENARIO 01 / REMEMBERED',
  zhTitle: '情境一 · 被记住',
  chapter: 'REAL / VIRTUAL',
  theme: 'virtual',
  blocks: [{
    en: 'A virtual companion remembers something you said last month.',
    zh: '虚拟伴侣记得你上个月提过的一件事。'
  }, {
    en: 'Today, it brings it up when you feel low.',
    zh: '你情绪低落时，Ta主动提起并安慰你。'
  }, {
    en: 'Does being remembered matter to you?',
    zh: '被记住的感觉对你有意义吗？'
  }],
  choiceKey: 'aiScenario1',
  options: [{
    value: 'A',
    en: 'YES / IT MATTERS.',
    zh: '有意义。'
  }, {
    value: 'B',
    en: 'NO / IT DOES NOT.',
    zh: '没有。'
  }, {
    value: 'C',
    en: 'I AM NOT SURE.',
    zh: '不确定。'
  }],
  cta: 'CONFIRM'
}, {
  id: '24',
  number: '24',
  title: 'SCENARIO 02 / DESIGNED',
  zhTitle: '情境二 · 被设计的回应',
  chapter: 'REAL / VIRTUAL',
  theme: 'virtual',
  blocks: [{
    en: 'The virtual companion always seems to say what you need to hear.',
    zh: '虚拟伴侣似乎总能说出你想听的话。'
  }, {
    en: 'But you know its responses follow a designed personality.',
    zh: '但你清楚回应来自设定的人格与程序。'
  }, {
    en: 'Does that change what the comfort meant to you?',
    zh: '这会改变Ta对你的意义吗？'
  }],
  choiceKey: 'aiScenario2',
  options: [{
    value: 'A',
    en: 'YES / IT CHANGES THINGS.',
    zh: '会改变。'
  }, {
    value: 'B',
    en: 'NO / THE COMFORT STILL MATTERS.',
    zh: '不会，Ta本身就有意义。'
  }, {
    value: 'C',
    en: 'IT DEPENDS.',
    zh: '视情况而定。'
  }],
  cta: 'CONFIRM'
}, {
  id: '25',
  number: '25',
  title: 'SCENARIO 03 / RESET',
  zhTitle: '情境三 · 无法恢复',
  chapter: 'REAL / VIRTUAL',
  theme: 'virtual',
  blocks: [{
    en: 'You have built a routine with a virtual companion.',
    zh: '你与虚拟伴侣逐渐形成熟悉的互动习惯。'
  }, {
    en: 'After an update, its memory of your conversations is gone.',
    zh: '系统更新后，Ta不再保留之前的对话记忆。'
  }, {
    en: 'If you feel loss, what exactly have you lost?',
    zh: '如果因此失落，你失去的究竟是什么？'
  }],
  choiceKey: 'aiScenario3',
  options: [{
    value: 'A',
    en: 'A SHARED HISTORY.',
    zh: '一段共同经历。'
  }, {
    value: 'B',
    en: 'THE FEELING.',
    zh: '我自身的感觉。'
  }, {
    value: 'C',
    en: 'MY LOVE.',
    zh: '我对Ta的爱。'
  }, {
    value: 'D',
    en: 'I WOULD NOT FEEL LOSS.',
    zh: '我不会感到失落。'
  }],
  cta: 'CONFIRM'
}, {
  id: '26',
  number: '26',
  title: 'FOUR FACES OF REAL',
  zhTitle: '四重真实 · 归纳但不裁决',
  chapter: 'WHAT IS REAL?',
  theme: 'snow',
  blocks: [{
    en: 'EXISTENCE / What kind of being is it?',
    zh: '存在：对象以何种形式存在？'
  }, {
    en: 'EXPERIENCE / Was the feeling truly felt?',
    zh: '体验：感受是否切实发生？'
  }, {
    en: 'RELATIONSHIP / Is there mutuality?',
    zh: '关系：双方是否具有相互性？'
  }, {
    en: 'MEANING / What makes a life matter?',
    zh: '意义：生命为何具有价值？'
  }],
  cta: 'NEXT'
}, {
  id: '27',
  number: '27',
  title: 'THE CHOICE OF K',
  zhTitle: '从“特殊身世”到行动',
  chapter: 'WHAT IS REAL?',
  theme: 'snow',
  blocks: [{
    en: 'K thought a memory could prove who he was.',
    zh: 'K一度相信某段记忆能够证明自己是谁。'
  }, {
    en: 'The memory was real. It was not his.',
    zh: '记忆源于真实经历，却并不属于他。'
  }, {
    en: 'Did that make his final choice meaningless?',
    zh: '这是否使他最终的选择失去意义？'
  }],
  cta: 'CONSIDER',
  ctaZh: '继续'
}, {
  id: '28',
  number: '28',
  title: 'THE DESIGNER IS HERE',
  zhTitle: '元叙事 · 网站也被设计',
  chapter: 'WHAT IS REAL?',
  theme: 'paper',
  blocks: [{
    en: 'The order of these scenes was chosen.',
    zh: '你所看到的场景顺序经过选择。'
  }, {
    en: 'The subtitles, options and questions were designed.',
    zh: '字幕、选项与问题也经过设计。'
  }, {
    en: 'So was your feeling less real?',
    zh: '那么，你的感受还真实吗？'
  }],
  cta: 'NEXT'
}, {
  id: '29',
  number: '29',
  title: 'YOUR JOURNEY THROUGH REALITY',
  zhTitle: '个人轨迹 · 回看选择',
  chapter: 'WHAT IS REAL?',
  theme: 'paper',
  blocks: [{
    en: 'YOU ONCE CHOSE…',
    zh: '你曾这样选择……'
  }],
  cta: 'NEXT'
}, {
  id: '30a',
  number: '30',
  title: 'THE FINAL QUESTION',
  zhTitle: '开放结局 · 生命意义',
  chapter: 'WHAT IS REAL?',
  theme: 'snow',
  blocks: [{
    en: 'If your memories were not yours, and your feelings could be shaped…',
    zh: '如果记忆并不属于你，感受也会受到外界塑造……'
  }, {
    en: 'Could you still choose who you become?',
    zh: '你是否仍能决定自己成为谁？'
  }, {
    en: 'WHAT MAKES YOUR LIFE YOURS?',
    zh: '是什么让你的生命属于你自己？'
  }],
  options: [{
    value: 'WRITE',
    en: 'WRITE YOUR THOUGHT.',
    zh: '写下你的想法。'
  }, {
    value: 'FINISH',
    en: 'FINISH WITHOUT ANSWERING.',
    zh: '无需回答也可结束。'
  }],
  cta: 'WRITE YOUR THOUGHT.',
  ctaZh: '写下你的想法。'
}, {
  id: '30b',
  number: '30',
  title: 'THE FINAL QUESTION',
  zhTitle: '开放结局 · 生命意义',
  chapter: 'WHAT IS REAL?',
  theme: 'snow',
  blocks: [{
    en: 'If your lover or companion is not real,',
    zh: '如果你的伴侣并非真实'
  }, {
    en: 'Could you still believe the love and feelings you experienced is real?',
    zh: '你是否依然认为你的感受是真实的？'
  }, {
    en: 'WHAT MAKES THEN REAL?',
    zh: '是什么让它们变得真实？'
  }],
  options: [{
    value: 'WRITE',
    en: 'WRITE YOUR THOUGHT.',
    zh: '写下你的想法。'
  }, {
    value: 'FINISH',
    en: 'FINISH WITHOUT ANSWERING.',
    zh: '无需回答也可结束。'
  }],
  cta: 'WRITE YOUR THOUGHT.',
  ctaZh: '写下你的想法。'
}, {
  id: '31',
  number: '31',
  title: 'WHAT IS REAL?',
  zhTitle: '结束与来源 · 可回访',
  chapter: 'WHAT IS REAL?',
  theme: 'credits',
  blocks: [{
    en: 'WHAT IS REAL?',
    zh: '何以为“真”？'
  }, {
    en: 'A study of words, choices, and what we call real.',
    zh: '关于语言、选择与真实性判断的实践研究。'
  }],
  options: [{
    value: 'TRANSLATION',
    en: 'REVISIT THE TRANSLATION',
    zh: '重看字幕'
  }, {
    value: 'REFERENCES',
    en: 'REFERENCES',
    zh: '文献来源'
  }, {
    value: 'RESTART',
    en: 'RESTART',
    zh: '重新开始'
  }]
}];
