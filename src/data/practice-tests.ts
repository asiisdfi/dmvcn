export type PracticeCategory = 'road-rules' | 'road-signs';

export type PracticeSource = {
  id: string;
  label: string;
  url: string;
  scope: string;
  checkedAt: string;
};

export type PracticeQuestion = {
  id: string;
  category: PracticeCategory;
  prompt: string;
  choices: readonly [string, string, string, string];
  correctIndex: number;
  explanation: string;
  commonTrap: string;
  sourceId: string;
  sourceSection: string;
};

export type PracticeTest = {
  slug: string;
  stateId: string;
  stateNameZh: string;
  stateNameEn: string;
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt: string;
  reviewedAt: string;
  nextReviewAt: string;
  officialExam: {
    summary: string;
    languageNote: string;
    conflictNote: string;
    sourceIds: readonly string[];
  };
  sources: readonly PracticeSource[];
  questions: readonly PracticeQuestion[];
};

const GA_EXAM_INFO = 'ga-exam-info';
const GA_OFFICIAL_PRACTICE = 'ga-official-practice';
const GA_DRIVER_MANUAL = 'ga-driver-manual';
const GA_SIGNALS = 'ga-signals';
const GA_TRAFFIC_LAWS = 'ga-traffic-laws';
const GA_KEEP_RIGHT = 'ga-keep-right';
const GA_SAFETY = 'ga-safety';
const GA_SHARING_ROAD = 'ga-sharing-road';

