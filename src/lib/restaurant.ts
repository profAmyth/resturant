import { z } from 'zod';
import raw from '../content/restaurant.json';

const hoursEntry = z.object({
  day: z.string(),
  open: z.string().nullable(),
  close: z.string().nullable(),
  closed: z.boolean(),
});

const restaurantSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  phone: z.string(),
  email: z.email(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    mapEmbedUrl: z.url(),
    directionsUrl: z.url(),
  }),
  hours: z.array(hoursEntry),
  social: z.object({
    instagram: z.url().optional(),
    facebook: z.url().optional(),
  }),
  reservation: z.object({
    widgetLabel: z.string(),
    widgetUrl: z.url(),
  }),
});

export type Restaurant = z.infer<typeof restaurantSchema>;

export const restaurant: Restaurant = restaurantSchema.parse(raw);

export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
