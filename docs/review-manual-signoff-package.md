# 高风险页面人工语义复核包

生成日期：2026-07-30

## 使用规则

- 本文件不是自动通过证明。只有真实人员打开来源正文并完成语义判断后，才可填写 reviewer 和 reviewedAt。
- 审核人不需要具备虚构的 DMV、律师或移民顾问资历；如无相应资历，不得在姓名或备注中暗示专业背书。
- 每条声明至少检查适用州、适用人群、期限或金额、例外、法律后果、来源是否仍有效，以及中文是否扩大了官方原意。
- 发现一条关键事实无法由现行官方正文支持时，应选择“退回修改”或“部分通过”，不能为了让严格审计变绿而签字。
- 月度复核日期保持空白，只有完成本轮核对后才能填写；不得沿用上一次日期。
- 高风险正文、声明、州归属或就近来源的内容指纹发生变化时，旧签字会自动失效，页面保持 noindex；修改日期仍会单独复核。
- 审核完成后，把签字表 CSV 填好，再执行 `SIGNOFF_CSV=docs/review-manual-signoff-template.csv npm run review:signoffs:import`。
- 导入签字后，还要把页面公开的“事实核对”日期更新为同一真实日期；两处日期中任一处未更新，30 天门禁都不会延期。
- 初次通过导入后，页面会在下一次构建时自动移除 `noindex` 并重新进入 sitemap；未签字页继续保留访问入口，但不提交搜索引擎收录。

## 1. /directories/costs-timing/

- 页面：/directories/costs-timing/
- 类型：高风险目录
- 当前内容版本日期：2026-07-29
- 页面公开事实核对日期：2026-07-29
- 现有人工签字日期：2026-07-21
- 当前内容指纹：5a7c27951f1c74d602e86cb5857746f4c984ba431150161ff4604ab40e3c8507
- 人工签字内容指纹：4fb3e31643ce713c3db47a2f1040866859c0fd5ccf518a2d933bfd5c1e733746
- 本轮原因：内容或来源版本变化后重新人工核对（旧签字已失效）
- 既有核对范围：人工核对各州费用、付款方式、临时凭证和寄送时间，并确认正文提示与所列政府来源一致。
- 既有注意事项：站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。

### 页面级检查

- [ ] 页面标题、搜索意图和目标用户一致。
- [ ] 办理步骤没有把州级规则写成全国统一规则。
- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。
- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。
- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。

### 目录证据检查

- 当前可见证据行：172
- 当前官方来源链接：172
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
- 当前内容版本日期：2026-07-24
- 页面公开事实核对日期：2026-07-21
- 现有人工签字日期：2026-07-21
- 当前内容指纹：4a4086f3c12f1234b7c13a6cb0062664ab64ee4af3a47fba5506369711f09512
- 人工签字内容指纹：7969c567dda577feaa1a7abe29207b5e5271e21ee6f97c218b4ce2d3d762d8fd
- 本轮原因：内容或来源版本变化后重新人工核对（旧签字已失效）
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
- 当前内容版本日期：2026-07-29
- 页面公开事实核对日期：2026-07-21
- 现有人工签字日期：2026-07-21
- 当前内容指纹：f30fb5095fdb3093ef33eb52bd3fcef69c87d46f091de1d1df750dfc6f0c0d86
- 人工签字内容指纹：d374a93cd343400d717c3eab0d0ad3fa347e05040dc6599bc90cd185a326b2b3
- 本轮原因：内容或来源版本变化后重新人工核对（旧签字已失效）
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
- 当前内容版本日期：2026-07-21
- 页面公开事实核对日期：2026-07-21
- 现有人工签字日期：2026-07-21
- 当前内容指纹：a67db58ca93077dfbdb702d265269883d1c39da3cf78111abeccf0187349a4a8
- 人工签字内容指纹：a67db58ca93077dfbdb702d265269883d1c39da3cf78111abeccf0187349a4a8
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
- 当前内容版本日期：2026-07-29
- 页面公开事实核对日期：2026-07-21
- 现有人工签字日期：2026-07-21
- 当前内容指纹：56ea7508a602303250d33d45bda7a8324c41cb4358f0ea1f197ccc6235dfe815
- 人工签字内容指纹：451ff146b364df74a48e60163370b16147809508b7f9af3f2789b4a0f9f2a530
- 本轮原因：内容或来源版本变化后重新人工核对（旧签字已失效）
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

## 6. 亲属赠车或继承车辆怎么过户：Title、Lien、税费和车主去世

