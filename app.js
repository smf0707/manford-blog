/* Nebula 手记 · 交互与数据。与 index.html、styles.css 配套。文章见 POSTS，作品见 PROJECTS。 */


/* ============================================================
   数据层：文章（含 Markdown 正文）、特性、评价、FAQ
   ============================================================ */
const POSTS = [
  {
    id:'post-1',
    title:'用 Glassmorphism 重塑阅读体验',
    tags:['设计','前端'],
    date:'2026-07-12',
    excerpt:'半透明、毛玻璃、悬浮层，这些视觉语言不只是好看。它们如何真正改善长文阅读的专注度？',
    md:`# 用 Glassmorphism 重塑阅读体验

毛玻璃不是装饰，而是一种**注意力管理**。当背景被柔化，前景内容就会自然浮起。

## 为什么有效

人类的视觉系统会自动区分「焦平面」。半透明面板模拟了真实世界里的玻璃，让读者本能地把视线集中在文字上。

- 降低背景噪点带来的干扰
- 保留空间纵深，避免页面显得扁平
- 让悬浮导航与内容共存而不打架

> 好的界面应当像空气：你需要它，却不会一直注意到它。

## 三个落地要点

1. 背景必须够「乱」，模糊才有意义
2. 边框用 hairline 而不是实线，质感更轻
3. 文字对比度永远优先于风格

以下是一个最小实现：

\`\`\`css
.glass{
  background:rgba(255,255,255,0.05);
  border:1px solid rgba(255,255,255,0.12);
  backdrop-filter:blur(18px);
}
\`\`\`

记住：*毛玻璃是手段，阅读才是目的*。`
  },
  {
    id:'post-2',
    title:'从零写一个 Markdown 渲染器',
    tags:['前端','工程'],
    date:'2026-06-28',
    excerpt:'不引入任何库，用不到 80 行原生 JS 把 Markdown 变成安全的 HTML。',
    md:`# 从零写一个 Markdown 渲染器

很多人以为 Markdown 解析很复杂，其实核心只是「先把危险字符转义，再做规则替换」。

## 步骤拆解

**第一步：转义。** 任何用户输入进来的尖括号都要先变成实体，杜绝 XSS。

**第二步：处理代码块。** 用正则把 \`\`\` 包裹的内容单独抽出来占位，避免被后续规则破坏。

**第三步：逐行分析。** 标题、列表、引用、分割线，本质上都是「行首特征」。

\`\`\`js
function escapeHTML(s){
  return s.replace(/&/g,'&amp;')
          .replace(/</g,'&lt;')
          .replace(/>/g,'&gt;');
}
\`\`\`

## 剩下的只是正则

粗体、斜体、行内代码、链接，都是简单的模式匹配。关键是**顺序**：先抽代码块，最后再做行内替换。

> 工程的美感，往往藏在「先做什么、后做什么」里。`
  },
  {
    id:'post-3',
    title:'霓虹渐变背后的色彩心理学',
    tags:['设计'],
    date:'2026-06-10',
    excerpt:'紫罗兰到霓虹粉，为什么会让人联想到「未来」？色彩不只是审美，更是暗示。',
    md:`# 霓虹渐变背后的色彩心理学

我们选择 \`#7C3AED → #EC4899\`，不是因为时髦，而是因为它传递了一种「温柔的科技感」。

## 紫：想象与边界

紫色长期处于红色与蓝色之间，天然带有「过渡」与「可能」的意味。它适合表达尚未被定义的事物。

## 粉：温度与亲切

纯冷色容易显得疏离。一抹霓虹粉把距离拉近，让未来不再冰冷。

## 青：理性的锚点

\`#06B6D4\` 作为第三色，承担「信息」的角色：链接、提示、重点，都需要一个冷静的声音。

> 配色不是调色板，而是一段对话的语气。`
  },
  {
    id:'post-4',
    title:'未来三年，独立开发者会怎样',
    tags:['观点','未来'],
    date:'2026-05-22',
    excerpt:'当工具越来越强，开发者的护城河会从「写代码」转移到「定义问题」。',
    md:`# 未来三年，独立开发者会怎样

我越来越确信：能拉开差距的，不再是谁敲键盘更快，而是谁更会**提问**。

## 趋势一：单人即团队

设计、开发、运营、增长，正在被同一批工具压缩到一个人的工作流里。

## 趋势二：审美成为硬技能

功能趋同之后，用户只会为「舒服」买单。手感、节奏、细节，变成真正的壁垒。

## 趋势三：单文件复兴

像本站这样「一个文件带走全部」的形态，会在边缘场景里悄悄流行。

> 未来不属于会用工具的人，而属于会定义问题的人。`
  },
  {
    id:'post-5',
    title:'把动效做到 60fps 的 7 个习惯',
    tags:['前端','性能'],
    date:'2026-05-03',
    excerpt:'流畅不是玄学。只动 transform 与 opacity，剩下的交给合成层。',
    md:`# 把动效做到 60fps 的 7 个习惯

卡顿的本质，是浏览器被迫重新计算布局与绘制。避开它，动画就顺了。

## 核心原则

只动 \`transform\` 和 \`opacity\`。这两个属性可以由 GPU 合成，不触发重排。

- 用 \`translateY\` 代替 \`top\`
- 用 \`scale\` 代替宽度变化
- 入场动画交给 \`IntersectionObserver\`
- 给长列表加 \`will-change\` 要克制

\`\`\`css
.reveal{
  opacity:0;
  transform:translateY(26px);
  transition:opacity .7s ease,transform .7s ease;
}
\`\`\`

## 别忘了无障碍

尊重 \`prefers-reduced-motion\`，把动效塌缩为静态，是对一部分用户的体贴。

> 性能不是优化出来的，是从一开始就设计出来的。`
  },
  {
    id:'post-6',
    title:'暗色模式不只是反色',
    tags:['设计','前端'],
    date:'2026-04-18',
    excerpt:'把白底变黑底就完事？真正的暗色模式，是一场关于对比与层次的重新设计。',
    md:`# 暗色模式不只是反色

很多产品的暗色模式难看，是因为它们只是「把颜色翻过来」。

## 错在哪

纯黑背景配上纯白文字，对比度过高，长时间阅读会刺眼。正确的做法是把背景压到 \`#0A0B1A\` 这种「近黑」，文字用 \`#F8FAFC\` 这种「近白」。

## 层次靠透明度

暗色界面里，不要堆更多颜色，而是用**同一颜色的透明度**来分层：

- 底层：最低透明度
- 卡片：稍高
- 高亮：最高

\`\`\`css
[data-theme="dark"]{
  --bg:#0A0B1A;
  --glass:rgba(255,255,255,0.05);
}
\`\`\`

> 暗色模式的优雅，来自克制，而不是来自更多。`
  }
];

