import assert from 'node:assert/strict'
import test from 'node:test'

import { answerQuestion, normalizeText } from '../lib/concierge-core.mjs'


const fallback = 'No verified answer.'
const topics = [
  {
    id: 'identity',
    title: 'About Ka Vatana',
    priority: 8,
    keywords: ['ka', 'vatana', 'background', 'founder', 'developer'],
    entities: ['ka', 'ka vatana', 'vatana'],
    phrases: ['who is ka', 'tell me about ka'],
    answer: 'Ka is a founder-engineer.',
    links: [{ label: 'About Ka', href: '/about' }]
  },
  {
    id: 'workflow',
    title: 'AI-native engineering',
    priority: 8,
    keywords: ['ai', 'agent', 'workflow'],
    phrases: ['how does ka use ai'],
    answer: 'Humans retain authority.',
    links: [{ label: 'Workflow', href: '/workflow' }],
    followUps: ['What remains human-controlled?']
  },
  {
    id: 'chomkar',
    title: 'Chomkar',
    priority: 9,
    keywords: ['chomkar', 'agriculture', 'farmer'],
    phrases: ['market access'],
    answer: 'Chomkar coordinates farmer supply and buyer demand.',
    links: [{ label: 'Chomkar case study', href: '/projects/chomkar' }],
    path: '/projects/chomkar',
    project: {
      statusLabel: 'Deployed product, active validation',
      role: 'Co-founder and full-stack engineer',
      stack: ['Cloudflare Pages', 'Vanilla JS'],
      deploymentLine: 'The public site is deployed.',
      proofPoints: ['Top 2 at Turing Hackathon.', 'Edge functions keep keys server-side.']
    }
  }
]


test('normalizes punctuation and case', () => {
  assert.equal(normalizeText('  AI-Agent, Workflow! '), 'ai-agent workflow')
})

test('matches an explicit topic phrase', () => {
  const result = answerQuestion({
    query: 'How does Ka use AI?',
    topics,
    fallback
  })

  assert.equal(result.topicId, 'workflow')
  assert.equal(result.confidence, 'high')
  assert.equal(result.links[0].href, '/workflow')
})

test('answers a project detail from verified structured data', () => {
  const result = answerQuestion({
    query: 'What is the Chomkar tech stack?',
    topics,
    fallback
  })

  assert.equal(result.topicId, 'chomkar')
  assert.match(result.answer, /Cloudflare Pages/)
  assert.match(result.answer, /Vanilla JS/)
})

test('uses route context for a short follow-up', () => {
  const result = answerQuestion({
    query: 'What is its proof?',
    topics,
    fallback,
    currentPath: '/projects/chomkar'
  })

  assert.equal(result.topicId, 'chomkar')
  assert.match(result.answer, /Top 2/)
})

test('keeps an unknown question inside the public evidence boundary', () => {
  const result = answerQuestion({
    query: 'What is the weather on Mars?',
    topics,
    fallback
  })

  assert.equal(result.topicId, null)
  assert.equal(result.confidence, 'fallback')
  assert.equal(result.answer, fallback)
})

test('does not answer an unsupported detail just because an entity name matches', () => {
  const result = answerQuestion({
    query: "What is Ka's favorite sandwich filling?",
    topics,
    fallback
  })

  assert.equal(result.topicId, null)
  assert.equal(result.confidence, 'fallback')
  assert.equal(result.answer, fallback)
})

test('still answers a supported entity overview', () => {
  const result = answerQuestion({
    query: 'Who is Ka Vatana?',
    topics,
    fallback
  })

  assert.equal(result.topicId, 'identity')
  assert.match(result.answer, /founder-engineer/)
})

test('rejects an unsupported project detail in route context', () => {
  const result = answerQuestion({
    query: 'What is its revenue?',
    topics,
    fallback,
    currentPath: '/projects/chomkar'
  })

  assert.equal(result.topicId, null)
  assert.equal(result.answer, fallback)
})

test('caps untrusted input before matching', () => {
  const result = answerQuestion({
    query: `${'unknown '.repeat(100)}ai workflow`,
    topics,
    fallback
  })

  assert.equal(result.topicId, null)
})
