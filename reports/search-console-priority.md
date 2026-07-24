# Search Console 月度行动建议 (2026-07-24)

- 数据源：reports/search-console-export.csv
- 查询数据源：reports/private/search-console-query-export.csv
- 页面查询映射：reports/private/search-console-page-query-signals.csv
- 分段快照：reports/private/search-console-segments.json
- 数据状态：可用于规划；快照 2026-07-24，最新完整数据 2026-07-21。
- 纳入页数：124
- 可见查询：1000 条；中文查询 25 条 / 47 次曝光
- 泛英文 DMV 大词曝光：531
- 可自动处理的中文信号：14；需要人工复核：3
- 原始查询词与页面映射保存在本地 `reports/private/`，不会提交到公开仓库。

## 本轮执行门禁

- 状态：暂停：本周或本月内容额度已用完。
- 最近 7 天已记录 19 个内容动作，本月已记录 19 个；当前可执行 0 个。
- 下一次出现内容容量的日期：2026-08-01；当日最多 3 个。
- 数据快照、查询导出和页面查询映射均通过新鲜度检查。

## 现在可执行

- 本轮不执行内容改写。

## 下一轮候选

- 当前没有同时满足目标查询证据、风险门禁和冷却期要求的候选。

## 先补页面查询映射

- /topics/lost-vehicle-title-replacement-electronic-title-lien-sale/（展现 82）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /topics/vehicle-registration-renewal-expired-tags-non-operation/（展现 246）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /topics/lost-stolen-license-plates-registration-card-sticker/（展现 180）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /topics/renewal-replacement-address/（展现 61）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /topics/gift-inherited-vehicle-title-transfer/（展现 56）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。

## 索引清理观察

- /directories/dmv-services/（展现 1669）— 页面已设置 noindex，等待 Google 退出索引，不按这些曝光扩写内容。
- /sources/（展现 952）— 页面已设置 noindex，等待 Google 退出索引，不按这些曝光扩写内容。
- /directories/service-paths/（展现 171）— 页面已设置 noindex，等待 Google 退出索引，不按这些曝光扩写内容。

## 中文查询信号
- 本月识别 14 个可自动处理信号，优先用于标题、摘要、入口和内部链接校准。

## 需要人工复核的查询信号
- 本月识别 3 个涉及医疗、复职或法律责任的信号；不自动改写对应高风险页面。

## 算法建议：改标题/说明

## 算法建议：改正文内容

## 泛英文曝光观察
- /states/new-jersey/（展现 57）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。

## 高风险人工复核
- /topics/older-driver-license-renewal-medical-review/（查询证据 1 条）— 查询涉及医疗、复职或法律责任，必须先做人工语义和官方依据复核。

## 规则变化/下滑复核

## 等待效果复评
- /topics/lost-vehicle-title-replacement-electronic-title-lien-sale/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-title-answer；等待 2026-08-07 后用新数据复评。
- /topics/vehicle-registration-renewal-expired-tags-non-operation/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-answer；等待 2026-08-07 后用新数据复评。
- /states/massachusetts/（本次数据仍建议 improve-title）— 2026-07-24 已完成 improve-title；等待 2026-08-07 后用新数据复评。
- /directories/new-residents/（本次数据仍建议 improve-answer）— 2026-07-24 已完成 improve-title-answer；等待 2026-08-07 后用新数据复评。
- /directories/costs-timing/（本次数据仍建议 human-review）— 2026-07-24 已完成 improve-title-answer；等待 2026-08-07 后用新数据复评。
- /topics/lost-stolen-license-plates-registration-card-sticker/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-answer；等待 2026-08-07 后用新数据复评。
- /topics/renewal-replacement-address/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-answer；等待 2026-08-07 后用新数据复评。
- /topics/gift-inherited-vehicle-title-transfer/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-title-answer；等待 2026-08-07 后用新数据复评。
- /topics/teen-driver-permit-gdl-parent-guide/（本次数据仍建议 observe）— 2026-07-24 已完成 improve-answer；等待 2026-08-07 后用新数据复评。
- /topics/vehicle-title-registration-insurance-after-move/（本次数据仍建议 observe）— 2026-07-24 已完成 improve-answer；等待 2026-08-07 后用新数据复评。
- /states/new-york/（本次数据仍建议 improve-title）— 2026-07-24 已完成 improve-title；等待 2026-08-07 后用新数据复评。
- /topics/name-change-chain/（本次数据仍建议 improve-title）— 2026-07-24 已完成 improve-title-answer；等待 2026-08-07 后用新数据复评。
- /states/florida/（本次数据仍建议 improve-title）— 2026-07-24 已完成 improve-title；等待 2026-08-07 后用新数据复评。
- /states/washington/（本次数据仍建议 observe）— 2026-07-24 已完成 improve-answer；等待 2026-08-07 后用新数据复评。
- /states/california/real-id/（本次数据仍建议 improve-title）— 2026-07-24 已完成 improve-title-answer；等待 2026-08-07 后用新数据复评。
- /states/new-york/real-id/（本次数据仍建议 improve-title）— 2026-07-24 已完成 improve-title-answer；等待 2026-08-07 后用新数据复评。
- /topics/first-driver-license-road-test/（本次数据仍建议 improve-title）— 2026-07-24 已完成 improve-title-answer；等待 2026-08-07 后用新数据复评。
