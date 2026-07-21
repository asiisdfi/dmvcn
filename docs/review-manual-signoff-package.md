# 高风险页面人工语义复核包

生成日期：2026-07-21

## 使用规则

- 本文件不是自动通过证明。只有真实人员打开来源正文并完成语义判断后，才可填写 reviewer 和 reviewedAt。
- 审核人不需要具备虚构的 DMV、律师或移民顾问资历；如无相应资历，不得在姓名或备注中暗示专业背书。
- 每条声明至少检查适用州、适用人群、期限或金额、例外、法律后果、来源是否仍有效，以及中文是否扩大了官方原意。
- 发现一条关键事实无法由现行官方正文支持时，应选择“退回修改”或“部分通过”，不能为了让严格审计变绿而签字。
- 审核完成后，把签字表 CSV 填好，再执行 `npm run review:signoffs:import -- docs/review-manual-signoff-template.csv`。

## 1. /directories/costs-timing/

- 页面：/directories/costs-timing/
- 类型：高风险目录
- AI 辅助核对日期：2026-07-17
- 既有核对范围：核查 50 州费用、付款、临时凭证、邮寄和处理时间提示的抽取规则，并给每条保留提示绑定政府来源。
- 既有注意事项：目录只显示能够匹配到州级官方费用、处理、续期或补证页面的具体提示；仍待人工签字。

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
- AI 辅助核对日期：2026-07-17
- 既有核对范围：核查 50 州搬家、地址、续期、材料时效和处理期限提示的抽取与逐条来源绑定。
- 既有注意事项：无法绑定到对应政府入口的具体期限不作为已核实事实显示；仍待人工签字。

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
- AI 辅助核对日期：2026-07-17
- 既有核对范围：核查 50 州地址证明、SSN、姓名链、认证副本和非公民材料提示，并逐条绑定 document/checklist 来源。
- 既有注意事项：具体材料提示现在直接链接到最相关的州政府清单或身份要求页面；仍待人工签字。

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
- AI 辅助核对日期：2026-07-17
- 既有核对范围：核查 50 州外国/外州驾照、IDP、互惠、测试、翻译和交旧证提示，并逐条绑定官方办理入口。
- 既有注意事项：“能驾驶”和“可直接换证”继续分开表达，无法找到对应 transfer/foreign-license 来源的具体提示不会展示；仍待人工签字。

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
- AI 辅助核对日期：2026-07-17
- 既有核对范围：核查 50 州 SSN、无 SSN、ITIN、lawful presence、非公民和 temporary visitor 提示，并逐条绑定官方身份入口。
- 既有注意事项：目录不判断移民身份，仅显示可映射到州政府身份或材料页面的分流提示；仍待人工签字。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 目录证据检查

- 当前可见证据行：182
- 当前官方来源链接：182
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

## 6. 残疾人停车 placard、disabled plates 和临时停车证怎么申请

- 页面：/topics/disabled-parking-placard-plates/
- 类型：高风险专题
- AI 辅助核对日期：2026-07-17
- 既有核对范围：逐条比对 placard/plate 绑定、temporary/permanent 期限、跨州使用、迁州重新申请、DV ISA 和 misuse 后果。
- 既有注意事项：已补充 New York 迁州不能直接换 permit、Washington temporary permit 退回要求及 Texas/New York 滥用处罚；仍待人工签字。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 逐条声明（12 条）

#### 1. Disabled placard 或带 ISA 的 plate 只能在符合资格的人本人使用或正在被接送时提供停车特权，不能借给家人单独使用。

- 官方来源：
  - https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/disabled-person-parking-placards-plates/
  - https://www.txdmv.gov/motorists/disabled-parking-placards-plates
  - https://dol.wa.gov/driver-licenses-and-permits/get-or-renew-disabled-parking-permits/using-disabled-parking
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 2. Disabled license plate 或 tab 通常绑定符合资格者名下的登记车辆；New York、California 和 Washington 都把 plate/tab 申请与车辆 owner/registration 条件联系起来。

- 官方来源：
  - https://dmv.ny.gov/parking-for-people-with-disabilities-the-law
  - https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/disabled-person-parking-placards-plates/
  - https://dol.wa.gov/driver-licenses-and-permits/get-or-renew-disabled-parking-permits
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 3. Texas 普通 Disabled Veteran plate 若没有 International Symbol of Access，不授权停 disabled space；需要 placard 或带 ISA 的合格 plate。

- 官方来源：
  - https://www.txdmv.gov/motorists/disabled-parking-placards-plates
  - https://www.txdmv.gov/sites/default/files/form_files/VTR-615.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 4. New York parking permit 通常由 city、town 或 village 的 local issuing agent 签发，DMV 签发的是 disability license plates，不直接发 local permit。

- 官方来源：
  - https://dmv.ny.gov/more-info/parking-for-people-with-disabilities
  - https://dmv.ny.gov/forms/mv6641.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 5. Texas temporary placard 为红色且最长 6 个月，permanent placard 为蓝色并按 4 年周期续办。

- 官方来源：
  - https://www.txdmv.gov/motorists/disabled-parking-placards-plates
  - https://www.txdmv.gov/sites/default/files/body-files/Disabled-Persons-Placard-Brochure.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 6. Florida permanent disabled parking permit 与 temporary permit 是不同产品；temporary permit 的有效期按医疗证明且最长 6 个月。

- 官方来源：
  - https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/permanent-disabled-person-parking-permits/
  - https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/temporary-disabled-person-parking-permits/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 7. 申请资格通常需要州认可的 medical provider 在官方表格、处方或合格 letterhead statement 上认证，医院账单本身不能替代。

