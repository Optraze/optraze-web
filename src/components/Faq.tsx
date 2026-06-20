import { Container, Eyebrow, Reveal } from './ui'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

const QA = [
  {
    q: 'What exactly does Optraze do?',
    a: 'Optraze builds the foundational layers beneath conversational and voice AI — durable memory, realtime voice, and intelligence. You ship the product; we handle the infrastructure that makes it remember, understand, and respond.',
  },
  {
    q: 'Is ConvoMem available today?',
    a: 'Yes. ConvoMem is live at convomem.com with a 7-day free trial and no card required. It gives your agents durable customer memory across voice, chat, SMS, and email.',
  },
  {
    q: 'Will I get locked into a provider?',
    a: 'No. Bring your own STT, TTS, and LLM, and keep ownership of your data. Zero vendor lock-in is a design constraint, not a marketing line.',
  },
  {
    q: 'How fast is memory recall?',
    a: 'Under 20ms at p95 — context is available before the conversation starts, not fetched mid-call.',
  },
  {
    q: 'When is VoiceFlow launching?',
    a: "VoiceFlow is in active development. Join the waitlist and we'll reach out with early access before the public launch.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="section scroll-mt-20 border-b border-line">
      <Container>
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Reveal>
              <Eyebrow>Questions</Eyebrow>
            </Reveal>
            <Reveal as="h2" delay={60} className="max-w-[14ch] text-4xl">
              Answers, without the runaround.
            </Reveal>
          </div>

          <Reveal delay={80} className="border border-line">
            <Accordion className="px-6">
              {QA.map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger className="py-5 font-display text-lg text-ink hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[62ch] text-base text-ink-2">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
