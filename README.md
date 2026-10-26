# WHAT IS REAL? / 何以为“真”？

根据用户上传的《何以为真_网站逐屏视觉与交互脚本_V1.2双端定稿.docx》开发的沉浸式互动叙事网站。React 19、TypeScript 5.9、Vite 7；桌面与手机共享全部内容和选择状态，采用分别适配的布局。

文档中的32张屏幕卡均按原顺序保留：00–20、22–29、30a、30b、31。源稿没有第21屏；用户已确认两版第30屏依次保留，文案原样呈现。

## 本地运行

需要 Node.js 22.12 或更高版本及 npm。

```bash
npm ci
npm run dev
```

打开终端显示的地址。生成和预览发布版本：

```bash
npm run build
npm run preview
```

构建产物在 `dist/`。Vite 使用相对资源路径 `base: './'`，可部署到 GitHub Pages 仓库子路径或其他静态托管目录。

## 使用与验证

首次体验按顺序推进；章节菜单中的研究展示模式可快速跳转，保留已有选择。封面与基准线打字机可跳过，减少动态效果遵循系统设置，并可手动切换；声音默认关闭。

```bash
npm test
npm run build
```

自动测试覆盖状态恢复、基准线3+4+1计数与回访上限、四种字幕组合、自定义输入、独立结局输入及完整屏幕顺序。CI 对提交和 PR 执行上述测试与构建，并保留30天可下载的 `what-is-real-build` 静态产物。浏览器验收应另行检查1440×900、390×844、键盘操作、200%文字缩放、减少动态效果、字幕编辑至最终回顾的数据传递；单元测试不能替代这些检查。具体实测结果以本次交付报告为准。

目标浏览器为较新版本 Chrome、Edge、Firefox 与 Safari（建议 Safari 17.4+）；手机建议较新版本 iOS Safari 或 Android Chrome。代码使用原生 dialog、动态视口单位、CSS color-mix、Web Audio、Canvas 和 Clipboard API。复制在浏览器禁止剪贴板时提供可手动选择的文本；导出在本机生成。目标浏览器范围不代表已经完成全部浏览器的实际测试。

## 源码结构

| 路径 | 职责 |
| --- | --- |
| `src/App.tsx` | 页面切换、章节导航、体验模式、通用叙事和基准线测试 |
| `src/data/screens.ts` | 从Word提取的屏幕顺序、锁定文案、选项与状态键 |
| `src/data/subtitles.ts` | Joi / K 独立字幕、四种组合、自定义译文与理由 |
| `src/state.ts`、`src/types.ts` | 会话状态、恢复校验、基准线计数与类型 |
| `src/components/SubtitleExperience.tsx` | 字幕工作台、选择理由与词语解构抽屉 |
| `src/components/EndingScreens.tsx` | 四重真实、真实选择回顾、两版开放问题、复制与本地图片导出 |
| `src/components/Effects.tsx` | 章节视觉、扫描、投影、档案等独立效果 |
| `src/components/UI.tsx`、`src/style.css` | 复用界面、主题变量、响应式布局与无障碍状态 |
| `public/assets/` | 上传Word内嵌参考图的局部裁切与优化素材 |
| `tests/state.test.ts` | 状态与内容不变量测试 |

完整内容清单见 [需求矩阵](docs/REQUIREMENTS.md)，视觉依据见 [设计系统](docs/DESIGN-SYSTEM.md)，素材来源见 [素材清单](docs/ASSETS.md)。

## 会话与隐私

用户选择、理由、自定义字幕和两次开放回答存于当前标签页的 `sessionStorage`；不需要账号，不上传服务端，不加入分析追踪。刷新同一标签页可恢复；重新开始清空体验记录。序章最初判断与回顾时重新判断分别保留。没有原12人调查模块、统计数据、受访者观点、人性评分或心理结论。

英文字体通过本地构建资源提供，中文使用系统字体回退。没有图片API、第三方图片服务或外部字体请求。Web Audio仅在用户开启声音后运行；关闭声音不影响理解。

## 部署

`.github/workflows/ci.yml` 在 push 和 pull request 上安装依赖、测试并构建。`.github/workflows/deploy-pages.yml` 只由 `workflow_dispatch` 手动启动，构建后通过官方 GitHub Pages Actions 发布 `dist/`。

仓库管理员需先在 GitHub Settings → Pages 将构建来源设置为 GitHub Actions，再在 Actions 中运行 **Deploy GitHub Pages**。本项目没有自动修改远端 Pages 设置。工作流定义本身不表示已部署，部署结果与GitHub提交状态以最终交付报告为准。