- 官方来源：
  - https://www.dmv.ca.gov/portal/uploads/2020/12/reg195.pdf
  - https://dmv.ny.gov/forms/mv6641.pdf
  - https://www.txdmv.gov/sites/default/files/form_files/VTR-214.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 8. 外州 placard 常可获得 reciprocal recognition，但 meter、time limit、airport、campus 和 local permit 特权仍由目的地规则决定。

- 官方来源：
  - https://dmv.ny.gov/parking-for-people-with-disabilities-the-law
  - https://www.pa.gov/agencies/dmv/faqs/motor-vehicle-faqs/placard-faqs
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 9. 搬到 New York 后不能把外州 permit 直接交换成本州 permit 或 plates；申请人仍要按 New York 规则重新提交 disability proof。

- 官方来源：
  - https://dmv.ny.gov/parking-for-people-with-disabilities-the-law
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 10. Access aisle 或斜线区域不是额外停车位；它用于轮椅和无障碍设备进出，即使持有 placard 也不能占用。

- 官方来源：
  - https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/disabled-person-parking-placards-plates/
  - https://www.ada.gov/resources/restriping-parking-spaces/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 11. Washington temporary disabled parking placard 的期限由医疗人员注明，自注明日期起最长一年；到期后必须交回 vehicle licensing office 或邮寄退回。

- 官方来源：
  - https://dol.wa.gov/driver-licenses-and-permits/get-or-renew-disabled-parking-permits
  - https://dol.wa.gov/forms/view/420073/download?inline=
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 12. Texas 对 disabled parking placard misuse 可处最高 1,250 美元罚款和/或最多 50 小时 community service；New York 对虚假 permit 申请列有 misdemeanor、250 至 1,000 美元罚款及可能的额外民事处罚。

- 官方来源：
  - https://www.txdmv.gov/motorists/disabled-parking-placards-plates
  - https://dmv.ny.gov/parking-for-people-with-disabilities-the-law
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

## 7. 驾照被 suspend 或 revoke 后，恢复驾驶资格先做什么

- 页面：/topics/driver-license-suspension-reinstatement-sr22/
- 类型：高风险专题
- AI 辅助核对日期：2026-07-17
- 既有核对范围：逐条比对 suspension、revocation、恢复顺序、SR-22/FR-44 和恢复前驾驶提醒。
- 既有注意事项：已修正费用顺序和 suspension/revocation 表述；高风险页面仍待真实人工语义签字。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 逐条声明（11 条）

#### 1. New York 明确区分 suspension 与 revocation，revoked license 在期限结束后仍可能需要 DMV approval、重新申请、缴费或测试。

- 官方来源：
  - https://dmv.ny.gov/points-and-penalties/suspensions-and-revocations
  - https://dmv.ny.gov/points-and-penalties/request-restoration-after-a-driver-license-revocation
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 2. Suspension period 结束不代表自动恢复；Texas、Pennsylvania 和 Massachusetts 都要求先核对个案 reinstatement requirements。

- 官方来源：
  - https://www.dps.texas.gov/section/driver-license/reinstating-your-driver-license-or-driving-privilege
  - https://www.pa.gov/services/dmv/request-a-driver-license-restoration-requirements-letter
  - https://www.mass.gov/how-to/reinstate-your-drivers-license
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 3. New York 与 Texas 都提供官方 license status / eligibility 查询，恢复前应核对系统状态而不是只看付款收据。

- 官方来源：
  - https://dmv.ny.gov/driver-license/check-license-or-driving-privilege-status
  - https://texas.gov/licenseeligibility
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 4. Reinstatement fee 只是可能要求之一，Texas 和 Pennsylvania 仍可能要求提交其他 compliance documents 或完成额外项目。

- 官方来源：
  - https://www.dps.texas.gov/section/driver-license/reinstating-your-driver-license-or-driving-privilege
  - https://www.pa.gov/agencies/dmv/online-services-dvs/license-and-vehicle-restoration-services
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 5. 法院或其他 reporting agency 发起的 suspension 通常要先由对应机构完成 clearance，再由 DMV 更新 driving privilege。

- 官方来源：
  - https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/other-suspensions-revocations/
  - https://www.dps.texas.gov/section/driver-license/reinstating-your-driver-license-or-driving-privilege
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 6. SR-22 与 FR-44 属于按州要求提交的 financial responsibility certification，Virginia 对两种证明分别列出适用和提交规则。

- 官方来源：
  - https://www.dmv.virginia.gov/businesses/insurance/certifications
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 7. California 将保险或 financial responsibility 与车辆及驾驶资格的 suspension / reissue 流程分开说明。

- 官方来源：
  - https://www.dmv.ca.gov/portal/suspensions/
  - https://www.dmv.ca.gov/portal/vehicle-registration/insurance-requirements/
  - https://www.dmv.ca.gov/portal/dmv-virtual-office/reissue-fees/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 8. Massachusetts 将 required classes / programs 与 suspension hearing 设为独立恢复环节，不能仅靠缴费替代。

- 官方来源：
  - https://www.mass.gov/info-details/required-classes-and-programs-to-reinstate-your-drivers-license
  - https://www.mass.gov/guides/suspension-hearings-information
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 9. 恢复相关的例外路径并不统一：Texas 单列 special-license 问题，Virginia 则为符合条件的 reinstatement fees 提供 payment plan。

- 官方来源：
  - https://www.dps.texas.gov/section/driver-license/faq/section-7-reinstatement-fees-and-special-licenses
  - https://www.dmv.virginia.gov/licenses-ids/payment-plan-program
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 10. Georgia、Washington 和 New Jersey 都要求按本州 violations / suspended-license / restoration 流程完成要求后再恢复驾驶资格。