- 页面：/topics/gift-inherited-vehicle-title-transfer/
- 类型：高风险专题
- 当前内容版本日期：2026-07-29
- 页面公开事实核对日期：2026-07-29
- 现有人工签字日期：2026-07-21
- 当前内容指纹：691925a488c8d6d99fbd0f11645404eefc4d85893772ca2f263a2d534f8292b5
- 人工签字内容指纹：ee3982002d0145de263573d45eea31f4bca66cbf474da4618aa83800be4d4c3a
- 本轮原因：内容或来源版本变化后重新人工核对（旧签字已失效）
- 既有核对范围：人工核对赠与、继承、共同车主、遗产、税费、留置权和车辆所有权转移要求。
- 既有注意事项：站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。

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

## 7. 车辆 Title 丢了怎么补：谁能申请、Lien 与卖车前处理

- 页面：/topics/lost-vehicle-title-replacement-electronic-title-lien-sale/
- 类型：高风险专题
- 当前内容版本日期：2026-07-29
- 页面公开事实核对日期：2026-07-29
- 现有人工签字日期：2026-07-21
- 当前内容指纹：ff859c9bfd0463df385b873d12cc5bdfb24dfe653e7971c67f6527488db43739
- 人工签字内容指纹：cc6ef372c75eaffec65de4579924ff51c83644a95aca61b6672644b422b4db69
- 本轮原因：内容或来源版本变化后重新人工核对（旧签字已失效）
- 既有核对范围：人工核对遗失车辆所有权证、电子 title、留置权、补发和出售前处理要求。
- 既有注意事项：站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。

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

## 8. 在美国改名后先去哪里更新：SSA、驾照和姓名文件顺序

- 页面：/topics/name-change-chain/
- 类型：高风险专题
- 当前内容版本日期：2026-07-29
- 页面公开事实核对日期：2026-07-29
- 现有人工签字日期：2026-07-21
- 当前内容指纹：77adf1bb34ef55c29d3ad6fb4f4bf8299a3e7eb2b309d24578d48816e11fb7be
- 人工签字内容指纹：a18e0b6a5e2719c9ac54302f0e54da0073a55f83e5e7606c624c92fde49b599b
- 本轮原因：内容或来源版本变化后重新人工核对（旧签字已失效）
- 既有核对范围：人工核对姓名变更、SSA 同步、身份文件衔接、翻译和各机构办理顺序。
- 既有注意事项：站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。

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

## 9. 老人/高龄驾驶人续驾照、视力测试和医疗审查怎么处理

- 页面：/topics/older-driver-license-renewal-medical-review/
- 类型：高风险专题
- 当前内容版本日期：2026-07-17
- 页面公开事实核对日期：2026-07-17
- 现有人工签字日期：2026-07-21
- 当前内容指纹：794e6fad9ad41ed84427a7a0444f23405515700953679aefff58166b2b4072d9
- 人工签字内容指纹：794e6fad9ad41ed84427a7a0444f23405515700953679aefff58166b2b4072d9
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

## 10. 罚单、toll、保险 lapse 或 registration hold，先查 DMV 还是法院

- 页面：/topics/tickets-tolls-insurance-lapse-registration-hold/
- 类型：高风险专题
- 当前内容版本日期：2026-07-29
- 页面公开事实核对日期：2026-07-29
- 现有人工签字日期：2026-07-21
- 当前内容指纹：afd77218247c408371b8d9a883e42fd415717270b1ef89eaa05a07b68886cea9
- 人工签字内容指纹：1c8c1345a21df576bc6489914d3a74256a6e3c2e1e4c22788e4cf303c57334e0
- 本轮原因：内容或来源版本变化后重新人工核对（旧签字已失效）
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

#### 2. New York 可因 5 年内、不同日期 toll transactions 产生的 3 份以上违规通知而拟议暂停 vehicle registration；若涉及 commercial motor vehicle，5 年内未付 toll、fee 和其他 charge 累计达到 200 美元，也可触发拟议暂停。

- 官方来源：
  - https://dmv.ny.gov/registration/registration-suspensions-for-failure-to-pay-tolls
  - https://dos.ny.gov/january-5-2022vol-xliv-issue-1
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

#### 11. Massachusetts Non-Renewal Program 由参与的 municipality、authority 或其授权处理方标记并清除 unpaid obligation；parking ticket 或 excise tax 应向 city / town 处理，E-ZPass 违章应向 E-ZPass MA 处理。

- 官方来源：
  - https://www.mass.gov/info-details/non-renewal-program
  - https://www.mass.gov/how-to/renew-your-real-or-standard-passenger-class-d-or-motorcycle-class-m-drivers-license
- [ ] 来源正文直接支持这条中文声明。
- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。
- [ ] 页面给出的行动建议与来源机构的职责相符。
- 审核备注：

#### 12. Texas FTA/FTP 罚单付款后最多可能需要 7 个工作日才从系统清除；若仍列在 Outstanding Violations，应联系收款法院，DPS 只能在 citation 已关闭后继续处理。

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
