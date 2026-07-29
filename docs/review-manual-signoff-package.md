# 高风险页面人工语义复核包

生成日期：2026-07-29

## 使用规则

- 本文件不是自动通过证明。只有真实人员打开来源正文并完成语义判断后，才可填写 reviewer 和 reviewedAt。
- 审核人不需要具备虚构的 DMV、律师或移民顾问资历；如无相应资历，不得在姓名或备注中暗示专业背书。
- 每条声明至少检查适用州、适用人群、期限或金额、例外、法律后果、来源是否仍有效，以及中文是否扩大了官方原意。
- 发现一条关键事实无法由现行官方正文支持时，应选择“退回修改”或“部分通过”，不能为了让严格审计变绿而签字。
- 月度复核日期保持空白，只有完成本轮核对后才能填写；不得沿用上一次日期。
- 审核完成后，把签字表 CSV 填好，再执行 `SIGNOFF_CSV=docs/review-manual-signoff-template.csv npm run review:signoffs:import`。
- 导入签字后，还要把页面公开的“事实核对”日期更新为同一真实日期；两处日期中任一处未更新，30 天门禁都不会延期。
- 初次通过导入后，页面会在下一次构建时自动移除 `noindex` 并重新进入 sitemap；未签字页继续保留访问入口，但不提交搜索引擎收录。

## 1. /directories/costs-timing/

- 页面：/directories/costs-timing/
- 类型：高风险目录
- 上次证据复核日期：2026-07-21
- 本轮原因：30 天易变规则复核窗口
- 既有核对范围：人工核对各州费用、付款方式、临时凭证和寄送时间，并确认正文提示与所列政府来源一致。
- 既有注意事项：站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 目录证据检查

- 当前可见证据行：171
- 当前官方来源链接：171
- [ ] 每个州至少检查一条最具体、风险最高的证据行。
- [ ] 对含金额、天数、年龄、SSN、lawful presence、互惠或法律后果的行执行全量检查。
- [ ] 声明和来源属于同一州、同一业务、同一证件类型。
- [ ] 自动抽取没有截断否定词、例外、时间条件或申请人限制。
- [ ] 无法由来源正文直接支持的行已删除、改写或降为“需向官方确认”。

### 签字结论

- [ ] 通过
- [ ] 退回修改
- [ ] 部分通过（在备注中列出未通过声明）
- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论与修改备注：

## 2. /directories/deadlines/

- 页面：/directories/deadlines/
- 类型：高风险目录
- 上次证据复核日期：2026-07-21
- 本轮原因：30 天易变规则复核窗口
- 既有核对范围：人工核对地址变更、新居民转入、续期和材料时效等期限，并检查适用范围和例外提示。
- 既有注意事项：站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 目录证据检查

- 当前可见证据行：126
- 当前官方来源链接：126
- [ ] 每个州至少检查一条最具体、风险最高的证据行。
- [ ] 对含金额、天数、年龄、SSN、lawful presence、互惠或法律后果的行执行全量检查。
- [ ] 声明和来源属于同一州、同一业务、同一证件类型。
- [ ] 自动抽取没有截断否定词、例外、时间条件或申请人限制。
- [ ] 无法由来源正文直接支持的行已删除、改写或降为“需向官方确认”。

### 签字结论

- [ ] 通过
- [ ] 退回修改
- [ ] 部分通过（在备注中列出未通过声明）
- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论与修改备注：

## 3. /directories/document-rules/

- 页面：/directories/document-rules/
- 类型：高风险目录
- 上次证据复核日期：2026-07-21
- 本轮原因：30 天易变规则复核窗口
- 既有核对范围：人工核对身份、住址、姓名链、原件和认证副本要求，以及不同州规则之间的边界。
- 既有注意事项：站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 目录证据检查

- 当前可见证据行：196
- 当前官方来源链接：196
- [ ] 每个州至少检查一条最具体、风险最高的证据行。
- [ ] 对含金额、天数、年龄、SSN、lawful presence、互惠或法律后果的行执行全量检查。
- [ ] 声明和来源属于同一州、同一业务、同一证件类型。
- [ ] 自动抽取没有截断否定词、例外、时间条件或申请人限制。
- [ ] 无法由来源正文直接支持的行已删除、改写或降为“需向官方确认”。