- 官方来源：
  - https://dds.georgia.gov/georgia-licenseid/violations-suspensions-revocations
  - https://dol.wa.gov/driver-licenses-and-permits/suspended-driver-license
  - https://www.nj.gov/mvc/license/suspension.htm
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 11. 驾照或 driving privilege 被暂停、撤销时，付款收据本身不代表可以驾驶：New York 要求满足 suspension 条件并持有有效 license，New Jersey 要求等到收到书面 restoration notice。

- 官方来源：
  - https://dmv.ny.gov/points-and-penalties/suspensions-and-revocations
  - https://www.nj.gov/mvc/license/suspension.htm
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

## 8. 亲属赠车、继承车辆和车主去世后，title 怎么转

- 页面：/topics/gift-inherited-vehicle-title-transfer/
- 类型：高风险专题
- AI 辅助核对日期：2026-07-17
- 既有核对范围：逐条比对 gift tax、lien consideration、继承签字权限、TOD beneficiary、title 与 registration 分流。
- 既有注意事项：已补充 Florida、Pennsylvania 的 gift/lien 税务边界，并限定 Georgia 必须先 title 的具体继承路径；仍待人工签字。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 逐条声明（14 条）

#### 1. California 将普通 title transfer、gift、family transfer、inheritance 和 deceased-owner transfer 分成不同材料路径，不能只用一张 bill of sale 处理所有情况。

- 官方来源：
  - https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/
  - https://www.dmv.ca.gov/portal/vehicle-registration/new-registration/special-circumstances/handling-a-deceased-persons-dmv-matters/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 2. California 赠车受让人通常要用 REG 256 声明 gift 或适用的 family transfer 事实，赠与人仍应完成卖方责任解除步骤。

- 官方来源：
  - https://dmv.ca.gov/portal/file/statement-of-facts-reg-256-pdf/
  - https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 3. Texas 机动车赠与 title application 必须配套 Form 14-317；只在 title 的价格栏写 gift 不能替代该州赠与申报。

- 官方来源：
  - https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle
  - https://www.txdmv.gov/sites/default/files/form_files/14-317.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 4. Texas 在适用的无遗嘱继承场景提供 VTR-262 Affidavit of Heirship，但表格资格、签名和证明要求必须逐项满足。

- 官方来源：
  - https://www.txdmv.gov/sites/default/files/form_files/VTR-262.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 5. Washington 对 gift vehicle 仍要求单独判断 use tax；车辆被称为礼物并不自动证明整笔转移免税。

- 官方来源：
  - https://dol.wa.gov/vehicles-and-boats/vehicles/taxes-and-fees/use-tax
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 6. Florida 的一般 gift 免税规则要求转移时没有付款且新车主不承接 outstanding lien，并要在 title / registration 申请中申报适用 exemption。

- 官方来源：
  - https://www.flhsmv.gov/pdf/proc/tl/tl-08.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 7. Pennsylvania 要求赠车税务豁免使用 MV-13ST；受让人承接现有 lien 余额时，该余额属于 consideration 并可能产生 sales tax。

- 官方来源：
  - https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax/use-tax/motor-vehicle-understated-value-program
  - https://www.pa.gov/agencies/dmv/vehicle-services/title-and-registration/buying-or-selling-a-vehicle
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 8. Florida 为 surviving spouse 或适用继承人设置 HSMV 82152 等专用文件，死亡后转 title 不能直接套用普通私人出售表格。

- 官方来源：
  - https://www.flhsmv.gov/pdf/forms/82152.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 9. Pennsylvania 把 MV-13ST gift affidavit 与 deceased-owner transfer 文件分开；赠与、共同车主和死亡后转移应分别核对。

- 官方来源：
  - https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bmv/bmv-forms/mv-13st.pdf
  - https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bmv/bmv-fact-sheets/fs-vehtrans.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 10. Virginia 将 deceased owner 的 ownership transfer 和 registration transfer 分成不同业务；完成 title 变更不自动完成 plate、registration 或保险处理。

- 官方来源：
  - https://www.dmv.virginia.gov/records/family-deceased/transfer-ownership
  - https://www.dmv.virginia.gov/records/family-deceased/transfer-registration
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 11. Georgia 的 estate/inheritance 路径会根据 executor、administrator、heirship affidavit 和是否已有法院文件决定谁能签字及是否应先取得新 title。

- 官方来源：
  - https://dor.georgia.gov/vehicle-inherited-or-purchased-estate
  - https://dor.georgia.gov/document/form/form-t-20-affidavit-inheritance/download
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 12. Georgia 使用 T-20 Affidavit of Inheritance，或没有 Letters of Testamentary 的继承人，必须先把车辆 title 到自己名下再出售或转让。

- 官方来源：
  - https://dor.georgia.gov/vehicle-inherited-or-purchased-estate
  - https://dor.georgia.gov/document/form/form-t-20-affidavit-inheritance/download
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 13. New Jersey 的 vehicle gift、sales-tax exemption 和 transfer-on-death beneficiary 是不同规则，申请人应分别核对 title、税务和 beneficiary 文件。

- 官方来源：
  - https://www.nj.gov/mvc/vehicles/transowner.htm
  - https://www.nj.gov/mvc/vehicletopics/taxexempt.htm
  - https://www.nj.gov/mvc/pdf/vehicles/beneficiary_transfer_form.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 14. New Jersey TOD beneficiary 要在车主死亡后连同 title、death certificate 和 title application 使用；原 title 上的 lien 要先清偿，或按规则转到 sole owner。

