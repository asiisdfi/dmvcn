# Search Console 月度工作流

每次决策使用同一 Search Console 属性和时间窗口的四类证据：

1. 页面维度 CSV：`reports/search-console-export.csv`
2. 查询维度 CSV：`reports/private/search-console-query-export.csv`
3. 页面与查询映射：`reports/private/search-console-page-query-signals.csv`
4. 全站、国家和设备快照：`reports/private/search-console-segments.json`

这些原始文件不提交到公开仓库。导出和映射完成后运行：

```bash
npm run plan:sc
npm run plan:growth
```

生成结果：

- `reports/search-console-priority.json`
- `reports/search-console-priority.csv`
- `reports/search-console-priority.md`
- `reports/growth-scorecard.json`
- `reports/growth-scorecard.md`

只有以下条件同时满足时才执行内容动作：

- `dataSnapshot.readyForPlanning` 为 `true`
- `execution.allowedNow` 大于 0
- 页面有目标查询证据，不只是泛英文或本地曝光
- 页面不在冷却期
- 高风险查询已完成人工语义复核
- 本周和本月仍有内容容量

没有页面级查询证据时，先在 Search Console 中过滤页面并补映射。已 `noindex` 但仍有曝光的 URL 进入索引清理观察，不作为扩写理由。

每次内容修改后写入 `reports/search-console-actions.json`，至少等待 14 天再用新数据复评。长期指标以完整 30 天自定义窗口验收，28 天窗口只用于趋势判断。
