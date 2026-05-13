import { defineCollection, z } from 'astro:content';

// —— Podcast appearances ——————————————————————————
const podcasts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    host: z.string().optional(),
    date: z.date(),
    url: z.string().url().optional(),
    topic: z.string().optional(),
    category: z.enum(['book', 'academic', 'general']).default('book'),
    featured: z.boolean().default(false),
    upcoming: z.boolean().default(false),
  }),
});

// —— Book endorsements ——————————————————————————
const endorsements = defineCollection({
  type: 'content',
  schema: z.object({
    author: z.string(),
    affiliation: z.string().optional(),
    bookTitle: z.string().optional(),
    tier: z.enum(['lead', 'featured', 'supporting', 'review']).default('supporting'),
    order: z.number().default(100),
  }),
});

// —— Writing (essays, articles) ————————————————
const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publication: z.string(),
    date: z.date(),
    url: z.string().url().optional(),
    summary: z.string().optional(),
    order: z.number().default(100),
  }),
});

// —— Static pages (Home / About / Book / Contact) ——————
// One markdown entry per page. Schema is a discriminated union
// on `page`, so each page has only the fields it actually uses.
const homePageFields = z.object({
  page: z.literal('home'),
  pageTitle: z.string(),
  pageDescription: z.string().optional(),

  heroEyebrow: z.string(),
  heroHeadline: z.string(),
  heroLede: z.string(),
  heroCredential: z.string(),
  heroImage: z.string().default('/images/headshot-hero.jpg'),
  heroImageAlt: z.string().default('Portrait of Leslie Baynes'),

  bookSectionLabel: z.string(),
  bookCoverImage: z.string().default('/images/book-cover-medium.jpg'),
  bookCoverAlt: z.string(),
  bookTitle: z.string(),
  bookSubtitle: z.string(),
  bookDescription: z.string(),
  bookPrimaryCtaLabel: z.string().default('Read More'),
  bookPrimaryCtaHref: z.string().default('/book'),
  bookSecondaryButtons: z
    .array(z.object({ label: z.string(), url: z.string() }))
    .default([]),

  appearancesEyebrow: z.string().default('Recently On'),
  appearancesHeading: z.string().default('In conversation'),
  appearancesSeeAllLabel: z.string().default('See all appearances →'),
  appearancesSeeAllHref: z.string().default('/media'),

  paths: z
    .array(
      z.object({
        number: z.string(),
        heading: z.string(),
        body: z.string(),
        linkLabel: z.string(),
        linkHref: z.string(),
      })
    )
    .default([]),
});

const aboutPageFields = z.object({
  page: z.literal('about'),
  pageTitle: z.string(),
  pageDescription: z.string().optional(),

  sectionLabel: z.string().default('About'),
  heading: z.string(),
  lede: z.string(),
  introParagraphs: z.array(z.string()).default([]),
  headshotImage: z.string().default('/images/headshot-hero.jpg'),
  headshotAlt: z.string().default('Portrait of Leslie Baynes'),

  originHeading: z.string(),
  originParagraphs: z.array(z.string()).default([]),

  serviceHeading: z.string(),
  serviceParagraphs: z.array(z.string()).default([]),

  teachingHeading: z.string(),
  teachingParagraphs: z.array(z.string()).default([]),

  cvHeading: z.string().default('Full publication list and academic history'),
  cvDescription: z
    .string()
    .default('Complete CV available as a downloadable PDF.'),
  cvButtonLabel: z.string().default('Download CV'),
  cvButtonHref: z.string().default('/cv-leslie-baynes.pdf'),
});

const bookPageFields = z.object({
  page: z.literal('book'),
  pageTitle: z.string(),
  pageDescription: z.string().optional(),

  meta: z.string(),
  coverImage: z.string().default('/images/book-cover-large.jpg'),
  coverAlt: z.string(),
  bookTitle: z.string(),
  bookSubtitle: z.string(),
  question: z.string(),
  description: z.string(),
  buyLinks: z
    .array(z.object({ label: z.string(), url: z.string(), primary: z.boolean().default(false) }))
    .default([]),

  praiseEyebrow: z.string().default('Praise'),
  praiseHeading: z.string().default('What scholars are saying'),

  aboutBookEyebrow: z.string().default('About the Book'),
  aboutBookHeading: z.string(),
  aboutBookParagraphs: z
    .array(
      z.object({
        text: z.string(),
        accent: z.boolean().default(false),
      })
    )
    .default([]),

  contentsEyebrow: z.string().default('Table of Contents'),
  contentsHeading: z.string(),
  contentsParts: z
    .array(
      z.object({
        label: z.string(),
        subtitle: z.string(),
        chapters: z.array(z.string()),
      })
    )
    .default([]),

  authorEyebrow: z.string().default('About the Author'),
  authorName: z.string().default('Leslie Baynes'),
  authorImage: z.string().default('/images/headshot-medium.jpg'),
  authorImageAlt: z.string().default('Leslie Baynes'),
  authorParagraphs: z.array(z.string()).default([]),
  authorLinkLabel: z.string().default('Read the full biography →'),
  authorLinkHref: z.string().default('/about'),
});

const contactPageFields = z.object({
  page: z.literal('contact'),
  pageTitle: z.string(),
  pageDescription: z.string().optional(),

  sectionLabel: z.string().default('Contact'),
  heading: z.string(),
  lede: z.string(),

  contactCards: z
    .array(
      z.object({
        icon: z.string(),
        heading: z.string(),
        body: z.string(),
        email: z.string(),
        responseTime: z.string(),
      })
    )
    .default([]),

  affiliationHeading: z.string().default('Institutional affiliation'),
  affiliationLines: z.array(z.string()).default([]),
  affiliationEmail: z.string().optional(),
});

const pages = defineCollection({
  type: 'content',
  schema: z.discriminatedUnion('page', [
    homePageFields,
    aboutPageFields,
    bookPageFields,
    contactPageFields,
  ]),
});

// —— Site-wide settings (single entry) ——————————————
// One JSON file at src/content/settings/site.json. Holds values
// used across the layout / meta tags. Per-page titles and
// descriptions live in the `pages` collection, not here.
const settings = defineCollection({
  type: 'data',
  schema: z.object({
    siteName: z.string(),
    authorName: z.string(),
    tagline: z.string().optional(),
    defaultDescription: z.string(),
    ogImage: z.string().default('/images/book-cover-large.jpg'),
    headshotImage: z.string().default('/images/headshot-hero.jpg'),
    socialLinks: z
      .array(z.object({ platform: z.string(), url: z.string().url() }))
      .default([]),
  }),
});

export const collections = { podcasts, endorsements, writing, pages, settings };
