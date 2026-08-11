# Pager: Controlled Communication

Create a premium investor-facing single-page website for PAGER, a new private messenger built around controlled access, multiple communication profiles, PAGER ID, and user-defined communication boundaries.

IMPORTANT: This is not a generic SaaS landing page. Treat it as a designed communication instrument and an editorial product story.

ART DIRECTION — “PAGER / COMMUNICATION INSTRUMENT”
Combine four influences without literally copying any brand:
1. Swiss / International editorial design — this is the structural backbone: strict 12-column grid, asymmetric composition, strong typographic hierarchy, chapter numbering, technical labels, hairlines, intentional grid-breaking, editorial pacing.
2. Apple-like restraint — large negative space, product confidence, cinematic pacing, excellent hierarchy, minimal visual noise, sections allowed to breathe.
3. Teenage Engineering-like character — engineered/object-like feeling, precise labels, functional color coding, tactile/industrial interaction language, communication system presented as an instrument rather than a SaaS dashboard. Do NOT imitate OP-1 colors or product styling literally.
4. Vercel-like precision — black/white discipline, technical metadata, fine grid/hairlines, extremely polished interaction states and motion, clean implementation.

TARGET FEELING
The page should feel authored, art-directed and custom. It should communicate that PAGER is a new communication model that has been designed as a coherent system. Premium quality should come from precision, composition, typography and pacing — never from decorative luxury effects.

