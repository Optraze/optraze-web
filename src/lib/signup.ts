import { createClient } from '@supabase/supabase-js'
import { createServerFn } from '@tanstack/react-start'

import type { SupabaseClient } from '@supabase/supabase-js'

export type SignupSource = 'newsletter' | 'waitlist'

export interface SignupInput {
  email: string
  source: SignupSource
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/**
 * Server-only Supabase client using the service-role key. Reads env inside the
 * function (not at module scope) so the secret is never bundled to the client
 * and so per-request env injection works in edge/serverless runtimes.
 */
function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('SERVER_MISCONFIGURED')
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/**
 * Persists a signup (newsletter or waitlist) to the `signups` table. Dedupe is
 * handled by a unique index on lower(email): a repeat email surfaces as a
 * unique violation (Postgres 23505), which we treat as success.
 */
export const submitSignup = createServerFn({ method: 'POST' })
  .validator((data: SignupInput) => {
    const email = String(data?.email ?? '')
      .trim()
      .toLowerCase()
    const source: SignupSource =
      data?.source === 'waitlist' ? 'waitlist' : 'newsletter'
    if (!email || !EMAIL_RE.test(email)) {
      throw new Error('INVALID_EMAIL')
    }
    return { email, source }
  })
  .handler(async ({ data }) => {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('signups')
      .insert({ email: data.email, source: data.source })

    // 23505 = unique_violation => already registered; treat as success.
    if (error && error.code !== '23505') {
      throw new Error('SERVER_ERROR')
    }
    return { ok: true as const }
  })