const FEATURES = [
  {c:'c-violet',icon:'pen',t:'原创 Markdown 渲染',d:'内置轻量解析器，正文即写即渲，零外部依赖。'},
  {c:'c-pink',icon:'layers',t:'毛玻璃视觉系统',d:'统一 bg-white/5 加 backdrop-blur 加 hairline 边框，处处通透。'},
  {c:'c-cyan',icon:'zap',t:'60fps 动效',d:'动画只动 transform 与 opacity，由 GPU 合成，顺滑省电。'},
  {c:'c-pink',icon:'palette',t:'未来玻璃主题',d:'深靛蓝宇宙底，紫粉渐变点亮重点，青色稳住信息。'},
  {c:'c-cyan',icon:'code',t:'原生无框架',d:'纯 HTML、CSS、JS 一个文件，拷贝即用，永不锁死。'},
  {c:'c-violet',icon:'sparkles',t:'入场即惊艳',d:'IntersectionObserver 驱动 stagger 入场，滚动间层层浮现。'},
  {c:'c-cyan',icon:'globe',t:'亮暗一键切换',d:'暗色默认，亮色可切，偏好持久化，尊重系统设置。'},
  {c:'c-violet',icon:'shield',t:'无障碍优先',d:'prefers-reduced-motion 自动塌缩为静态，人人可读。'},
  {c:'c-pink',icon:'terminal',t:'可移植单文件',d:'没有构建步骤，没有 CDN，邮件附件都能带着跑。'}
];

const TESTIMONIALS = [
  {n:'林夏',r:'独立产品设计师',q:'这是我见过最干净的纯手写博客模板，配色和动效克制得刚刚好。',s:5,ini:'林'},
  {n:'Aiden',r:'前端工程师',q:'单文件就能跑满所有交互，拿去改改就是我的个人站了。',s:5,ini:'A'},
  {n:'周野',r:'技术博主',q:'Markdown 渲染器那段我直接照搬进了自己的项目，省了一晚上。',s:4,ini:'周'},
  {n:'Mira',r:'UI 设计师',q:'玻璃质感和渐变拿捏得很 Apple，读完文章心情都变好了。',s:5,ini:'M'}
];