- 官方来源：
  - https://www.nj.gov/mvc/vehicles/transowner.htm
  - https://www.nj.gov/mvc/pdf/vehicles/beneficiary_transfer_form.pdf
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

## 9. 车辆 title 丢了怎么办：补证、电子 title 和 lien

- 页面：/topics/lost-vehicle-title-replacement-electronic-title-lien-sale/
- 类型：高风险专题
- AI 辅助核对日期：2026-07-17
- 既有核对范围：逐条比对 replacement title、record owner、lienholder、electronic title、地址、旧证失效和办理时效。
- 既有注意事项：已补充 title 与 registration 的证据映射，以及 Washington 全体登记车主签字、公证和 Quick Title 边界；仍待人工签字。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 逐条声明（10 条）

#### 1. Title 与 registration 作用不同：registration 允许车辆按登记状态上路，title certificate 用来证明车辆所有权；补 registration 不会自动补出 ownership title。

- 官方来源：
  - https://dmv.ny.gov/new-york-state-drivers-manual-and-practice-tests/chapter-3-owning-a-vehicle
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 2. Replacement title 应从最后签发或记录所有权的州开始办理；车辆现在所在州通常不能直接替另一个州补发 title。

- 官方来源：
  - https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/
  - https://www.txdmv.gov/faqs
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 3. Title 在卖方名下、转让尚未完成时丢失，通常应由记录中的原车主先补证，买方不能把它当作自己的 duplicate 申请。

- 官方来源：
  - https://dor.georgia.gov/replace-lost-or-stolen-title
  - https://www.ilsos.gov/departments/vehicles/title-and-registration/duplicate-titles.html
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 4. Duplicate 或 replacement title 签发后，原 title 和此前 duplicate 通常失效；后来找回的旧证不能继续用于转让。

- 官方来源：
  - https://dmv.ny.gov/titles/certificate-of-title
  - https://www.flhsmv.gov/motor-vehicles-tags-titles/liens-and-titles/paper-liens-and-titles/
  - https://www.dmv.virginia.gov/vehicles/title/replacement
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 5. 补发件会按机动车或 title 记录中的地址寄送；地址已变更时，应先按签发州要求更新并等待记录生效。

- 官方来源：
  - https://dmv.ny.gov/titles/replace-a-title-certificate
  - https://www.dmv.virginia.gov/online-services/replace-title
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 6. 记录中仍有 lien 时，申请人、lien release 形式和收件人会改变；部分州要求 lienholder 申请或把 replacement 寄给 lienholder。

- 官方来源：
  - https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/get-a-copy-of-your-title
  - https://dol.wa.gov/vehicles-and-boats/vehicles/vehicle-registration/vehicle-title/replace-lost-title-or-registration
  - https://www.nj.gov/mvc/vehicles/duptitle.htm
  - https://www.mass.gov/how-to/replace-your-vehicles-certificate-of-title
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 7. Florida electronic title 是州数据库中的有效所有权记录；无 lien 时可转成纸质，私人出售与交给 Florida dealer trade-in 的纸质要求不同。

- 官方来源：
  - https://www.flhsmv.gov/motor-vehicles-tags-titles/liens-and-titles/paper-liens-and-titles/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 8. 只补一张相同信息的 title 与修改姓名、owner、lienholder 或车辆信息不是同一事务，后者可能要走 corrected、substitute 或 transfer。

- 官方来源：
  - https://www.dmv.virginia.gov/vehicles/title/replacement
  - https://www.dmv.virginia.gov/online-services/replace-title
  - https://azdot.gov/faq/how-do-i-apply-duplicate-title-and-what-fee
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 9. Title 补发不一定现场交付：New York 明确现场不发证，California、Massachusetts 和 Virginia 也分别公布邮寄或处理时效。

- 官方来源：
  - https://dmv.ny.gov/titles/replace-a-title-certificate
  - https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/
  - https://www.mass.gov/how-to/replace-your-vehicles-certificate-of-title
  - https://www.dmv.virginia.gov/online-services/replace-title
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 10. Washington 普通 lost-title 路径要求所有 registered owners 在 notary 面前签 Affidavit of Loss；仍在还贷时由 lienholder 申请，并另有费用更高且有资格限制的 Quick Title 路径。

- 官方来源：
  - https://dol.wa.gov/vehicles-and-boats/vehicles/vehicle-registration/vehicle-title/replace-lost-title-or-registration
  - https://dol.wa.gov/vehicles-and-boats/vehicles/renew-or-replace-vehicle-tabs/affidavit-lossrelease-interest
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

## 10. 姓名变更文件怎么整理

- 页面：/topics/name-change-chain/
- 类型：高风险专题
- AI 辅助核对日期：2026-07-17
- 既有核对范围：逐条比对 SSA corrected card、连续姓名链、SSA/DMV 同步顺序、认证副本和州级姓名变更材料。
- 既有注意事项：已增加 SSA 两年/四年旧姓名证据规则，并将 SSA 先后顺序限定到 California、Florida 和 New York 具体路径；仍待人工签字。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 逐条声明（13 条）

#### 1. SSA 要求因结婚、离婚、法院命令等依法改名的人更新 Social Security 记录并申请姓名正确的 replacement card。

- 官方来源：
  - https://www.ssa.gov/faqs/en/questions/KA-01981.html
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 2. SSA corrected-card 申请通常要提供身份、新法定姓名和改名事件证据，并可能要证明公民身份或 lawful noncitizen status。

- 官方来源：
  - https://www.ssa.gov/faqs/en/questions/KA-01981.html
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 3. 改名文件不足以识别本人，或改名已超过两年（未满 18 岁为四年）时，SSA 会要求旧姓名身份证明，并可接受已经过期的旧姓名证件。

