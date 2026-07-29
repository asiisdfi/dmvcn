# DMV 材料规则表差异预审

- 页面：`/directories/document-rules/`
- 预审日期：2026-07-30
- 预审执行：Codex AI 辅助证据核查
- 人工签字基线：2026-07-21（commit `b01c07b`）
- 人工签字内容指纹：`d374a93cd343400d717c3eab0d0ad3fa347e05040dc6599bc90cd185a326b2b3`
- 本轮修正前指纹：`f30fb5095fdb3093ef33eb52bd3fcef69c87d46f091de1d1df750dfc6f0c0d86`
- 本轮修正后指纹：`4391ec8044dd55beb3ea01907d6b045e32a97ae718402306d514034272498b78`
- 发布状态要求：真人核对当前差异并签字前保持 `noindex,follow`，不得进入 sitemap

## 差异是怎样复算的

本轮在独立 worktree 重建 2026-07-21 人工签字版本，再从基线和当前成品 HTML 中提取每条可见记录：

`州路径 + 分类 + 中文声明 + 就近官方来源 URL`

两版均为 196 条。当前版本有 193 条记录与人工签字版本完全一致，只有 Maryland 三条记录被替换。

### 记录一：REAL ID 补材料

中文声明没有变化：

> 需要补交 Maryland REAL ID 材料时，通常要覆盖一份年龄与身份、Social Security 信息、两份 Maryland 实际住址证明和适用的完整姓名变更链，并把原件或签发机关认证件带到 MVA

- 旧来源：已下线的 `https://mva.maryland.gov/Pages/realidfaq.aspx`
- 当前来源：`https://mva.maryland.gov/Documents/FO-150A.pdf`

### 记录二：新居民地址证明

旧声明：

> 准备两份印有本人姓名和 Maryland physical address 的住址材料，姓名与地址要和 MVA 记录一致

当前声明：

> 新居民转入时，准备两份印有本人姓名和 Maryland 地址的住址材料，文件姓名必须与年龄和身份证明上的姓名一致

- 旧来源：已下线的 Maryland REAL ID FAQ
- 当前来源：`https://mva.maryland.gov/your-mva-guide/new-maryland-residents/get-maryland-drivers-license-or-id-card`

### 记录三：材料核对步骤

中文声明没有变化：

> 逐项核对年龄与身份、Social Security、两份 residency、lawful status 和完整姓名链，并只准备原件或签发机关认证件

- 旧来源：已下线的 Maryland REAL ID FAQ
- 当前来源：Maryland MVA `FO-150A`

## 为什么要收窄地址证明说明

旧 FAQ 曾写明住址材料上的姓名和地址要与 MVA 档案一致，但该页面已经下线。不能因为搜索引擎仍保存旧摘要，就把这句话继续挂到内容不同的新来源上。

当前 New Resident License or ID 页面直接写明：

1. 新居民转入要提供年龄与身份、Social Security 和两份 Maryland residency 文件。
2. 两份住址材料要印有申请人的姓名和 Maryland 地址。
3. 住址材料上的姓名要与年龄和身份证明上的姓名一致。
4. 该业务要求带原件，不接受 copy、scan 或 photocopy。

因此当前中文明确限定为“新居民转入”，并使用现行页面的姓名匹配对象，不再沿用旧 FAQ 的“MVA 记录”措辞。Maryland 州指南中的对应常见错误也同步收窄。

## FO-150A 语义核对

本轮读取的 Maryland MVA `FO-150A (03-24)` 共两页，正文直接支持：

1. 未在 MVA 留档的申请人办理新办或续期 DL / ID 时要提交材料。
2. 文件必须是原件或 certified copy；普通 photocopy、notarized copy 和被涂改文件不接受。
3. current legal name 要与所交文件一致；不一致时要提供政府签发的姓名变更文件。
4. U.S. citizen / permanent resident 和 temporary lawful status 分别有 identity 与 Social Security 材料路径。
5. 两类路径均要求从第二页选择两份 residency documents。
6. 第二页明确写有 physical address and residency，列出可接受的 Maryland 住址材料。

`FO-150A` 因 Maryland MVA 的 Cloudflare 策略，在 GitHub runner 和本地网络可能返回 404 或 403；政府搜索索引仍能读取这份两页 PDF。页面已经显示 Maryland 官方深层链接可能受限的提醒，并提供 MVA 首页和 USA.gov 备用入口。自动访问受限不能代替真人阅读，所以该页继续保持待签核状态。

## 当前在线来源状态

GitHub Actions `30470671993` 在 2026-07-30 完成全量政府链接检查。按当前 196 条材料规则去重后共有 116 个就近来源：

- 直接成功：96
- 自动访问受限或允许观察：20
- 待确认硬失败：0
- 已确认失效：0
- 未进入本月检查：0

该轮从 GitHub runner 访问 New Resident License or ID 和 Identification Card 页面均为 HTTP 200；`FO-150A` 在 runner 返回自动 404，但在政府索引可读取完整两页正文，因此保留 URL 级 `watch`。已下线的旧 REAL ID FAQ 已从内容库存和自动 404 观察白名单删除，不能再被当作当前来源引入。

## 门禁结果

- 当前可见材料规则记录：196
- 每条记录的就近官方来源：196
- 覆盖有材料规则记录的州：50
- 与旧人工签字版本完全相同：193
- 当前差异记录：3
- 目录证据审计错误：0
- 州级声明来源审计错误：0
- 旧 Maryland FAQ 是否仍在内容库存：否
- “与 MVA 记录一致”是否继续出现在 Maryland 当前说明：否
- 当前页面是否可恢复索引：否，仍需真人核对当前版本

## 真人复核交接

- [ ] 已在 `dmvcn` 浏览器空间打开当前材料规则目录。
- [ ] 已确认 196 条记录中只有 Maryland 三条相对旧签字版本被替换。
- [ ] 已确认其中两条中文未变，只把已下线 FAQ 改为 `FO-150A`。
- [ ] 已打开 `FO-150A`，确认 identity、Social Security、两份 residency、姓名链和原件 / certified copy 要求。
- [ ] 已打开 New Resident License or ID 页面，确认两份住址材料上的姓名、Maryland 地址和身份证明匹配规则。
- [ ] 已确认当前中文把该条限制在新居民转入，没有写成所有 Maryland 交易的统一规则。
- [ ] 已确认旧 FAQ 和“与 MVA 记录一致”的旧表述不再出现在成品页。
- [ ] 已确认每条 Maryland 记录旁边显示的是本轮核对的直接来源。
- [ ] 已确认页面继续显示 `noindex,follow`，且不在 sitemap。

- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论：通过 / 退回修改 / 部分通过
- 修改或保留意见：
