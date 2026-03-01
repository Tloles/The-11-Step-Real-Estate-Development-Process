const API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-20250514'

function getApiKey() {
  return import.meta.env.VITE_ANTHROPIC_API_KEY
}

/**
 * Call the Anthropic API with optional web search tool.
 */
export async function callAnthropic({ prompt, systemPrompt, useWebSearch = false }) {
  const apiKey = getApiKey()
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('Please set your VITE_ANTHROPIC_API_KEY in the .env file')
  }

  const tools = useWebSearch
    ? [{ type: 'web_search_20250305', name: 'web_search' }]
    : []

  const body = {
    model: MODEL,
    max_tokens: 4096,
    ...(systemPrompt && { system: systemPrompt }),
    tools,
    messages: [{ role: 'user', content: prompt }],
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()

  // Extract text content from the response
  const textBlocks = data.content.filter(block => block.type === 'text')
  return textBlocks.map(block => block.text).join('\n')
}
