# DMV 身份与 SSN 分流表差异预审

- 页面：`/directories/identity-ssn/`
- 预审日期：2026-07-30
- 预审执行：Codex AI 辅助证据核查
- 人工签字基线：2026-07-21（commit `b01c07b`）
- 人工签字内容指纹：`451ff146b364df74a48e60163370b16147809508b7f9af3f2789b4a0f9f2a530`
- 本轮开始时指纹：`56ea7508a602303250d33d45bda7a8324c41cb4358f0ea1f197ccc6235dfe815`
- 本轮修正后指纹：`b3d1d7462f8c5ed2241a95581c1543def77ad4f5787b3c7db7da37a726c6de93`
- 发布状态要求：真人核对当前差异并签字前保持 `noindex,follow`，不得进入 sitemap

## 差异是怎样复算的

本轮分别在独立 worktree 重建：

1. 2026-07-21 人工签字版本 `b01c07b`。
2. 本轮开始前的已部署版本 `0d0a9b5`。
3. 本轮修正后的当前版本。

从三版成品 HTML 中逐条提取：

`州路径 + 分类 + 中文声明 + 就近官方来源 URL`

结果如下：

| 版本 | 可见声明 | 指纹 |
| --- | ---: | --- |
| 2026-07-21 人工签字基线 | 183 | `451ff146b364df74a48e60163370b16147809508b7f9af3f2789b4a0f9f2a530` |
| 本轮开始前 | 184 | `56ea7508a602303250d33d45bda7a8324c41cb4358f0ea1f197ccc6235dfe815` |
| 本轮修正后 | 186 | `b3d1d7462f8c5ed2241a95581c1543def77ad4f5787b3c7db7da37a726c6de93` |

与本轮开始前相比，当前版本有 36 条只改分类标签、7 条记录删除、9 条记录新增。标签修正没有改动对应中文声明或来源 URL。

与 2026-07-21 人工签字基线相比，当前版本有 35 条只改分类标签、2 条 Maryland 记录只换来源、7 条记录删除、10 条记录新增。

## 修正一：SSA 不再等于“无 SSN”

旧分类规则只要看到 `SSA` 就归入“无 SSN / SSA”。这会把以下三种完全不同的情况混在一起：

1. 确实没有 SSN，需提交 SSA ineligibility 或 denial 文件。
2. 已有 SSN，号码或姓名要由 SSA 核验。
3. 改名后先更新 SSA，再带姓名变更文件到 DMV。

当前规则只在声明明确写出无 SSN、不具资格、未获分配、denial、SSA-L676 等含义时使用“无 SSN / SSA”。正常 SSN 证明归入“SSN”，改名和姓名匹配归入“姓名 / 翻译”。

本轮逐条抽查最终分类：

- “无 SSN / SSA”共 20 条，均明确包含无 SSN、ineligibility、denial、未获分配或同等限定。
- “姓名 / 翻译”共 19 条，均直接涉及姓名链、改名、姓名匹配或外文文件翻译。
- Washington EDL/EID 和 Michigan Enhanced credential 的“仅美国公民”资格边界改归“公民身份”。
- 纯分类变化不改变原声明、州归属或官方来源。

## 修正二：住址 affidavit 不再混入身份目录

旧规则把任何包含 `affidavit` 的声明都当成身份或 SSN 线索，导致四条只谈住址的内容进入本页：

1. Maine 两人签署的 residency affidavit。
2. South Dakota Residency Affidavit 的居住州与 perjury 声明。
3. South Dakota full-time traveler / PMB 住址材料。
4. West Virginia homeowner 同住情形的 Affidavit of Residency。

这些声明可以在住址材料或州指南中保留，但不属于身份与 SSN 搜索意图。当前筛选要求 affidavit 同时出现 SSN、ITIN、identity、lawful presence、公民或移民身份线索，否则不进入本目录。

过滤后出现的更相关记录如下：

