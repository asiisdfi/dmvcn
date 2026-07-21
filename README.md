# DMV中文办事库

面向在美国中文用户的 DMV / REAL ID / 驾照办事信息库。

## 当前范围

- 首页：州选择、办事类型选择、重点州和专题入口。
- 50 个州总览页：覆盖美国 50 州。
- 50 个州 REAL ID 页。
- 37 个跨州专题页：REAL ID 基础、材料清单、地址证明、特殊地址证明、SSN、姓名变更、非公民身份、非 REAL ID 驾驶路径、State ID / non-driver ID、机场旅行、线上/现场分流、驾照/State ID 丢失被盗/补证/身份盗用、车牌/registration card/sticker 丢失被盗补办、临时牌照 / temporary tag / trip permit / dealer plate、DMV 诈骗短信/假罚单/假官网识别、费用和拿证时间、罚单/toll/registration hold、驾照记录/points/traffic school、suspended/reinstatement/SR-22、残疾停车 placard/plates、首次考驾照、路考当天车辆/陪同人/保险/租车/重考、青少年 GDL / parent consent / driver education、高龄驾驶/视力/医疗审查、中文笔试/翻译/口译、外国驾照 / IDP、学生/非居民/临时访客、搬州、车辆登记/车牌、车辆 registration 续期/过期/停驶、买二手车 title/lien/salvage/里程核查、车辆 title 补发/electronic title/lien、赠车/继承车辆 title 转移、车检/排放/VIN、卖车/退牌/保险收尾、续期/补证/地址变更等。
- 13 个入口目录页：入口表首页、50 州 REAL ID 官方入口表、50 州 DMV 常用业务入口表、DMV 线上/现场分流表、DMV 预约和办公室入口表、DMV 笔试、路考和 learner permit 入口表、DMV 考试语言、翻译和口译入口表、DMV 费用和拿证时间表、DMV SSN 和身份类别分流表、搬到新州后 DMV 办事入口表、DMV 外国/外州驾照转入和 IDP 入口表、DMV 材料规则表、DMV 期限提醒表。
- 中文练习题：Georgia 官方来源原型，含 20 道原创 Road Rules / Road Signs 练习题、逐题解释和官方依据；不收录或改写来历不明的旧题库。
- 合规页：About、Contact、Privacy、Terms、来源与更新、官方来源库。
- SEO：静态页面、canonical、Open Graph、修改时间、JSON-LD、robots.txt，以及直接列出全部 166 个可索引页面的单文件 sitemap。
- 内容审计记录：见 `CONTENT_AUDIT.md`。

## 内容原则

- 优先引用 DHS、TSA、USA.gov 和州 DMV/DPS/RMV/MVC/DDS 官方来源。
- 每个内容页展示核对日期。
- 不复制官方原文，改为中文解释、清单、步骤、常见错误和官方入口。
- 不冒充政府网站，不提供法律、移民或税务建议。

## 当前内容状态

当前内容已覆盖美国 50 州，每个州都有总览页和 REAL ID 页；100 个州级页面共显示 4,018 条声明级官方来源映射和 7,175 个官方来源链接，37 个跨州专题页登记 396 条“重点事实与官方依据”映射。州总览负责业务分流、机构入口和本州细节，REAL ID 页负责材料、流程和常见错误。全部州页至少是 `source-mapped`：已通过语义规则、州级来源白名单和最终 HTML 检查；其中 Alabama、Delaware、Rhode Island、New Hampshire、Louisiana、Oklahoma、Wisconsin、Utah、New Mexico、Missouri、Kansas、South Dakota、Mississippi、Maine、Hawaii、Wyoming、Alaska、Arkansas、Tennessee、Indiana、Minnesota、California、New York、Texas、Florida、Washington、New Jersey、Massachusetts、Illinois、Pennsylvania、Georgia、Maryland、Virginia、North Carolina、Michigan、Ohio、Arizona、Colorado、Nevada、Oregon 与 Connecticut 的总览和 REAL ID 共 82 页、3,769 个证据项已进一步逐条打开官方正文、重写并登记为 `ai-assisted`。两种状态都不冒充人工审核。费用、期限、材料、外国驾照和身份五个高风险目录当前有 723 条逐条来源映射，其中 644 条继承显式正文核对、79 条通过自动语义检查。Georgia 练习题另有 20 道原创题和 8 个 Georgia DDS 官方来源，由 `audit:practice` 检查逐题来源、解释、重复和旧站污染。`audit:content` 检查内容结构和专题事实来源；`audit:state-evidence` 检查 100 个州页的声明、字段、主题、官方链接、显式核验映射和成品渲染；`audit:directory-evidence` 阻止复合事实、编辑元话语、来源标题错配和目录覆盖退化；`audit:seo` 检查标题、描述、canonical、修改时间、结构化数据、sitemap 和前台内部术语。部分州政府域名会要求验证码、限制自动访问或响应较慢，相关页面已增加 USA.gov 州机动车服务目录或州级备用入口；详见 `CONTENT_AUDIT.md`。

## 重要上线前配置

1. 在部署平台设置两个 Production 环境变量，不需要修改源码：

   ```text
   PUBLIC_SITE_URL=https://www.your-domain.com
   PUBLIC_CONTACT_EMAIL=contact@your-domain.com
   ```

2. `PUBLIC_SITE_URL` 必须是 HTTPS 站点根地址。它会统一生成 canonical、Open Graph URL、robots 和 sitemap；`PUBLIC_CONTACT_EMAIL` 会显示在 Contact 页。

3. 第一版保持 Google Analytics 和 AdSense 关闭。以后接入时，同时更新脚本、隐私说明和适用的同意机制。

4. 上线后在 Google Search Console 提交：

   ```text
   https://your-domain.com/sitemap.xml
   ```

