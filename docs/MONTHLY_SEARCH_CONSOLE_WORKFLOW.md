# Search Console 月度工作流（站内脚本版本）

从 2026-07-01 开始，月度决策建议改为“脚本 + 人工判断”两步：

1. 在 Search Console 导出最近 28 天与前 28 天对比 CSV。
2. 命令：

```bash
SC_REPORT_PATH=./reports/your-export.csv npm run plan:sc
```

3. 脚本生成：

- `reports/search-console-priority.json`
- `reports/search-console-priority.csv`
- `reports/search-console-priority.md`

4. 打开 `/quality/` 的“Search Console 月度建议”区块，按优先级处理：

- 有展现但无点击、低 CTR：先补答复结构（失败场景、步骤、官方入口）
- 位置差且展现较高：先补充检索意图匹配标题与内容
- 近两期下滑大：先复核官方规则变化与来源更新日期

5. 建议与网站已有 `docs/CONTENT_PLAN_90_DAYS.md` 合并更新，并写入 `docs/CONTENT_PLAN_90_DAYS.md` 的新版本。

