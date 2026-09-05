export const CATEGORY_ORDER = ['starters', 'salads', 'mains', 'handhelds', 'sides', 'desserts', 'drinks'] as const;

export const CATEGORY_LABELS: Record<(typeof CATEGORY_ORDER)[number], string> = {
  starters: 'Starters',
  salads: 'Salads',
  mains: 'Mains',
  handhelds: 'Handhelds',
  sides: 'Sides',
  desserts: 'Desserts',
  drinks: 'Drinks',
};

export const GALLERY_CATEGORY_ORDER = ['food', 'interior', 'exterior', 'team'] as const;

export const GALLERY_CATEGORY_LABELS: Record<(typeof GALLERY_CATEGORY_ORDER)[number], string> = {
  food: 'Food',
  interior: 'Interior',
  exterior: 'Exterior',
  team: 'Team & Events',
};

export type DietaryTag = 'v' | 'vg' | 'gf' | 'df' | 'nf' | 'spicy';

export const DIETARY_LEGEND = [
  { code: 'v', label: 'Vegetarian' },
  { code: 'vg', label: 'Vegan' },
  { code: 'gf', label: 'Gluten-Free' },
  { code: 'df', label: 'Dairy-Free' },
  { code: 'nf', label: 'Nut-Free' },
] as const;

// Text/border colors use -deep variants of sage and amber: the base brand hues
// (visual-design-bible.md) don't clear WCAG AA at badge text size on Cream.
export const DIETARY_TAGS: Record<DietaryTag, { label: string; className: string }> = {
  v: { label: 'V', className: 'border border-sage-deep text-charcoal' },
  vg: { label: 'VG', className: 'bg-sage-deep/15 border border-sage-deep text-charcoal' },
  gf: { label: 'GF', className: 'border border-amber-deep text-charcoal' },
  df: { label: 'DF', className: 'border border-stone text-charcoal' },
  nf: { label: 'NF', className: 'border border-charcoal/40 text-charcoal' },
  spicy: { label: 'Spicy', className: 'text-copper' },
};
