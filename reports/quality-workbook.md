# 本周质量工作簿（2026-08-01）

- 页面数：166
- 当前可索引：155
- 当前 noindex：11
- 高风险待人工签字：8
- 待逐页官方正文语义核对：0
- 阻塞项：8
- 弱意图待处理：0

## 人工签字队列（高风险）

| 路由 | 风险 | 分数 | 状态 | 说明 | 建议截止 |
| --- | --- | --- | --- | --- | --- |
| /topics/gift-inherited-vehicle-title-transfer/ | high | 97 | human-approval-stale | 对照当前修改后的正文与逐条政府来源重新人工核查 | 2026-09-19 |
| /topics/lost-vehicle-title-replacement-electronic-title-lien-sale/ | high | 97 | human-approval-stale | 对照当前修改后的正文与逐条政府来源重新人工核查 | 2026-09-19 |
| /topics/name-change-chain/ | high | 97 | human-approval-stale | 对照当前修改后的正文与逐条政府来源重新人工核查 | 2026-09-19 |
| /topics/tickets-tolls-insurance-lapse-registration-hold/ | high | 97 | human-approval-stale | 对照当前修改后的正文与逐条政府来源重新人工核查 | 2026-09-19 |
| /directories/costs-timing/ | high | 98 | human-approval-stale | 对照当前修改后的正文与逐条政府来源重新人工核查 | 2026-09-19 |
| /directories/deadlines/ | high | 98 | human-approval-stale | 对照当前修改后的正文与逐条政府来源重新人工核查 | 2026-09-19 |
| /directories/document-rules/ | high | 98 | human-approval-stale | 对照当前修改后的正文与逐条政府来源重新人工核查 | 2026-09-19 |
| /directories/identity-ssn/ | high | 98 | human-approval-stale | 对照当前修改后的正文与逐条政府来源重新人工核查 | 2026-09-19 |

## 官方正文语义核对队列

| 路由 | 类型 | 分数 | 当前状态 | 下一步 |
| --- | --- | --- | --- | --- |

## 阻塞项优先处理

| 路由 | 风险 | 分数 | 阻塞点 |
| --- | --- | --- | --- |
| /directories/costs-timing/ | high | 98 | 当前内容指纹与 2026-07-21 人工签字版本不一致；重新人工语义核查前保持 noindex |
| /directories/deadlines/ | high | 98 | 当前内容指纹与 2026-07-21 人工签字版本不一致；重新人工语义核查前保持 noindex |
| /directories/document-rules/ | high | 98 | 当前内容指纹与 2026-07-21 人工签字版本不一致；重新人工语义核查前保持 noindex |
| /directories/identity-ssn/ | high | 98 | 当前内容指纹与 2026-07-21 人工签字版本不一致；重新人工语义核查前保持 noindex |
| /topics/gift-inherited-vehicle-title-transfer/ | high | 97 | 当前内容指纹与 2026-07-21 人工签字版本不一致；重新人工语义核查前保持 noindex |
| /topics/lost-vehicle-title-replacement-electronic-title-lien-sale/ | high | 97 | 当前内容指纹与 2026-07-21 人工签字版本不一致；重新人工语义核查前保持 noindex |
| /topics/name-change-chain/ | high | 97 | 当前内容指纹与 2026-07-21 人工签字版本不一致；重新人工语义核查前保持 noindex |
| /topics/tickets-tolls-insurance-lapse-registration-hold/ | high | 97 | 当前内容指纹与 2026-07-21 人工签字版本不一致；重新人工语义核查前保持 noindex |

## 执行节奏
1. **第1-2周**：完成高风险人工签字，目标产出 8 条，检查点：未签字的高风险页必须保持 noindex 并从 sitemap 排除
2. **第3-4周**：完成自动来源映射页面的逐页正文语义核对，目标产出 0 条，检查点：只有打开并比对官方正文的页面才能升级为 ai-assisted
3. **第5-8周**：完成意图弱页重构或合并，目标产出 0 条，检查点：每页保留完整办事价值，不以堆字数为标准