### 签字结论

- [ ] 通过
- [ ] 退回修改
- [ ] 部分通过（在备注中列出未通过声明）
- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论与修改备注：

## 4. /directories/foreign-license/

- 页面：/directories/foreign-license/
- 类型：高风险目录
- 上次证据复核日期：2026-07-21
- 本轮原因：30 天易变规则复核窗口
- 既有核对范围：人工核对外国驾照、外州驾照、IDP、互惠免试、翻译和交旧证提示及其政府来源。
- 既有注意事项：站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 目录证据检查

- 当前可见证据行：144
- 当前官方来源链接：144
- [ ] 每个州至少检查一条最具体、风险最高的证据行。
- [ ] 对含金额、天数、年龄、SSN、lawful presence、互惠或法律后果的行执行全量检查。
- [ ] 声明和来源属于同一州、同一业务、同一证件类型。
- [ ] 自动抽取没有截断否定词、例外、时间条件或申请人限制。
- [ ] 无法由来源正文直接支持的行已删除、改写或降为“需向官方确认”。

### 签字结论

- [ ] 通过
- [ ] 退回修改
- [ ] 部分通过（在备注中列出未通过声明）
- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论与修改备注：

## 5. /directories/identity-ssn/

- 页面：/directories/identity-ssn/
- 类型：高风险目录
- 上次证据复核日期：2026-07-21
- 本轮原因：30 天易变规则复核窗口
- 既有核对范围：人工核对 SSN、无 SSN、ITIN、合法身份和临时访客分流，确认页面没有替读者判断移民身份。
- 既有注意事项：站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 目录证据检查

- 当前可见证据行：184
- 当前官方来源链接：184
- [ ] 每个州至少检查一条最具体、风险最高的证据行。
- [ ] 对含金额、天数、年龄、SSN、lawful presence、互惠或法律后果的行执行全量检查。
- [ ] 声明和来源属于同一州、同一业务、同一证件类型。
- [ ] 自动抽取没有截断否定词、例外、时间条件或申请人限制。
- [ ] 无法由来源正文直接支持的行已删除、改写或降为“需向官方确认”。

### 签字结论

- [ ] 通过
- [ ] 退回修改
- [ ] 部分通过（在备注中列出未通过声明）
- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论与修改备注：

## 6. 老人/高龄驾驶人续驾照、视力测试和医疗审查怎么处理

- 页面：/topics/older-driver-license-renewal-medical-review/
- 类型：高风险专题
- 上次证据复核日期：2026-07-21
- 本轮原因：30 天易变规则复核窗口
- 既有核对范围：人工核对高龄驾驶人续期、视力检查、医疗复核、家属报告和驾驶限制。
- 既有注意事项：站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 逐条声明（14 条）

#### 1. NHTSA 提醒高龄驾驶安全决定不应只看年龄，而要结合视力、身体能力、药物、认知和实际驾驶表现。

- 官方来源：
  - https://www.nhtsa.gov/road-safety/older-drivers
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 2. Illinois 自 2026 年 7 月 1 日起取消 79–86 岁仅因年龄触发的 routine road test，但仍要求现场续证和视力检查；87 岁及以上仍需年度路考。若驾照在该日期前已过期，79–86 岁申请人之后续证仍要路考。

- 官方来源：
  - https://www.ilsos.gov/departments/drivers/traffic-safety/understanding-illinois-road-safety-and-fairness-act.html
  - https://www.ilsos.gov/news/2026/june-17-2026-giannoulias-ends-mandatory-road-tests-for-drivers-ages-79-86.html
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 3. California 70 岁及以上每五年现场续证并接受视力检查；自 2024 年 10 月起，多数驾驶记录合格者不再按年龄例行参加 written knowledge test。