const FAQS = [
  {q:'这个博客真的只有一个文件吗？',a:'是的。所有结构、样式与交互都写在一个 index.html 里，没有引用任何外部脚本或样式表，双击即可打开。'},
  {q:'可以换成我自己的文章内容吗？',a:'当然。文章数据集中在脚本顶部的 POSTS 数组里，每篇包含标题、标签、日期与 Markdown 正文，改文字即可，无需动结构。'},
  {q:'亮色模式会丢失玻璃质感吗？',a:'不会。亮色只是把底色与透明度重新映射，毛玻璃、渐变与边框逻辑保持一致，只是整体更亮更轻盈。'},
  {q:'动效在老旧设备上会卡吗？',a:'动画只使用 transform 与 opacity，由显卡合成；同时系统在检测到 prefers-reduced-motion 时会自动关闭动效。'},
  {q:'图标是用 CDN 加载的吗？',a:'不是。所有图标都是硬编码的 Lucide 风格内联 SVG，没有 emoji，也没有任何外部图标库请求。'}
];

/* 作品集分类 */
const WORK_CATS = [
  {id:'ui',name:'UI 设计',icon:'layout'},
  {id:'graphic',name:'平面设计',icon:'brush'},
  {id:'fe',name:'前端页面',icon:'monitor'}
];

/* 封面渐变（用主题色生成的抽象封面，规避假截图） */
const COVER_GRADS = [
  'linear-gradient(135deg,#7C3AED,#EC4899)',
  'linear-gradient(135deg,#EC4899,#06B6D4)',
  'linear-gradient(135deg,#6D28D9,#06B6D4)',
  'linear-gradient(135deg,#7C3AED,#0EA5E9)',
  'linear-gradient(135deg,#DB2777,#7C3AED)',
  'linear-gradient(135deg,#06B6D4,#7C3AED)',
  'linear-gradient(135deg,#8B5CF6,#EC4899)',
  'linear-gradient(135deg,#EC4899,#8B5CF6)'
];