- 官方来源：
  - https://www.ssa.gov/ssnumber/ss5doc.htm
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 4. SSA 不接受普通 photocopy 或仅由 notary 认证的副本，要求原件或由记录保管机构认证的副本。

- 官方来源：
  - https://www.ssa.gov/ssnumber/ss5doc.htm
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 5. New York REAL ID / Enhanced 只能显示 full legal name，昵称、缩写名或 confirmation name 可能需要额外证明。

- 官方来源：
  - https://dmv.ny.gov/driver-license/enhanced-or-real-id
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 6. New York 因一次或多次婚姻、离婚等变更姓名时，要求提供每一次变更的文件来证明连续连接。

- 官方来源：
  - https://dmv.ny.gov/driver-license/enhanced-or-real-id
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 7. New York Standard document 的部分姓名变更路径要求新姓名已经在 SSA 记录中更新并与请求的 DMV 姓名准确匹配。

- 官方来源：
  - https://dmv.ny.gov/driver-license/change-information-on-dmv-photo-documents
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 8. California REAL ID 的 identity document 姓名与申请姓名不同时，需要相应 legal name change document。

- 官方来源：
  - https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 9. California 居住文件姓名因婚姻、离婚或法院命令而与关系追溯文件不同时，会要求额外姓名变更证明。

- 官方来源：
  - https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 10. California 办理 DL/ID 姓名变更时会先与 SSA 核验新姓名；SSA 信息不匹配会导致申请不能按新姓名完成。

- 官方来源：
  - https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/updating-information-on-your-driver-license-or-identification-dl-id-card/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 11. Florida 驾照或 ID 姓名变更要求先更新 SSA，并建议等待 24 至 48 小时；婚姻、离婚或法院改名要提交原件或 certified copy，church-issued marriage certificate 不被接受。

- 官方来源：
  - https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/u-s-citizen/
  - https://www.flhsmv.gov/name-and-address-changes/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 12. Massachusetts REAL ID 要求当前姓名与提交文件一致，不一致时要提供 marriage certificate 或 court document 等证明。

- 官方来源：
  - https://www.mass.gov/info-details/massachusetts-identification-id-requirements
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 13. Pennsylvania REAL ID document requirements 将姓名变更文件作为身份材料不一致时的独立证明类别。

- 官方来源：
  - https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check
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

## 11. 非美国公民办理驾照或 REAL ID 的注意点

- 页面：/topics/non-citizen-license-id/
- 类型：高风险专题
- AI 辅助核对日期：2026-07-17
- 既有核对范围：逐条比对 SAVE、limited-term credential、身份文件和州级非公民办理路径。
- 既有注意事项：已明确 SAVE 不决定驾照资格，并补充 additional verification 与 Texas limited-term 证据；仍待人工签字。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 逐条声明（12 条）

#### 1. REAL ID 合规州证件要求证明 lawful status，州仍可依法签发明确标注为非联邦用途的其他证件。

- 官方来源：
  - https://www.dhs.gov/real-id
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 2. Florida 非移民申请材料将 I-94 与有效护照配套，并要求 F/M 类别带 I-20、J 类别带 DS-2019。

- 官方来源：
  - https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 3. Florida 非移民材料页提示相关身份文件在签发日时应有超过 30 天的有效期，并在核验后邮寄正式证件。

- 官方来源：
  - https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 4. Georgia 要求 non-U.S. citizens 到 Customer Service Center 现场提交有效移民文件，证明 identity 和 lawful status。

- 官方来源：
  - https://dds.georgia.gov/georgia-licenseid/new-licenseid/information-non-us-citizens
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 5. Georgia 要求提交给 DDS 的 non-citizen 文件使用 English，并对外州证件遗失等场景另设 certified driving record 规则。

- 官方来源：
  - https://dds.georgia.gov/georgia-licenseid/new-licenseid/information-non-us-citizens
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 6. Georgia 通过 USCIS SAVE 核验非公民移民文件，少数案件可能需要数日而不能在柜台即时完成。

- 官方来源：
  - https://dds.georgia.gov/save
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 7. USCIS SAVE 提供身份状态信息给签发福利或执照的机构，但不替该机构决定申请人是否有资格获得驾照或 ID。

- 官方来源：
  - https://save.uscis.gov/save/app/client/ui/case-check
  - https://www.uscis.gov/sites/default/files/document/fact-sheets/SAVE_FACT_SHEET_for_Benefit_Applicants.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 8. 申请人在机构提交 SAVE 核验后，可以使用 CaseCheck 跟踪核验进度，并在结果返回后联系原办理机构。

- 官方来源：
  - https://save.uscis.gov/save/app/client/ui/case-check
  - https://www.uscis.gov/sites/default/files/document/fact-sheets/SAVE_FACT_SHEET_for_Benefit_Applicants.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 9. SAVE 初次未即时核验时可进入 additional verification；这表示核验仍在继续，不等于州机构已经作出不符合资格的决定。

- 官方来源：
  - https://www.uscis.gov/sites/default/files/document/guides/SAVE-Guide%20to%20Understanding%20SAVE%20Verification%20Responses.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 10. Georgia LIMITED-TERM DL/ID 的期限可与获准停留时间相关，但卡片本身不是 lawful status 证明。

- 官方来源：
  - https://dds.georgia.gov/partners/limited-term-dlids
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 11. California 对 temporary lawful status 申请人设置 limited-term DL/ID 路径，并要求相应 original identity / lawful-presence 文件。

