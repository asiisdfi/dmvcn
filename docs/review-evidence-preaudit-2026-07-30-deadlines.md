# DMV 期限提醒表差异预审

- 页面：`/directories/deadlines/`
- 预审日期：2026-07-30
- 预审执行：Codex AI 辅助证据核查
- 人工签字基线：2026-07-21（commit `b01c07b`）
- 人工签字内容指纹：`7969c567dda577feaa1a7abe29207b5e5271e21ee6f97c218b4ce2d3d762d8fd`
- 本轮修正前指纹：`4a4086f3c12f1234b7c13a6cb0062664ab64ee4af3a47fba5506369711f09512`
- 本轮修正后指纹：`16dd88469e8da47918da3d94e09b71a0e8a3975adb36040a19729fdf7ef262d7`
- 发布状态要求：真人核对当前差异并签字前保持 `noindex,follow`，不得进入 sitemap

## 差异是怎样复算的

本轮在独立 worktree 重建 2026-07-21 人工签字版本，再从基线和当前成品 HTML 中提取每条可见记录：

`州路径 + 分类 + 中文声明 + 就近官方来源 URL`

两版均为 126 条。修正完成后，125 条记录完全一致，只有 Oklahoma 一条记录被替换：

### 旧记录

- 分类：期限提醒
- 声明：办结后保存 temporary credential 和交易编号，30 天未收到实体卡时用 Navigate 查状态并联系 Service Oklahoma
- 就近来源：`https://oklahoma.gov/service/popular-services/real-id-checklist.html`

### 当前记录

- 分类：处理 / 邮寄
- 声明：实体卡通常会在 30 天内邮寄到达，超过 30 天仍未收到时，在 Navigate 查看卡片状态并联系 Service Oklahoma
- 就近来源：`https://oklahoma.gov/service/popular-services/new-dl.html`

## 为什么要修正 Oklahoma

本轮重新读取三份 Service Oklahoma 当前正文：

1. REAL ID Checklist 支持 temporary paper credential、实体卡通常在 30 天内寄达以及出行前预留时间。
2. Renew or Replace Driver License 支持线上申请的 temporary credential 和实体卡预计 30 天内寄达。
3. New Driver License & State ID Card FAQ 明确写有：卡片通常在到访后 30 天内邮寄；可以在 Navigate 查看状态；超过 30 天仍未收到时联系 Service Oklahoma。

旧句存在两个问题：

- “交易编号”没有在本轮打开的三份政府正文中找到依据。
- 目录旁边只显示 REAL ID Checklist，但“Navigate 查看状态并在超过 30 天后联系”的完整路径实际来自 New Driver License & State ID Card FAQ。

因此删除“交易编号”，并把中文声明缩到当前 FAQ 能直接支持的范围。当前目录记录只连接该 FAQ，不再用一份不完整的来源支撑复合结论。

## Washington 记录核对

2026-07-24 的目录去重逻辑曾影响 Washington 候选记录顺序，但当前三条成品记录与 2026-07-21 人工签字版本完全一致。本轮重新打开现行正文，结果如下：

1. Renew Driver License：standard license 可提前 1 年续期，并可在到期后最多 8 年内续期；官网同时提醒过期驾驶可能产生 ticket 或 fine。
2. Change Your Name or Address：搬家后 10 天内更新 driver license 或 ID 地址。
3. Moving to Washington：搬入后 30 天内取得 Washington driver license，并在登记车辆前先取得 Washington license。

三份页面均返回 HTTP 200，当前中文没有把一条期限扩大到其他业务或其他州。

## 当前来源覆盖

GitHub Actions `30469357751` 在 2026-07-30 完成全量政府链接检查。当前期限目录的 110 个唯一来源状态为：

- 直接成功：82
- 自动访问受限或超时，保留观察：28
- 待确认硬失败：0
- 已确认失效：0
- 未进入本月检查：0

`watch` 只表示自动请求受限，不能代替语义核查。当前替换使用的 Service Oklahoma FAQ 在该轮为 HTTP 200，本轮也直接读取成功。

## 门禁结果

- 当前可见期限记录：126
- 每条记录的就近官方来源：126
- 覆盖有具体期限记录的州：47
- 目录证据审计错误：0
- 州级声明来源审计错误：0
- Washington 与旧签字版本是否一致：是
- Oklahoma 无依据的“交易编号”是否删除：是
- Oklahoma 状态查询是否改连完整支持该句的 FAQ：是
- 当前页面是否可恢复索引：否，仍需真人核对当前版本

同一 Oklahoma 声明也会进入费用与处理时间目录，因此 `/directories/costs-timing/` 的当前内容指纹同步变为 `78d9ebed6895a9fedea0fdf20922905aeed27bda5da1d64252bdb8221ce65a84`。该页同样继续保持 `noindex,follow`，旧签字不会自动恢复。

## 真人复核交接

- [ ] 已在 `dmvcn` 浏览器空间打开当前期限目录。
- [ ] 已确认 126 条记录中只有 Oklahoma 一条相对旧签字版本被替换。
- [ ] 已确认旧句中的“交易编号”没有继续出现在页面。
- [ ] 已打开 Service Oklahoma New Driver License & State ID Card FAQ。
- [ ] 已确认 30 天寄达、Navigate 查看状态和超过 30 天后联系三部分属于同一 FAQ。
- [ ] 已确认目录旁边显示的就近来源就是该 FAQ。
- [ ] 已打开 Washington 的续期、改址和新居民页面。
- [ ] 已确认 Washington 的 1 年 / 8 年、10 天和 30 天分别对应正确业务。
- [ ] 已确认这些州级期限没有被写成全国统一规则。
- [ ] 已确认页面继续显示 `noindex,follow`，且不在 sitemap。

- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论：通过 / 退回修改 / 部分通过
- 修改或保留意见：