/* 作品集：每块 5-10 个，这里各放 6 个示例，改文字即可换成你的真实项目 */
const PROJECTS = [
  // UI 设计
  {id:'ui-1',cat:'ui',title:'智能家居控制台',year:'2025',role:'交互设计 / 视觉',intro:'为全屋物联网设备设计的统一控制中枢，把碎片化的开关收敛成一张会呼吸的面板。',detail:'项目目标是让非技术用户也能在十秒内完成一次场景编排。我把设备按空间分组，用玻璃卡片承载状态，关键操作前置到首屏。后台数据通过实时通道同步，面板上的光点随设备在线状态明灭。最终版本将日均操作路径从 7 步压缩到 3 步。',link:'https://example.com/ui/smart-home'},
  {id:'ui-2',cat:'ui',title:'金融 App 资产改版',year:'2025',role:'产品设计',intro:'把复杂而冰冷的资产数字，讲成一个用户看得懂、信得过的故事。',detail:'原有界面堆满了表格，用户只看得到数字涨跌，看不到因果。我重做了信息层级：先用一张总览卡片建立安全感，再按持仓、流水、目标分三个入口。渐变用来区分风险等级，而不是为了好看。改版后月活留存提升了 18%。',link:'https://example.com/ui/finance'},
  {id:'ui-3',cat:'ui',title:'医疗预约流程',year:'2024',role:'UX / 流程设计',intro:'让挂号这件事，像点一次外卖一样简单、确定、不焦虑。',detail:'我梳理了从选科室到支付的 11 个节点，删掉了 4 个可有可无的确认页，把等待状态用进度条和预估时间显性化，减少用户的未知感。视觉上采用低饱和的蓝紫，传递冷静与专业。',link:'https://example.com/ui/medical'},
  {id:'ui-4',cat:'ui',title:'车载 HMI 概念',year:'2024',role:'概念设计',intro:'在驾驶这个高风险场景里，做一套只说重点、绝不抢戏的信息层。',detail:'车载界面最忌讳花哨。我把信息按紧急、常用、偶尔三级分层，只在必要时点亮，其余时间保持暗态。字号与对比度严格遵循夜间可读性规范，动效克制到几乎无感。',link:'https://example.com/ui/auto'},
  {id:'ui-5',cat:'ui',title:'SaaS 数据看板',year:'2024',role:'界面设计',intro:'在高密度数据里，给用户留出一口呼吸的空间。',detail:'看板天然信息过载。我用留白和分组把二十多个指标拆成可扫读的区块，关键 KPI 用渐变高亮，次要数据退到浅灰。支持暗色，长时间盯屏不刺眼。',link:'https://example.com/ui/dashboard'},
  {id:'ui-6',cat:'ui',title:'教育产品首页',year:'2023',role:'视觉 / 落地页',intro:'温暖、清晰、有引导感，让第一次来访的家长愿意留下来。',detail:'首页承担建立信任的第一棒。我用大留白和柔和渐变降低焦虑感，把怎么学、跟谁学、效果如何三段式讲清楚，CTA 用紫粉渐变保证可点击性。',link:'https://example.com/ui/edu'},
  // 平面设计
  {id:'g-1',cat:'graphic',title:'品牌视觉系统',year:'2025',role:'品牌设计',intro:'为一家科技公司建立一套会发光的识别语言，从 logo 到物料全线统一。',detail:'核心是一枚由紫到粉的渐变星环，象征连接与未来。我定义了色彩、字体、间距与图形语言四套规则，保证在名片、PPT、官网三种载体上观感一致。',link:'https://example.com/graphic/brand'},
  {id:'g-2',cat:'graphic',title:'音乐节主视觉',year:'2025',role:'海报 / 主视觉',intro:'用一整片炸开的渐变，把夏夜音乐节的躁动提前给到观众。',detail:'主视觉以霓虹粉与青色对撞，配合流动的网格底纹，营造电子音乐的律动感。衍生出海报、票根、社交头像等 12 个物料。',link:'https://example.com/graphic/festival'},
  {id:'g-3',cat:'graphic',title:'书籍封面系列',year:'2024',role:'装帧设计',intro:'三本关于未来的小书，用同一套玻璃质感讲三种情绪。',detail:'三本书共用圆角、毛玻璃与霓虹描边的语言，但分别用紫、粉、青做主调区分主题。书脊连起来是一条完整的渐变带。',link:'https://example.com/graphic/books'},
  {id:'g-4',cat:'graphic',title:'城市马拉松海报',year:'2024',role:'活动海报',intro:'把一条跑道，画成穿过整座城市的霓虹光线。',detail:'主图是一条由起点延伸到终点的发光轨迹，沿途标注城市地标。信息层级让赛事名称、时间、报名入口在三秒内被读到。',link:'https://example.com/graphic/marathon'},
  {id:'g-5',cat:'graphic',title:'咖啡包装设计',year:'2023',role:'包装设计',intro:'给精品咖啡豆，穿上一层透光的玻璃质感外衣。',detail:'包装用半透明材质模拟毛玻璃，豆子的颜色从内部透出来。标签只用极简的字体和一道渐变腰封，货架上一眼可辨。',link:'https://example.com/graphic/coffee'},
  {id:'g-6',cat:'graphic',title:'玻璃质感字体实验',year:'2023',role:'字体 / 实验',intro:'把玻璃这种材质的感觉，变成可书写的笔画。',detail:'这是一次个人实验：用高光、折射与半透明描边，重绘了一套展示用字体。虽然不适合长文，但在标题与 logo 上很有未来感。',link:'https://example.com/graphic/type'},
  // 前端页面
  {id:'fe-1',cat:'fe',title:'组件库官网',year:'2025',role:'前端 / 站点',intro:'一个文档即演示的玻璃风格组件库站点，看文档的同时就能试组件。',detail:'站点把每个组件的 API 与实时预览并排呈现，主题色用 CSS 变量统一，支持一键切换明暗。整站零框架，构建产物极小。',link:'https://example.com/fe/component'},
  {id:'fe-2',cat:'fe',title:'数据可视化大屏',year:'2025',role:'前端 / 可视化',intro:'一块会实时流动的城市脉搏大屏，数据进来就在屏幕上呼吸。',detail:'用 Canvas 绘制动态折线、热力与粒子，配色沿用紫粉青体系。GPU 合成保证 60fps，大屏可跑一整晚不卡。',link:'https://example.com/fe/dataviz'},
  {id:'fe-3',cat:'fe',title:'个人作品集模板',year:'2024',role:'前端 / 模板',intro:'也就是你正在浏览的这类单文件作品集，开箱即用、随手可改。',detail:'纯原生 HTML、CSS、JS，一个文件带走全部。内置路由、明暗切换、动效与无障碍处理，非开发者也能改成自己的站。',link:'https://example.com/fe/portfolio'},
  {id:'fe-4',cat:'fe',title:'落地页生成器',year:'2024',role:'前端 / 工具',intro:'五分钟，拖出一个能转化的产品落地页。',detail:'提供区块级组件与实时预览，用户拼装后即可导出静态文件。重点打磨了首屏、卖点、社会证明与 CTA 四类高转化区块。',link:'https://example.com/fe/landing'},
  {id:'fe-5',cat:'fe',title:'零依赖博客引擎',year:'2023',role:'前端 / 工具',intro:'一个不引任何库的 Markdown 博客内核，复制即用。',detail:'内置轻量 Markdown 解析、标签筛选与文章导航，全部写在几百行 JS 里。安全转义，避免 XSS。',link:'https://example.com/fe/blog'},
  {id:'fe-6',cat:'fe',title:'交互式在线简历',year:'2023',role:'前端 / 创意',intro:'让简历滚动起来，变成一段关于我的叙事。',detail:'用滚动进度驱动章节切换，关键经历以卡片浮现。支持打印样式，一键导出 PDF 也不丢版式。',link:'https://example.com/fe/resume'}
];

