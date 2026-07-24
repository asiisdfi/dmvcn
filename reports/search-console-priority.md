# Search Console 月度行动建议 (2026-07-24)

- 数据源：reports/search-console-export.csv
- 查询数据源：reports/private/search-console-query-export.csv
- 页面查询映射：reports/private/search-console-page-query-signals.csv
- 纳入页数：126
- 可见查询：1000 条；中文查询 25 条 / 47 次曝光
- 泛英文 DMV 大词曝光：531
- 可自动处理的中文信号：14；需要人工复核：3
- 原始查询词与页面映射保存在本地 `reports/private/`，不会提交到公开仓库。

## 中文查询信号
- 本月识别 14 个可自动处理信号，优先用于标题、摘要、入口和内部链接校准。

## 需要人工复核的查询信号
- 本月识别 3 个涉及医疗、复职或法律责任的信号；不自动改写对应高风险页面。

## 改标题/说明
- /states/new-york/（展现 23 / CTR 0.00 / 位置 31.8）— 已出现与州机构或具体业务一致的查询，标题和说明应采用用户实际用词。
- /states/florida/（展现 15 / CTR 0.00 / 位置 14.2）— 已出现与州机构或具体业务一致的查询，标题和说明应采用用户实际用词。
- /states/massachusetts/（展现 45 / CTR 2.22 / 位置 32.1）— 已出现与州机构或具体业务一致的查询，标题和说明应采用用户实际用词。

## 改正文内容
- /directories/dmv-services/（展现 1669 / 点击 0）— 有展现但无点击，说明内容未直接命中用户决策。先加 FAQ/失败场景/来源映射。
- /directories/new-residents/（展现 409 / 点击 0）— 有展现但无点击，说明内容未直接命中用户决策。先加 FAQ/失败场景/来源映射。
- /directories/costs-timing/（展现 220 / 点击 0）— 有展现但无点击，说明内容未直接命中用户决策。先加 FAQ/失败场景/来源映射。
- /topics/lost-stolen-license-plates-registration-card-sticker/（展现 180 / 点击 0）— 有展现但无点击，说明内容未直接命中用户决策。先加 FAQ/失败场景/来源映射。
- /directories/service-paths/（展现 171 / 点击 0）— 有展现但无点击，说明内容未直接命中用户决策。先加 FAQ/失败场景/来源映射。
- /topics/renewal-replacement-address/（展现 61 / 点击 0）— 有展现但无点击，说明内容未直接命中用户决策。先加 FAQ/失败场景/来源映射。
- /states/new-jersey/（展现 57 / 点击 0）— 有展现但无点击，说明内容未直接命中用户决策。先加 FAQ/失败场景/来源映射。
- /topics/gift-inherited-vehicle-title-transfer/（展现 56 / 点击 0）— 有展现但无点击，说明内容未直接命中用户决策。先加 FAQ/失败场景/来源映射。
- /topics/vehicle-registration-renewal-expired-tags-non-operation/（展现 246 / 点击 1）— 排名偏后且展现较多，可能命中问题但未提供高识别度答案结构。
- /topics/lost-vehicle-title-replacement-electronic-title-lien-sale/（展现 82 / 点击 2）— 排名偏后且展现较多，可能命中问题但未提供高识别度答案结构。

## 规则变化/下滑复核
