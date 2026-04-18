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

export const collections = { podcasts, endorsements, writing };
