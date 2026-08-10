import type { Dict } from "./ru";

export const zh: Dict = {
  code: "zh",
  htmlLang: "zh-CN",
  meta: {
    title: "PAGER — 可控访问的私密通讯工具",
    desc: "PAGER：一个账号，多种沟通身份，各自独立的访问边界。PAGER ID、多重身份与连接规则。Private beta — 2026 年第三季度。",
  },
  nav: {
    aria: "主导航",
    links: [
      { href: "#chapter-04", label: "产品" },
      { href: "#chapter-03", label: "演示" },
      { href: "#chapter-06", label: "进展" },
      { href: "#chapter-07", label: "商业" },
    ],
    meta: "PRIVATE COMMUNICATION / 2026",
    cta: "索取项目资料",
    menu: "菜单",
    close: "关闭",
    langAria: "语言",
  },
  ticker: ["多重身份","为每一位联系人设定沟通规则","24 小时临时访问","无需手机号码","PAGER ID","可控的访问权限"],
  hero: {
    sectionAria: "混乱、情境、掌控",
    kicker: "可控访问的即时通讯",
    h1: ["由你定义", "的沟通", "规则"],
    lead: "一个账号。多种沟通身份。各自独立的访问边界。",
    ctaPrimary: "索取项目资料",
    ctaSecondary: "了解运作方式",
    frames: [
      {
        tag: "混乱",
        title: "你的空间，不该向所有人敞开。",
        body: "一个号码等于向所有人开放：家人、同事，以及偶然留下号码的陌生人。",
      },
      {
        tag: "情境",
        title: "同一个人，不同的情境。",
        body: "每个联系人对应各自的身份、各自的规则和各自的访问权限。",
      },
      {
        tag: "掌控",
        title: "PAGER 把掌控权交还给你。",
        body: "你来决定别人如何看到你，以及如何与你联系。",
      },
    ],
    launch: {
      label: "LAUNCH",
      beta: "PRIVATE BETA — Q3 2026",
      stores: "APP STORE / GOOGLE PLAY — Q1 2027",
    },
  },
  evolution: {
    head: { title: "演进", meta: "DIGITAL COMMUNICATION / 1971—2026" },
    h: ["重点不是速度。", "而是选择！"],
    lead: "数字通讯让我们随时可被找到。现在，该由我们选择沟通的方式。我们为通讯增加新的一层：不同的身份、个人化的规则，以及对每一次连接的掌控。",
    stages: [
      { name: "电子邮件", role: "信息传递", q: "如何发送一条消息？" },
      { name: "短信", role: "触手可及的联系", q: "如何更快地取得联系？" },
      { name: "聊天、语音、视频", role: "即时沟通", q: "如何实时交流？" },
      { name: "多重身份", role: "可控的沟通", q: "如何选择连接的方式？" },
    ],
    progression: ["传递", "连接", "沟通", "掌控"],
  },
  pagerId: {
    head: { title: "PAGER ID", meta: "IDENTITY OBJECT" },
    kicker: "找到一个人的新方式",
    h: ["不是号码。", "不是昵称。", "PAGER ID"],
    lead: "一种开启连接的新方式，且不会立即让对方进入你的私人空间。",
    todayLabel: "今天，手机号码同时意味着：",
    today: ["找到一个人的方式", "取得联系的方式", "进入私人空间的通道"],
    request: "发起连接请求 →",
    idFormat: "ID FORMAT / XXXX XXXX",
    summary:
      "通过 PAGER ID 可以找到某个人并发送连接请求，而对方自行决定开放哪一个身份、以及设定怎样的沟通条件。",
    steps: [
      { t: "找到对方", d: "以 PAGER ID 搜索，无需手机号码。" },
      { t: "选择身份", d: "由用户决定开放哪一个空间。" },
      { t: "设定规则", d: "沟通形式与访问权限事先确定。" },
    ],
  },
  multiprofile: {
    head: { title: "多重身份", meta: "ONE ACCOUNT / MANY SPACES" },
    h: ["同一个人。", "多种", "做自己的方式。"],
    quote: "我依然是我，只是敞开的方式不同。",
    body: "多重身份改变了既有的数字沟通模式。一个人可以在同一个账号内建立不同的沟通空间，同时保有对自我呈现方式与每一次互动过程的掌控。",
    mobileLabel: "MOBILE / 身份",
    altDesktop: "多重身份 — 界面",
    altMobile: "多重身份 — 移动端界面",
    beats: [
      { label: "问题", text: "所有关系共用同一个数字形象。" },
      { label: "洞察", text: "单一的数字身份无法呈现完整的人。" },
      { label: "方案", text: "PAGER 创造彼此独立的沟通空间。" },
      { label: "规模", text: "同一个人。多种做自己的方式。" },
    ],
    outro: ["各不相同。", "但始终是我！"],
  },
  contact: {
    head: { title: "联系与情境", meta: "ONE IDENTITY / MANY STATES" },
    h: ["同一个人。", "不同的沟通方式。"],
    lead: "同一个人可以有不同的呈现方式——取决于连接另一端是谁。",
    tablistAria: "沟通情境",
    profileAlt: "身份",
    accessLabel: "访问权限",
    rulesLabel: "规则",
    contexts: [
      { label: "私人", access: "完全开放", rules: "通话、语音、媒体" },
      { label: "工作", access: "工作时间", rules: "文字、文件、通话需事先约定" },
      { label: "访客", access: "临时访问", rules: "仅限文字，限定时段" },
      { label: "特殊情境", access: "按请求开放", rules: "独立空间与独立规则" },
    ],
    summary:
      "PAGER 把联系人与身份对应起来：你选择展示哪一个版本的自己、设定怎样的规则、开放怎样的访问权限。",
  },
  product: {
    head: { title: "产品进展", meta: "PRIVATE BETA / Q3 2026 / ANDROID, IOS" },
    h: ["全新沟通模式的基础", "已经建成"],
    lead: "PAGER 已经实现了产品的核心构想：连接的起点不只是一条消息，而是对身份、规则与互动形式的选择。",
    columns: [
      {
        title: "已实现",
        items: ["注册", "PAGER ID", "按 ID 搜索", "连接请求", "一对一对话"],
      },
      {
        title: "核心机制",
        items: ["基础身份", "情境身份", "沟通方式管理", "访客身份", "临时访问"],
      },
      {
        title: "下一步",
        items: ["语音与视频通话", "身份模型扩展", "更多隐私设置"],
      },
    ],
    altDesktop: "PAGER — 桌面端界面",
    altScreen: "PAGER — 界面",
  },
  business: {
    head: { title: "商业层", meta: "MONETIZATION MODEL" },
    h: ["商业化", "潜力"],
    lead: "从一种新的沟通方式，走向一个新的通讯平台。",
    tiers: [
      {
        title: "Premium",
        items: ["专属 PAGER ID", "进阶身份设置", "更多个性化选项", "连接关系管理"],
      },
      {
        title: "Business",
        items: ["企业身份", "团队工作空间", "无需暴露号码的联系", "API 集成"],
      },
    ],
    layers: [
      {
        kicker: "Premium PAGER ID",
        title: "具有身份感的标识",
        body: "简短易记的 ID，适用于个人与专业场景。",
      },
      {
        kicker: "Advanced capabilities",
        title: "对连接的掌控",
        body: "更完善的沟通、访问与身份呈现规则。",
      },
      {
        kicker: "B2B / API",
        title: "基础设施",
        body: "企业可以在不暴露个人联系方式的前提下，与客户建立安全的沟通渠道。",
      },
    ],
    outro:
      "今天，PAGER 改变的是个人沟通。未来，同样的模式可以成为管理人与组织之间数字连接的基础设施。",
  },
  cta: {
    head: { title: "联系", meta: "INVESTOR MATERIALS" },
    h: ["与我们一起", "共建新的", "沟通形态"],
    lead: "我们会完整介绍当前产品、PAGER 的核心机制、private beta 计划，以及平台的后续发展阶段。",
    button: "索取演示资料",
    mailSubject: "PAGER — 演示与资料",
    footerCenter: "Private communication",
    top: "回到顶部 ↑",
  },
};
