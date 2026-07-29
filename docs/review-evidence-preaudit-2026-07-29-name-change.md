# 改名后 SSA、DMV 与姓名文件专题差异预审

- 页面：`/topics/name-change-chain/`
- 预审日期：2026-07-29
- 预审执行：Codex AI 辅助证据核查
- 人工签字基线：2026-07-21（commit `b01c07b`）
- 人工签字内容指纹：`a18e0b6a5e2719c9ac54302f0e54da0073a55f83e5e7606c624c92fde49b599b`
- 当前内容指纹：`77adf1bb34ef55c29d3ad6fb4f4bf8299a3e7eb2b309d24578d48816e11fb7be`
- 发布状态要求：真人核对当前差异并签字前保持 `noindex,follow`，不得进入 sitemap

## 基线差异

把当前结构化专题内容与 2026-07-21 人工签字版本逐字段比较，只有以下内容发生变化：

1. 标题从“姓名变更文件怎么整理”改为直接回答改名后 SSA、驾照与姓名文件的更新顺序。
2. description 增加“已经完成法律改名”的前提，并说明 SSA 与 DMV 顺序要按州判断。
3. 新增“先看结论”段落。

以下内容与人工签字版本逐字节一致：

- 3 类目标用户
- 8 条关键事实
- 8 项准备清单
- 7 个办理步骤
- 5 个 FAQ
- 13 条声明级 `factChecks`
- 11 个官方来源
- 相关州与目录入口

## 新增首段核对

### DMV 不负责把昵称变成 legal name

- 状态：`confirmed-current`
- New York DMV 当前 REAL ID / Enhanced 页面明确只打印 full legal name；nickname、缩写名或其他替代名称不能直接作为证件姓名，必要时要提供 full legal name 或 court-ordered name change 的额外证明。
- SSA 当前 FAQ 也把 marriage、divorce、court order 等依法改名与“更正姓名”分开说明，并要求 corrected card 使用正确 legal name。
- 官方来源：
  - https://dmv.ny.gov/driver-license/enhanced-or-real-id
  - https://www.ssa.gov/faqs/en/questions/KA-01981.html

### 法律改名文件与连续姓名链

- 状态：`confirmed-current`
- SSA 当前文件页要求证明身份、新法定姓名和 name-change event，并接受其列明的 marriage、divorce、court-order 等文件类型。
- New York 当前页面要求一次或多次婚姻、离婚造成的姓名变化逐段提供证明。
- California 当前姓名更新页也提醒，曾经发生过多次法律改名时，可能要提供全部 former name changes。
- 官方来源：
  - https://www.ssa.gov/ssnumber/ss5doc.htm
  - https://dmv.ny.gov/driver-license/enhanced-or-real-id
  - https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/updating-information-on-your-driver-license-or-identification-dl-id-card/

### SSA 与 DMV 的先后顺序按州和办理路径判断

- 状态：`confirmed-current`
- California 当前页面要求先通知 SSA；DMV 申请新姓名时首先与 SSA 核验，不匹配会拒绝本次申请。
- Florida 当前页面要求 name change 先在 SSA 完成，并等待 24 至 48 小时再向 FLHSMV 办理。
- New York 当前页面把“SSA 已更新且姓名完全匹配”列为 Standard document 邮寄改名路径的资格条件，并没有把该邮件资格说明写成所有州的全国规则。
- 官方来源：
  - https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/updating-information-on-your-driver-license-or-identification-dl-id-card/
  - https://www.flhsmv.gov/name-and-address-changes/
  - https://dmv.ny.gov/driver-license/change-information-on-dmv-photo-documents

### 原件、certified copy 与特殊时限

- 状态：`confirmed-current`
- SSA 当前文件页仍要求原件或签发机构认证副本，不接受普通 photocopy 或 notarized copy。
- 改名文件不足以识别本人，或改名超过两年（未满 18 岁为四年）时，SSA 仍会要求 prior-name identity document；该特定旧姓名证件可以过期。
- Florida 当前页面仍要求姓名连接文件，并明确 church-issued marriage certificate 不接受；SSA 更新后等待 24 至 48 小时的提示仍在。
- 官方来源：
  - https://www.ssa.gov/ssnumber/ss5doc.htm
  - https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/u-s-citizen/

## Search Console 意图判断

Search Console 已出现“在哪里改名”一类中文查询。本轮没有据此把页面改写成法院法律改名指南，原因如下：

1. 查询没有说明用户是尚未取得法律改名依据，还是已经改名后需要更新证件。
2. 本页搜索意图明确限定为“完成法律改名以后，如何连接姓名文件并更新 SSA / DMV”。
3. SSA 和 DMV 负责更新各自记录，不负责替用户完成州法院或其他法定改名程序。
4. 现有标题已用“改名后”限定范围，首段也明确没有法律依据时不能让 DMV 直接采用昵称或常用英文名。
5. 当前信号样本仍小，不应为了一个模糊查询把页面扩成跨州法院改名内容。

当前编辑决定：

- 保留现有标题、description 与首段。
- 不增加没有州别的法院改名步骤。
- 后续只有在 Search Console 出现明确州名和“如何申请 legal name change”意图时，才评估单独页面或州级入口。
- 该页继续等待当前版本真人语义复核，不因标题更准确就沿用旧签字。

## 访问结果

- 直接读取成功（HTTP 200）：SSA 两个入口、California DMV、New York DMV 两个入口、Florida FLHSMV 两个入口。
- 本轮没有用第三方文章、搜索摘要或 AI 常识代替政府正文。

## 预审结论

- 新增首段可追溯到当前官方来源：是
- 原有 13 条声明是否发生变化：否
- 需要修正的新增表述：0
- 需要新增的无州别法院改名内容：0
- 旧人工签字是否覆盖当前内容：否
- 当前页面是否应进入 sitemap：否
- AI 是否可以替代真人签字：否

## 真人复核交接

- [ ] 已在 `dmvcn` 浏览器空间打开当前页面。
- [ ] 已确认页面只处理完成法律改名后的证件更新，不把 DMV 写成法律改名机构。
- [ ] 已确认 SSA 对 legal name、identity、name-change event 和 lawful status 文件的要求。
- [ ] 已确认 California、Florida 与 New York 所列 SSA / DMV 顺序没有被写成全国规则。
- [ ] 已确认 New York 对多次改名连续文件链的要求。
- [ ] 已确认 SSA 的原件、certified copy、两年/四年和旧姓名证件例外。
- [ ] 已确认 Florida 的 24 至 48 小时与 church-issued marriage certificate 限制。
- [ ] 已确认标题和 description 没有扩大正文承诺。

- 审核人真实姓名：
- 审核日期：
- 审核范围：
- 结论：通过 / 退回修改 / 部分通过
- 修改或保留意见：
