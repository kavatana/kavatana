const STOP_WORDS = new Set([
  'a',
  'about',
  'an',
  'and',
  'are',
  'can',
  'do',
  'does',
  'for',
  'from',
  'how',
  'i',
  'in',
  'is',
  'it',
  'me',
  'of',
  'on',
  'please',
  'show',
  'tell',
  'that',
  'the',
  'this',
  'to',
  'what',
  'where',
  'which',
  'who',
  'why',
  'with',
  'you'
])

const FOLLOW_UP_SIGNALS = new Set([
  'it',
  'its',
  'that',
  'this',
  'project',
  'product',
  'stack',
  'proof',
  'status',
  'role',
  'live'
])

const GENERIC_REQUEST_TOKENS = new Set([
  'brief',
  'briefly',
  'describe',
  'explain',
  'introduce',
  'line',
  'more',
  'overview',
  'summary'
])

const DETAIL_INTENTS = {
  overview: ['overview', 'problem', 'purpose', 'solve', 'summary', 'what it does'],
  stack: ['stack', 'technology', 'technologies', 'tech', 'framework', 'built with'],
  proof: ['proof', 'evidence', 'result', 'results', 'achievement', 'verify', 'verified'],
  role: ['role', 'contribution', 'contributed', 'responsibility', 'worked on'],
  status: ['status', 'live', 'deployed', 'deployment', 'finished', 'current'],
  learning: ['learn', 'learned', 'lesson', 'takeaway'],
  next: ['next', 'future', 'roadmap', 'coming']
}

export function normalizeText(value = '') {
  return String(value)
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLocaleLowerCase('en')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function tokenize(value = '') {
  return normalizeText(value)
    .split(' ')
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token))
}

function includesAny(value, candidates = []) {
  return candidates.some((candidate) => value.includes(normalizeText(candidate)))
}

function isContextualFollowUp(queryTokens) {
  return queryTokens.length <= 6 && queryTokens.some((token) => FOLLOW_UP_SIGNALS.has(token))
}

function matchesTerm(term, normalizedQuery, queryTokens) {
  const normalizedTerm = normalizeText(term)
  if (!normalizedTerm) return false
  if (normalizedTerm.includes(' ')) return normalizedQuery.includes(normalizedTerm)
  return queryTokens.includes(normalizedTerm)
}

function entityTokensFor(topic) {
  return new Set((topic.entities || []).flatMap((entity) => tokenize(entity)))
}

function isUnsupportedScopedDetail(
  topic,
  normalizedQuery,
  queryTokens,
  context
) {
  const entityTokens = entityTokensFor(topic)
  const hasEntityReference = queryTokens.some((token) => entityTokens.has(token))
  const hasContextReference =
    (context.previousTopicId === topic.id || context.currentPath === topic.path) &&
    isContextualFollowUp(queryTokens)

  if (!hasEntityReference && !hasContextReference) return false

  const remainingTokens = queryTokens.filter(
    (token) =>
      !entityTokens.has(token) &&
      !FOLLOW_UP_SIGNALS.has(token) &&
      !GENERIC_REQUEST_TOKENS.has(token)
  )

  if (remainingTokens.length === 0 || inferDetailIntent(normalizedQuery)) {
    return false
  }

  const semanticKeywords = (topic.keywords || []).filter((keyword) => {
    const keywordTokens = tokenize(keyword)
    return keywordTokens.some((token) => !entityTokens.has(token))
  })

  return !semanticKeywords.some((keyword) =>
    matchesTerm(keyword, normalizedQuery, queryTokens)
  )
}

