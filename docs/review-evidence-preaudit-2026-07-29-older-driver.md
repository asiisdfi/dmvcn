# 高龄驾驶人专题证据预审记录

- 页面：`/topics/older-driver-license-renewal-medical-review/`
- 预审日期：2026-07-29
- 预审执行：Codex AI 辅助证据核查
- 页面内容版本：2026-07-17
- 页面公开事实核对日期：2026-07-17
- 最近人工签字日期：2026-07-21
- 风险等级：高风险
- 本轮结果：14 条声明均找到当前官方依据，未发现需要立即修改或下线的关键事实

## 使用边界

这份文件只记录官方证据的预审结果，目的是缩短真人语义复核所需时间。它不构成人工审核，不替代站长或具名审核人的判断，也不会：

- 勾选人工审核清单；
- 修改 `review-manual-signoffs.ts`；
- 更新页面的发布日期、最后修改日期或公开事实核对日期；
- 宣称页面已于 2026-07-29 完成人工复核。

真人审核仍需打开页面和对应官方正文，确认中文表述没有遗漏适用对象、例外、期限或法律后果，再在人工签字包中记录结论。

## 预审方法

1. 逐条读取页面的 14 条 `factChecks`，不以页尾来源总表代替声明级核对。
2. 优先检查当前政府业务页、州 DMV/MVC/DOL/DPS 页面和现行法规。
3. 核对年龄、日期、期限、报告义务、保密规则、暂停后果和适用对象。
4. 发现自动访问限制时，使用同一政府域名的可检索正文或现行法规交叉确认，并保留访问说明。
5. 不根据搜索摘要新增事实，也不把一个州的规则外推为全国规则。

## 逐条证据

### 1. 不应只根据年龄判断驾驶安全

- 状态：`confirmed-current`
- 页面声明：NHTSA 提醒高龄驾驶安全决定不应只看年龄，而要结合视力、身体能力、药物、认知和实际驾驶表现。
- 核对结果：NHTSA 当前 older-driver 指南明确反对只按年龄判断，并把视力、身体能力、反应、注意力、健康状况和药物影响列为实际评估因素。中文表述没有把指南写成强制吊销标准。
- 官方来源：https://www.nhtsa.gov/road-safety/older-drivers

### 2. Illinois 2026 年路考年龄门槛

- 状态：`confirmed-current`
- 页面声明：2026 年 7 月 1 日起，79–86 岁不再仅因年龄参加例行路考，仍需现场续证和视力检查；87 岁及以上继续年度路考；在生效日前已过期的驾照适用旧路考要求。
- 核对结果：Illinois Secretary of State 的现行说明、2026 年公告和 `625 ILCS 5/6-109` 相互支持。过期日在 2026 年 7 月 1 日之前的例外也在州务卿 FAQ 中明确列出。
- 官方来源：
  - https://www.ilsos.gov/departments/drivers/traffic-safety/understanding-illinois-road-safety-and-fairness-act.html
  - https://www.ilsos.gov/news/2026/june-17-2026-giannoulias-ends-mandatory-road-tests-for-drivers-ages-79-86.html
  - https://www.ilga.gov/Documents/legislation/ilcs/documents/062500050K6-109.htm
- 访问说明：`ilsos.gov` 对部分自动客户端返回访问限制；本轮同时使用州务卿可检索正文和 Illinois General Assembly 现行法规交叉确认。真人复核时应在 `dmvcn` 浏览器空间直接打开页面。

### 3. California 70 岁以上续证与知识测试

- 状态：`confirmed-current`
- 页面声明：70 岁及以上每五年现场续证并接受视力检查；自 2024 年 10 月起，多数驾驶记录合格者不再仅因年龄例行参加 written knowledge test。
- 核对结果：California DMV 当前 senior-driver 页面和 2024 年政策公告分别支持现场续证、视力检查和知识测试调整。页面保留“多数”和驾驶记录条件，没有写成所有申请人免考。
- 官方来源：
  - https://www.dmv.ca.gov/portal/senior-drivers/
  - https://www.dmv.ca.gov/portal/news-and-media/news-releases/written-knowledge-test-requirement-eliminated-for-most-california-drivers-license-renewals/

