# 加州驾照中文笔试练习：发布简报

制定日期：2026-08-01  
拟发布路径：`/practice-tests/california/`  
当前状态：官方来源已确认，等待题目编写与发布门禁  
内容负责人：DMVCN 官方编辑

## 一、为什么准备这页

- 用户需要的不是又一份驾照手册摘要，而是一组能立即作答、答完知道错在哪里的中文练习。
- California DMV 当前提供 Class C 官方样题的中文版本，也明确说明知识考试题目来自 Driver's Handbook。
- 现有 Georgia 练习页已经验证了逐题解释、易错点和官方章节的内容结构，可以复用交互方式，但不能复制 Georgia 题目或 California DMV 样题原句。
- Search Console 当前没有达到门槛的新页面查询证据，因此本页先进入制作队列，不在旧数据下直接上线。

## 二、目标搜索意图

主意图：

- 加州驾照笔试中文
- 加州 DMV 中文考试题
- California permit test 中文练习
- 加州 Class C 笔试练习

需要在页面内分开的次级问题：

- 第一次申请驾照的 knowledge test 与续期 eLearning 不是同一条路径。
- DMV 官方中文样题与 DMVCN 原创练习不是正式考试原题。
- eLearning 的中文选项只适用于符合条件的非商业 Class C 续期申请人，不能写成所有申请人都能选择。

## 三、已确认的官方依据

1. California DMV 知识与路考准备页  
   https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/preparing-for-knowledge-and-drive-tests/

   可支持：知识考试题目来自 Driver's Handbook；正式题目为一个正确答案和两个不合适选项；续期申请人可能有 eLearning 路径。

2. California Driver's Handbook  
   https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/

   可支持：所有原创练习题的规则基础。当前页面说明手册提供九种语言。

3. California DMV Testing Process  
   https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/the-testing-process/

   可支持：首次驾照申请需要通过多项选择知识考试；有三次尝试机会；未成年人补考等待期；考试中不得使用手册或手机；续期 eLearning 只是一种可能的替代路径。

4. California DMV 官方 Class C 样题  
   https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/sample-driver-license-dl-knowledge-tests/

   可支持：官方提供四组中文 Class C 示例，并会不定期更新样题。本站只能研究覆盖范围和题型，不能逐句改写后当成原创题库。

5. California DMV Online Learning  
   https://qr.dmv.ca.gov/portal/driver-education-and-safety/online-learning-and-tests/

   可支持：符合条件的非商业 Class C 续期申请人可选择 eLearning；课程为 pass-only、no-fail，约 20-30 分钟，提供繁体中文和普通话音频。

6. California Driver's Handbook：Laws and Rules of the Road  
   https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/laws-and-rules-of-the-road/

7. California Driver's Handbook：Safe Driving  
   https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/safe-driving/

8. California Driver's Handbook：Safe Driving Continued  
   https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/safe-driving-cont1/

## 四、首发内容规格

- 20 道原创中文四选一练习题。
- 题目按“信号与标志”“先行权与路口”“速度与安全距离”“停车与共享道路”四组组织。
- 每题必须包含：唯一正确答案、中文解释、常见误区、官方来源、手册章节、事实核对日期。
- 答题后立即显示解释；完成后显示总分、分类得分和建议复习章节。
- 页面开头先区分首次申请、普通知识考试和续期 eLearning。
- 页面明确声明：不是 California DMV 正式题库，不保证正式考试出现相同题目。
- 官方中文样题只作为题型和覆盖范围线索，不复制题干、选项或答案说明。

## 五、首批题目范围

1. 稳定红灯右转的停车与让行条件。
2. 红色箭头与稳定红灯的区别。
3. 闪烁红灯与闪烁黄灯的处理。
4. 信号灯完全失灵时如何通过路口。
5. STOP、YIELD、学校、铁路与菱形警告标志。
6. 无信号路口同时到达时的先行顺序。
7. T 型路口与左转车辆的让行责任。
8. 进入环岛前应让行给谁。
9. 行人、有白手杖或导盲犬行人的先行权。
10. 陡峭狭窄山路会车时谁应倒车。
11. Basic Speed Law 与现场条件的关系。
12. 雨、雾、夜间及低能见度下的速度选择。
13. 跟车距离和大型车辆盲区。
14. 自行车、摩托车与轻轨周边的观察方法。
15. 路口堵塞时不得进入路口的规则。
16. 学校区域和人行横道前的停车位置。
17. 铁路道口的观察、停车与紧急标志。
18. 路边颜色、停车限制和消防设施周边停车。
19. 手机、分心驾驶和未成年人设备限制。
20. 安全带、儿童约束或事故现场的基础处理。

每个题目在写入代码前仍要回到对应官方章节逐条核对，不能只依据这份范围表编写答案。

## 六、技术实施

- 把当前 Georgia 单页提取为可复用的练习页模板，由 `practiceTests` 数据生成州级路由。
- 保留无 JavaScript 降级、键盘操作、即时解释、错题重练和分类得分。
- 练习首页从 `practiceTests` 自动生成州列表，避免新增州时手动改多个页面。
- 扩展 `audit:practice`：检查题目 ID 唯一、四个选项、答案索引、来源存在、章节非空、事实核对日期和至少四个内容分类。
- 新页面通过内容、E-E-A-T、官方来源、内部链接、SEO、结构化数据和 390px / 1440px 视觉检查后才能进入 sitemap。

## 七、发布前停止条件

出现以下任一情况，本页继续留在制作队列：

- Search Console 没有恢复到可用的新快照，无法判断加州、纽约或德州哪个州应先发布。
- 题目只能对官方样题做近似翻译，无法形成独立解释价值。
- 某道题找不到当前 California DMV 手册章节作为直接依据。
- 页面把续期 eLearning 错写成首次申请人的通用考试选项。
- 移动端题目、选项、解释或来源链接发生遮挡、溢出或布局跳动。

## 八、后续顺序

1. 恢复 Search Console 登录并导入新的 28 天页面、查询、国家和设备数据。
2. 根据中文查询和美国流量决定 California 是否仍排第一；若证据转向 New York 或 Texas，只替换州级来源，不降低内容规格。
3. 编写并逐题核对 20 道原创题。
4. 抽取通用练习模板并运行完整门禁。
5. 上线后 14 天只观察查询归属、CTR 和完成体验，不因少量曝光立即改题。