| 州 | 旧记录 | 当前记录 | 当前直接来源 |
| --- | --- | --- | --- |
| North Carolina | 上传工具的使用边界 | REAL ID 的 SSN 文件必须显示完整号码，Social Security card 不接受 photocopy、laminated card 或金属/塑料复制品 | `https://www.ncdot.gov/dmv/help/Pages/proving-social-security.aspx` |
| Missouri | 一般 REAL ID 材料概述 | 已有 Missouri 记录且 SSN 曾核验的人可能可以口头提供号码 | `https://dor.mo.gov/driver-license/issuance/id-requirements.html` |
| Maine | residency affidavit | name、SSN 或 immigration status 改变时要补对应文件 | `https://www.maine.gov/sos/bmv/driver-licenses-and-ids/real-id` |
| South Dakota | 两条 residency affidavit / PMB 说明 | online 需要 SSN 后四位；特定身份或资料更新情形须现场办理 | `https://www.sd.gov/dps?id=kb_article_view&sysparm_article=KB0043275` |
| West Virginia | homeowner residency affidavit | 没有足够强的替代声明，不为凑数补行 | 无新增 |

## 修正三：删除 Washington 弱提示

本轮开始前新增过一条：

> 续期身份证时先看卡面是 standard ID 还是 EID

来源只是 Washington DOL 的普通 ID 续期页面。该句能帮助选续期入口，却不能解释 SSN、公民资格或身份文件要求，因此从本目录删除。

Washington 仍保留三条有明确办事价值的记录：

1. EDL/EID 仅向美国公民签发，申请时要证明公民身份、本人身份、Washington residency 并提供 SSN。
2. 申请人要提供 SSN，但 EDL/EID 清单说明无需出示 Social Security card。
3. Standard Washington driver license / ID 不表示持有人具备特定居住或合法身份状态。

当前 Washington REAL ID 页面直接支持第一条和第三条；Enhanced Washington License or ID 清单支持第二条。

## 2026-07-21 基线之后的事实变化

### Colorado

基线中的 Standard credential / CO-RCSA affidavit 记录被当前 DR 2300A 的 SSN 规则替换：

> 2026 年 7 月版 DR 2300A 允许口头提供 SSN，或出示 Social Security card、W-2、1099 等文件，号码会经 SSA 核验

核对结果：

1. Colorado 当前 Forms in Number Order 页面说明列表只提供每份表格的最新版本，并列有 DR 2300A。
2. 当前 Required Identification Documents 页面明确允许现场口头提供号码，或携带 Social Security card、W-2、含完整号码的 pay stub、SSA-1099 或其他 1099。
3. 当前 REAL ID and Colorado 页面明确写明号码会经 Social Security Administration 核验。
4. 2026-07-29 州级来源复核已登记当前 DR 2300A 直接文件为 `07/09/26` 版本。

直接 PDF 在部分自动检查网络会返回 403，但当前官方表格目录和两份 HTML 页面可交叉支持整句含义。真人签核仍须从 Colorado DMV 当前表格目录打开 DR 2300A 核对版本。

### Maryland

两条中文声明没有扩大，只把已下线的 REAL ID FAQ 改接当前 `FO-150A`：

1. 年龄与身份、Social Security、两份 residency、lawful status、姓名链及原件 / certified copy。
2. 补交 REAL ID 材料时的一份年龄与身份、Social Security、两份 Maryland 实际住址和完整姓名链。

`FO-150A` 的两页正文已在材料规则目录预审中逐项核对。详细记录见：

`docs/review-evidence-preaudit-2026-07-30-document-rules.md`

## 新露出记录的语义核对

### North Carolina

当前 Proving Social Security 页面在 2026-07-24 更新，直接写明：

1. REAL ID 接受的 SSN 文件。
2. 1099、W-2 和 payroll record 要显示姓名与完整 SSN。
3. Social Security card 不接受 photocopy、laminated card、metal 或 plastic replica。