VISUAL SYSTEM
- Primary canvas: deep black / near-black (#050505–#0A0A0A), off-white, graphite.
- Use light editorial chapters selectively where narrative pacing benefits from contrast, especially the communication evolution/history section. Light backgrounds should be cold off-white, never beige.
- Main typography: Plus Jakarta Sans or an equally precise contemporary grotesk if technically necessary. Use a restrained monospace only for metadata, IDs, system labels, chapter numbers and technical annotations.
- Very large editorial headlines, sometimes spanning multiple rows/columns.
- 12-column desktop grid; strong mobile adaptation rather than desktop shrinking.
- Hairline rules and small technical labels.
- Profile colors are functional semantic markers, used sparingly: Personal green #20C997, Work blue #38BDF8, Guest #D4C4B7, Alter amber #FFCE7A.
- Do not make blue the generic site accent. Color should mean something.

STRICT BLACKLIST
NO generic SaaS aesthetic.
NO gradient blobs or aurora backgrounds.
NO purple/blue AI gradients.
NO excessive glassmorphism.
NO glowing borders.
NO neon/cyberpunk.
NO random particle fields.
NO generic floating dashboard cards.
NO decorative 3D spheres or rotating abstract blobs.
NO default bento-grid-as-design.
NO excessive rounded cards.
NO visible stock shadcn aesthetic — shadcn may be implementation infrastructure only.
NO animation on every element.
NO gratuitous marquee.
NO random blur.
NO scroll effects without narrative purpose.

MOTION LANGUAGE
Motion must explain the product. Use restrained premium motion. Prefer Motion and/or GSAP/ScrollTrigger where useful.
- StoryScroll: sticky cinematic narrative scenes.
- Typography masks/clipping instead of generic fade-ins.
- Subtle depth/parallax between foreground/background.
- Profile transitions where identity stays constant while access/profile context changes.
- Precise microinteractions for navigation and controls.
- Respect prefers-reduced-motion.
Do not add WebGL/3D in this first implementation. We may introduce one meaningful 3D moment later only if it expresses a PAGER-specific concept.

NARRATIVE ARCHITECTURE
Build the full page as chapters, not a stack of standard landing-page sections:
01 HERO STORYSCROLL — human problem → realization → control.
02 EVOLUTION — history of digital communication, culminating in controlled communication.
03 PAGER ID — identity / finding someone without immediately opening personal space.
04 MULTIPROFILE — one person, several ways to be yourself.
05 CONTACT CONTEXT — same person, different ways of communicating depending on who is on the other side.
06 PRODUCT STATUS — show that the core product mechanics already exist.
07 BUSINESS LAYER — Premium, Business, profile expansion, Premium PAGER ID, advanced capabilities, B2B/API.
08 FINAL CTA.

COPY — DO NOT REWRITE OR INVENT RUSSIAN COPY
Use the following Russian copy as source of truth. Preserve wording and hierarchy.

GLOBAL NAVIGATION:
ПРОДУКТ / ДЕМО / СТАТУС / БИЗНЕС
PRIVATE COMMUNICATION / 2026
CTA: Запросить презентацию / Как это работает

01 HERO
Kicker: МЕССЕНДЖЕР С УПРАВЛЯЕМЫМ ДОСТУПОМ
Manifesto:
ОБЩЕНИЕ
ПО ВАШИМ
ПРАВИЛАМ
Subtitle: Один аккаунт. Разные профили общения. Разные границы доступа.
Frame 01 / ХАОС:
ВАШЕ ПРОСТРАНСТВО — НЕ ДЛЯ ВСЕХ.
Один номер открывает доступ всем — семье, коллегам и случайным контактам.
Frame 02 / КОНТЕКСТ:
ОДИН ЧЕЛОВЕК — РАЗНЫЕ КОНТЕКСТЫ.
Для каждого контакта — свой профиль, свои правила и свой уровень доступа.
Frame 03 / КОНТРОЛЬ:
PAGER ВОЗВРАЩАЕТ КОНТРОЛЬ.
Вы сами решаете, как вас видят и как с вами общаются.
Launch: Private beta — Q3 2026 / App Store / Google Play — Q1 2027

02 EVOLUTION
Headline: НЕ СКОРОСТЬ. ВЫБОР!
Intro: Цифровое общение сделало нас доступными. Пора выбирать, как именно мы общаемся. Мы добавляем новый уровень коммуникации — разные профили, персональные правила и возможность управлять каждой связью.
Stages:
01 / E-mail — Передача информации. Как отправить сообщение?
02 / SMS — Доступная связь. Как связаться быстрее?
03 / Чаты, голос, видео — Мгновенное общение. Как общаться в реальном времени?
04 / Мультипрофиль — Управляемое общение. Как выбирать формат связи?
Progression: Передать → Соединять → Общаться → Управлять

03 PAGER ID
Eyebrow: Новый способ находить людей
Headline: НЕ НОМЕР. НЕ НИКНЕЙМ. PAGER ID
Lead: Новый способ начать связь без немедленного доступа к вашему личному пространству.
Today a phone number is simultaneously: способом найти человека; способом связаться; доступом к личному пространству.
Mechanic: PAGER ID позволяет найти человека и отправить запрос на связь, а пользователь сам выбирает, какой профиль открыть и какие условия общения установить.
Steps: Найти человека → Выбрать профиль → Правила
Use example PAGER IDs such as A490 3880 and treat IDs as engineered identity objects, not generic cards.

04 MULTIPROFILE
Headline: ОДИН ЧЕЛОВЕК. НЕСКОЛЬКО СПОСОБОВ БЫТЬ СОБОЙ.
Lead: Я остаюсь собой, но открываюсь по-разному.
Description: Мультипрофиль меняет привычную модель цифрового общения. Один человек может создавать разные пространства общения внутри одного аккаунта, сохраняя контроль над тем, как он представлен и как происходит каждое взаимодействие.
Problem: Одно цифровое представление для всех отношений.
Realization: Цифровой профиль не отражает всего человека.
Solution: PAGER создает разные пространства общения.
Scale: Один человек. Несколько способов быть собой.
Final thought: Разный. Но всегда я!

05 CONTACT CONTEXT
Headline: ОДИН ЧЕЛОВЕК. РАЗНЫЕ СПОСОБЫ ОБЩЕНИЯ.
Lead: Один человек может быть представлен по-разному — в зависимости от того, кто находится по другую сторону связи.
Mechanic: PAGER связывает контакт и профиль: вы выбираете, какую версию себя показать, какие правила установить и какой уровень доступа открыть.
Contexts: Личное / Работа / Гостевое / Особый контекст.
Treat these as states of one identity, not four unrelated persona cards.

06 PRODUCT STATUS
Headline: Основа новой модели общения уже создана
Description: PAGER уже реализует ключевую идею продукта: связь начинается не только с сообщения, а с выбора профиля, правил и формата взаимодействия.
Status: Private beta / Q3 2026 / Android, iOS
Built: Регистрация; PAGER ID; поиск по ID; запросы на контакт; 1:1-диалоги.
Core mechanics: Базовый профиль; контекстные профили; управление способами общения; гостевой профиль; временный доступ.
Next: Аудио- и видеозвонки; расширение модели профилей; дополнительные настройки приватности.

07 BUSINESS
Headline: Потенциал монетизации
Positioning: От нового способа общения к новой коммуникационной платформе.
Premium: уникальные PAGER ID; расширенные профили; дополнительные настройки; управление связями.
Business: корпоративные профили; рабочие пространства; связь без раскрытия номеров; API-интеграции.
Premium PAGER ID: Идентификатор поколения. Короткий и запоминающийся ID для личного и профессионального использования.
Advanced capabilities: Контроль над связью.
B2B / API: Инфраструктура. Компании смогут создавать безопасные каналы связи с клиентами без раскрытия личных контактов.
Final thought: Сегодня PAGER меняет личное общение. В будущем эта же модель может стать инфраструктурой управления цифровыми связями между людьми и организациями.

08 FINAL CTA
Headline: Присоединяйтесь к созданию нового формата общения
Description: Мы показываем текущий продукт, ключевую механику PAGER, план private beta и следующие этапы развития платформы.
CTA: Запросить презентацию и материалы
Footer: PAGER © 2026 / Private communication / Наверх

MEDIA STRATEGY
The final media assets will be supplied separately. Build intentional media slots/components now using these exact filenames/roles so replacement is straightforward:
Hero: Hero_storyscroll_img_RU_ENG_1.jpg, Hero_storyscroll_img_RU_2.jpg, Hero_storyscroll_img_RU_3.jpg
Evolution: 1_email.png, 2_sms.png, 3_chat.png, 4_pager.png
PAGER ID: pager_id_variation_002.jpg
Multiprofile desktop: mpf_desktop_1.png, mpf_desktop_2.png, mpf_desktop_3.png, mpf_desktop_4.png
Multiprofile mobile: Multiprofiles_mobile_img_1.png, Multiprofiles_mobile_img_2.png, Multiprofiles_mobile_img_3.png, Multiprofiles_mobile_img_.png
Contact context portraits: Hero_man_personal_1x.png, Hero_man_work_3x.png, Hero_man_guest_4x.png, Hero_man_alter_ego_5x.png. These portraits are cut-outs and must use contain, never object-cover.
Product candidate media will be integrated later.

IMPLEMENTATION REQUIREMENTS
- Build responsive desktop and mobile deliberately.
- Semantic HTML and accessible controls.
- Fast load; lazy-load non-critical media.
- Keep animation architecture modular.
- Use CSS variables/design tokens for color, spacing, typography and motion.
- Keep section components clean enough that we can iterate chapter by chapter.
- Do not invent fake metrics, fake investors, fake testimonials, fake market numbers or fake product screenshots.

FIRST PASS GOAL
Implement the complete coherent art-directed page framework and motion system, with high-quality placeholders for missing media. Prioritize composition, typography, grid, pacing and responsive behavior. The result should already feel like a custom premium communication product, not a template. Do not spend effort on backend/database/authentication.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/72a72738-09c6-49ce-9242-02207f4b8012).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