function catName(id){ const c = WORK_CATS.find(function(x){return x.id===id;}); return c?c.name:id; }
function catIcon(id){ const c = WORK_CATS.find(function(x){return x.id===id;}); return c?c.icon:'layout'; }

/* ============================================================
   图标：硬编码 Lucide 风格 SVG
   ============================================================ */
const ICONS = {
  pen:'<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/><path d="m2.3 2.3 7.286 7.286"/><circle cx="11" cy="11" r="2"/>',
  layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  palette:'<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  code:'<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  sparkles:'<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z"/><path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/>',
  globe:'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  terminal:'<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
  star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  arrow:'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  chevron:'<polyline points="6 9 12 15 18 9"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
  layout:'<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
  brush:'<path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>',
  monitor:'<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  external:'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
};
function svg(name,cls){
  const inner = ICONS[name]||'';
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'+(cls?' class="'+cls+'"':'')+'>'+inner+'</svg>';
}

/* ============================================================
   轻量 Markdown 渲染器
   ============================================================ */
function escapeHTML(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function inlineMd(s){
  // 行内代码
  s = s.replace(/`([^`]+)`/g,function(_,c){return '<code>'+c+'</code>';});
  // 粗体
  s = s.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
  // 斜体（em 风格）
  s = s.replace(/\*([^*]+)\*/g,'<em>$1</em>');
  // 链接
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,function(_,t,u){return '<a href="'+u+'" target="_blank" rel="noopener">'+t+'</a>';});
  return s;
}
function mdToHtml(md){
  md = escapeHTML(md);
  // 抽离代码块
  const blocks = [];
  md = md.replace(/```(\w*)\n([\s\S]*?)```/g,function(_,lang,code){
    const i = blocks.length;
    blocks.push('<pre><code>'+code.replace(/<\/code>/g,'&lt;/code&gt;').replace(/`/g,'')+'</code></pre>');
    return '\u0000'+i+'\u0000';
  });
  const lines = md.split('\n');
  let html='', i=0;
  while(i<lines.length){
    let line = lines[i];
    if(/^\u0000\d+\u0000$/.test(line.trim())){
      html += blocks[parseInt(line.trim().replace(/\u0000/g,''))];
      i++; continue;
    }
    if(/^###\s+/.test(line)){ html+='<h3>'+inlineMd(line.replace(/^###\s+/,''))+'</h3>'; i++; continue; }
    if(/^##\s+/.test(line)){ html+='<h2>'+inlineMd(line.replace(/^##\s+/,''))+'</h2>'; i++; continue; }
    if(/^#\s+/.test(line)){ html+='<h1>'+inlineMd(line.replace(/^#\s+/,''))+'</h1>'; i++; continue; }
    if(/^>\s+/.test(line)){
      let buf=[];
      while(i<lines.length && /^>\s+/.test(lines[i])){ buf.push(lines[i].replace(/^>\s+/,'')); i++; }
      html+='<blockquote>'+inlineMd(buf.join(' '))+'</blockquote>'; continue;
    }
    if(/^---+$/.test(line)){ html+='<hr/>'; i++; continue; }
    if(/^[-*]\s+/.test(line)){
      let buf=[];
      while(i<lines.length && /^[-*]\s+/.test(lines[i])){ buf.push('<li>'+inlineMd(lines[i].replace(/^[-*]\s+/,''))+'</li>'); i++; }
      html+='<ul>'+buf.join('')+'</ul>'; continue;
    }
    if(/^\d+\.\s+/.test(line)){
      let buf=[];
      while(i<lines.length && /^\d+\.\s+/.test(lines[i])){ buf.push('<li>'+inlineMd(lines[i].replace(/^\d+\.\s+/,''))+'</li>'); i++; }
      html+='<ol>'+buf.join('')+'</ol>'; continue;
    }
    if(line.trim()===''){ i++; continue; }
    // 段落（合并连续非空行）
    let buf=[line];
    i++;
    while(i<lines.length && lines[i].trim()!=='' && !/^(#|##|###|>|[-*]|\d+\.|---)/.test(lines[i])){ buf.push(lines[i]); i++; }
    html+='<p>'+inlineMd(buf.join(' '))+'</p>';
  }
  return html;
}

/* ============================================================
   渲染：特性 / 评价 / FAQ / 文章 / 标签
   ============================================================ */
function renderFeatures(){
  const grid = document.getElementById('featGrid');
  grid.innerHTML = FEATURES.map(function(f){
    return '<div class="feat reveal '+f.c+'">'
      +'<div class="ic">'+svg(f.icon)+'</div>'
      +'<h3>'+f.t+'</h3><p>'+f.d+'</p></div>';
  }).join('');
}
function renderTestimonials(){
  const track = document.getElementById('cTrack');
  const dots = document.getElementById('cDots');
  track.innerHTML = TESTIMONIALS.map(function(t){
    const stars = Array(t.s).fill(svg('star')).join('');
    return '<div class="c-slide"><div class="c-card">'
      +'<div class="c-avatar">'+t.ini+'</div>'
      +'<div class="c-stars">'+stars+'</div>'
      +'<p class="c-quote">“'+t.q+'”</p>'
      +'<div class="c-name">'+t.n+'</div>'
      +'<div class="c-role">'+t.r+'</div></div></div>';
  }).join('');
  dots.innerHTML = TESTIMONIALS.map(function(_,i){
    return '<button data-i="'+i+'" class="'+(i===0?'active':'')+'"></button>';
  }).join('');
  dots.querySelectorAll('button').forEach(function(b){
    b.addEventListener('click',function(){ goSlide(parseInt(b.dataset.i)); });
  });
}
function renderFaq(){
  const box = document.getElementById('faq');
  box.innerHTML = FAQS.map(function(f){
    return '<div class="faq-item">'
      +'<button class="faq-q">'+f.q+'<span class="chev">'+svg('chevron')+'</span></button>'
      +'<div class="faq-a"><div class="inner">'+f.a+'</div></div></div>';
  }).join('');
  box.querySelectorAll('.faq-item').forEach(function(item){
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click',function(){
      const open = item.classList.toggle('open');
      a.style.maxHeight = open ? (a.scrollHeight+'px') : '0px';
    });
  });
}
function allTags(){
  const map = {};
  POSTS.forEach(function(p){ p.tags.forEach(function(t){ map[t]=(map[t]||0)+1; }); });
  return map;
}
function renderSideTags(active){
  const el = document.getElementById('sideTags');
  const tags = allTags();
  let html = '<span class="tag-pill '+(!active?'active':'')+'" data-tag="">全部</span>';
  html += Object.keys(tags).sort().map(function(t){
    return '<span class="tag-pill '+(active===t?'active':'')+'" data-tag="'+t+'">'+t+' · '+tags[t]+'</span>';
  }).join('');
  el.innerHTML = html;
  el.querySelectorAll('.tag-pill').forEach(function(p){
    p.addEventListener('click',function(){ renderPosts(p.dataset.tag); renderSideTags(p.dataset.tag); });
  });
}
function renderPosts(filter){
  const grid = document.getElementById('postsGrid');
  const list = POSTS.filter(function(p){ return !filter || p.tags.indexOf(filter)>=0; });
  grid.innerHTML = list.map(function(p){
    return '<div class="post-card" data-id="'+p.id+'">'
      +'<div class="pc-tags">'+p.tags.map(function(t){return '<span class="pc-tag">'+t+'</span>';}).join('')+'</div>'
      +'<h3>'+p.title+'</h3>'
      +'<p>'+p.excerpt+'</p>'
      +'<div class="pc-meta"><span>'+p.date+'</span>'
      +'<span class="read">阅读 '+svg('arrow')+'</span></div></div>';
  }).join('');
  grid.querySelectorAll('.post-card').forEach(function(c){
    c.addEventListener('click',function(){ location.hash = '#/article/'+c.dataset.id; });
  });
}
function renderTagsCloud(){
  const el = document.getElementById('tagsCloud');
  const tags = allTags();
  el.innerHTML = Object.keys(tags).sort().map(function(t){
    return '<div class="tag-block" data-tag="'+t+'">'
      +'<div class="tname">'+t+'</div>'
      +'<div class="tcount">'+tags[t]+' 篇文章</div></div>';
  }).join('');
  el.querySelectorAll('.tag-block').forEach(function(b){
    b.addEventListener('click',function(){ location.hash = '#/articles'; setTimeout(function(){ renderPosts(b.dataset.tag); renderSideTags(b.dataset.tag); },60); });
  });
}
function renderArticle(id){
  const box = document.getElementById('articleBox');
  const idx = POSTS.findIndex(function(p){return p.id===id;});
  if(idx<0){ location.hash='#/articles'; return; }
  const p = POSTS[idx];
  const prev = POSTS[idx-1], next = POSTS[idx+1];
  box.innerHTML =
    '<span class="back" id="backBtn"></span>'
    +'<h1>'+p.title+'</h1>'
    +'<div class="a-meta"><span>'+p.date+'</span><span class="a-tags">'+p.tags.map(function(t){return '<span class="a-tag">'+t+'</span>';}).join('')+'</span></div>'
    +'<div class="markdown">'+mdToHtml(p.md)+'</div>'
    +'<div class="a-nav">'
      + (prev?'<a href="#/article/'+prev.id+'" data-link><div class="lbl">上一篇</div><div class="ttl">'+prev.title+'</div></a>':'<span></span>')
      + (next?'<a href="#/article/'+next.id+'" data-link style="text-align:right"><div class="lbl">下一篇</div><div class="ttl">'+next.title+'</div></a>':'<span></span>')
    +'</div>';
  // 返回按钮需单独注入箭头（避免上面的替换冗余）
  const back = document.getElementById('backBtn');
  back.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(180deg)"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> 返回列表';
  back.addEventListener('click',function(){ location.hash='#/articles'; });
}

/* ============================================================
   渲染：作品集
   ============================================================ */
function coverHTML(p,idx){
  const g = COVER_GRADS[idx % COVER_GRADS.length];
  return '<div class="w-cover" style="background:'+g+'">'
    +'<div class="w-cover-deco">'+svg('grid')+'</div>'
    +'<div class="w-cover-ic">'+svg(catIcon(p.cat))+'</div>'
    +'<span class="w-cover-cat">'+catName(p.cat)+'</span>'
    +'</div>';
}
function cardHTML(p){
  const idx = PROJECTS.indexOf(p);
  return '<div class="work-card reveal" data-id="'+p.id+'">'
    + coverHTML(p,idx)
    + '<div class="work-body">'
      + '<h3>'+p.title+'</h3>'
      + '<p>'+p.intro+'</p>'
      + '<div class="work-foot"><span class="pc-tag">'+catName(p.cat)+'</span>'
      + '<span class="read">查看 '+svg('arrow')+'</span></div>'
    + '</div></div>';
}
function renderWork(filter){
  const tabsEl = document.getElementById('workTabs');
  const grid = document.getElementById('workGrid');
  let tabs = '<button class="w-tab '+(!filter||filter==='all'?'active':'')+'" data-cat="all">全部</button>';
  WORK_CATS.forEach(function(c){
    tabs += '<button class="w-tab '+(filter===c.id?'active':'')+'" data-cat="'+c.id+'">'+c.name+'</button>';
  });
  tabsEl.innerHTML = tabs;
  tabsEl.querySelectorAll('.w-tab').forEach(function(b){
    b.addEventListener('click',function(){ renderWork(b.dataset.cat); });
  });
  const list = PROJECTS.filter(function(p){ return !filter || filter==='all' || p.cat===filter; });
  grid.innerHTML = list.map(cardHTML).join('');
  grid.querySelectorAll('.work-card').forEach(function(c){
    c.addEventListener('click',function(){ openModal(c.dataset.id); });
  });
  observeReveals();
}

/* ============================================================
   渲染：作品详情弹窗
   ============================================================ */
function openModal(id){
  const p = PROJECTS.find(function(x){return x.id===id;});
  if(!p) return;
  const idx = PROJECTS.indexOf(p);
  const cover = document.getElementById('modalCover');
  cover.style.background = COVER_GRADS[idx % COVER_GRADS.length];
  cover.innerHTML = '<div class="w-cover-ic">'+svg(catIcon(p.cat))+'</div>';
  document.getElementById('modalMeta').innerHTML = '<span class="a-tag">'+catName(p.cat)+'</span><span>'+p.year+'</span><span>'+p.role+'</span>';
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalIntro').textContent = p.intro;
  document.getElementById('modalDetail').textContent = p.detail;
  document.getElementById('modalLink').href = p.link;
  document.getElementById('modal').classList.add('show');
  document.body.classList.add('modal-open');
  document.getElementById('modalClose').focus();
}
function closeModal(){
  document.getElementById('modal').classList.remove('show');
  document.body.classList.remove('modal-open');
}

/* ============================================================
   路由
   ============================================================ */
const VIEWS = ['home','articles','article','tags','work','about'];
function setActiveNav(view){
  document.querySelectorAll('#navLinks a').forEach(function(a){
    a.classList.toggle('active', a.dataset.view===view || (view==='article' && a.dataset.view==='articles'));
  });
}
function router(){
  const hash = location.hash || '#/home';
  const parts = hash.replace(/^#\//,'').split('/');
  const view = parts[0] || 'home';
  VIEWS.forEach(function(v){
    document.getElementById('view-'+v).classList.toggle('active', v===view);
  });
  if(view==='articles'){ renderPosts(); renderSideTags(); }
  if(view==='tags'){ renderTagsCloud(); }
  if(view==='article'){ renderArticle(parts[1]); }
  if(view==='work'){ renderWork('all'); }
  setActiveNav(view);
  window.scrollTo({top:0,behavior:'auto'});
  observeReveals();
}
document.querySelectorAll('[data-link]').forEach(function(a){
  a.addEventListener('click',function(e){
    // 让 hash 改变触发 router，无需阻止默认
  });
});
window.addEventListener('hashchange',router);

/* ============================================================
   入场动画：IntersectionObserver + stagger
   ============================================================ */
let io = null;
function observeReveals(){
  const items = document.querySelectorAll('.view.active .reveal');
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    items.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  if(io) io.disconnect();
  io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        const el = en.target;
        const sibs = Array.prototype.slice.call(el.parentNode.querySelectorAll(':scope > .reveal'));
        const idx = sibs.indexOf(el);
        el.style.transitionDelay = (idx>=0?idx*70:0)+'ms';
        el.classList.add('in');
        io.unobserve(el);
      }
    });
  },{threshold:0.12});
  items.forEach(function(el){ io.observe(el); });
}

