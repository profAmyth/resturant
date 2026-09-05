import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'zod';

const menu = defineCollection({
  loader: file('src/content/menu.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.enum(['starters', 'salads', 'mains', 'handhelds', 'sides', 'desserts', 'drinks']),
    dietaryTags: z.array(z.enum(['v', 'vg', 'gf', 'df', 'nf', 'spicy'])).optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
    available: z.boolean().optional().default(true),
  }),
});

const gallery = defineCollection({
  loader: file('src/content/gallery.json'),
  schema: z.object({
    id: z.string(),
    src: z.string(),
    alt: z.string().min(1),
    category: z.enum(['food', 'interior', 'exterior', 'team']),
    caption: z.string().optional(),
    credit: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { menu, gallery };
