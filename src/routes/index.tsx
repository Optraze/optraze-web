import { createFileRoute } from '@tanstack/react-router'

import { ConvoMem } from '../components/ConvoMem'
import { Faq } from '../components/Faq'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { Nav } from '../components/Nav'
import { Philosophy } from '../components/Philosophy'
import { Platform } from '../components/Platform'
import { Problem } from '../components/Problem'
import { VoiceFlow } from '../components/VoiceFlow'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Platform />
        <ConvoMem />
        <VoiceFlow />
        <HowItWorks />
        <Philosophy />
        <Faq />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
