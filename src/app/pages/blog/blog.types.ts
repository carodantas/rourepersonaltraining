export type BlogCategoryId =
  | 'all'
  | 'client-talks'
  | 'event'
  | 'exercises'
  | 'personal-training'
  | 'recipes'
  | 'tips-tricks'
  | 'uncategorized';

export type BlogCategory = {
  id: BlogCategoryId;
  labelKey: string;
};