- 官方来源：
  - https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/limited-term-for-legal-presence/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 12. Texas 对符合条件的 temporary visitor 签发标有 Limited Term 的驾照或 ID，通常随 lawful-presence period 到期；duration of status 情况按 Texas 规则处理。

- 官方来源：
  - https://www.dps.texas.gov/section/driver-license/driver-licenses-and-id-cards-temporary-visitors
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

## 12. 老人/高龄驾驶人续驾照、视力测试和医疗审查怎么处理

- 页面：/topics/older-driver-license-renewal-medical-review/
- 类型：高风险专题
- AI 辅助核对日期：2026-07-17
- 既有核对范围：逐条比对年龄触发续证、视力筛查、medical review、报告保密、强制医疗报告和 Illinois 2026 过渡规则。
- 既有注意事项：已增加 Illinois 旧到期日例外、Virginia/Georgia 年龄规则及 Pennsylvania/New Jersey 医疗报告边界；仍待人工签字。

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

## 13. SSN、ITIN 和不可取得 SSN 的情况

- 页面：/topics/ssn-and-itin/
- 类型：高风险专题
- AI 辅助核对日期：2026-07-17
- 既有核对范围：逐条比对 SSA、IRS 以及州 DMV 对 SSN、无 SSN 和 ITIN 的适用边界。
- 既有注意事项：已补充 Massachusetts 与 Florida 的州别例外；高风险页面仍待真实人工语义签字。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 逐条声明（11 条）

#### 1. SSA 说明一般只有获得 DHS 工作许可的非公民可以取得 SSN，另有少数依法认可的非工作用途例外。

- 官方来源：
  - https://www.ssa.gov/pubs/EN-05-10096.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 2. SSA 说明非公民不需要仅为了取得普通 driver license 而申请 SSN，并可在没有 SSN 时获得某些服务。

- 官方来源：
  - https://www.ssa.gov/pubs/EN-05-10096.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 3. SSA 的操作政策明确把普通 driver license 排除在分配 SSN 的有效非工作理由之外。

- 官方来源：
  - https://secure.ssa.gov/poms.nsf/lnx/0110211615
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 4. SSA 签发三类 Social Security card，其中临时工作许可和不具工作效力的卡面限制不同。

- 官方来源：
  - https://www.ssa.gov/ssnumber/cards.htm
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 5. IRS 将 ITIN 定义为联邦税务用途号码，它不授权工作、不改变移民身份，也不是联邦税务体系之外的身份证明。

- 官方来源：
  - https://www.irs.gov/tin/itin/individual-taxpayer-identification-number-itin
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 6. IRS 明确回答 ITIN 不能作为取得州驾照时的身份证明，并提醒 DMV 不要把它当成非税务身份证件。

- 官方来源：
  - https://www.irs.gov/individuals/additional-itin-information
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 7. New York Standard license 或 permit 可在没有 Social Security Card 和 ineligibility letter 的情况下申请。

- 官方来源：
  - https://dmv.ny.gov/driver-license/applying-for-a-standard-license-without-a-social-security-number-or-ineligibility
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 8. New York 申请 REAL ID-compliant license 或 permit 时，需要 Social Security Card 或前 30 天内签发的 SSA ineligibility letter。

- 官方来源：
  - https://dmv.ny.gov/driver-license/applying-for-a-standard-license-without-a-social-security-number-or-ineligibility
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 9. Massachusetts 的 Standard license 可在符合文件组合时使用 SSA denial notice 或 Affidavit of No SSN；REAL ID 的无 SSN 路径另有 denial notice、passport、visa 和 I-94 要求。

- 官方来源：
  - https://www.mass.gov/info-details/massachusetts-identification-id-requirements
  - https://www.mass.gov/doc/drivers-license-learners-permit-or-id-card-application-instructions-english/download
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 10. Florida 非移民材料页要求 SSN 证明上的姓名与将显示在 Florida license / ID 上的姓名一致。

- 官方来源：
  - https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 11. Florida 说明，没有工作签证的非移民不必取得 SSA refusal letter；没有 SSN 的申请人仍要按 Florida 的具体材料入口确认适用路径。

- 官方来源：
  - https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/
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

## 14. 没有 lawful status，驾照、REAL ID 和 Driving Privilege Card 怎么分

- 页面：/topics/standard-license-driving-privilege-no-lawful-status/
- 类型：高风险专题
- AI 辅助核对日期：2026-07-17
- 既有核对范围：逐条比对无 lawful status 的州级证件路径、联邦用途限制和证件是否可作州内身份证明。
- 既有注意事项：已纠正“所有此类证件都不能作身份证明”的过度概括；仍待人工签字。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 逐条声明（13 条）

#### 1. DHS REAL ID 规则要求申请人证明 lawful status；无法完成该核验时，不能把州级驾驶用途证件当作 REAL ID。

- 官方来源：
  - https://www.dhs.gov/real-id
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 2. California AB 60 允许无法提供 satisfactory legal presence 证明的合格居民申请驾照，但仍要证明身份和 California residency 并完成考试。

- 官方来源：
  - https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/assembly-bill-ab-60-driver-licenses/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 3. New York Green Light Law 允许年满 16 岁者不论 citizenship 或 lawful status 申请 Standard 非商业驾照，并可用无 SSN affidavit 路径。

- 官方来源：
  - https://dmv.ny.gov/driver-license/driver-licenses-and-the-green-light-law
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 4. New York Green Light 路径不提供 non-driver ID 或 CDL，卡面也会标注其不能用于联邦用途。

- 官方来源：
  - https://dmv.ny.gov/driver-license/driver-licenses-and-the-green-light-law
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 5. New Jersey 首次申请人可不论移民身份申请 basic driver license；Standard 身份清单接受 SSN、ITIN 或符合条件的 affidavit 路径。

