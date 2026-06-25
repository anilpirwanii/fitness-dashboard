import * as fs from 'fs';

const LOCAL_LOG_PATH = '/workspace/user/meal_log.json';

interface LocalMeal {
  date: string;
  time: string;
  name: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

const formatDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

// Original log entries to keep (the ones with long weekday format)
const originalLog: LocalMeal[] = [
  {
    "date": "Sunday, June 21, 2026",
    "time": "1:36:10 PM PDT",
    "name": "Spicy Al Pollo Pizza (whole 12-inch pizza)",
    "calories": 1100,
    "protein": "65g",
    "carbs": "130g",
    "fat": "40g"
  },
  {
    "date": "Monday, June 22, 2026",
    "time": "1:48:00 PM PDT",
    "name": "Tim Hortons Large Sugar-Free Vanilla Protein Latte",
    "calories": 230,
    "protein": "27g",
    "carbs": "13g",
    "fat": "8g"
  },
  {
    "date": "Monday, June 22, 2026",
    "time": "1:48:00 PM PDT",
    "name": "Tim Hortons Egg and Cheese Sandwich on English Muffin",
    "calories": 270,
    "protein": "14g",
    "carbs": "27g",
    "fat": "12g"
  },
  {
    "date": "Monday, June 22, 2026",
    "time": "4:59:49 PM PDT",
    "name": "La Pache 12-inch Italian Pizza (Half)",
    "calories": 670,
    "protein": "31.5g",
    "carbs": "64g",
    "fat": "31g"
  }
];

// The item we need to add from the web app
const proteinShake: LocalMeal = {
  "date": "Monday, June 22, 2026",
  "time": "8:00:00 PM PDT", // Time it was synced
  "name": "PROTEIN SHAKE (KIRKLAND)",
  "calories": 160,
  "protein": "30g",
  "carbs": "5g",
  "fat": "3g"
};

const finalLog = [...originalLog, proteinShake];

fs.writeFileSync(LOCAL_LOG_PATH, JSON.stringify(finalLog, null, 2));
console.log("Successfully synced PROTEIN SHAKE (KIRKLAND) from the web app and cleaned the log.");

// Calculate totals for Monday, June 22, 2026
const targetDate = "Monday, June 22, 2026";
const todaysMeals = finalLog.filter(m => m.date === targetDate);
const totals = todaysMeals.reduce((acc, curr) => {
  acc.calories += curr.calories;
  acc.protein += parseFloat(curr.protein);
  acc.carbs += parseFloat(curr.carbs);
  acc.fat += parseFloat(curr.fat);
  return acc;
}, { calories: 0, protein: 0, carbs: 0, fat: 0 });

console.log("\n--- MEAL LOG FOR MONDAY, JUNE 22, 2026 ---");
todaysMeals.forEach(m => console.log(`- ${m.name}: ${m.calories} cal, ${m.protein} P, ${m.carbs} C, ${m.fat} F`));
console.log("\n--- TOTALS ---");
console.log(`Calories: ${totals.calories} kcal`);
console.log(`Protein: ${totals.protein}g`);
console.log(`Carbs: ${totals.carbs}g`);
console.log(`Fat: ${totals.fat}g`);
