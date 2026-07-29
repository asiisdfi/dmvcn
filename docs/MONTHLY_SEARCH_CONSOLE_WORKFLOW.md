# Search Console 月度工作流

每次决策使用同一 Search Console 属性和时间窗口的四类证据：

1. 页面维度 CSV：`reports/search-console-export.csv`
2. 查询维度 CSV：`reports/private/search-console-query-export.csv`
3. 页面与查询映射：`reports/private/search-console-page-query-signals.csv`
4. 全站、国家和设备快照：`reports/private/search-console-segments.json`

另外可以记录最近 24 小时脉冲：`reports/private/search-console-pulse.json`。短周期脉冲只用于发现异常国家、设备差异、noindex 历史可见性和有点击页面，不保存原始查询，也不能替代上述四类完整证据。

这些原始文件不提交到公开仓库。完整导出后，先用导入器校验并生成上述输入：

```bash
npm run import:sc -- --global "/path/to/dmvcn.com-Performance-on-Search-YYYY-MM-DD.zip"
```

导入器直接读取 Google 导出的 ZIP 或解压目录，自动识别页面、查询、日期、国家、设备和过滤器 CSV，按日期曝光加权计算平均排名，并要求国家与设备汇总分别和全站点击、曝光完全一致。ZIP 文件名没有导出日期时，必须增加 `--observed-at YYYY-MM-DD`；自定义日期标签无法识别时才使用 `--window-days 30`。这个参数只是一项校验声明，必须与导出筛选标签或图表首尾日期的 30 天跨度相符，不能把较短导出强行标成 30 天。

需要刷新页面级查询映射时，在私有目录准备 manifest：

```csv
route,export
/states/massachusetts/real-id/,./exports/massachusetts-real-id.zip
/topics/proof-of-residency/,./exports/proof-of-residency.zip
```

已人工确认归属的查询另存为私有分类表：

```csv
route,query,classification
/topics/proof-of-residency/,示例地址材料词,selected-title
```

然后运行：

```bash
npm run import:sc -- \
  --global "/path/to/global.zip" \
  --pages "/path/to/page-manifest.csv" \
  --classifications "/path/to/query-classifications.csv"
```

没有人工分类的中文页面查询默认写成 `unreviewed-intent`；医疗、复职、吊销、债务或法律责任相关查询默认进入 `human-review-untriaged`。两者都不能触发标题或正文修改。`selected-title` 和 `target-intent` 表示查询确实属于当前页面；`misrouted-intent` 和 `overlap-review` 只用于检查落地页、内部链接或页面分工，不能作为扩写当前页面的依据。刷新某个页面时，导入器会替换该页面上次的查询集合，不会不断追加重复记录。

页面与查询映射使用 7 天有效期。超过 7 天的页面只进入自身的数据刷新队列，不能触发标题、正文或高风险人工复核；它不会冻结查询证据仍在有效期内的其他页面。已排期的页面分流还必须有 7 天内的 `reviewedThrough` 决策记录，否则退回路由复核。全站快照、查询导出、国家和设备汇总仍按全局门禁检查，缺失或过期时继续暂停全部内容动作。

计划报告虽然允许在 7 天内重复使用，但日期事件没有宽限期。`plannedFor`、`evaluateAfter`、noindex 索引复查日或下一内容容量日一旦到达，定时质量门禁会立即要求按当天日期重建计划；旧报告不能继续把已经到期的任务显示为“未来安排”。

落错页或意图重叠完成判断后，结论写入 `reports/search-console-routing-reviews.json`。台账不保存原始查询，只记录涉及页面、目标页面、已检查到哪一天、计划实施日、实际完成日和复评日。以内部链接完成分流时，还要用 `expectedLinks` 逐条登记来源页、目标页和具体中文 `anchorText`；“查看详情”“了解更多”等泛化锚文本不能作为意图分流合同。系统据此区分：

- 尚未判断：进入路由审查队列。
- 已判断但未实施：进入路由调整队列；记录判断本身不占内容名额，到了 `plannedFor` 后系统会把任务放入本轮执行，并先于普通内容候选扣减可用名额。
- 已实施：进入观察队列，到 `evaluateAfter` 后必须用新页面查询数据复评。
- 审查之后出现新信号：旧结论不再覆盖，问题自动重新进入审查。

