import { z, defineCollection } from 'astro:content';

export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  tags: z.array(z.string()).default([]),
  author: z.string().default('تیم فنی'),
  image: z.string().optional()
});

const blogCollection = defineCollection({
  schema: blogSchema
});

export const collections = {
  blog: blogCollection,
};

export type BlogEntry = typeof blogSchema; 