- 官方来源：
  - https://www.dmv.ca.gov/portal/senior-drivers/
  - https://www.dmv.ca.gov/portal/news-and-media/news-releases/written-knowledge-test-requirement-eliminated-for-most-california-drivers-license-renewals/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 4. Florida Class E 驾照在 80 岁起改为每六年续证；80 岁及以上不符合线上续证资格时要通过 vision test。

- 官方来源：
  - https://www.flhsmv.gov/driver-licenses-id-cards/mature-driver/driver-license-renewal-requirements-options-older-drivers/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 5. Texas 79 岁及以上驾驶人要现场续证；79–84 岁证件通常为八年，85 岁及以上通常为两年。

- 官方来源：
  - https://www.dps.texas.gov/section/driver-license/senior-drivers-age-79-or-older
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 6. Virginia 75 岁及以上驾驶人必须到 DMV customer service center 现场续证，并完成 vision screening 或提交 vision report；续发驾照通常为五年。

- 官方来源：
  - https://www.dmv.virginia.gov/licenses-ids/mature
  - https://www.dmv.virginia.gov/safety/programs/mature-driver
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 7. Georgia 64 岁及以上驾驶人每个 renewal period 都要完成 vision screening；可在现场测试，或按线上流程上传由 optometrist / ophthalmologist 完成的视力文件。

- 官方来源：
  - https://dds.georgia.gov/georgia-licenseid/drivers-64-and-over
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 8. Washington unsafe-driver report 必须基于本人观察并写具体事实，不接受匿名或二手信息，而且报告在州法下不保密。

- 官方来源：
  - https://dol.wa.gov/driver-licenses-and-permits/driver-safety/report-unsafe-drivers
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 9. New York 对非医疗人员提交的驾驶复查报告逐案处理，不会只因年龄采取行动，并说明不会在 FOIL 请求中披露报告人身份。

- 官方来源：
  - https://dmv.ny.gov/driver-license/dmv-medical-review-program
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 10. Pennsylvania 要求有诊断或治疗权限的 health care personnel 报告 15 岁以上、被诊断为可能影响安全驾驶状况的人；预计持续少于 90 天的状况有例外，是否限制、recall 或 suspend 由 PennDOT 决定。

- 官方来源：
  - https://www.pa.gov/agencies/dmv/resources/medical-reporting/information-for-health-care-personnel
  - https://www.pa.gov/agencies/dmv/faqs/driver-licensing-faqs/medical-reporting-faqs
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 11. New Jersey 法律要求医生报告 recurrent seizure、recurrent periods of unconsciousness，或因病况造成的 motor coordination impairment；普通关切报告不能匿名。

- 官方来源：
  - https://www.nj.gov/mvc/drivertopics/reportconcern.htm
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 12. Virginia 对 relative 或正在治疗该驾驶人的 medical professional 所提交报告，禁止 DMV 公开报告来源或理由；其他来源信息在被请求时可能披露。

- 官方来源：
  - https://www.dmv.virginia.gov/licenses-ids/license/medical/impaired-hp
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 13. New Jersey medical review 表格通常要在 45 天内交回，逾期会导致 suspension；审查结果可能包括限制、复考、监测或暂停。

- 官方来源：
  - https://www.nj.gov/mvc/drivertopics/medreviewprocess.htm
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 14. Medical review 并不自动等于吊销：Washington 和 New Jersey 都列出补充医疗或视力文件、重新考试、设备或限制等多种可能结果。

- 官方来源：
  - https://dol.wa.gov/driver-licenses-and-permits/driver-safety/report-unsafe-drivers
  - https://www.nj.gov/mvc/drivertopics/medreviewprocess.htm
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

### 签字结论

- [ ] 通过
- [ ] 退回修改
- [ ] 部分通过（在备注中列出未通过声明）
- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论与修改备注：

## 7. 罚单、toll、保险 lapse 或 registration hold，先查 DMV 还是法院

- 页面：/topics/tickets-tolls-insurance-lapse-registration-hold/
- 类型：高风险专题
- 上次证据复核日期：2026-07-21
- 本轮原因：30 天易变规则复核窗口
- 既有核对范围：人工核对罚单、收费公路、保险中断、车辆登记限制及不同机构的处理顺序。
- 既有注意事项：站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 逐条声明（13 条）