页面修改完成后，不要分别手改路由台账和内容动作日志。先用 `--dry-run` 检查，再由同一个命令写入实际改动页、完成日、基线截止日和复评日：

```bash
npm run complete:sc-routing -- \
  --id <routing-review-id> \
  --changed-route </changed/page/> \
  --completed-at <YYYY-MM-DD> \
  --baseline-period-end <YYYY-MM-DD> \
  --evaluate-after <YYYY-MM-DD> \
  --summary "<实际完成的改动>" \
  --dry-run
```

去掉 `--dry-run` 才会写入。命令会拒绝早于 `plannedFor` 的完成记录、少于 14 天的观察期、重复任务、审查范围外的页面，以及会令滚动 7 天超过 3 个或当月超过 12 个的动作。`intent-links` 动作还必须把所有预期链接的来源页记入 `changedRoutes`。构建器会逐项核对台账中的 `changedRoutes` 与动作日志中的 `routingReviewId`；内部链接审计则会读取最终 HTML，确认每条已实施的 `expectedLinks` 位于正文区域，并逐字使用审查过的中文 `anchorText`。任一环节不一致都会停止发布。

需要先检查文件而不写入时增加 `--dry-run`。导入完成后运行：

```bash
npm run audit:search-console-import
npm run plan:sc
npm run audit:search-console
npm run plan:growth
npm run audit:growth
npm run plan:pulse
npm run audit:pulse
```

生成结果：

- `reports/search-console-priority.json`
- `reports/search-console-priority.csv`
- `reports/search-console-priority.md`
- `reports/growth-scorecard.json`
- `reports/growth-scorecard.md`
- `reports/search-console-pulse.json`
- `reports/search-console-pulse.md`

只有以下条件同时满足时才执行内容动作：

- `dataSnapshot.readyForPlanning` 为 `true`
- `execution.allowedNow` 大于 0
- 页面有经过分类的目标查询，并且这些查询在当前窗口至少产生 1 次点击或合计 5 次展示
- 页面没有 `unreviewed-intent` 等待分类信号
- 页面没有待处理的 `misrouted-intent` 或 `overlap-review`
- 页面不在冷却期
- 高风险查询已完成人工语义复核
- 本周和本月仍有内容容量

目标查询不足 5 次展示且没有点击时，页面进入低样本观察队列，不改标题或正文。查询落到不合适的页面，或多个页面争夺同一意图时，先检查 canonical、内部链接和页面分工，再决定合并、重定向或调整内容；判断、实施和复评必须分别留痕。没有页面级查询证据时，先在 Search Console 中过滤页面并补映射。已 `noindex` 但仍有曝光的 URL 进入索引清理观察，不作为扩写理由；每项必须记录开始日期和复查日期，逾期后仍有曝光会自动升级为索引状态检查。

每次内容修改后写入 `reports/search-console-actions.json`，至少等待 14 天再用新数据复评。长期指标以完整 30 天自定义窗口验收，28 天窗口只用于趋势判断。

因人工签字过期而执行的索引安全动作可以记录为 `action: "noindex"` 和 `countsTowardCadence: false`。它仍须登记完成日、基线截止日和索引复查日，但不占每周 2–3 个内容优化名额；其他动作不得用这个字段绕过发布节奏。

增长记分卡把美国点击与曝光占比、设备端效率、可见中文查询占比、异常国家流量和 noindex 历史曝光分别记录。页面维度与全站属性维度口径不同，索引噪声只用于判断清理优先级，不得从全站曝光中直接相减。`audit:growth` 会在发布前校验这些比例、长期目标和 30 天验收状态，防止把趋势数据误报为目标完成。

24 小时报告必须保持 `provisional`，并由 `audit:pulse` 检查国家和设备汇总、美国流量占比、noindex 可见性、点击页面观察状态、内容容量以及报告新鲜度。有点击但没有完整页面查询证据的 URL 只能进入观察队列；即使短期 CTR 或点击上升，也不能绕过 `hold-cadence`、冷却期或 30 天验收口径。
