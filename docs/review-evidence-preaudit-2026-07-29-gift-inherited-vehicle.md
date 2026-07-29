# 亲属赠车与继承车辆专题差异预审

- 页面：`/topics/gift-inherited-vehicle-title-transfer/`
- 预审日期：2026-07-29
- 预审执行：Codex AI 辅助证据核查
- 人工签字基线：2026-07-21（commit `b01c07b`）
- 人工签字内容指纹：`ee3982002d0145de263573d45eea31f4bca66cbf474da4618aa83800be4d4c3a`
- 当前内容指纹：`691925a488c8d6d99fbd0f11645404eefc4d85893772ca2f263a2d534f8292b5`
- 发布状态要求：真人核对当前差异并签字前保持 `noindex,follow`，不得进入 sitemap

## 基线差异

把当前结构化专题内容与 2026-07-21 人工签字版本逐字段比较，只有以下内容发生变化：

1. 标题改为突出 Title、lien、税费和车主去世后的分流。
2. description 缩短并把 gift、family transfer、heir、estate 与 TOD beneficiary 的判断顺序前置。
3. 新增“先看结论”段落。

以下内容与人工签字版本逐字节一致：

- 9 条关键事实
- 8 项准备清单
- 7 个办理步骤
- 5 个 FAQ
- 14 条声明级 `factChecks`
- 52 个官方来源
- 相关州与目录入口

## 新增首段核对

### 生前赠车与死亡后转移必须分开

- 状态：`confirmed-current`
- California DMV 当前页面把 private sale / loan payoff、family / estate / inheritance / gift 和 deceased owner 分成不同材料路径；deceased owner 还要根据 heir、executor、administrator、probate 和车辆价值等条件选择表格。
- Texas 当前页面把 gift 的 Form 14-317 与无遗嘱死亡后的 VTR-262 分开。
- 官方来源：
  - https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/
  - https://www.dmv.ca.gov/portal/vehicle-registration/new-registration/special-circumstances/handling-a-deceased-persons-dmv-matters/
  - https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle

### 赠车不自动等于免税

- 状态：`confirmed-current`
- Washington DOL 当前正文说明，gift vehicle 是否缴 use tax 要看原车来源、前车主是否已缴 sales/use tax，以及是否交换金钱、物品或服务。
- Pennsylvania Revenue 当前正文说明，gift 仍需证明原购买或当前 fair market value 的 sales/use tax 情况，不能为了表示 gift 随意填写象征性价格。
- 官方来源：
  - https://dol.wa.gov/vehicles-and-boats/vehicles/taxes-and-fees/use-tax
  - https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax/use-tax/motor-vehicle-understated-value-program

### 继承人不一定能直接签 title 或出售

- 状态：`confirmed-current`
- Georgia DOR 当前页面仍根据 executor、Letters of Testamentary、heirship 文件和 title 是否可用决定谁先取得 title、谁能出售。部分继承人必须先把车辆 title 到自己名下。
- Virginia DMV 当前页面仍把有 survivorship 的共同车主、没有 survivorship 的共同车主、已任命 executor/administrator 和未任命 estate representative 的情况分开。
- 官方来源：
  - https://dor.georgia.gov/vehicle-inherited-or-purchased-estate
  - https://www.dmv.virginia.gov/records/family-deceased/transfer-ownership

### 先看 title、共同车主、beneficiary 与 lien

- 状态：`confirmed-current`
- California、Georgia 与 Virginia 当前页面均要求先根据 title 上的 owner、共同持有人、survivorship、estate authority 和 recorded lien 决定路径。现有首段没有把某一种州规则写成全国统一结论。
- 官方来源：
  - https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/
  - https://dor.georgia.gov/vehicle-inherited-or-purchased-estate
  - https://www.dmv.virginia.gov/records/family-deceased/transfer-ownership

## Search Console 债务责任信号

Search Console 出现一条中文查询，询问赠与人已有债务时，车辆过户给亲属是否会让受让人承担债务。本轮没有把它自动扩写成 FAQ，原因如下：

1. 查询没有说明赠与人是否在世、债务是否为车辆贷款、受让人是否共同签字、车辆是否存在 recorded lien，也没有说明适用州。
2. DMV title transfer 页面能证明车辆所有权、lien、税费和 estate 文件要求，但不能据此判断 unrelated personal debt、creditor rights 或 transfer 是否可被撤销。
3. FTC 与 CFPB 的现行说明只覆盖去世后的债务收取：债务通常先由 estate 偿还，家庭成员通常不从个人财产支付，但共同责任、配偶、probate 处理错误等存在例外。这不能被扩大为生前赠车的结论。
4. 在缺少州别和案件事实时写“儿子承担”或“儿子不承担”都会误导用户。

用于范围判断的联邦官方来源：

- https://consumer.ftc.gov/articles/debts-and-deceased-relatives
- https://www.consumerfinance.gov/ask-cfpb/does-a-persons-debt-go-away-when-they-die-en-1463/

当前编辑决定：

- 页面继续解释 recorded vehicle lien、gift、inheritance 和 estate title 路径。
- 不提供个人债务、遗产债务、欺诈转让或债权人追索的结论。
- 用户遇到这类问题时，应区分车辆 lien 与其他债务，并向适用州的 probate / debtor-creditor 专业人士确认。
- 该查询继续标记为 `human-review-legal-liability`，不计入自动内容扩写候选。

## 访问结果

- 直接读取成功（HTTP 200）：California DMV、Washington DOL、TxDMV、Georgia DOR、Virginia DMV、Pennsylvania Revenue、FTC、CFPB。
- 本轮没有用第三方文章、搜索摘要或 AI 常识代替政府正文。

## 预审结论

- 新增首段可追溯到当前官方来源：是
- 原有 14 条声明是否发生变化：否
- 需要修正的新增表述：0
- 不应自动回答的高风险查询：1
- 旧人工签字是否覆盖当前内容：否
- 当前页面是否应进入 sitemap：否
- AI 是否可以替代真人签字：否

## 真人复核交接

- [ ] 已在 `dmvcn` 浏览器空间打开当前页面。
- [ ] 已确认 gift、deceased owner、estate 与 TOD beneficiary 没有被写成同一路径。
- [ ] 已确认 Washington 与 Pennsylvania 的税务提示没有扩大为全国规则。
- [ ] 已确认 Georgia 与 Virginia 对继承人、共同车主和 estate representative 的分流。
- [ ] 已确认页面没有回答 unrelated personal debt、欺诈转让或债权人追索责任。
- [ ] 已确认 FTC/CFPB 的 deceased-debt 说明没有被错误套用于生前赠车。
- [ ] 已确认标题和 description 没有扩大正文承诺。

- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论：通过 / 退回修改 / 部分通过
- 修改或保留意见：
