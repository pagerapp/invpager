import type { Dict } from "./ru";

export const en: Dict = {
  code: "en",
  htmlLang: "en",
  meta: {
    title: "PAGER — the messenger with controlled access",
    desc: "PAGER — one account, separate communication profiles, separate access boundaries. PAGER ID, multiprofile and rules for every connection. Private beta — Q3 2026.",
  },
  nav: {
    aria: "Primary",
    links: [
      { href: "#chapter-04", label: "PRODUCT" },
      { href: "#chapter-03", label: "DEMO" },
      { href: "#chapter-06", label: "STATUS" },
      { href: "#chapter-07", label: "BUSINESS" },
    ],
    meta: "PRIVATE COMMUNICATION / 2026",
    cta: "Request the deck",
    menu: "MENU",
    close: "CLOSE",
    langAria: "Language",
  },
  ticker: ["MULTIPROFILE","RULES OF CONTACT FOR EVERY CONNECTION","TEMPORARY ACCESS FOR 24 HOURS","NO PHONE NUMBER","PAGER ID","CONTROLLED ACCESS"],
  hero: {
    sectionAria: "Chaos, relationships, control",
    kicker: "A MESSENGER WITH CONTROLLED ACCESS",
    h1: ["COMMUNICATION", "ON YOUR", "TERMS"],
    lead: "One account. Separate communication profiles. Separate access boundaries.",
    ctaPrimary: "Request the deck",
    ctaSecondary: "How it works",
    frames: [
      {
        tag: "CHAOS",
        title: "YOUR SPACE ISN'T FOR EVERYONE",
        body: "One number opens the door to everyone — family, colleagues and strangers alike.",
      },
      {
        tag: "RELATIONSHIPS",
        title: "ONE PERSON — DIFFERENT RELATIONSHIPS",
        body: "Every contact gets its own profile, its own rules and its own level of access.",
      },
      {
        tag: "CONTROL",
        title: "PAGER GIVES CONTROL BACK",
        body: "You decide how you are seen and how people reach you.",
      },
    ],
    launch: {
      label: "LAUNCH",
      beta: "PRIVATE BETA — Q3 2026",
      stores: "APP STORE / GOOGLE PLAY — Q1 2027",
    },
  },
  evolution: {
      head: { title: "EVOLUTION OF COMMUNICATION", meta: "FROM MESSAGE / TO CONTEXT" },
      h: ["FROM MESSAGE", "TO CONTEXT"],
      lead: "Communication got faster. Now it can become more precise: you choose the format, the profile and the boundaries of access.",
      stages: [
        { name: "E-mail", role: "01 / E-MAIL", prompt: "How do you send a message?", q: "Information transfer.", body: "Early digital communication solved the core problem: moving information between people regardless of distance. The key change: a message no longer depended on a physical medium." },
        { name: "SMS", role: "02 / SMS", prompt: "How do you reach someone faster?", q: "Accessible connection.", body: "Mobile messages made people reachable at any moment and brought communication closer to real time. The key change: reaching someone became simpler and faster." },
        { name: "Chats, voice, video", role: "03 / CHATS, VOICE, VIDEO", prompt: "How do you communicate in real time?", q: "Instant communication.", body: "Messengers brought different modes of communication into one space and made constant connection habitual. The key change: communication became continuous." },
        { name: "Multiprofile", role: "04 / MULTIPROFILE", prompt: "How do you choose the format of a connection?", q: "Controlled communication.", body: "PAGER adds a new level: different profiles, personal rules, and control over how every interaction unfolds. The key change: communication becomes personal." },
      ],
      progression: ["E-mail", "SMS", "Chats", "Multiprofile"],
      whyNow: { title: "Why now?", body: "One profile no longer reflects modern life. Digital communication once solved the problem of sending messages. Today, one person exists in several contexts at once: work, family, friends, communities, and new connections. Yet the digital representation remains one." },
  },
  pagerId: {
    head: { title: "PAGER ID", meta: "IDENTITY OBJECT" },
    kicker: "A new way to find people",
    h: ["NOT A NUMBER.", "NOT A HANDLE.", "PAGER ID"],
    lead: "A new way to start a connection without instant access to your personal space.",
    todayLabel: "Today a phone number is all of this at once:",
    today: ["a way to find a person", "a way to reach them", "access to their personal space"],
    request: "CONNECTION REQUEST →",
    idFormat: "ID FORMAT / XXXX XXXX",
    summary:
      "PAGER ID lets you find a person and send a connection request, while they decide which profile to open and which terms of communication to set.",
    steps: [
      { t: "Find a person", d: "Search by PAGER ID — no phone number required." },
      { t: "Choose a profile", d: "The user decides which space to open." },
      { t: "Set the rules", d: "Format and level of access are defined in advance." },
    ],
  },
  multiprofile: {
    head: { title: "MULTIPROFILE", meta: "ONE ACCOUNT / MANY SPACES" },
    h: ["ONE ACCOUNT.", "SEVERAL WAYS OF BEING YOURSELF."],
    quote: "I stay myself — I just open up differently.",
    body: "Multiprofile changes the familiar model of digital communication. One person can create separate spaces inside a single account, keeping control over how they are presented and how each interaction unfolds.",
    heroAlt: "One person across different communication spaces",
    cards: [
      { title: "ONE ACCOUNT", body: "No need for separate phone numbers or accounts." },
      { title: "DIFFERENT CONTEXTS", body: "Work, close relationships, new connections and communities stay distinct." },
      { title: "YOUR RULES", body: "Set the way you communicate and the access boundaries for every contact." },
    ],
    mobileLabel: "MOBILE / PROFILES",
    altDesktop: "Multiprofile — screen",
    altMobile: "Multiprofile — mobile screen",
    beats: [
      { label: "PROBLEM", text: "One digital presence for every relationship." },
      { label: "INSIGHT", text: "A digital profile never holds the whole person." },
      { label: "SOLUTION", text: "PAGER creates separate spaces for communication." },
      { label: "SCALE", text: "One person. Several ways of being yourself." },
    ],
    outro: ["Different.", "Always me!"],
  },
  contact: {
    head: { title: "CONTACT AND CONTEXT", meta: "ONE IDENTITY / MANY STATES" },
    h: ["ONE PERSON.", "DIFFERENT WAYS TO COMMUNICATE."],
    lead: "One person can be presented differently — depending on who is on the other side of the connection.",
    tablistAria: "Communication contexts",
    profileAlt: "Profile",
    accessLabel: "ACCESS",
    rulesLabel: "RULES",
    contexts: [
      { label: "Personal", access: "Full access", rules: "Calls, voice, media" },
      { label: "Work", access: "Working hours", rules: "Text, files, calls on agreement" },
      { label: "Guest", access: "Temporary access", rules: "Text only, limited period" },
      { label: "Special context", access: "On request", rules: "A separate space and its own rules" },
    ],
    summary:
      "PAGER links the contact to the profile: you choose which version of yourself to show, which rules to set and which level of access to open.",
  },
  product: {
    head: { title: "PRODUCT STATUS", meta: "PRIVATE BETA / Q3 2026 / ANDROID, IOS" },
    h: ["The foundation of a new", "model is already built"],
    lead: "PAGER already delivers the core idea of the product: a connection begins not with a message, but with the choice of profile, rules and format of interaction.",
    columns: [
      {
        title: "Built",
        items: ["Registration", "PAGER ID", "Search by ID", "Connection requests", "1:1 conversations"],
      },
      {
        title: "Core mechanics",
        items: [
          "Base profile",
          "Contextual profiles",
          "Control over communication modes",
          "Guest profile",
          "Temporary access",
        ],
      },
      {
        title: "Next steps",
        items: ["Audio and video calls", "Extended profile model", "Additional privacy controls"],
      },
    ],
    altDesktop: "PAGER — desktop interface",
    altScreen: "PAGER — screen",
  },
  business: {
    head: { title: "BUSINESS LAYER", meta: "MONETIZATION MODEL" },
    h: ["Monetization", "potential"],
    lead: "From a new way of communicating to a new communication platform.",
    tiers: [
      {
        title: "Premium",
        items: [
          "unique PAGER IDs",
          "extended profiles",
          "additional controls",
          "connection management",
        ],
      },
      {
        title: "Business",
        items: [
          "corporate profiles",
          "shared workspaces",
          "contact without exposing numbers",
          "API integrations",
        ],
      },
    ],
    layers: [
      {
        kicker: "Premium PAGER ID",
        title: "An identifier with status",
        body: "A short, memorable ID for personal and professional use.",
      },
      {
        kicker: "Advanced capabilities",
        title: "Control over connection",
        body: "Extended rules for communication, access and how a profile is presented.",
      },
      {
        kicker: "B2B / API",
        title: "Infrastructure",
        body: "Companies will be able to build secure channels to their customers without exposing personal contacts.",
      },
    ],
    outro:
      "Today PAGER changes personal communication. In the future the same model can become the infrastructure for governing digital connections between people and organizations.",
  },
  cta: {
    head: { title: "CONTACT", meta: "INVESTOR MATERIALS" },
    h: ["Join us in building", "a new format", "of communication"],
    lead: "We walk through the current product, the core PAGER mechanics, the private beta plan and the next stages of the platform.",
    button: "Request the deck and materials",
    mailSubject: "PAGER — deck and materials",
    footerCenter: "Private communication",
    top: "Back to top ↑",
  },
};