function scoreTopic(topic, normalizedQuery, queryTokens, context) {
  if (
    isUnsupportedScopedDetail(
      topic,
      normalizedQuery,
      queryTokens,
      context
    )
  ) {
    return 0
  }

  const title = normalizeText(topic.title)
  const titleTokens = tokenize(title)
  let score = Math.min(Number(topic.priority || 0), 10) / 20

  for (const phrase of topic.phrases || []) {
    const normalizedPhrase = normalizeText(phrase)
    if (normalizedPhrase && normalizedQuery.includes(normalizedPhrase)) {
      score += 16
    }
  }

  for (const keyword of topic.keywords || []) {
    const normalizedKeyword = normalizeText(keyword)
    if (!normalizedKeyword) continue
    if (normalizedKeyword.includes(' ') && normalizedQuery.includes(normalizedKeyword)) {
      score += 8
    } else if (queryTokens.includes(normalizedKeyword)) {
      score += 4
    } else if (normalizedQuery.includes(normalizedKeyword)) {
      score += 1
    }
  }

  for (const token of titleTokens) {
    if (queryTokens.includes(token)) score += 5
  }

  if (topic.path && context.currentPath === topic.path) {
    score += isContextualFollowUp(queryTokens) ? 9 : 2
  }

  if (
    context.previousTopicId === topic.id &&
    isContextualFollowUp(queryTokens)
  ) {
    score += 10
  }

  return score
}

function inferDetailIntent(normalizedQuery) {
  return Object.entries(DETAIL_INTENTS).find(([, phrases]) =>
    includesAny(normalizedQuery, phrases)
  )?.[0]
}

function projectAnswer(topic, normalizedQuery) {
  const details = topic.project
  if (!details) return topic.answer

  const intent = inferDetailIntent(normalizedQuery)

  if (intent === 'stack' && details.stack?.length) {
    const deployment = details.deploymentLine ? ` ${details.deploymentLine}` : ''
    return `${topic.title} uses ${details.stack.join(', ')}.${deployment}`
  }

  if (intent === 'proof' && details.proofPoints?.length) {
    return `${topic.title}'s strongest public evidence: ${details.proofPoints
      .slice(0, 3)
      .join(' ')}`
  }

  if (intent === 'role') {
    const roleDetail = details.myRole || details.whatThisProves || ''
    return `Ka's role: ${details.role}.${roleDetail ? ` ${roleDetail}` : ''}`
  }

  if (intent === 'status') {
    const deployment = details.deploymentLine || 'See the case study for the current deployment boundary.'
    return `Current public status: ${details.statusLabel}. ${deployment}`
  }

  if (intent === 'learning' && details.whatILearned?.length) {
    return `The main lessons from ${topic.title}: ${details.whatILearned
      .slice(0, 3)
      .join(' ')}`
  }

  if (intent === 'next' && details.nextSteps?.length) {
    return `The next documented steps for ${topic.title}: ${details.nextSteps
      .slice(0, 3)
      .join(' ')}`
  }

  return topic.answer
}

export function answerQuestion({
  query,
  topics,
  fallback,
  previousTopicId = null,
  currentPath = ''
}) {
  const safeQuery = String(query || '').slice(0, 500)
  const normalizedQuery = normalizeText(safeQuery)
  const queryTokens = tokenize(normalizedQuery)

  if (!normalizedQuery) {
    return {
      topicId: null,
      confidence: 'fallback',
      answer: fallback,
      links: [
        { label: 'Explore projects', href: '/projects' },
        { label: 'Contact Ka', href: '/contact' }
      ],
      followUps: []
    }
  }

  const ranked = topics
    .map((topic) => ({
      topic,
      score: scoreTopic(topic, normalizedQuery, queryTokens, {
        previousTopicId,
        currentPath
      })
    }))
    .sort((a, b) => b.score - a.score || a.topic.title.localeCompare(b.topic.title))

  const match = ranked[0]
  if (!match || match.score < 4) {
    return {
      topicId: null,
      confidence: 'fallback',
      answer: fallback,
      links: [
        { label: 'Explore projects', href: '/projects' },
        { label: 'Contact Ka', href: '/contact' }
      ],
      followUps: [
        'What should I review first?',
        'How does Ka work with AI agents?'
      ]
    }
  }

  return {
    topicId: match.topic.id,
    confidence: match.score >= 12 ? 'high' : 'medium',
    answer: projectAnswer(match.topic, normalizedQuery),
    links: (match.topic.links || []).slice(0, 3),
    followUps: (match.topic.followUps || []).slice(0, 2)
  }
}
