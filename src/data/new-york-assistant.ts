export type NewYorkAssistantTask = 'real-id' | 'first-license' | 'license-service';

export const NEW_YORK_ASSISTANT_PUBLISHED_AT = '2026-08-28';
export const NEW_YORK_ASSISTANT_MODIFIED_AT = '2026-08-28';
export const NEW_YORK_ASSISTANT_REVIEWED_AT = '2026-08-28';

export type NewYorkAssistantAnswers = {
  task: NewYorkAssistantTask;
  realIdPurpose?: 'federal' | 'driving' | 'unsure';
  realIdCredential?: 'standard' | 'compliant' | 'none';
  realIdIdentity?: 'checked' | 'unsure';
  realIdName?: 'match' | 'changed';
  realIdResidency?: 'two' | 'fewer';
  firstExisting?: 'us-canada' | 'none';
  firstAge?: 'under-18' | 'adult';
  firstStage?: 'start' | 'permit' | 'ready';
  serviceType?: 'renewal' | 'mailing' | 'appointment' | 'address';
  renewalPlan?: 'same' | 'upgrade' | 'temporary-visitor';
  renewalExpiry?:
    | 'more-than-one-year'
    | 'within-one-year'
    | 'within-two-years'
    | 'over-two-years';
  mailingAge?: 'under-three-weeks' | 'three-weeks-plus';
  mailingId?: 'yes' | 'no';
};

export type NewYorkAssistantQuestion = Exclude<keyof NewYorkAssistantAnswers, 'task'>;

export type NewYorkAssistantSource = {
  label: string;
  url: string;
};

export const NEW_YORK_ASSISTANT_SOURCES = {
  realId: {
    label: 'NY DMV Enhanced or REAL ID',
    url: 'https://dmv.ny.gov/driver-license/enhanced-or-real-id',
  },
  documentGuide: {
    label: 'NY DMV Document Guide',
    url: 'https://dmv.ny.gov/more-info/dmv-document-guide',
  },
  preScreen: {
    label: 'NY DMV 官方材料预审',
    url: 'https://eservices.dmv.ny.gov/TAP/eServices/?Link=ReqResp.ESV.PREPSTRT',
  },
  id44: {
    label: 'NY DMV ID-44 材料表',
    url: 'https://dmv.ny.gov/forms/id44.pdf',
  },
  offices: {
    label: 'NY DMV 办公室与预约',
    url: 'https://dmv.ny.gov/contact-us/office-locations',
  },
  firstLicense: {
    label: 'NY DMV Learner Permit 与首次驾照',
    url: 'https://dmv.ny.gov/driver-license/get-learner-permit',
  },
  permitTest: {
    label: 'NY DMV Permit Test 准备与申请',
    url: 'https://dmv.ny.gov/driver-license/prepare-for-and-take-your-permit-test',
  },
  preLicensing: {
    label: 'NY DMV 练车与 Pre-Licensing',
    url: 'https://dmv.ny.gov/driver-license/complete-pre-licensing-requirements',
  },
  roadTest: {
    label: 'NY DMV 路考预约与准备',
    url: 'https://dmv.ny.gov/driver-license/schedule-and-take-a-road-test',
  },
  youngerDriver: {
    label: 'NY DMV 未满 18 岁驾驶规则',
    url: 'https://dmv.ny.gov/driver-license/younger-driver',
  },
  exchangeLicense: {
    label: 'NY DMV 外州驾照转入',
    url: 'https://dmv.ny.gov/driver-license/exchange-out-of-state-driver-license',
  },
  renewal: {
    label: 'NY DMV 驾照续期',
    url: 'https://dmv.ny.gov/driver-license/renew-a-driver-license',
  },
  renewalOnline: {
    label: 'NY DMV 在线续期',
    url: 'https://eservices.dmv.ny.gov/TAP/eServices/?Link=AutoLog.Login16',
  },
  mailingStatus: {
    label: 'NY DMV 证件邮寄状态说明',
    url: 'https://dmv.ny.gov/driver-license/check-license-permit-or-non-driver-id-mailing-status',
  },
  mailingStatusOnline: {
    label: 'NY DMV 在线查询邮寄状态',
    url: 'https://eservices.dmv.ny.gov/TAP/eServices/?Link=ReqResp.ESV.CRDMLN',
  },
  address: {
    label: 'NY DMV 地址变更',
    url: 'https://dmv.ny.gov/records/change-your-address',
  },
} as const satisfies Record<string, NewYorkAssistantSource>;

