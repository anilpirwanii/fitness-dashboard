import * as fs from 'fs';

interface Meal {
  date: string;
  time: string;
  name: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

const filePath = '/workspace/user/meal_log.json';

if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let meals: Meal[] = JSON.parse(content);

  // Find the pizza on June 22
  const pizzaIndex = meals.findIndex(m => 
    m.date === "Monday, June 22, 2026" && 
    m.name === "Spicy Al Pollo Pizza (whole 12-inch pizza)"
  );

  if (pizzaIndex !== -1) {
    // Update it to yesterday
    meals[pizzaIndex].date = "Sunday, June 21, 2026";
    // We'll keep the time as is or move it to a generic end-of-day time if preferred, 
    // but the prompt just says "log it for yesterday".
    fs.writeFileSync(filePath, JSON.stringify(meals, null, 2));
    console.log('Meal moved to yesterday successfully.');
  } else {
    console.log('Meal not found for today.');
  }
}