/* ============================================================
   评价轮播：自动播 + 拖拽
   ============================================================ */
let curSlide = 0, autoTimer = null;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function goSlide(i){
  const n = TESTIMONIALS.length;
  curSlide = (i+n)%n;
  document.getElementById('cTrack').style.transform = 'translateX('+(-curSlide*100)+'%)';
  document.querySelectorAll('#cDots button').forEach(function(b,bi){ b.classList.toggle('active',bi===curSlide); });
}
function startAuto(){
  if(reduceMotion) return;
  stopAuto();
  autoTimer = setInterval(function(){ goSlide(curSlide+1); },5000);
}
function stopAuto(){ if(autoTimer) clearInterval(autoTimer); }
function setupCarouselDrag(){
  const car = document.getElementById('carousel');
  let startX=0, dragging=false, dx=0;
  car.addEventListener('pointerdown',function(e){ dragging=true; startX=e.clientX; dx=0; stopAuto(); car.setPointerCapture(e.pointerId); });
  car.addEventListener('pointermove',function(e){ if(!dragging) return; dx=e.clientX-startX; document.getElementById('cTrack').style.transition='none'; document.getElementById('cTrack').style.transform='translateX(calc('+(-curSlide*100)+'% + '+dx+'px))'; });
  function end(){
    if(!dragging) return; dragging=false;
    document.getElementById('cTrack').style.transition='';
    if(Math.abs(dx)>60){ goSlide(curSlide + (dx<0?1:-1)); }
    else { goSlide(curSlide); }
    startAuto();
  }
  car.addEventListener('pointerup',end);
  car.addEventListener('pointercancel',end);
  car.addEventListener('pointerleave',function(){ if(dragging) end(); });
}