目录已把这一条的就近来源从宽泛 REAL ID 要求页改为该专页。

### Missouri

当前 Documents for Driver / Nondriver License & Instruction Permit 页面直接写明：已有 Missouri license 或 permit、且档案中的 SSN 以前已核验时，可以口头提供号码。中文保留“可能可以”，没有把该例外扩大到新申请人或未核验记录。

目录已把就近来源从一般 checklist 改为这份直接说明例外的页面。

### Maine

当前 REAL ID 页面说明，BMV 保存过的材料通常不必重复提交，但姓名、Social Security number 或 immigration status 发生变化时需要重新提供相关文件。当前中文没有把“改变”误写成每次续期都必须重交全部材料。

### South Dakota

当前 online renewal / replacement 页面直接支持：

1. online 需要 DL/ID number、date of birth 和 SSN 后四位。
2. 两份地址材料可 upload、email、fax 或 mail。
3. 十年内没有本人办理、改姓名或 class / endorsement、需要 drive test、使用 bioptic lenses 或更新 USCIS status 时要去现场。

两条当前记录均连接同一份直接来源。

### Georgia

此前 Georgia 已有逐条核对的 DDS 声明和官方入口，但通用证据关键词无法识别 `Georgia REAL ID` 与 `Information for Non-US Citizens` 两个来源标题，导致目录只显示“需核对”。当前逻辑仅在某州完全没有自动匹配记录时，才使用该州已经登记的声明级来源作为兜底；其他 49 州的现有记录没有替换或删除。

新增四条分别说明：

1. Online License/ID/Permit Form 要填写完整 SSN；在线核验失败时再带显示姓名和完整号码的 Social Security card、SSA printout、W-2、1099 或 pay stub。
2. 不具备 SSN 资格的人在 Customer Service Center 填 `DDS-351`；具有 DHS work authorization 的非公民必须申请 SSN。
3. 没有星标或从外州、外国转入时，按 identity/lawful status、SSN、two residency 和 name-change 四栏准备材料。
4. 首次 Georgia REAL ID 的材料组合包括一份 identity 或 lawful-status 文件、完整 SSN 核验、两份 Georgia 居住证明和适用的姓名变更文件。

第一、三、四条连接 Georgia DDS REAL ID；第二条连接 Information for Non-US Citizens。两页正文均在 2026-07-30 重新核对。

## 门禁结果

- 当前可见身份与 SSN 记录：186
- 每条记录的就近官方来源：186
- 覆盖 50 州
- 纯标签修正：36 条（相对本轮开始前）
- 删除弱或错意图记录：7 条
- 新增更直接的身份 / SSN 记录：9 条
- 当前内容指纹：`b3d1d7462f8c5ed2241a95581c1543def77ad4f5787b3c7db7da37a726c6de93`
- 当前页面是否可恢复索引：否，仍需真人核对当前版本

## 真人复核清单

1. 抽查 36 条标签变化，确认“无 SSN / SSA”没有被误用于正常 SSN 或改名流程。
2. 从 Colorado Forms in Number Order 打开当前 DR 2300A，核对版本、口头提供号码、可接受文件和 SSA 核验。
3. 打开 Maryland `FO-150A`，核对两条材料声明。
4. 打开 Washington REAL ID 和 Enhanced checklist，核对公民资格、SSN 和 Standard credential 边界。
5. 打开 North Carolina Proving Social Security，核对 laminated / replica 限制。
6. 打开 Missouri ID Requirements，核对“previously verified SSN”例外。
7. 打开 Maine REAL ID 和 South Dakota online renewal，核对本轮新增记录。
8. 打开 Georgia REAL ID 和 Information for Non-US Citizens，核对新增四条及 `DDS-351`、DHS work authorization 的适用边界。
9. 确认四条 residency affidavit 和 Washington“先看卡面”不再出现。
10. 完成当前指纹签字后再恢复索引；不得沿用 2026-07-21 旧签字。
