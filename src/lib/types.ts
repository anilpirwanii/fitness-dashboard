export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  date: string;
  time: string;
};

export type Target = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};