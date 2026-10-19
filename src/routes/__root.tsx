/// <reference types="vite/client" />
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'

import { SiteBackdrop } from '../components/backdrop/SiteBackdrop'
import { CursorFollower } from '../components/CursorFollower'
import appCss from '../styles.css?url'

interface MyRouterContext {
  queryClient: QueryClient
}

const SITE = 'https://optraze.com'
const TITLE = 'Optraze — AI-Native Software Studio'
const DESCRIPTION =
  'Optraze is a product studio building the next generation of AI-native SaaS — focused products, shipped fast and built to compound. ConvoMem is live; VoiceFlow is in development.'
const OG_IMAGE = `${SITE}/og/home.png`

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'Optraze',
      url: SITE,
      description:
        'A product studio building the next generation of AI-native software — focused, AI-native SaaS shipped fast and built to compound.',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/icon-512.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://twitter.com/optraze',
        'https://linkedin.com/company/optraze',
        'https://github.com/optraze',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'Optraze',
      description: DESCRIPTION,
      publisher: { '@id': `${SITE}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE}/#webpage`,
      url: `${SITE}/`,
      name: TITLE,
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#organization` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE}/#convomem`,
      name: 'ConvoMem',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web browser',
      url: 'https://convomem.com',
      description:
        'Memory layer for conversational AI. Durable customer memory across voice, chat, SMS, and email — automatic fact extraction, identity resolution, sentiment signals, lead generation playbooks, knowledge graph, and PII redaction.',
      author: { '@id': `${SITE}/#organization` },
      // Monthly list prices; keep in sync with convoMem-server billing.controller.js PLANS.
      offers: [
        {
          '@type': 'Offer',
          name: 'Starter',
          price: '149.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Growth',
          price: '399.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Pro',
          price: '599.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Scale',
          price: '1500.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE}/#voiceflow`,
      name: 'VoiceFlow',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web browser',
      url: `${SITE}/#voiceflow`,
      description:
        'Voice-AI agent platform to build, deploy, and scale realtime voice agents — sub-second orchestration, barge-in handling, bring-your-own STT/TTS/LLM, inbound and outbound calling via Twilio. In development.',
      author: { '@id': `${SITE}/#organization` },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/PreOrder',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { name: 'robots', content: 'index, follow' },
      { name: 'theme-color', content: '#F4F3EE' },
      { name: 'color-scheme', content: 'light' },
      { name: 'author', content: 'Optraze' },
      // OpenGraph
      { property: 'og:title', content: TITLE },
      {
        property: 'og:description',
        content:
          'A studio building the next generation of AI-native software. ConvoMem is live; VoiceFlow is in development; more is on the way.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${SITE}/` },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      {
        property: 'og:image:alt',
        content:
          'Optraze — a studio building the next generation of AI-native software',
      },
      { property: 'og:site_name', content: 'Optraze' },
      { property: 'og:locale', content: 'en_US' },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: TITLE },
      {
        name: 'twitter:description',
        content:
          'A studio building the next generation of AI-native software. ConvoMem live; VoiceFlow in development.',
      },
      { name: 'twitter:image', content: OG_IMAGE },
      { name: 'twitter:image:alt', content: 'Optraze brand mark and tagline' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'canonical', href: `${SITE}/` },
      { rel: 'alternate', hrefLang: 'en', href: `${SITE}/` },
      { rel: 'alternate', hrefLang: 'x-default', href: `${SITE}/` },
      { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
      { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/fonts/space-grotesk-var.woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/fonts/inter-var.woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: '/fonts/space-mono-400.woff2',
        crossOrigin: 'anonymous',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* enable JS-gated reveal animations before first paint (no-JS stays visible) */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static string, no user input
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <HeadContent />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static JSON-LD, no user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:border focus:border-ink focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider focus:text-ink"
        >
          Skip to content
        </a>
        <SiteBackdrop />
        <CursorFollower />
        <div className="grain" aria-hidden="true" />
        {children}
        {import.meta.env.DEV ? <DevTools /> : null}
        <Scripts />
      </body>
    </html>
  )
}

function DevTools() {
  return null
}