#### 1. California registration record 上的 parking、toll 或 owner-responsibility citation 来自对应 issuing agency；争议和 clearance 通常应先找发起机构。

- 官方来源：
  - https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/renewals/parking-toll-violations-on-record/
  - https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/renewals/owner-responsibility-citations-on-record/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 2. New York 可因 5 年内 3 次以上 toll violation，或同一期间未付 toll、fee 和 charge 达到 200 美元，暂停相关 vehicle registration。

- 官方来源：
  - https://dmv.ny.gov/registration/registration-suspensions-for-failure-to-pay-tolls
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 3. Pennsylvania registration 可能因 4 张以上 unpaid toll invoice、欠款与费用达到 250 美元，或 toll payment plan default 而被暂停。

- 官方来源：
  - https://www.pa.gov/agencies/dmv/vehicle-services/registration-suspensions/suspensions-due-to-unpaid-tolls
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 4. Virginia 在一张 invoice 涉及两笔或以上 unpaid toll 时，toll facility operator 可限制相关车辆 registration 的 reissue 或 renewal；车主应联系报告该记录的 toll facility。

- 官方来源：
  - https://www.dmv.virginia.gov/vehicles/registration/denials
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 5. Florida 因 failure to pay、failure to appear 或未完成 court-ordered school 被暂停时，应先满足 citation 所在 county court 的要求，再等待电子 clearance 并处理 reinstatement fee。

- 官方来源：
  - https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/traffic-citations-court-suspensions/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 6. New York 的 liability insurance lapse 会导致 registration suspension；lapse 达到 91 天或期限尚未确定时，driver license 也会被暂停。

- 官方来源：
  - https://dmv.ny.gov/insurance/insurance-lapses
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 7. Pennsylvania 保险中断超过 30 天可导致三个月 vehicle registration suspension，并要求退回 plate/card；恢复前还要提交有效保险证明和 restoration fee。

- 官方来源：
  - https://www.pa.gov/agencies/dmv/faqs/motor-vehicle-faqs/financial-responsibility-faqs
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 8. Florida 要求有有效 registration 的车辆持续保持 PIP/PDL；取消保险前应先退牌，否则 driving privilege、plate 或 registration 可能被暂停，并可能产生 reinstatement fee。

- 官方来源：
  - https://www.flhsmv.gov/insurance/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 9. New Jersey 要求登记车辆保持强制保险；驾驶 uninsured vehicle 可能带来罚款、community service、license suspension 和 insurance surcharge。

- 官方来源：
  - https://www.nj.gov/mvc/vehicles/insurancerequirements.htm
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 10. Virginia 在 registration period 内保险终止时，车主必须重新投保、deactivate plates 或永久退牌；未保险车主可能被暂停 driving 和 vehicle registration privileges，并被要求缴费及提交 SR-22。

- 官方来源：
  - https://www.dmv.virginia.gov/vehicles/insurance-requirements
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 11. Massachusetts Non-Renewal Program 由参与的 municipality 或 authority 报送 unpaid obligation，RMV 不能替发起机构裁定或清除原始欠款。

- 官方来源：
  - https://www.mass.gov/info-details/non-renewal-program
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 12. Texas FTA/FTP 记录即使已经付款，也需要 reporting agency 或 court 正确回传 compliance；driver license status 不会只凭付款截图自动恢复。

- 官方来源：
  - https://www.dps.texas.gov/section/driver-license/faq/section-8-failure-appear-and-failure-pay-ftaftp
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 13. 政府机构已警告存在以 unpaid toll、ticket 或 suspension 为由的诈骗短信；用户应从 DMV、court 或 toll agency 官方入口独立核验，不点击短信付款链接。

- 官方来源：
  - https://www.dmv.virginia.gov/news/virginia-dmv-warns-customers-toll-charge-text-scam
  - https://www.flhsmv.gov/safety-center/consumer-education/scam-alert/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

### 签字结论

- [ ] 通过
- [ ] 退回修改
- [ ] 部分通过（在备注中列出未通过声明）
- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论与修改备注：