/* ============================================================
   主题切换（暗色默认，亮色可切，持久化）
   ============================================================ */
function applyTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  const btn = document.getElementById('themeBtn');
  btn.innerHTML = (t==='dark') ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
}
(function initTheme(){
  let saved = null;
  try{ saved = localStorage.getItem('nebula-theme'); }catch(e){}
  applyTheme(saved==='light'?'light':'dark');
  document.getElementById('themeBtn').addEventListener('click',function(){
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur==='dark'?'light':'dark';
    applyTheme(next);
    try{ localStorage.setItem('nebula-theme',next); }catch(e){}
  });
})();

/* ============================================================
   订阅表单：loading + toast
   ============================================================ */
(function setupSub(){
  const form = document.getElementById('subForm');
  const email = document.getElementById('subEmail');
  const btn = document.getElementById('subBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer=null;
  function showToast(msg){
    toastMsg.textContent = msg;
    toast.classList.add('show');
    if(toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toast.classList.remove('show'); },3200);
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const val = email.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if(!ok){ email.classList.add('err'); email.focus(); return; }
    email.classList.remove('err');
    const original = btn.innerHTML;
    btn.classList.add('btn-loading');
    btn.innerHTML = '<span class="spinner"></span> 提交中';
    setTimeout(function(){
      btn.classList.remove('btn-loading');
      btn.innerHTML = original;
      email.value='';
      showToast('已订阅，欢迎来到 Nebula。');
    },1200);
  });
  email.addEventListener('input',function(){ email.classList.remove('err'); });
})();

/* ============================================================
   启动
   ============================================================ */
(function setupModal(){
  const overlay = document.getElementById('modal');
  document.getElementById('modalClose').addEventListener('click',closeModal);
  overlay.addEventListener('click',function(e){ if(e.target===overlay) closeModal(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeModal(); });
})();
renderFeatures();
renderTestimonials();
renderFaq();
setupCarouselDrag();
router();
startAuto();
