# 罚单、收费公路、保险中断与登记限制专题证据预审

- 页面：`/topics/tickets-tolls-insurance-lapse-registration-hold/`
- 预审日期：2026-07-29
- 预审执行：Codex AI 辅助证据核查
- 当前内容版本：2026-07-29
- 当前公开事实核对日期：2026-07-29
- 最近人工签字日期：2026-07-21
- 风险等级：高风险
- 发布状态要求：本轮内容晚于现有人工签字，真人重新签字前必须 `noindex,follow` 且不得进入 sitemap

## 本轮发现与处理

本轮不是只做链接存活检查，而是逐条比较中文声明与官方正文。发现并修正三处问题：

1. New York 的 `$200` toll 门槛只适用于 commercial motor vehicle。旧中文声明漏掉了这一限定，已纠正。
2. Massachusetts 旧声明使用“RMV 不能裁定或清除”概括机构关系。新声明改为官网直接支持的操作分工：municipality、authority 或授权处理方负责标记与清除，用户回 city/town 或 E-ZPass MA 处理原始事项。
3. Texas 旧声明用“付款截图不会自动恢复”解释系统更新。新声明改为官网明确给出的时间和行动：最多约 7 个工作日；仍显示 `Outstanding Violations` 时联系收款法院；DPS 只能在 citation 已关闭后继续处理。

这些修改不能沿用 2026-07-21 的人工签字。AI 不会更新或补签 `review-manual-signoffs.ts`。

## 预审方法

1. 逐条核对页面的 13 条 `factChecks`。
2. 优先使用州 DMV、DPS、MVC、RMV、州交通部门和州政府法规页面。
3. 重点核对金额、次数、年限、保险中断天数、暂停对象、恢复机构和诈骗提示。
4. 对自动访问受限的 Florida 页面，读取同一政府 URL 的当前正文，不使用第三方摘要替代。
5. 不把 registration suspension、driver license suspension、renewal denial、court default 和 toll hold 合并成同一后果。

## 逐条证据

### 1. California parking、toll 与 owner-responsibility citation

- 状态：`confirmed-current`
- 核对结果：California DMV 当前程序手册说明，登记记录上的 citation 要由 issuing agency 清除，或按允许的路径随 renewal 支付；错误 citation 应先向 parking agency 处理，DMV 不能在没有 release 或付款的情况下自行移除。
- 官方来源：
  - https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/renewals/parking-toll-violations-on-record/
  - https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/renewals/owner-responsibility-citations-on-record/

### 2. New York toll registration suspension

- 状态：`corrected-current`
- 核对结果：普通 motor vehicle 的路径是五年内、不同日期 toll transactions 产生三份以上违规通知；`$200` 累计金额路径只适用于 commercial motor vehicle。页面已加入商业车辆限定，并用 New York Department of State 的规则复核记录交叉确认。
- 官方来源：
  - https://dmv.ny.gov/registration/registration-suspensions-for-failure-to-pay-tolls
  - https://dos.ny.gov/january-5-2022vol-xliv-issue-1
- 修改前风险：把商业车辆金额门槛扩大到所有车辆。

### 3. Pennsylvania unpaid toll threshold

- 状态：`confirmed-current`
- 核对结果：PennDOT 当前页面仍列出三种触发情形：四张以上 unpaid toll invoices、未付 invoices 与 fees 合计 `$250` 以上，或 PA Turnpike payment plan default。
- 官方来源：https://www.pa.gov/agencies/dmv/vehicle-services/registration-suspensions/suspensions-due-to-unpaid-tolls

### 4. Virginia 两笔以上 unpaid toll

- 状态：`confirmed-current`
- 核对结果：Virginia DMV 当前 denial 页面说明，一张 invoice 涉及两笔或以上 unpaid toll 时，toll facility operator 可阻止相关车辆 registration 的 reissue 或 renewal；用户应联系报告记录的 toll facility。
- 官方来源：https://www.dmv.virginia.gov/vehicles/registration/denials

### 5. Florida traffic citation 与 court clearance

- 状态：`confirmed-current`
- 核对结果：FLHSMV 当前页面分别覆盖 failure to pay、failure to comply or appear 和 failure to complete driver improvement school。三类情形都要求先满足 citation 所在 county traffic court 的要求，随后由 county 电子更新 clearance；如适用，再处理 reinstatement fee。
- 官方来源：https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/traffic-citations-court-suspensions/
- 访问说明：该页对部分自动抓取返回 403，但同一官方 URL 的当前 HTML 可正常读取。真人复核应在 `dmvcn` 浏览器空间直接打开。

### 6. New York insurance lapse

- 状态：`confirmed-current`
- 核对结果：New York DMV 当前页面说明，保险中断会影响 registration；当 lapse 为 91 天以上，或期限尚未确定时，driver license 也会被暂停。页面没有把 90 天以内 civil penalty 路径误写为所有案件都可用。
- 官方来源：https://dmv.ny.gov/insurance/insurance-lapses

