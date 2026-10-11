import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('./ConvoMem.tsx', import.meta.url), 'utf8')

describe('ConvoMem public release copy', () => {
  it('separates the live product from next-release scope', () => {
    expect(source).toContain('Next-release scope:')
    expect(source).toContain('have already shipped')
  })

  it('does not promise perfect recall or an unmeasured competitor win', () => {
    expect(source).not.toMatch(
      /never repeats themselves|beats (?:Mem0|Supermemory)/i
    )
    expect(source).toContain('helping reduce repeated questions')
  })

  it('identifies configurable privacy policy without suggesting client-side keys', () => {
    expect(source).toContain('configured agent policy')
    expect(source).not.toMatch(/sk-proj-|X-API-Key|CONVOMEM_API_KEY/)
  })
})