- 官方来源：
  - https://www.nj.gov/mvc/pdf/license/FAQ_firsttime.pdf
  - https://www.nj.gov/mvc/license/6pointid.htm
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 6. Illinois 自 2024 年 7 月 1 日起以四年 Standard driver license 取代旧 TVDL，新的非 REAL ID 卡面写有 Federal Limits Apply。

- 官方来源：
  - https://www.ilsos.gov/news/2024/july/240701d1.pdf
  - https://www.ilsos.gov/content/dam/publications/pdf_publications/dsd_tvdl22.pdf
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 7. Maryland 对没有有效 USCIS 文件的 noncompliant credential 申请人要求取得 Maryland tax certification letter，并先有两年州所得税申报记录。

- 官方来源：
  - https://mva.maryland.gov/licenses-ids/additional-driver-id-services/noncompliant-drivers-licenses-ids
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 8. Colorado 的 Standard credential 不是 REAL ID，但可作为 Colorado 身份证件；相关申请路径仍要求一份当前实际居住地址证明且不接受 P.O. Box。

- 官方来源：
  - https://dmv.colorado.gov/drivers/standard-license-and-ID-cards
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 9. Connecticut drive-only license 只用于驾驶而不能用于一般身份证明或投票，但可用于在 Connecticut 登记车辆；外州同类证件不能直接转入。

- 官方来源：
  - https://portal.ct.gov/dmv/licenses-permits-ids/get-drive-only-license/faqs-drive-only-license
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 10. Utah Driving Privilege Card 是 Class D 驾驶用途证件，不能作为 Utah 政府 ID、不能用于 CDL，且通常在申请人下一次生日到期。

- 官方来源：
  - https://dld.utah.gov/what-is-a-driving-privilege-card/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 11. Massachusetts 可向无法提供 lawful presence、但满足其他驾驶资格并证明身份、生日和州居住要求的申请人签发非联邦用途 Standard license。

- 官方来源：
  - https://www.mass.gov/info-details/mass-general-laws-c90-ss-8
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 12. Delaware DPC 面向无法提供 legal presence 的合格 Delaware 居民，仅用于驾驶并明确标注 Not Valid for Identification。

- 官方来源：
  - https://dmv.de.gov/DriverServices/drivers_license/DPC/index.shtml
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 13. New Mexico 为 noncommercial Standard driver license 和 not-intended-for-federal-purposes ID 设置单独材料路径，不能把它当作 REAL ID。

- 官方来源：
  - https://www.mvd.newmexico.gov/chapter-7-standard-drivers-license-and-not-intended-for-federal-purposes-id/
  - https://www.mvd.newmexico.gov/wp-content/uploads/2023/05/RevisedStandardacceptabledocs3.10.23.pdf
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

## 15. 留学生、访问学者和短期工作，算不算 resident，要不要换驾照或注册车

- 页面：/topics/student-temporary-resident-license-registration/
- 类型：高风险专题
- AI 辅助核对日期：2026-07-17
- 既有核对范围：逐条比对学生/临时居民、外国驾照、州 resident 定义、驾照期限和车辆登记期限。
- 既有注意事项：已明确 New York 居民争议由法官判断而非 DMV 裁定，并补充 Florida 驾照 30 天与车辆 10 天的不同期限；仍待人工签字。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 逐条声明（12 条）

#### 1. USA.gov 提醒外国驾照和 International Driving Permit 的接受规则由各州决定，IDP 不能脱离本国有效驾照单独提供驾驶资格。

- 官方来源：
  - https://www.usa.gov/non-citizen-driving
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 2. New York DMV 说明外州或外国学生通常不被视为 New York resident；成为居民并驾驶时要在 30 天内取得 New York 驾照。

- 官方来源：
  - https://dmv.ny.gov/driver-license/driving-in-new-york-state
  - https://dmv.ny.gov/more-info/moving-to-or-from-new-york-state
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 3. New York 把 resident 定义为有意把州内住所作为固定永久居所的人，维持住所至少 90 天是推定证据；有争议时由法官判断，DMV 不决定是否为居民或必须换证、登记车辆。

- 官方来源：
  - https://dmv.ny.gov/driver-license/driving-in-new-york-state
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 4. New York 允许符合条件的 nonresident 使用有效外国驾照驾驶，IDP 不是强制文件，但在驾照非英文时可帮助说明内容。

- 官方来源：
  - https://dmv.ny.gov/driver-license/driving-in-new-york-state
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 5. California DMV 说明成为 California resident 后，驾驶人要在 10 天内申请 California driver license。

- 官方来源：
  - https://www.dmv.ca.gov/portal/file/fast-facts-5-requirements-for-a-california-drivers-license/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 6. California 对带入州内的外州车辆通常要求在成为 resident 或开始在州内工作后的 20 天内办理登记。

- 官方来源：
  - https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/vehicle-registration-requirements/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 7. Florida visitor 可持居住国有效驾照驾驶；一旦符合官方 resident 触发条件，通常要在 30 天内取得 Florida 驾照。

- 官方来源：
  - https://www.flhsmv.gov/driver-licenses-id-cards/visiting-florida-faqs/
  - https://www.flhsmv.gov/new-resident/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 8. Florida 新居民页面把人的驾照和车辆业务分开：驾照通常在建立 residency 后 30 天内办理，车辆要先取得 Florida insurance，并在 10 天内 title 和 register。

- 官方来源：
  - https://www.flhsmv.gov/new-resident/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 9. Texas 新居民通常要在 30 天内先登记车辆，并可在搬入后最多 90 天内使用外州驾照再申请 Texas 驾照。

