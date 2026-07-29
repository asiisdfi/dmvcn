# 车辆 Title 补发专题差异预审

- 页面：`/topics/lost-vehicle-title-replacement-electronic-title-lien-sale/`
- 预审日期：2026-07-29
- 预审执行：Codex AI 辅助证据核查
- 人工签字基线：2026-07-21（commit `b01c07b`）
- 人工签字内容指纹：`cc6ef372c75eaffec65de4579924ff51c83644a95aca61b6672644b422b4db69`
- 本轮修订后内容指纹：`ff859c9bfd0463df385b873d12cc5bdfb24dfe653e7971c67f6527488db43739`
- 发布状态要求：真人核对当前差异并签字前保持 `noindex,follow`，不得进入 sitemap

## 基线差异

把当前结构化专题内容与 2026-07-21 人工签字版本逐字段比较，只有以下内容发生变化：

1. 标题从泛化的补证、电子 title 和 lien，改为突出谁能申请、lien 与卖车前处理。
2. description 缩短并把判断顺序前置。
3. 新增“先看结论”段落。

以下内容与人工签字版本逐字节一致：

- 10 条关键事实
- 10 项准备清单
- 8 个办理步骤
- 8 个 FAQ
- 10 条声明级 `factChecks`
- 20 个官方来源
- 相关州与目录入口

因此本轮语义预审集中检查新增首段，没有把旧签字冒充为当前版本签字。

## 本轮发现与处理

新增首段原来写成“仍在卖家或 lienholder 名下”。这会把 record owner 与 recorded lienholder 混在一起。lienholder 可能持有纸质 title 或需要参与补发，但并不等于车辆登记在其名下。

页面现已拆成两条路径：

1. title 仍登记在卖家名下时，由记录车主先走 replacement。
2. title record 仍有 lienholder 时，按签发州要求由 lienholder 申请，或提交该州接受的 lien release。

买方不能把卖家尚未转让的 title 当作自己的普通 duplicate；registration card 或 bill of sale 通常也不能代替可转让的 ownership document。页面保留老车 transferable registration、bonded title、court-order 等例外提示，没有把规则写成绝对禁止。

## 当前官方依据

### 最后签发州

- 状态：`confirmed-current`
- California DMV 当前说明：若 California 记录显示未签发可转让 title，应先向最后签发 title 的州取得证件；不能取得时再按 California 的替代证明或 bond 路径处理。
- TxDMV 当前 FAQ 同样说明，Texas 不能替另一个州签发 replacement title。
- 官方来源：
  - https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/
  - https://www.txdmv.gov/faqs

### 卖家仍是 record owner

- 状态：`confirmed-current`
- Georgia DOR 当前页面明确区分“转让完成前 title 丢失”：previous owner 先申请 replacement，再由双方重新完成 reassignment。
- Illinois Secretary of State 的对应规则仍在页面来源清单中，但自动访问返回 403；该声明与 2026-07-21 人工签字版本完全相同。真人复核时应在 `dmvcn` 浏览器空间直接打开。
- 官方来源：
  - https://dor.georgia.gov/replace-lost-or-stolen-title
  - https://www.ilsos.gov/departments/vehicles/title-and-registration/duplicate-titles.html

### 记录中仍有 lien

- 状态：`confirmed-current`
- TxDMV 当前正文说明，记录中有 lien 时由 lienholder 申请 certified copy，或者车主提交 original release of lien；贷款已经还清不代表州记录自动解除 lien。
- 官方来源：https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/get-a-copy-of-your-title

### Registration、bill of sale 与 ownership document

- 状态：`confirmed-current-with-exceptions`
- New York DMV 当前手册把 registration 与 title 分开：registration 用于车辆上路登记，title certificate 证明所有权。普通私人二手车交易使用签署后的 title；1972 年及更早车型可适用 transferable registration，外州 dealer 交易还可能同时需要 bill of sale 或 invoice。
- 页面因此使用“通常不能代替”，并在 FAQ 保留老车、无 title 州和其他特殊路径。
- 官方来源：https://dmv.ny.gov/new-york-state-drivers-manual-and-practice-tests/chapter-3-owning-a-vehicle

## 访问结果

- 直接读取成功（HTTP 200）：California DMV、TxDMV FAQ、TxDMV certified copy、Georgia DOR、New York DMV。
- 自动访问受限（HTTP 403）：Illinois Secretary of State。
- 403 只表示自动访问受限，不等于来源失效，也不会被当作语义通过证明。

## 预审结论

- 新增首段可追溯到当前官方来源：是
- 发现并修正术语边界：1 处
- 旧有 10 条声明是否发生变化：否
- 需要删除的声明：0
- 旧人工签字是否覆盖当前内容：否
- 当前页面是否应进入 sitemap：否
- AI 是否可以替代真人签字：否

## 真人复核交接

- [ ] 已在 `dmvcn` 浏览器空间打开当前页面。
- [ ] 已确认“最后签发州”判断与 California、Texas 官方正文一致。
- [ ] 已确认 Georgia 的 previous owner 补证与 reassignment 顺序。
- [ ] 已确认 TxDMV 对 lienholder 申请或 original lien release 的分流。
- [ ] 已确认 New York 对 registration、title、bill of sale 和老车例外的区分。
- [ ] 已直接打开 Illinois 官方页面，确认买方不能替仍在 Illinois owner 名下的车辆申请普通 duplicate。
- [ ] 已确认标题和 description 没有扩大正文承诺。

- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论：通过 / 退回修改 / 部分通过
- 修改或保留意见：