export type NewYorkAssistantSourceId = keyof typeof NEW_YORK_ASSISTANT_SOURCES;

export type NewYorkAssistantStep = {
  title: string;
  detail: string;
  sourceId?: NewYorkAssistantSourceId;
};

export type NewYorkAssistantResultLink = NewYorkAssistantSource & {
  primary?: boolean;
};

export type NewYorkAssistantResult = {
  id: string;
  status: string;
  title: string;
  summary: string;
  steps: NewYorkAssistantStep[];
  checklist: string[];
  links: NewYorkAssistantResultLink[];
};

function resultLink(
  sourceId: NewYorkAssistantSourceId,
  label?: string,
  primary = false,
): NewYorkAssistantResultLink {
  const source = NEW_YORK_ASSISTANT_SOURCES[sourceId];
  return {
    ...source,
    label: label ?? source.label,
    primary,
  };
}

export function getRequiredNewYorkAssistantQuestions(
  answers: NewYorkAssistantAnswers,
): NewYorkAssistantQuestion[] {
  if (answers.task === 'real-id') {
    if (answers.realIdPurpose !== 'federal') return ['realIdPurpose'];
    if (answers.realIdCredential === 'compliant') {
      return ['realIdPurpose', 'realIdCredential'];
    }
    return [
      'realIdPurpose',
      'realIdCredential',
      'realIdIdentity',
      'realIdName',
      'realIdResidency',
    ];
  }

  if (answers.task === 'first-license') {
    if (answers.firstExisting === 'us-canada') return ['firstExisting'];
    return ['firstExisting', 'firstAge', 'firstStage'];
  }

  if (answers.serviceType === 'renewal') {
    return ['serviceType', 'renewalPlan', 'renewalExpiry'];
  }
  if (answers.serviceType === 'mailing') {
    return ['serviceType', 'mailingAge', 'mailingId'];
  }
  return ['serviceType'];
}

export function getMissingNewYorkAssistantQuestions(
  answers: NewYorkAssistantAnswers,
): NewYorkAssistantQuestion[] {
  return getRequiredNewYorkAssistantQuestions(answers).filter(
    (question) => !answers[question],
  );
}

