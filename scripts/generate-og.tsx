/** @jsxImportSource react */
/**
 * Generate the OpenGraph / Twitter card (1200x630) with Takumi (takumi-js),
 * rendering JSX straight to PNG — no headless browser. Run with Bun:
 *
 *   bun run og
 *
 * Output: public/og/home.png
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { render } from 'takumi-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const fontDir = join(root, 'public/fonts')

const [grotesk, inter, mono] = await Promise.all([
  readFile(join(fontDir, 'space-grotesk-var.woff2')),
  readFile(join(fontDir, 'inter-var.woff2')),
  readFile(join(fontDir, 'space-mono-700.woff2')),
])

const fonts = [
  { name: 'Space Grotesk', data: grotesk },
  { name: 'Inter', data: inter },
  { name: 'Space Mono', data: mono },
]

const INK = '#0B0C10'
const INK2 = '#3f424b'
const MUTED = '#62656e'
const INDIGO = '#4f46e5'
const CYAN = '#0891b2'
const PAPER = '#F4F3EE'

function Mark() {
  return (
    <svg width="54" height="54" viewBox="0 0 100 100" fill="none">
      <title>Optraze</title>
      <circle cx="50" cy="41" r="24" stroke={INDIGO} strokeWidth="8" />
      <path
        d="M12 64 Q50 87 88 64"
        stroke="#06b6d4"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  )
}

const Card = (
  <div
    style={{
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px',
      backgroundColor: PAPER,
      backgroundImage:
        'radial-gradient(900px 560px at 92% 6%, rgba(79,70,229,0.12), transparent 62%), radial-gradient(820px 620px at 104% 70%, rgba(6,182,212,0.12), transparent 60%)',
      fontFamily: 'Inter',
    }}
  >
    {/* top row */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Mark />
        <span
          style={{
            fontFamily: 'Space Grotesk',
            fontWeight: 600,
            fontSize: '30px',
            color: INK,
          }}
        >
          Optraze
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          border: `1px solid ${INK}`,
          padding: '9px 16px',
          fontFamily: 'Space Mono',
          fontSize: '16px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: MUTED,
        }}
      >
        <span
          style={{
            display: 'flex',
            width: '8px',
            height: '8px',
            backgroundColor: '#18a558',
          }}
        />
        <span style={{ color: '#18a558' }}>LIVE</span>
        <span style={{ color: MUTED }}>convomem.com</span>
      </div>
    </div>

    {/* headline */}
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span
        style={{
          fontFamily: 'Space Mono',
          fontSize: '17px',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          color: MUTED,
          marginBottom: '22px',
        }}
      >
        memory · voice · intelligence
      </span>
      <div
        style={{
          display: 'flex',
          width: '84px',
          height: '6px',
          marginBottom: '26px',
          backgroundImage: `linear-gradient(90deg, ${INDIGO}, #06b6d4)`,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Space Grotesk',
          fontWeight: 700,
          fontSize: '80px',
          lineHeight: 1.03,
          letterSpacing: '-0.035em',
          color: INK,
        }}
      >
        <span>The infrastructure layer</span>
        <span>
          for AI that <span style={{ color: INDIGO }}>talks,</span>
        </span>
        <span>
          and <span style={{ color: CYAN }}>remembers.</span>
        </span>
      </div>
    </div>

    {/* bottom row */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Space Mono',
        fontSize: '17px',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: MUTED,
      }}
    >
      <span>ConvoMem · VoiceFlow</span>
      <span style={{ color: INK2 }}>optraze.com</span>
    </div>
  </div>
)

const png = await render(Card, {
  width: 1200,
  height: 630,
  format: 'png',
  fonts,
})

await mkdir(join(root, 'public/og'), { recursive: true })
await writeFile(join(root, 'public/og/home.png'), png)
console.log('✓ wrote public/og/home.png', png.length, 'bytes')
