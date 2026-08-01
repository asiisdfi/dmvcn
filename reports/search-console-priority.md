# Search Console 月度行动建议 (2026-08-01)

- 数据源：reports/search-console-export.csv
- 查询数据源：reports/private/search-console-query-export.csv
- 页面查询映射：reports/private/search-console-page-query-signals.csv
- 分段快照：reports/private/search-console-segments.json
- 路由决策台账：reports/search-console-routing-reviews.json
- 数据状态：可用于规划；快照 2026-08-01，最新完整数据 2026-07-29。
- 页面查询映射：24/40 个页面在 7 天有效期内；过期页面只暂停自身动作。
- 纳入页数：120
- 可见查询：1000 条；中文查询 48 条 / 131 次曝光
- 泛英文 DMV 大词曝光：633
- 中文候选信号：25；需要人工复核：3
- 原始查询词与页面映射保存在本地 `reports/private/`，不会提交到公开仓库。

## 本轮执行门禁

- 状态：暂停：没有满足目标查询证据的候选。
- 最近 7 天已记录 2 个内容动作，本月已记录 2 个；当前可执行 0 个，其中页面分流 0 个。
- 下一次出现内容容量的日期：2026-08-01；当日最多 1 个。
- 数据快照、查询导出和页面查询映射均通过新鲜度检查。

## 现在可执行

- 本轮不执行内容改写或页面分流。

## 下一轮候选

- 当前没有同时满足目标查询证据、风险门禁和冷却期要求的候选。

## 先补页面查询映射

- /states/north-dakota/（展现 87）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /topics/vehicle-inspection-emissions-smog-vin-check/（展现 84）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /topics/driver-license-suspension-reinstatement-sr22/（展现 73）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /states/texas/real-id/（展现 71）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /states/virginia/real-id/（展现 67）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /topics/ssn-and-itin/（展现 67）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /states/montana/real-id/（展现 66）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /states/louisiana/（展现 64）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /topics/online-office-appointment/（展现 59）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /states/indiana/real-id/（展现 59）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /states/colorado/（展现 55）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。
- /states/arkansas/real-id/（展现 55）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。

## 先确认页面查询意图

- 当前没有尚未分类的页面级中文查询。

## 先复核落地页与页面分工

- 当前没有尚未完成分工判断的误落页或意图重叠信号。

## 已判定，等待实施分流

- 当前没有等待实施的路由调整。

## 已处理，等待效果复评

- /topics/real-id-vs-standard-license/ → /topics/real-id-vs-standard-license/（2026-08-12 复评）— 通用的 REAL ID、Enhanced ID 与普通驾照区别由比较专题主承接。现有标题、开头和正文范围已经符合该任务，不因少量曝光改写内容，等待新数据验证。
- /topics/state-id-non-driver-id-real-id-card/ → /topics/real-id-vs-standard-license/、/states/california/real-id/（2026-08-15 复评）— 在 State ID 页增加通用证件比较和加州 REAL ID 两条分流入口，避免州别与比较意图混在本页。
- /topics/real-id-basics/ → /topics/real-id-vs-standard-license/（2026-08-15 复评）— 在 REAL ID 基础页增加证件类型比较入口，把区别类查询引导到专门对比页。
- /directories/new-residents/ → /states/washington/（2026-08-07 复评）— 把误落在搬州目录的身份证续期中文需求接回华盛顿州页，并补充 Standard ID、Enhanced ID、续期分流和官方入口。

## 目标查询样本不足

- /topics/proof-of-residency/（目标曝光 2 / 点击 0）— 未达到 5 次曝光或 1 次点击，继续观察。
- /states/massachusetts/real-id/（目标曝光 1 / 点击 0）— 未达到 5 次曝光或 1 次点击，继续观察。

## 索引清理观察

- /directories/dmv-services/（展现 2777）— 2026-07-24 已设置 noindex，2026-08-21 复查 Google 索引状态；观察期内不按这些曝光扩写内容。
- /sources/（展现 1490）— 2026-07-24 已设置 noindex，2026-08-21 复查 Google 索引状态；观察期内不按这些曝光扩写内容。
- /directories/service-paths/（展现 976）— 2026-07-24 已设置 noindex，2026-08-21 复查 Google 索引状态；观察期内不按这些曝光扩写内容。
- /directories/costs-timing/（展现 493）— 2026-07-29 已设置 noindex，2026-08-26 复查 Google 索引状态；观察期内不按这些曝光扩写内容。
- /topics/lost-vehicle-title-replacement-electronic-title-lien-sale/（展现 179）— 2026-07-29 已设置 noindex，2026-08-26 复查 Google 索引状态；观察期内不按这些曝光扩写内容。
- /topics/tickets-tolls-insurance-lapse-registration-hold/（展现 140）— 2026-07-29 已设置 noindex，2026-08-26 复查 Google 索引状态；观察期内不按这些曝光扩写内容。
- /topics/gift-inherited-vehicle-title-transfer/（展现 95）— 2026-07-29 已设置 noindex，2026-08-26 复查 Google 索引状态；观察期内不按这些曝光扩写内容。
- /topics/name-change-chain/（展现 27）— 2026-07-29 已设置 noindex，2026-08-26 复查 Google 索引状态；观察期内不按这些曝光扩写内容。