function buildRealIdResult(answers: NewYorkAssistantAnswers): NewYorkAssistantResult {
  if (answers.realIdPurpose === 'driving') {
    return {
      id: 'real-id-driving-only',
      status: '先确认是否需要升级',
      title: '只为驾驶和普通身份证明，可以先保留 Standard',
      summary:
        '纽约州把 REAL ID 列为可选证件。Standard 仍可用于驾驶，但不能代替 REAL ID 或其他 TSA 接受证件办理联邦用途。',
      steps: [
        {
          title: '核对实际用途',
          detail: '如果近期没有美国国内航班或需要证件的联邦场所安排，不必只为驾驶立即升级。',
          sourceId: 'realId',
        },
        {
          title: '需要联邦用途时再选证件',
          detail: '届时比较 REAL ID、Enhanced 和有效护照，再决定是否到 DMV 办理。',
          sourceId: 'realId',
        },
      ],
      checklist: ['确认近期是否有联邦用途', '查看现有证件正面是否有星标或旗帜'],
      links: [
        resultLink('realId', '比较 Standard、REAL ID 与 Enhanced', true),
        resultLink('documentGuide', '查看官方材料工具'),
      ],
    };
  }

  if (answers.realIdPurpose === 'unsure') {
    return {
      id: 'real-id-purpose-check',
      status: '先判断用途',
      title: '先确认你是否真的需要 REAL ID',
      summary:
        '美国国内航班和部分联邦场所需要符合联邦要求的证件，但有效护照等 TSA 接受证件也可以承担登机用途。',
      steps: [
        {
          title: '查看现有证件',
          detail: '纽约州 REAL ID 通常有星标，Enhanced 有旗帜；Standard 会标注不能用于联邦用途。',
          sourceId: 'realId',
        },
        {
          title: '按出行计划决定',
          detail: '已经有可用护照时，可以比较便利性后再决定是否升级纽约州证件。',
          sourceId: 'realId',
        },
      ],
      checklist: ['现有纽约州证件', '近期美国国内航班或联邦场所计划', '可替代使用的有效护照'],
      links: [resultLink('realId', '查看 NY DMV 证件比较', true)],
    };
  }

  if (answers.realIdCredential === 'compliant') {
    return {
      id: 'real-id-already-compliant',
      status: '无需重复升级',
      title: '你已经有 REAL ID 或 Enhanced',
      summary:
        '证件仍有效且正面有相应星标或旗帜时，不需要为了联邦用途再次升级；续期时可以保持现有证件类型。',
      steps: [
        {
          title: '核对证件正面和有效期',
          detail: '确认星标或旗帜、姓名和到期日。',
          sourceId: 'realId',
        },
        {
          title: '需要续期时保持同类型',
          detail: '纽约 DMV 允许现有 REAL ID 或 Enhanced 按续期规则保持原证件类型。',
          sourceId: 'renewal',
        },
      ],
      checklist: ['当前 REAL ID 或 Enhanced', '证件有效期', 'DMV 记录中的当前地址'],
      links: [
        resultLink('renewal', '查看续期方式', true),
        resultLink('realId', '核对证件类型'),
      ],
    };
  }

  const missing: string[] = [];
  if (answers.realIdIdentity !== 'checked') {
    missing.push('先用 Document Guide 核对身份、Social Security 和身份状态材料');
  }
  if (answers.realIdName === 'changed') {
    missing.push('补齐从出生姓名到当前法定姓名的每一段姓名变更文件');
  }
  if (answers.realIdResidency === 'fewer') {
    missing.push('准备两份显示纽约州实际住址的材料；P.O. Box 不能代替实际地址');
  }

  if (missing.length) {
    return {
      id: `real-id-missing-${answers.realIdIdentity}-${answers.realIdName}-${answers.realIdResidency}`,
      status: '先补材料',
      title: '先解决材料缺口，再安排办公室办理',
      summary:
        'REAL ID 或 Enhanced 申请需要到 DMV office。官方预审会按你的身份和证件情况生成更准确的清单。',
      steps: [
        {
          title: '完成官方材料预审',
          detail: '先让 NY DMV 工具按个人情况检查可接受文件。',
          sourceId: 'preScreen',
        },
        ...missing.map((detail, index) => ({
          title: `处理缺口 ${index + 1}`,
          detail,
          sourceId: index === 0 ? 'documentGuide' as const : 'realId' as const,
        })),
        {
          title: '材料齐全后查办公室',
          detail: '按城市或 ZIP 查服务范围和预约入口。',
          sourceId: 'offices',
        },
      ],
      checklist: [
        '当前纽约州证件（如有）',
        ...missing,
        '官方预审生成的申请与材料清单',
      ],
      links: [
        resultLink('preScreen', '开始 NY DMV 官方材料预审', true),
        resultLink('id44', '打开 ID-44 材料表'),
        resultLink('offices', '查办公室与预约'),
      ],
    };
  }

  return {
    id: 'real-id-ready-for-prescreen',
    status: '需要到办公室',
    title: '可以进入官方预审并准备办公室办理',
    summary:
      '你填写的材料状态没有明显缺口。下一步仍应以 NY DMV 预审生成的个人清单为准，并带齐要求的文件。',
    steps: [
      {
        title: '运行 NY DMV 官方预审',
        detail: '选择要办理的证件和个人情况，生成可下载的材料清单。',
        sourceId: 'preScreen',
      },
      {
        title: '按预审结果整理文件',
        detail: '把身份、Social Security、两份住址和姓名链文件放在一起。',
        sourceId: 'id44',
      },
      {
        title: '查办公室与预约',
        detail: '确认该办公室提供所需服务，再按当地入口预约。',
        sourceId: 'offices',
      },
    ],
    checklist: [
      '官方预审生成的申请与材料清单',
      '身份和 Social Security 相关材料',
      '两份纽约州实际住址材料',
      '完整法定姓名链文件（如适用）',
      '当前纽约州证件（如有）',
    ],
    links: [
      resultLink('preScreen', '开始 NY DMV 官方材料预审', true),
      resultLink('offices', '查办公室与预约'),
      resultLink('realId', '查看费用和证件区别'),
    ],
  };
}

