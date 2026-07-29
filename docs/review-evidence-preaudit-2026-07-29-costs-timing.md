# 费用与处理时间目录证据预审

- 页面：`/directories/costs-timing/`
- 预审日期：2026-07-29
- 预审执行：Codex AI 辅助证据核查
- 当前内容版本：2026-07-29
- 当前公开事实核对日期：2026-07-29
- 最近人工签字日期：2026-07-21
- 风险等级：高风险
- 发布状态要求：真人重新签字前必须 `noindex,follow` 且不得进入 sitemap

## 本轮为什么重新检查

这页在 2026-07-24 根据 Search Console 信号调整了标题、摘要和开头说明，晚于 2026-07-21 的人工签字。页面因此已由发布门禁自动退出索引。

本轮先重建签字当天的页面，再与当前构建逐条比较。最初比较时，171 条可见声明、州归属和对应来源 URL 与签字基线完全一致；差异只在标题、摘要和风险提示。随后检查 2026-07-29 GitHub 空白环境的全量来源巡检，发现 Maryland 旧 REAL ID FAQ 当前返回 404。该 URL 虽被巡检器暂列为 `watch`，但人工追查确认页面已下线，不能继续充当声明级来源。

## 签字基线与当前版本

- 签字基线提交：`b01c07b`
- 基线可见声明：171
- 基线声明、州和来源指纹：
  `4fb3e31643ce713c3db47a2f1040866859c0fd5ccf518a2d933bfd5c1e733746`
- 发现 Maryland 问题前的当前指纹：与基线完全相同
- 修正后的当前可见声明：172
- 修正后的当前指纹：
  `5a7c27951f1c74d602e86cb5857746f4c984ba431150161ff4604ab40e3c8507`

本轮事实差异严格限定为 Maryland 一行：

1. 删除一条引用已下线 FAQ 的 `$20/$30` 对比。
2. 增加一条由现行费用表直接支持的 `$30` duplicate/corrected fee 声明。
3. 增加一条付款前回到现行费用表和交易报价确认的操作提醒。

其余 49 州的可见声明和来源映射未因本轮修改改变。

## Maryland 修正

### 删除的表述

> 旧 REAL ID FAQ 仍写升级费 $20，而 2025 年 9 月 1 日生效的当前 license fee 表把 duplicate 和 corrected license 都列为 $30，付款前应以当前费用表和交易报价再次确认。

删除原因：

- `https://mva.maryland.gov/Pages/realidfaq.aspx` 在 2026-07-29 返回 404。
- Maryland MVA 已在 2026 年重做网站，当前 License / ID 内容迁到新的路径。
- 即使旧页曾被搜索引擎缓存，也不应继续给用户展示失效入口或把旧金额当作当前比较基准。

### 当前表述

> Maryland 现行 License & ID Fees 页面自 2025 年 9 月 1 日起列出普通驾照 duplicate 和 corrected fee 均为 $30，实际金额仍应按证件类型、有效期和交易报价确认。

对应官方来源：

- https://mva.maryland.gov/licenses-ids/license-id-fees

当前官方费用页直接列出：

- 费用生效日期为 2025 年 9 月 1 日。
- Non-commercial driver's license duplicate fee 为 `$30`。
- Non-commercial driver's license corrected fee 为 `$30`。
- 部分证件费用会因年龄、证件类型或合法停留期限而变化。

相关材料与申请入口同时改为：

- https://mva.maryland.gov/licenses-ids/get-new-license-permit-or-id/identification-id-card

## 当前目录证据状态

- 州行：50
- 有具体费用、付款、临时凭证或寄送声明的州：47
- 暂不展示具体声明的州：Minnesota、Arkansas、Idaho
- 可见声明：172
- 显式 AI 辅助来源映射：172
- 自动语义猜测映射：0
- 当前唯一官方来源 URL：116
- 2026-07-29 GitHub 空白环境直接成功：95
- 因 403、传输限制或政府站防爬进入观察：21
- 硬失败：0
- 已下线 Maryland FAQ 是否仍在当前页面或结构化来源中：否

`watch` 只表示自动访问受限，不等于正文已经完成语义复核。本轮依靠签字基线逐条差异、现有州级声明映射和当前官方费用正文共同判断，不把链接存活检查冒充内容审核。

## 自动门禁结果

- 目录证据审计：通过
- 州级证据审计：通过
- 复合声明拆分检查：通过
- 每条可见声明恰好一个就近官方入口：通过
- Maryland 旧 FAQ 全站残留：0
- 当前人工签字是否覆盖修正后的内容：否
- 当前页面是否应进入 sitemap：否

## 真人复核交接

- [ ] 已在 `dmvcn` 浏览器空间打开当前费用目录。
- [ ] 已确认页面公开日期为 2026-07-29。
- [ ] 已确认 Maryland 不再展示旧 REAL ID FAQ。
- [ ] 已打开现行 Maryland License & ID Fees 页面。
- [ ] 已确认 duplicate 和 corrected non-commercial driver license fee 均为 `$30`。
- [ ] 已确认页面没有把 `$30` 扩大为所有证件或所有交易的固定费用。
- [ ] 已确认其余声明与 2026-07-21 签字基线的差异说明准确。
- [ ] 已确认 Minnesota、Arkansas、Idaho 没有被填入缺乏具体来源的金额或时限。

- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论：通过 / 退回修改 / 部分通过
- 修改或保留意见：