### 4. Florida 80 岁以上续证周期和视力检查

- 状态：`confirmed-current`
- 页面声明：Class E 驾照从 80 岁起每六年续证；80 岁及以上不符合线上续证资格时需要通过 vision test。
- 核对结果：FLHSMV 当前页面明确列出 80 岁及以上六年续期，以及不能线上续证时的视力检查路径。中文表述没有把“不能线上续证”误写成所有 80 岁以上申请人必须到现场。
- 官方来源：https://www.flhsmv.gov/driver-licenses-id-cards/mature-driver/driver-license-renewal-requirements-options-older-drivers/

### 5. Texas 79 岁以上现场续证和证件期限

- 状态：`confirmed-current`
- 页面声明：79 岁及以上要现场续证；79–84 岁证件通常为八年，85 岁及以上通常为两年。
- 核对结果：Texas DPS senior-driver 页面当前仍列出上述年龄、现场办理要求和有效期。页面使用“通常”，保留个案资格差异。
- 官方来源：https://www.dps.texas.gov/section/driver-license/senior-drivers-age-79-or-older
- 访问说明：该页对部分自动请求会超时，但政府页面正文可检索。真人复核时应直接打开确认。

### 6. Virginia 75 岁以上现场续证

- 状态：`confirmed-current`
- 页面声明：75 岁及以上必须到 DMV customer service center 现场续证，并完成 vision screening 或提交 vision report；续发驾照通常为五年。
- 核对结果：Virginia DMV mature-driver、renewal 和 safety 页面支持现场办理、视力路径和五年续期。页面没有把医疗复核写成每位 75 岁以上申请人的固定要求。
- 官方来源：
  - https://www.dmv.virginia.gov/licenses-ids/mature
  - https://www.dmv.virginia.gov/safety/programs/mature-driver
  - https://www.dmv.virginia.gov/licenses-ids/license/renewing

### 7. Georgia 64 岁以上视力检查

- 状态：`confirmed-current`
- 页面声明：64 岁及以上每个 renewal period 都要完成 vision screening，可在现场测试，或按线上流程上传由 optometrist / ophthalmologist 完成的视力文件。
- 核对结果：Georgia DDS 当前页面支持年龄门槛、每次续证的视力要求和线上提交眼科文件路径。
- 官方来源：https://dds.georgia.gov/georgia-licenseid/drivers-64-and-over

### 8. Washington unsafe-driver report 的证据和公开性

- 状态：`confirmed-current`
- 页面声明：报告必须基于本人观察并写具体事实，不接受匿名或二手信息，而且报告不保密。
- 核对结果：Washington DOL 当前页面逐项列出 personal observation、specific information、no anonymous/secondhand reports 和 report is not confidential。中文表述没有承诺报告后一定暂停驾照。
- 官方来源：https://dol.wa.gov/driver-licenses-and-permits/driver-safety/report-unsafe-drivers

### 9. New York 非医疗报告与 FOIL

- 状态：`confirmed-current`
- 页面声明：非医疗人员提交的驾驶复查报告逐案处理，不会只因年龄采取行动，并且不会在 FOIL 请求中披露报告人身份。
- 核对结果：New York DMV Medical Review Program 当前页面明确支持 case-by-case、age alone 和 FOIL 身份处理三点。
- 官方来源：https://dmv.ny.gov/driver-license/dmv-medical-review-program

### 10. Pennsylvania 医疗人员报告义务