## 中文查询信号
- 本月识别 25 个中文候选信号；只有完成页面归属分类的信号才用于标题、摘要、入口和内部链接校准。

## 需要人工复核的查询信号
- 本月识别 3 个涉及医疗、复职或法律责任的信号；不自动改写对应高风险页面。

## 算法建议：改标题/说明

## 算法建议：改正文内容

## 泛英文曝光观察
- /topics/lost-stolen-license-id-replacement-identity-theft/（展现 99）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /topics/sold-car-release-liability-plates-insurance/（展现 103）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/tennessee/（展现 94）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /topics/temporary-tag-trip-permit-dealer-plate/（展现 83）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/south-dakota/（展现 211）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/georgia/（展现 134）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/south-carolina/（展现 122）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/north-carolina/（展现 121）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/washington/real-id/（展现 118）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/rhode-island/（展现 105）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/colorado/real-id/（展现 102）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/connecticut/（展现 101）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/delaware/（展现 94）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/indiana/（展现 94）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/michigan/（展现 87）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/north-carolina/real-id/（展现 83）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/new-hampshire/（展现 81）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。
- /states/mississippi/（展现 62）— 现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。

## 高风险人工复核

## 待分类查询

## 路由与重叠复核

## 路由调整待办

## 路由调整观察
- /topics/real-id-vs-standard-license/ → /topics/real-id-vs-standard-license/（2026-08-12 复评）— 2026-07-29 已确认现有页面承接正确；等待 2026-08-12 后用新数据复评。
- /topics/state-id-non-driver-id-real-id-card/ → /topics/real-id-vs-standard-license/、/states/california/real-id/（2026-08-15 复评）— 在 State ID 页增加通用证件比较和加州 REAL ID 两条分流入口，避免州别与比较意图混在本页。
- /topics/real-id-basics/ → /topics/real-id-vs-standard-license/（2026-08-15 复评）— 在 REAL ID 基础页增加证件类型比较入口，把区别类查询引导到专门对比页。
- /directories/new-residents/ → /states/washington/（2026-08-07 复评）— 把误落在搬州目录的身份证续期中文需求接回华盛顿州页，并补充 Standard ID、Enhanced ID、续期分流和官方入口。

## 低样本目标查询
- /topics/proof-of-residency/（目标曝光 2 / 点击 0）— 目标查询目前只有 2 次曝光、0 次点击；达到 5 次曝光或 1 次点击前继续观察。
- /states/massachusetts/real-id/（目标曝光 1 / 点击 0）— 目标查询目前只有 1 次曝光、0 次点击；达到 5 次曝光或 1 次点击前继续观察。

## 规则变化/下滑复核

## 等待效果复评
- /states/massachusetts/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-title；等待 2026-08-07 后用新数据复评。
- /topics/vehicle-registration-renewal-expired-tags-non-operation/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-answer；等待 2026-08-07 后用新数据复评。
- /topics/state-id-non-driver-id-real-id-card/（本次数据仍建议 routing-monitor）— 2026-08-01 已完成 routing-action；等待 2026-08-15 后用新数据复评。
- /states/new-york/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-title；等待 2026-08-07 后用新数据复评。
- /topics/vehicle-title-registration-insurance-after-move/（本次数据仍建议 observe-non-target）— 2026-07-24 已完成 improve-answer；等待 2026-08-07 后用新数据复评。
- /states/washington/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-answer；等待 2026-08-07 后用新数据复评。
- /states/new-york/real-id/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-title-answer；等待 2026-08-07 后用新数据复评。
- /topics/real-id-basics/（本次数据仍建议 routing-monitor）— 2026-08-01 已完成 routing-action；等待 2026-08-15 后用新数据复评。
- /directories/new-residents/（本次数据仍建议 routing-monitor）— 2026-07-24 已完成 improve-title-answer；等待 2026-08-07 后用新数据复评。
- /topics/lost-stolen-license-plates-registration-card-sticker/（本次数据仍建议 observe-non-target）— 2026-07-24 已完成 improve-answer；等待 2026-08-07 后用新数据复评。
- /topics/renewal-replacement-address/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-answer；等待 2026-08-07 后用新数据复评。
- /topics/teen-driver-permit-gdl-parent-guide/（本次数据仍建议 observe-non-target）— 2026-07-24 已完成 improve-answer；等待 2026-08-07 后用新数据复评。
- /states/florida/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-title；等待 2026-08-07 后用新数据复评。
- /states/california/real-id/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-title-answer；等待 2026-08-07 后用新数据复评。
- /topics/first-driver-license-road-test/（本次数据仍建议 needs-query-evidence）— 2026-07-24 已完成 improve-title-answer；等待 2026-08-07 后用新数据复评。