function buildFirstLicenseResult(answers: NewYorkAssistantAnswers): NewYorkAssistantResult {
  if (answers.firstExisting === 'us-canada') {
    return {
      id: 'first-license-exchange',
      status: '改走外州转入路径',
      title: '先检查是否可以直接转入现有驾照',
      summary:
        '持有效的美国其他州、属地、华盛顿特区或加拿大省份驾照时，应先查看纽约州外州驾照转入要求，而不是从 learner permit 重新开始。',
      steps: [
        {
          title: '核对现有驾照资格',
          detail: '查看签发地、有效期和纽约州对现有驾照的要求。',
          sourceId: 'exchangeLicense',
        },
        {
          title: '运行材料预审',
          detail: '按外州换证业务生成身份和住址材料清单。',
          sourceId: 'documentGuide',
        },
        {
          title: '查办理办公室',
          detail: '确认服务范围和预约入口。',
          sourceId: 'offices',
        },
      ],
      checklist: ['现有外州或加拿大驾照', '纽约州住址材料', '官方预审生成的换证清单'],
      links: [
        resultLink('exchangeLicense', '查看外州驾照转入要求', true),
        resultLink('documentGuide', '运行材料预审'),
        resultLink('offices', '查办公室与预约'),
      ],
    };
  }

  const younger = answers.firstAge === 'under-18';
  const youngerStep: NewYorkAssistantStep[] = younger
    ? [{
        title: '同时查看未满 18 岁规则',
        detail: '纽约州 GDL 会影响练车、路考和初级驾照阶段。',
        sourceId: 'youngerDriver',
      }]
    : [];

  if (answers.firstStage === 'start') {
    return {
      id: `first-license-start-${answers.firstAge}`,
      status: '下一步：申请 Permit',
      title: '先准备 learner permit 笔试和申请材料',
      summary:
        '纽约州居民从 16 岁起可以申请 learner permit。首次 Class D 驾照通常先完成 permit test，再进入练车、课程和路考。',
      steps: [
        {
          title: '准备 Permit Test',
          detail: '阅读纽约州 Driver’s Manual，并进入官方 permit test 准备页。',
          sourceId: 'permitTest',
        },
        {
          title: '生成申请材料清单',
          detail: '用 NY DMV Document Guide 核对身份证明和住址文件。',
          sourceId: 'documentGuide',
        },
        {
          title: '带材料到 DMV office',
          detail: '确认办公室服务范围和预约方式后完成申请。',
          sourceId: 'offices',
        },
        ...youngerStep,
      ],
      checklist: [
        'NY DMV Driver’s Manual',
        'Document Guide 生成的身份证明清单',
        '纽约州住址材料',
        ...(younger ? ['未满 18 岁申请所需的家长或监护人文件'] : []),
      ],
      links: [
        resultLink('permitTest', '开始 Permit Test 准备', true),
        resultLink('documentGuide', '生成申请材料清单'),
        ...(younger ? [resultLink('youngerDriver', '查看未满 18 岁规则')] : []),
      ],
    };
  }

  if (answers.firstStage === 'permit') {
    return {
      id: `first-license-practice-${answers.firstAge}`,
      status: '下一步：练车与课程',
      title: '先完成监督练车和 Pre-Licensing 要求',
      summary:
        '纽约州要求 permit 持有人在路考前与合资格驾驶人练车，并完成注册的 pre-licensing 路径。',
      steps: [
        {
          title: '核对 Permit 驾驶限制',
          detail: '练车时遵守陪同驾驶人和地点限制。',
          sourceId: 'firstLicense',
        },
        {
          title: '完成 Pre-Licensing',
          detail: '选择纽约州认可的课程或符合条件的 driver education 路径。',
          sourceId: 'preLicensing',
        },
        ...youngerStep,
        {
          title: '完成后进入路考预约',
          detail: '确认课程与练车要求满足后，再安排 road test。',
          sourceId: 'roadTest',
        },
      ],
      checklist: [
        '有效 learner permit',
        '合资格陪同驾驶人',
        'Pre-Licensing 或 driver education 完成证明',
        ...(younger ? ['GDL 要求的监督练车记录和限制'] : []),
      ],
      links: [
        resultLink('preLicensing', '查看练车和课程要求', true),
        resultLink('roadTest', '查看路考步骤'),
        ...(younger ? [resultLink('youngerDriver', '查看未满 18 岁规则')] : []),
      ],
    };
  }

  return {
    id: `first-license-road-test-${answers.firstAge}`,
    status: '可以准备预约路考',
    title: '下一步是核对资格、预约并准备 Road Test',
    summary:
      '已经持有 permit 并完成练车和课程要求时，可以进入纽约州路考页面核对预约资格、考试车辆和当天材料。',
    steps: [
      {
        title: '确认课程和练车要求已经完成',
        detail: '准备课程证明，并再次核对 permit 状态。',
        sourceId: 'preLicensing',
      },
      {
        title: '在 NY DMV 安排 Road Test',
        detail: '按官方页面预约并查看考点和考试日要求。',
        sourceId: 'roadTest',
      },
      ...youngerStep,
    ],
    checklist: [
      '有效 learner permit',
      'Pre-Licensing 或 driver education 完成证明',
      '符合 NY DMV 要求的路考车辆和陪同驾驶人',
      ...(younger ? ['GDL 要求的练车和家长/监护人证明'] : []),
    ],
    links: [
      resultLink('roadTest', '进入 NY DMV 路考页面', true),
      resultLink('preLicensing', '复核 Pre-Licensing 要求'),
      ...(younger ? [resultLink('youngerDriver', '查看未满 18 岁规则')] : []),
    ],
  };
}