5. 上线前跑完整校验：

   ```sh
   PUBLIC_SITE_URL=https://www.your-domain.com \
   PUBLIC_CONTACT_EMAIL=contact@your-domain.com \
   npm run verify:launch
   ```

完整的托管参数、发布后检查和 Search Console 步骤见 `DEPLOYMENT.md`；可配置变量模板见 `.env.example`。

## 本地运行

```sh
npm install
npm run dev
```

## 构建和预览

```sh
npm run build
npm run preview
```

构建产物输出到 `dist/`，可以部署到 Vercel、Cloudflare Pages、Netlify 或任何静态托管服务。

## 链接审计

```sh
npm run audit:links
LINK_AUDIT_OWNER=colorado npm run audit:links
```

脚本通过结构化数据读取联邦来源、50 州机构首页、州级办理入口、州级来源和专题来源，并用浏览器 UA 检查状态码。`LINK_AUDIT_OWNER` 可按 state id 只检查本轮变更的来源；定期全站审计时不设置该变量。`403`、`429`、超时或空回复会归为 `watch`，代表政府网站可能限制自动访问，需要从机构首页或普通浏览器确认；`fail` 才表示更明确的硬失败。

## 内容体检

```sh
npm run audit:content
```

脚本会检查每个州和专题是否有核对日期、足够的材料清单、流程、官方入口、官方来源，以及 related topic / related state 是否真实存在。

## 高风险目录证据体检

```sh
npm run build
npm run audit:directory-evidence
```

脚本检查费用、期限、材料、外国驾照和身份五个目录。每条公开提示必须拆成单一事实、绑定当前州已登记的官方来源，并通过费用、期限、地址、SSN、lawful presence、外国驾照等主题的语义匹配；句子明确提到某个页面、FAQ 或表格时，链接必须匹配该来源标题。审计还设置每个目录的最低事实数和州覆盖门槛，避免规则调整后页面悄悄变薄。

## 州页面证据体检

```sh
npm run build
npm run audit:state-evidence
```

脚本检查 50 个州总览和 50 个州 REAL ID 页。摘要、材料、办理步骤、失败原因和州别细节会先拆成单条声明，再匹配当前州已登记的政府来源；审计读取最终 HTML，确认每条声明和来源都真实渲染、主题相符、没有跨州链接或模板漏项。自动结果只代表 `source-mapped`。完成正文核对的州必须在 `src/data/state-evidence-reviews.ts` 逐条登记显式来源和已打开的来源正文，审计确认整页没有漏项后才会升级为 `ai-assisted`。

## E-E-A-T 内容台账

```sh
npm run build
npm run audit:eeat
```

脚本会为全部可索引页面生成 `reports/eeat-inventory.json` 和 `reports/eeat-inventory.csv`，记录页面类型、风险等级、八项分数、作者和日期信号、事实来源映射，以及 `pending`、`source-mapped`、`ai-assisted`、`human-approved` 等核查状态。自动来源映射和 AI 辅助证据核对都不会被统计成人工审核；高风险页面没有真实人员签字时仍保持阻塞。普通模式用于持续盘点并阻止结构性关键错误；全部页面整改完成后使用 `npm run audit:eeat:strict` 作为最终门禁。

执行标准、90 天计划和月度 Search Console 流程分别见：

- `docs/EEAT_STANDARD.md`
- `docs/CONTENT_PLAN_90_DAYS.md`
- `docs/MONTHLY_SEARCH_CONSOLE_WORKFLOW.md`

后续建议执行（可选）：

- 每周执行一次：`npm run plan:quality`
- 每月执行一次：`SC_REPORT_PATH=./reports/search-console-export.csv npm run plan:sc`
- 人工签字导入：`SIGNOFF_CSV=docs/review-manual-signoff-template.csv npm run review:signoffs:import`

生成文件会在 `/quality/` 看板联动展示：

- `reports/quality-workbook.json|csv|md`
- `reports/search-console-priority.json|csv|md`

其中 `reviewer` 与 `reviewedAt` 必须由真实审核人员填写。

## SEO 体检

```sh
npm run build
npm run audit:seo
```

脚本会检查构建后的 HTML 是否有标题、描述、canonical、JSON-LD、内容修改时间、sitemap，并阻止内部状态、旧州数等过期文案出现在前台。

## 站点完整性体检

```sh
npm run build
npm run audit:site
```

脚本使用 HTML 解析器检查所有构建页面的内部链接、本地资源、页内锚点、元素 ID 引用、重复 ID、图片替代文本和尺寸，并确认除 404 外的页面都能从首页到达。

## 上线配置体检

```sh
npm run audit:launch
```

脚本会检查真实 `PUBLIC_SITE_URL`、`PUBLIC_CONTACT_EMAIL`、构建后的首页 canonical、Contact 邮箱、robots.txt 和 sitemap。未配置真实域名或邮箱时会失败，这是预期的上线前提醒。

## 扩展内容

主要数据在 `src/data/content.ts`：

- 新增州：向 `states` 数组增加一条州数据。
- 新增专题：向 `topics` 数组增加一条专题数据。
- 更新来源：修改对应页面的 `sources` 或 `actionLinks`。

页面模板会自动生成路由；`src/pages/sitemap.xml.ts` 会把静态页、目录、州页、专题页和练习题汇总到单个 `/sitemap.xml`。

目录页在 `src/pages/directories/`，由 `states` 数组自动生成表格内容；更新州数据后会同步反映到 REAL ID 入口表、DMV 常用业务入口表、线上/现场分流表、预约和办公室入口表、笔试/路考/learner permit 入口表、考试语言/翻译/口译入口表、费用和拿证时间表、SSN 和身份类别分流表、新居民入口表、外国/外州驾照转入表、材料规则表和期限提醒表。