- 状态：`confirmed-current`
- 页面声明：有诊断或治疗权限的 health care personnel 应报告 15 岁以上、被诊断为可能影响安全驾驶状况的人；预计少于 90 天的状况有例外，最终是否限制、recall 或 suspend 由 PennDOT 决定。
- 核对结果：PennDOT 当前医疗报告页面支持报告对象、短期状况例外和 PennDOT 决策边界。中文表述没有宣称医生直接吊销驾照。
- 官方来源：
  - https://www.pa.gov/agencies/dmv/resources/medical-reporting/information-for-health-care-personnel
  - https://www.pa.gov/agencies/dmv/resources/medical-reporting/patient-management
  - https://www.pa.gov/agencies/dmv/faqs/driver-licensing-faqs/medical-reporting-faqs

### 11. New Jersey 医生强制报告与匿名限制

- 状态：`confirmed-current`
- 页面声明：法律要求医生报告 recurrent seizure、recurrent periods of unconsciousness 或病况造成的 motor coordination impairment；普通关切报告不能匿名。
- 核对结果：New Jersey MVC 当前 reporting 页面和 medical-reporting law 页面支持疾病范围、医生义务和不接受匿名普通报告。两种报告路径没有被混为同一程序。
- 官方来源：
  - https://www.nj.gov/mvc/drivertopics/reportconcern.htm
  - https://www.nj.gov/mvc/drivertopics/lawmedreport.htm

### 12. Virginia 报告来源的保密边界

- 状态：`confirmed-current`
- 页面声明：亲属或正在治疗该驾驶人的医疗专业人员所提交报告，其来源或理由受保护；其他来源信息在被请求时可能披露。
- 核对结果：Virginia DMV 当前 impaired-driver 页面支持这一区分。页面没有笼统承诺所有报告都匿名或保密。
- 官方来源：https://www.dmv.virginia.gov/licenses-ids/license/medical/impaired-hp

### 13. New Jersey 45 天表格期限和可能结果

- 状态：`confirmed-current`
- 页面声明：medical review 表格通常要在 45 天内交回，逾期会导致 suspension；结果可能包括限制、复考、监测或暂停。
- 核对结果：New Jersey MVC Medical Review Process 当前页面支持 45 天期限、逾期暂停以及多种审查结果。页面使用“通常”，没有把所有案件的后续步骤写死。
- 官方来源：
  - https://www.nj.gov/mvc/drivertopics/medreviewprocess.htm
  - https://www.nj.gov/mvc/drivertopics/lawmedreport.htm

### 14. Medical review 不自动等于吊销

- 状态：`confirmed-current`
- 页面声明：Washington 和 New Jersey 都列出补充医疗或视力文件、重新考试、设备或限制等多种可能结果。
- 核对结果：两州当前流程均显示 DMV 可以要求文件、测试、设备或限制，并保留暂停或取消的可能；页面没有保证申请人一定保留驾驶资格。
- 官方来源：
  - https://dol.wa.gov/driver-licenses-and-permits/driver-safety/report-unsafe-drivers
  - https://www.nj.gov/mvc/drivertopics/medreviewprocess.htm

## 预审结论

- 声明级官方来源覆盖：14/14
- 本轮发现失效关键事实：0
- 本轮发现需要立即改写的声明：0
- 本轮发现需要补充人工判断的访问问题：2（Illinois SOS、Texas DPS 的自动访问限制）
- 页面索引建议：保持现状，等待下一次真人语义复核
- 页面日期建议：不更新
- 人工签字建议：不由 AI 填写

## 真人复核交接

- [ ] 已在 `dmvcn` 浏览器空间打开页面全文。
- [ ] 已逐条打开 14 组官方来源。
- [ ] 已确认数字、日期、适用对象、州别和例外没有被扩大或省略。
- [ ] 已确认行动建议与各政府机构职责相符。
- [ ] 已确认页面没有把医疗信息写成医学诊断或法律意见。
- [ ] 已确认 Illinois 过渡例外和 Texas 有效期仍与当前官网一致。

- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论：通过 / 退回修改 / 部分通过
- 修改或保留意见：