- 官方来源：
  - https://www.txdmv.gov/motorists/new-to-texas
  - https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 10. Texas 合格 temporary visitor 会取得标有 Limited Term 的驾照或 ID；证件通常随 lawful presence 到期，duration of status 场景通常为一年。

- 官方来源：
  - https://www.dps.texas.gov/section/driver-license/driver-licenses-and-id-cards-temporary-visitors
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 11. Washington 新居民有 30 天取得 Washington 驾照并登记车辆，而且通常要先取得 Washington 驾照再办理车辆登记。

- 官方来源：
  - https://dol.wa.gov/moving-washington
  - https://dol.wa.gov/moving-washington/vehicle-registration-and-plates
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 12. New Jersey 新居民通常要在搬入后 60 天内或现有驾照和登记先到期前完成驾照与车辆 title / registration 转入。

- 官方来源：
  - https://www.nj.gov/mvc/drivertopics/movetonj.htm
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

## 16. 罚单、toll、保险 lapse 或 registration hold，先查 DMV 还是法院

- 页面：/topics/tickets-tolls-insurance-lapse-registration-hold/
- 类型：高风险专题
- AI 辅助核对日期：2026-07-17
- 既有核对范围：逐条比对 toll threshold、court clearance、insurance lapse、registration hold 和诈骗提醒。
- 既有注意事项：已修正 Virginia toll invoice 条件并拆分五州保险后果；高风险页面仍待真实人工语义签字。

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

## 17. 买二手车前，title、lien、salvage 和 odometer 怎么查

- 页面：/topics/used-car-title-lien-salvage-odometer-check/
- 类型：高风险专题
- AI 辅助核对日期：2026-07-17
- 既有核对范围：逐条比对私人交易 ownership chain、title/lien、brand、odometer、history report 和 dealer/private-sale 边界。
- 既有注意事项：已纠正 California 卖家与 title owner 不同的过度概括，加入合法 bill-of-sale chain 与 New York 涂改 title 规则；仍待人工签字。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 逐条声明（12 条）

#### 1. California 私人交易要求取得卖方签署的 title；若实际卖家不是 title 上的登记车主，还要提交由实际卖家和登记车主共同签署的 bill of sale。

- 官方来源：
  - https://www.dmv.ca.gov/portal/vehicle-registration/new-registration/registering-a-vehicle-purchased-from-a-private-party/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 2. New York 指引提醒，title 显示 lienholder 时应取得贷款已清偿的正式 lien release，否则 lien 仍可能影响所有权和车辆处置。

- 官方来源：
  - https://dmv.ny.gov/new-york-state-drivers-manual-and-practice-tests/chapter-3-owning-a-vehicle
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 3. New York 不接受 odometer/damage disclosure 未完成，或姓名、签名等信息被调整、擦除、取消的 title；发现错误应先取得有效更正或 replacement，而不是自行涂改。

- 官方来源：
  - https://dmv.ny.gov/new-york-state-drivers-manual-and-practice-tests/chapter-3-owning-a-vehicle
  - https://dmv.ny.gov/titles/certificate-of-title
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 4. NMVTIS 消费者报告可用于核对当前 title、brand、最近里程以及 junk、salvage 或 insurance total-loss 等记录线索。

- 官方来源：
  - https://vehiclehistory.bja.ojp.gov/nmvtis_consumers
  - https://vehiclehistory.bja.ojp.gov/nmvtis_vehiclehistory
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 5. 联邦规则要求车辆所有权转移时提供书面 odometer disclosure；2011 model year 及以后车辆通常要持续披露到车龄达到 20 年。

- 官方来源：
  - https://www.nhtsa.gov/vehicle-safety/odometer-fraud
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 6. FTC Used Car Rule 要求多数二手车 dealer 展示 Buyers Guide，并在成交时把反映最终 warranty 条款的版本交给买方。

- 官方来源：
  - https://www.ftc.gov/business-guidance/resources/dealers-guide-used-car-rule
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 7. FTC 建议即使车辆被 dealer 标为 certified 或已经检查过，买方仍应取得 vehicle history report 并安排独立 mechanic 检查。

- 官方来源：
  - https://consumer.ftc.gov/consumer-alerts/2024/07/what-know-when-buying-used-car-online
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 8. Texas Title Check 指引要求买方在付款前核对 VIN、title 和 brand，并警惕 salvage、rebuilt、flood 及 odometer brand。

- 官方来源：
  - https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy
  - https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy/salvage-brands
  - https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy/odometer-brands
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 9. Texas Title Check 明确提醒私人交易不能在未取得 title 的情况下离开，并要求卖方在 title 上填写姓名、出售日期和 odometer。

- 官方来源：
  - https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 10. California 的 branded title 会显示车辆发生过重大损坏、高里程或其他重要历史；clean title 不能替代事故历史和机械状态调查。

- 官方来源：
  - https://www.dmv.ca.gov/portal/vehicle-registration/titles/branded-titles/
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 11. Washington DOL 建议买方在签字前核对 title、VIN、卖方身份和车辆历史，并把 title fraud 当作独立风险处理。

- 官方来源：
  - https://dol.wa.gov/vehicles-and-boats/vehicles/buying-and-selling-vehicle/buy-and-register-vehicle
  - https://dol.wa.gov/vehicles-and-boats/vehicles/vehicle-registration/vehicle-title/title-fraud
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 12. New Jersey 对 salvage 或 rebuilt vehicle 设有专门 title 和检查路径，不能把普通 clean-title transfer 流程直接套用。

- 官方来源：
  - https://www.nj.gov/mvc/vehicles/salvage.htm
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
