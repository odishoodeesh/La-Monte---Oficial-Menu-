export type MainCategory = 
  | 'Drinks'
  | 'Food'
  | 'Shisha';

export type Category = 
  | 'Hot Drinks' 
  | 'Cold Drinks' 
  | 'Cold Brew' 
  | 'Coffee Frappe' 
  | 'Mojito' 
  | 'Smoothies' 
  | 'Milkshake' 
  | 'Red Bull' 
  | 'Refreshing Drinks' 
  | 'Fresh Juice' 
  | 'Detox' 
  | 'Iced Tea'
  | 'Tea' 
  | 'Water' 
  | 'Shisha' 
  | 'Sweets & Cake' 
  | 'Toasts';

export interface MenuItem {
  id: string;
  name: string;
  nameKu?: string;
  nameAr?: string;
  price: string;
  category: Category;
  mainCategory: MainCategory;
  image: string;
  description: string;
  descKu?: string;
  descAr?: string;
  rank?: string;
  calories?: string;
  isSeasonal?: boolean;
  isRecommended?: boolean;
  isCombination?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  note?: string;
}
