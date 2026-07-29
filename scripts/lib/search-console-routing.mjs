const genericAnchorPattern =
  /^(?:点击(?:这里|此处)?(?:查看)?(?:详情|更多|完整内容|完整说明)?|查看(?:详情|更多|完整内容|完整说明|相关页面)?|了解更多|阅读更多|继续阅读|前往(?:这里|此处|相关页面)?|更多详情|相关页面)$/;
const chineseCharacterPattern = /[\u3400-\u9fff]/;

export function normalizeRoutingAnchorText(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

export function routingAnchorTextIssue(value) {
  const anchorText = normalizeRoutingAnchorText(value);
  if (anchorText.length < 6) {
    return 'anchorText must contain at least 6 characters';
  }
  if (anchorText.length > 80) {
    return 'anchorText must contain no more than 80 characters';
  }
  if (!chineseCharacterPattern.test(anchorText)) {
    return 'anchorText must include natural Chinese wording';
  }
  if (genericAnchorPattern.test(anchorText)) {
    return 'anchorText must describe the destination instead of using a generic command';
  }
  return '';
}
