import * as fs from 'fs';
import * as path from 'path';

interface Meal {
  date: string;
  time: string;
  name: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

const meal: Meal = {
  date: "Monday, June 22, 2026",
  time: "1:36:10 PM PDT",
  name: "Spicy Al Pollo Pizza (whole 12-inch pizza)",
  calories: 1100,
  protein: "65g",
  carbs: "130g",
  fat: "40g"
};

const filePath = '/workspace/user/meal_log.json';
let meals: Meal[] = [];

if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, 'utf-8');
  meals = JSON.parse(content);
}

meals.push(meal);
fs.writeFileSync(filePath, JSON.stringify(meals, null, 2));
console.log('Meal logged successfully.');