### 7. Pennsylvania 超过 30 天的保险中断

- 状态：`confirmed-current`
- 核对结果：PennDOT 当前页面把 31 天或以上表述为超过 30 天，并列出三个月 registration suspension、退回 plate/card、恢复前提供当前保险证明和支付 restoration fee。页面表述与官方例外边界一致。
- 官方来源：
  - https://www.pa.gov/agencies/dmv/faqs/motor-vehicle-faqs/financial-responsibility-faqs
  - https://www.pa.gov/agencies/dmv/vehicle-services/insurance-overview

### 8. Florida PIP/PDL 与退牌

- 状态：`confirmed-current`
- 核对结果：FLHSMV 当前保险页要求有效 Florida registration 持续保持 PIP/PDL，并明确要求在取消保险前 surrender plate/tag；不合规可能暂停 driving privilege、license plate 或 registration，并产生 reinstatement fee。
- 官方来源：https://www.flhsmv.gov/insurance/
- 访问说明：该页对部分自动抓取返回 403，但同一官方 URL 的当前 HTML 可正常读取。真人复核应在 `dmvcn` 浏览器空间直接打开。

### 9. New Jersey 强制保险和无保险驾驶后果

- 状态：`confirmed-current`
- 核对结果：New Jersey MVC 当前页面要求登记车辆具有强制保险，并列出 uninsured vehicle 可能带来的 fines、community service、license suspension 和 insurance surcharges。页面使用“可能”，没有把所有后果写成每案自动发生。
- 官方来源：https://www.nj.gov/mvc/vehicles/insurancerequirements.htm

### 10. Virginia 保险终止后的处理

- 状态：`confirmed-current`
- 核对结果：Virginia DMV 当前页面要求重新投保、deactivate plates 或永久退牌；无保险车主可能暂停 driving 与 vehicle registration privileges，并需支付 statutory/non-compliance fee、如适用的 reinstatement fee，以及提交三年 SR-22。
- 官方来源：https://www.dmv.virginia.gov/vehicles/insurance-requirements

### 11. Massachusetts Non-Renewal Program

- 状态：`clarified-current`
- 核对结果：Mass.gov 当前程序页说明，参与的 municipality、authority 或授权处理方可在 RMV 记录上 mark/clear non-renewal。面向用户的续证页则要求 parking ticket 或 excise tax 回 city/town 处理，E-ZPass 违章联系 E-ZPass MA。页面已改成这一直接分工。
- 官方来源：
  - https://www.mass.gov/info-details/non-renewal-program
  - https://www.mass.gov/how-to/renew-your-real-or-standard-passenger-class-d-or-motorcycle-class-m-drivers-license

### 12. Texas 已付款 FTA/FTP 的系统更新

- 状态：`clarified-current`
- 核对结果：Texas DPS 当前 FAQ 说明，已付款 citation 最多可能需要 7 个工作日清除；若仍列在 `Outstanding Violations`，应联系收款法院；DPS 只能在 citation 关闭后继续协助。页面已去掉“截图自动恢复”的推断式表达。
- 官方来源：https://www.dps.texas.gov/section/driver-license/faq/section-8-failure-appear-and-failure-pay-ftaftp

### 13. Unpaid toll、ticket 或 suspension 诈骗短信

- 状态：`confirmed-current`
- 核对结果：Virginia DMV 当前警告覆盖冒充 toll agency 的欠费短信，并要求不要点击链接、应从可信官方入口联系 tolling agency；FLHSMV 当前警告覆盖冒充 unpaid traffic ticket、威胁暂停驾照或登记的短信，并说明不会通过短信催款或威胁暂停。
- 官方来源：
  - https://www.dmv.virginia.gov/news/virginia-dmv-warns-customers-toll-charge-text-scam
  - https://www.flhsmv.gov/safety-center/consumer-education/scam-alert/

## 预审结论

- 声明级官方来源覆盖：13/13
- 保持原文且仍有效：10
- 已纠正事实范围：1
- 已收紧机构或流程表达：2
- 需要立即删除的声明：0
- 旧人工签字是否仍覆盖当前内容：否
- 当前页面是否应进入 sitemap：否，真人重新签字后才可恢复
- AI 是否可以替代真人签字：否

## 真人复核交接

- [ ] 已在 `dmvcn` 浏览器空间打开页面全文。
- [ ] 已确认 New York `$200` 门槛只适用于 commercial motor vehicle。
- [ ] 已确认 Massachusetts 的 municipality/authority 与 RMV 分工。
- [ ] 已确认 Texas 的 7 个工作日和 `Outstanding Violations` 处理路径。
- [ ] 已打开其余 10 组官方来源并核对金额、期限、暂停对象和例外。
- [ ] 已确认 Florida 两个受自动访问限制的页面在人工浏览器中仍显示对应正文。
- [ ] 已确认页面没有提供规避罚款、法律责任判断或保险建议。

- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论：通过 / 退回修改 / 部分通过
- 修改或保留意见：