export const georgiaPracticeTest: PracticeTest = {
  slug: 'georgia',
  stateId: 'georgia',
  stateNameZh: '佐治亚州',
  stateNameEn: 'Georgia',
  title: '佐治亚州驾照中文笔试练习',
  description:
    '依据 Georgia DDS 当前考试说明与官方 Driver Manual 编写的 20 道原创中文练习题，逐题提供中文解释、易错点和官方章节。',
  publishedAt: '2026-07-19',
  modifiedAt: '2026-07-19',
  reviewedAt: '2026-07-19',
  nextReviewAt: '2026-09-17',
  officialExam: {
    summary:
      'Georgia 非商业知识考试分为 Road Rules 和 Road Signs 两部分；当前 DDS 考试页写明每部分 20 题，分别至少答对 15 题才通过。知识考试无需预约，但非商业考生须在服务中心关门至少 30 分钟前开始考试。',
    languageNote:
      '截至本页事实核对日，Georgia DDS 当前 Test and Exams Information 将 Road Rules 和 Road Signs 都列为可用中文的非商业知识考试。',
    conflictNote:
      'DDS 在线 Driver Manual 的旧版 Testing Information 仍写 Road Signs 只用英语，与当前考试专页不一致。需要中文 Road Signs 的考生应在前往具体考点前向 DDS 确认。',
    sourceIds: [GA_EXAM_INFO, GA_OFFICIAL_PRACTICE, GA_DRIVER_MANUAL],
  },
  sources: [
    {
      id: GA_EXAM_INFO,
      label: 'Georgia DDS Test and Exams Information',
      url: 'https://dds.georgia.gov/testing-and-training/test-and-exams-information',
      scope: '知识考试结构、通过分数、考试语言、到场时间和补考规则。',
      checkedAt: '2026-07-19',
    },
    {
      id: GA_OFFICIAL_PRACTICE,
      label: 'Georgia DDS Practice Test',
      url: 'https://dds.georgia.gov/testing-and-training/practice-test',
      scope: 'DDS 官方练习入口及以 Driver Manual 备考的说明。',
      checkedAt: '2026-07-19',
    },
    {
      id: GA_DRIVER_MANUAL,
      label: 'Georgia DDS Driver Manual',
      url: 'https://dds.georgia.gov/drivers-manual',
      scope: 'Road Signs、交通法规、车灯、铁路道口和环岛等官方学习内容。',
      checkedAt: '2026-07-19',
    },
    {
      id: GA_SIGNALS,
      label: 'Georgia DDS Section 7: Traffic Signals and Signs',
      url: 'https://dds.georgia.gov/section-7-continued-traffic-signals-and-signs',
      scope: '红灯、闪烁信号和信号灯完全失灵时的处理。',
      checkedAt: '2026-07-19',
    },
    {
      id: GA_TRAFFIC_LAWS,
      label: 'Georgia DDS Section 5: Traffic Laws',
      url: 'https://dds.georgia.gov/section-5-traffic-laws',
      scope: '让行、Move Over、超车、转弯、停车和其他州级交通规则。',
      checkedAt: '2026-07-19',
    },
    {
      id: GA_KEEP_RIGHT,
      label: 'Georgia DDS Section 5: Keep Right Except to Pass',
      url: 'https://dds.georgia.gov/section-5-continued-keep-right-except-pass',
      scope: '左侧超车道、一般限速、铁路道口停车和施工区规则。',
      checkedAt: '2026-07-19',
    },
    {
      id: GA_SAFETY,
      label: 'Georgia DDS Section 8: Safety Guidelines',
      url: 'https://dds.georgia.gov/section-8-safety-guidelines',
      scope: '雾天驾驶、跟车距离、车辆操控和安全准备。',
      checkedAt: '2026-07-19',
    },
    {
      id: GA_SHARING_ROAD,
      label: 'Georgia DDS Section 9: Sharing the Road',
      url: 'https://dds.georgia.gov/section-9-continued-sharing-road',
      scope: '校车停车规则及中央隔离带例外。',
      checkedAt: '2026-07-19',
    },
  ],
  questions: [
    {
      id: 'ga-signs-01',
      category: 'road-signs',
      prompt: '即使看不清标志上的文字，看到八角形交通标志时应先判断它表示什么？',
      choices: ['停车', '让行', '铁路道口', '学校区域'],
      correctIndex: 0,
      explanation:
        'Georgia DDS 手册把八角形专门用于 STOP。应在停止线前完全停车；没有停止线时，在本侧人行横道前停车；两者都没有时，在能够看清来车的位置停车。',
      commonTrap: '减速观察不等于完全停车，STOP 要求车轮停止。',
      sourceId: GA_DRIVER_MANUAL,
      sourceSection: 'Section 7 / Shapes of Signs / Octagon signs',
    },
    {
      id: 'ga-signs-02',
      category: 'road-signs',
      prompt: '倒三角形交通标志在 Georgia 通常表示什么？',
      choices: ['前方施工', '让行', '禁止超车', '单行道'],
      correctIndex: 1,
      explanation:
        '倒三角形是 YIELD。驾驶人应按现场情况减速，必要时停车，并把先行权让给路口内或正在接近、会构成冲突的车辆。',
      commonTrap: 'YIELD 不表示每次都必须停车，但也不能不观察就直接进入。',
      sourceId: GA_DRIVER_MANUAL,
      sourceSection: 'Section 7 / Shapes of Signs / Triangle signs',
    },
    {
      id: 'ga-signs-03',
      category: 'road-signs',
      prompt: '黄色菱形标志最常见的作用是什么？',
      choices: ['标明强制性法规', '提示前方或路旁可能存在危险', '标明州际公路编号', '表示只能直行'],
      correctIndex: 1,
      explanation:
        'Georgia DDS 将菱形标志归为警告标志，用来提醒前方道路状况、方向变化或其他潜在危险。驾驶人应根据图形和现场情况提前调整。',
      commonTrap: '白色长方形通常更常用于法规信息；黄色菱形主要是警告。',
      sourceId: GA_DRIVER_MANUAL,
      sourceSection: 'Section 7 / Shapes of Signs / Diamond signs',
    },
    {
      id: 'ga-signs-04',
      category: 'road-signs',
      prompt: '看到黄色圆形标志时，最应预期前方出现什么？',
      choices: ['学校区域', '铁路道口', '双向车道结束', '医院入口'],
      correctIndex: 1,
      explanation:
        'Georgia DDS 手册说明，圆形警告标志表示正在接近铁路道口。应减速、观察和倾听，并准备在列车或警示装置要求时停车。',
      commonTrap: '铁路道口的提前警告是圆形；八角形只对应 STOP。',
      sourceId: GA_DRIVER_MANUAL,
      sourceSection: 'Section 7 / Shapes of Signs / Round signs',
    },
    {
      id: 'ga-signs-05',
      category: 'road-signs',
      prompt: '五边形交通标志通常提醒驾驶人接近什么区域？',
      choices: ['学校区域或学校人行横道', '收费站', '铁路道口', '禁止停车区'],
      correctIndex: 0,
      explanation:
        'Georgia DDS 用五边形标志提示学校区域或学校人行横道。接近时要留意儿童、行人、闪灯和临时降低的限速。',
      commonTrap: '学校标志可能使用荧光黄绿色，但形状仍是重要识别线索。',
      sourceId: GA_DRIVER_MANUAL,
      sourceSection: 'Section 7 / Shapes of Signs / Pentagon signs',
    },
    {
      id: 'ga-signs-06',
      category: 'road-signs',
      prompt: '路口交通信号灯完全不工作、没有任何灯光时，应如何通过？',
      choices: ['把它当作四个方向都有 STOP 标志的路口', '主路车辆永远先行', '鸣笛后不减速通过', '只让右侧车辆后直接通过'],
      correctIndex: 0,
      explanation:
        'Georgia DDS 当前信号说明要求，信号灯完全失灵时，各方向驾驶人都应把路口当作设置了全向 STOP。先完全停车，再按到达顺序和让行规则安全通过。',
      commonTrap: '“完全不亮”与“闪黄灯”不是同一种情况，处理方式不同。',
      sourceId: GA_SIGNALS,
      sourceSection: 'Section 7 / Traffic Signals and Signs',
    },
    {
      id: 'ga-signs-07',
      category: 'road-signs',
      prompt: '面对闪烁红灯时，正确做法是什么？',
      choices: ['减速但不用停车', '完全停车，确认安全后再通行', '加速离开路口', '只在有行人时停车'],
      correctIndex: 1,
      explanation:
        'Georgia DDS 将闪烁红灯按停车信号处理：先完全停车，等待安全空隙再通过。闪烁黄灯才是减速并谨慎通行。',
      commonTrap: '不要把闪红与闪黄混在一起；红色要求停车。',
      sourceId: GA_SIGNALS,
      sourceSection: 'Section 7 / Flashing traffic signals',
    },
    {
      id: 'ga-signs-08',
      category: 'road-signs',
      prompt: '面对稳定红灯时，车辆应首先停在哪里？',
      choices: ['越过人行横道后', '停止线或人行横道之前', '路口中央', '距离路口固定 100 英尺处'],
      correctIndex: 1,
      explanation:
        'Georgia DDS 说明，稳定红灯要求在进入人行横道或路口前完全停车，并等待允许通行的信号；如要依法转弯，也必须先确认现场没有禁止标志并且能够安全完成。',
      commonTrap: '停车位置不能侵入人行横道，也不是按固定英尺数决定。',
      sourceId: GA_SIGNALS,
      sourceSection: 'Section 7 / Red light',
    },
    {
      id: 'ga-signs-09',
      category: 'road-signs',
      prompt: '道路左侧出现黄色三角形 NO PASSING ZONE 标志时，表示什么？',
      choices: ['超车区即将开始', '禁止超车区从这里开始', '只禁止卡车超车', '可以从路肩超车'],
      correctIndex: 1,
      explanation:
        'Georgia DDS 手册说明，该标志放在道路左侧，标明禁止超车区的起点。已经开始的合法超车动作必须在到达标志前完成。',
      commonTrap: '它不是 YIELD 倒三角；位置、朝向和文字共同说明禁止超车。',
      sourceId: GA_DRIVER_MANUAL,
      sourceSection: 'Section 7 / Warning Signs / No passing zone sign',
    },
    {
      id: 'ga-signs-10',
      category: 'road-signs',
      prompt: '学校限速标志写着 “20 WHEN FLASHING” 时，20 mph 何时生效？',
      choices: ['全天任何时候', '只有黄色灯闪烁时', '只有周末', '只在有校车停靠时'],
      correctIndex: 1,
      explanation:
        'Georgia DDS 手册把这类标志解释为：接近学校区域时，黄色灯闪烁期间降低后的限速生效。仍应同时观察现场标志和时间说明。',
      commonTrap: '不要把标志上的条件词忽略，也不要把学校区域规则套成全天固定值。',
      sourceId: GA_DRIVER_MANUAL,
      sourceSection: 'Section 7 / Regulatory Signs / School speed limit sign',
    },
    {
      id: 'ga-rules-01',
      category: 'road-rules',
      prompt: '接近停在路肩并亮灯的应急、环卫或公用事业车辆时，Georgia 的 Move Over 规则要求什么？',
      choices: ['只要不超速就保持原车道', '安全时换到相邻车道；无法换道时降到限速以下并准备停车', '必须立即停在原车道', '打开双闪后原速通过'],
      correctIndex: 1,
      explanation:
        'Georgia DDS 说明，安全可行时应移到下一车道，形成缓冲；如果无法换道，应降到限速以下并做好停车准备。',
      commonTrap: '“我没有超速”不足以满足规则，无法换道时还要进一步降速。',
      sourceId: GA_TRAFFIC_LAWS,
      sourceSection: 'Section 5 / Georgia Move-Over Law',
    },
    {
      id: 'ga-rules-02',
      category: 'road-rules',
      prompt: '没有其他限速标志时，Georgia 农村州际公路的一般最高限速是多少？',
      choices: ['55 mph', '65 mph', '70 mph', '75 mph'],
      correctIndex: 2,
      explanation:
        'Georgia DDS 的一般限速表列出农村州际公路 70 mph。地方或州级部门可按道路条件设置不同限速，因此现场标志优先。',
      commonTrap: '一般规则不是无条件许可；学校、施工和其他路段可能另有限速。',
      sourceId: GA_KEEP_RIGHT,
      sourceSection: 'Section 5 / Traveling Speed / Speed Limits',
    },
    {
      id: 'ga-rules-03',
      category: 'road-rules',
      prompt: '对向校车停车、红灯闪烁并上下乘客时，哪种情况通常不要求你停车？',
      choices: ['双向两车道道路', '四车道但没有中央隔离带', '道路中间只有转弯车道', '四车道以上且中间有实体隔离带，你在对向车道'],
      correctIndex: 3,
      explanation:
        'Georgia DDS 说明，通常双向车辆都要为停靠校车停车；有中央隔离带分开的多车道道路是例外，对向车辆可继续，但同向跟随校车的车辆仍须停车。',
      commonTrap: '中心转弯车道不等于实体中央隔离带。',
      sourceId: GA_SHARING_ROAD,
      sourceSection: 'Section 9 / Sharing the Road With School Buses',
    },
    {
      id: 'ga-rules-04',
      category: 'road-rules',
      prompt: '车辆准备从入口驶入 Georgia 环岛时，谁拥有先行权？',
      choices: ['准备进入环岛的车辆', '已经在环岛内行驶的车辆', '车身较大的车辆', '最靠左的车辆'],
      correctIndex: 1,
      explanation:
        'Georgia DDS 要求驶入环岛的车辆让行给已经在环岛内的交通。等待安全空隙后向右进入，并按逆时针方向行驶。',
      commonTrap: '进入车辆不能靠抢先进入取得先行权。',
      sourceId: GA_DRIVER_MANUAL,
      sourceSection: 'Section 7 / Pavement Markings / Roundabouts',
    },
    {
      id: 'ga-rules-05',
      category: 'road-rules',
      prompt: '在 Georgia 下雨时，即使是白天，是否应开启前照灯？',
      choices: ['应开启', '只有看不见前车时才开启', '只有州际公路上开启', '不应开启，以免反光'],
      correctIndex: 0,
      explanation:
        'Georgia DDS 手册要求在下雨时使用前照灯，也要求在日落后半小时至日出前半小时及能见度受限时使用。',
      commonTrap: '“白天”不会自动取消雨天开灯要求。',
      sourceId: GA_DRIVER_MANUAL,
      sourceSection: 'Section 5 / Other Laws / Use Headlights Properly',
    },
    {
      id: 'ga-rules-06',
      category: 'road-rules',
      prompt: '夜间遇到对向车辆时，至少在多远之前应把远光灯切换为近光灯？',
      choices: ['100 英尺', '200 英尺', '300 英尺', '500 英尺'],
      correctIndex: 3,
      explanation:
        'Georgia DDS 手册要求，在距离对向车辆 500 英尺以内时降低远光灯；跟随前车且相距 200 英尺以内时也应使用近光灯。',
      commonTrap: '对向车辆和跟随前车使用的是两个不同距离。',
      sourceId: GA_DRIVER_MANUAL,
      sourceSection: 'Section 5 / Other Laws / Use Headlights Properly',
    },
    {
      id: 'ga-rules-07',
      category: 'road-rules',
      prompt: '铁路道口警示灯闪烁或栏杆放下时，应在距最近铁轨多远处停车？',
      choices: ['不少于 5 英尺且不超过 10 英尺', '不少于 15 英尺且不超过 50 英尺', '固定 100 英尺', '只要不压到铁轨即可'],
      correctIndex: 1,
      explanation:
        'Georgia DDS 指南要求，在相关警示条件出现时，于最近铁轨前 15 至 50 英尺范围内停车，并等到轨道清空、警示停止、栏杆升起且安全后再通过。',
      commonTrap: '不能绕过已经放下的栏杆，也不能把车停得紧贴铁轨。',
      sourceId: GA_KEEP_RIGHT,
      sourceSection: 'Section 5 / Railroad Crossings',
    },
    {
      id: 'ga-rules-08',
      category: 'road-rules',
      prompt: '正常条件下，用 Georgia DDS 手册的计时法检查跟车距离时，应至少数到什么？',
      choices: ['one-thousand-one', 'one-thousand-one, one-thousand-two', '五秒', '十秒'],
      correctIndex: 1,
      explanation:
        '手册建议观察前车通过固定参照物后数 “one-thousand-one, one-thousand-two”。若自己在数完前就到达同一点，说明跟得太近；夜间、恶劣天气、施工和拥堵时还应增加距离。',
      commonTrap: '两秒是基础检查法，不是任何天气和车速下都足够的上限。',
      sourceId: GA_SAFETY,
      sourceSection: 'Section 8 / Following Too Closely',
    },
    {
      id: 'ga-rules-09',
      category: 'road-rules',
      prompt: '在双向两车道道路上，距离铁路道口 100 英尺以内可以超车吗？',
      choices: ['可以，只要没有看到列车', '可以，只限白天', '不可以', '只有摩托车可以'],
      correctIndex: 2,
      explanation:
        'Georgia DDS 手册把铁路道口 100 英尺以内列为双向两车道道路禁止超车的区域。铁路道口附近视线和停车距离都更受限制。',
      commonTrap: '“没有列车”不等于该路段允许超车。',
      sourceId: GA_TRAFFIC_LAWS,
      sourceSection: 'Section 5 / Passing is prohibited on two-lane roads',
    },
    {
      id: 'ga-rules-10',
      category: 'road-rules',
      prompt: '你正在最左侧超车道按限速行驶，后方更快车辆接近。一般应怎么做？',
      choices: ['保持左道，因为自己没有超速', '在安全时移到右侧车道', '立即踩刹车', '打开双闪继续占用左道'],
      correctIndex: 1,
      explanation:
        'Georgia DDS 的 Keep Right 说明要求较慢车辆在更快交通从后方接近时让出最左侧超车道。交通、天气、障碍、左转或官方指示等情况可能构成例外。',
      commonTrap: '是否让出左道不只取决于自己有没有超过限速。',
      sourceId: GA_KEEP_RIGHT,
      sourceSection: 'Section 5 / Keep Right, Except to Pass',
    },
  ],
};

export const practiceTests = [georgiaPracticeTest] as const;

export function practiceSourceMap(test: PracticeTest) {
  return new Map(test.sources.map((source) => [source.id, source]));
}
