import { Container, Eyebrow, Reveal } from './ui'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

const QA = [
  {
    q: 'What is Optraze?',
    a: 'Optraze is a product studio. We design, build, and run our own AI-native SaaS — focused products built on shared foundations of memory, voice, and intelligence.',
  },
  {
    q: 'What have you shipped so far?',
    a: 'ConvoMem — durable customer memory for conversational AI — is live at convomem.com. VoiceFlow, a realtime voice-agent platform, is in development. More products are in the build queue.',
  },
  {
    q: 'Are you an agency or a venture fund?',
    a: 'Neither. We don’t do client work and we don’t invest in other people’s companies. We build and own our own products.',
  },
  {
    q: 'Can I use your products today?',
    a: 'Yes — ConvoMem is live with a free trial and no card required. VoiceFlow has an early-access waitlist you can join now.',
  },
  {
    q: 'What ties the products together?',
    a: 'The same foundations underneath all of them — memory, voice, and intelligence. Building those once means every new product ships faster and works better than starting from scratch.',
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

          <Reveal delay={80} className="border border-line bg-card shadow-soft">
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