function buildServiceResult(answers: NewYorkAssistantAnswers): NewYorkAssistantResult {
  if (answers.serviceType === 'appointment') {
    return {
      id: 'service-appointment',
      status: '先查办公室服务范围',
      title: '按城市或 ZIP 找 office，再点 View Details',
      summary:
        '纽约州不同办公室提供的业务和预约方式不完全相同。官方页面会显示地点、服务和可用预约入口。',
      steps: [
        {
          title: '输入城市或 ZIP',
          detail: '先查附近办公室，不要只按距离选择。',
          sourceId: 'offices',
        },
        {
          title: '打开 View Details',
          detail: '确认该地点能办理你的业务，并查看是否提供预约。',
          sourceId: 'offices',
        },
        {
          title: '预约后整理材料',
          detail: '用 Document Guide 生成对应业务的材料清单。',
          sourceId: 'documentGuide',
        },
      ],
      checklist: ['要办理的业务名称', '城市或 ZIP', '对应业务的官方材料清单'],
      links: [
        resultLink('offices', '查办公室与预约', true),
        resultLink('documentGuide', '生成材料清单'),
      ],
    };
  }

  if (answers.serviceType === 'address') {
    return {
      id: 'service-address',
      status: '先更新 DMV 地址记录',
      title: '先改地址，再续期或等待新证件',
      summary:
        '纽约 DMV 会把新签发证件寄到记录中的地址。搬家后先更新地址，可以减少续期或邮寄证件走错地址的风险。',
      steps: [
        {
          title: '打开地址变更入口',
          detail: '按 NY DMV 页面更新记录中的 residential 和 mailing address。',
          sourceId: 'address',
        },
        {
          title: '确认记录更新后再办后续业务',
          detail: '续期、补证或邮寄查询时使用更新后的地址信息。',
          sourceId: 'renewal',
        },
      ],
      checklist: ['当前纽约州证件信息', '新的 residential address', '需要时使用的 mailing address'],
      links: [
        resultLink('address', '打开 NY DMV 地址变更', true),
        resultLink('renewal', '查看驾照续期'),
      ],
    };
  }

  if (answers.serviceType === 'mailing') {
    const hasId = answers.mailingId === 'yes';
    const overThreeWeeks = answers.mailingAge === 'three-weeks-plus';
    return {
      id: `service-mailing-${answers.mailingAge}-${answers.mailingId}`,
      status: overThreeWeeks ? '现在查询邮寄状态' : '仍在 3 周等待期内',
      title: overThreeWeeks
        ? '已经达到 3 周，先查状态并核对地址'
        : 'NY DMV 建议预留 3 周收到照片证件',
      summary: hasId
        ? '可以使用临时证件上的 Transaction ID，或线上交易确认邮件中的 confirmation number 查询。'
        : '在线状态查询需要 Transaction ID 或线上确认号码；先找临时证件或确认邮件。',
      steps: [
        {
          title: hasId ? '打开官方状态查询' : '先找 Transaction ID',
          detail: hasId
            ? '准备交易日期和号码后进入 NY DMV 在线查询。'
            : '查看 Interim License、Permit、Non-Driver ID 或线上交易确认邮件。',
          sourceId: 'mailingStatus',
        },
        {
          title: '核对 DMV 记录地址',
          detail: '证件会寄到 DMV 记录中的地址；无法投递或运输遗失时按官方页面处理。',
          sourceId: 'mailingStatus',
        },
      ],
      checklist: [
        'Transaction ID 或线上确认号码',
        '完成交易的日期',
        'DMV 记录中的当前地址',
      ],
      links: [
        resultLink(
          hasId ? 'mailingStatusOnline' : 'mailingStatus',
          hasId ? '查询证件邮寄状态' : '查看号码位置和处理方式',
          true,
        ),
        resultLink('address', '核对或更新地址'),
      ],
    };
  }

  if (answers.renewalExpiry === 'more-than-one-year') {
    return {
      id: 'service-renewal-too-early',
      status: '还没进入续期窗口',
      title: '距离到期还有一年以上，现在不用提交续期',
      summary:
        'NY DMV 的普通续期窗口从到期前 1 年开始。现在先核对地址和证件到期日，进入窗口后再按证件类型选择线上或办公室办理。',
      steps: [
        {
          title: '记下续期窗口开始日',
          detail: '用驾照到期日往前推 1 年，到那时再进入 NY DMV 续期页面。',
          sourceId: 'renewal',
        },
        {
          title: '搬家后先更新地址',
          detail: '续期前让 DMV 记录保持当前地址，避免新证件寄错。',
          sourceId: 'address',
        },
      ],
      checklist: ['当前驾照上的到期日', 'DMV 记录中的当前地址', '续期窗口开始日提醒'],
      links: [
        resultLink('renewal', '查看 NY DMV 续期时间范围', true),
        resultLink('address', '需要时先更新地址'),
      ],
    };
  }

  if (answers.renewalExpiry === 'over-two-years') {
    return {
      id: 'service-renewal-original',
      status: '需要重新申请',
      title: '驾照过期满 2 年，需要按 Original License 路径办理',
      summary:
        'NY DMV 说明，过期达到 2 年或更久后不能按普通续期处理，需要重新完成笔试、课程和路考等首次申请步骤。',
      steps: [
        {
          title: '进入首次驾照流程',
          detail: '从 learner permit 和 permit test 要求重新开始核对。',
          sourceId: 'firstLicense',
        },
        {
          title: '生成新的材料清单',
          detail: '按当前身份和住址情况运行 Document Guide。',
          sourceId: 'documentGuide',
        },
      ],
      checklist: ['当前或过期驾照', '新的申请材料清单', 'Permit Test、课程和 Road Test 安排'],
      links: [
        resultLink('firstLicense', '打开首次驾照流程', true),
        resultLink('documentGuide', '生成材料清单'),
      ],
    };
  }

  if (answers.renewalPlan === 'upgrade') {
    return {
      id: `service-renewal-upgrade-${answers.renewalExpiry}`,
      status: '需要到办公室',
      title: '从 Standard 升级到 REAL ID 或 Enhanced 要去 DMV office',
      summary:
        '普通线上或邮寄续期会保持现有证件类型；从 Standard 转为 REAL ID 或 Enhanced 时，需要准备升级材料并到办公室办理。',
      steps: [
        {
          title: '完成 REAL ID 材料预审',
          detail: '先生成身份、Social Security、住址和姓名文件清单。',
          sourceId: 'preScreen',
        },
        {
          title: '查办公室和预约',
          detail: '确认地点提供升级业务，再按当地入口预约。',
          sourceId: 'offices',
        },
      ],
      checklist: ['当前 Standard 驾照', '官方预审生成的升级材料', '视力测试安排', '办公室预约信息'],
      links: [
        resultLink('preScreen', '开始 REAL ID 材料预审', true),
        resultLink('offices', '查办公室与预约'),
        resultLink('renewal', '查看续期规则'),
      ],
    };
  }

  if (answers.renewalPlan === 'temporary-visitor') {
    return {
      id: `service-renewal-temporary-${answers.renewalExpiry}`,
      status: '需要到办公室',
      title: 'Temporary Visitor 证件续期要带更新文件到 office',
      summary:
        'NY DMV 要求 Temporary Visitor 在身份期限延长后，带更新后的 DHS 文件到办公室更新记录并续期。',
      steps: [
        {
          title: '准备更新后的 DHS 文件',
          detail: '把当前证件和身份期限延长材料放在一起。',
          sourceId: 'renewal',
        },
        {
          title: '查办公室与预约',
          detail: '确认地点服务范围后安排现场续期。',
          sourceId: 'offices',
        },
      ],
      checklist: ['当前驾照', '更新后的 DHS 身份文件', '续期申请材料', '付款方式'],
      links: [
        resultLink('renewal', '查看 Temporary Visitor 续期要求', true),
        resultLink('offices', '查办公室与预约'),
      ],
    };
  }

  return {
    id: `service-renewal-same-${answers.renewalExpiry}`,
    status: '可以先检查线上续期',
    title: '保持现有证件类型时，可以从在线续期开始',
    summary:
      'NY DMV 允许在到期前 1 年至到期后 2 年内续期。已有 REAL ID 或 Enhanced，或继续保留 Standard 时，可以先检查线上资格。',
    steps: [
      {
        title: '先确认 DMV 地址',
        detail: '地址不一致时先更新，再提交续期。',
        sourceId: 'address',
      },
      {
        title: '完成视力测试',
        detail: '使用获认可的 Vision Registry provider，或按官方页面准备 MV-619。',
        sourceId: 'renewal',
      },
      {
        title: '进入在线续期',
        detail: '系统会在付款前显示实际费用；完成后可打印临时驾照。',
        sourceId: 'renewalOnline',
      },
    ],
    checklist: ['当前驾照', 'DMV 记录中的当前地址', '视力测试结果', '在线付款方式'],
    links: [
      resultLink('renewalOnline', '进入 NY DMV 在线续期', true),
      resultLink('renewal', '查看完整续期规则'),
      resultLink('address', '先更新地址'),
    ],
  };
}

export function buildNewYorkAssistantResult(
  answers: NewYorkAssistantAnswers,
): NewYorkAssistantResult | null {
  if (getMissingNewYorkAssistantQuestions(answers).length) return null;
  if (answers.task === 'real-id') return buildRealIdResult(answers);
  if (answers.task === 'first-license') return buildFirstLicenseResult(answers);
  return buildServiceResult(answers);
}
