import * as fs from 'fs';

const filePath = '/workspace/user/recipes.json';
const recipes = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// 1. Update Chicken Cubes
const chickenCubes = recipes.find((r: any) => r.name === 'Chicken Cubes');
if (chickenCubes) {
    chickenCubes.calories = 1489;
    chickenCubes.protein = "252.6g";
    chickenCubes.carbs = "28.2g";
    chickenCubes.fat = "35.5g";
}

// 2. Update Zabiha Chicken Kabab
// 454g ground chicken + 25g Shan Chapli Kabab Seasoning
// Ground chicken (standard raw): ~143 kcal, 17.4g protein, 0g carbs, 8.1g fat per 100g (based on common lean/extra lean ground chicken)
// Or using a more "average" ground chicken: 143 kcal, 18.5g P, 8g F
// Let's use 143 kcal, 17.4g P, 8.1g F per 100g (typical USDA raw ground chicken)
// 4.54 * 143 = 649.22 kcal
// 4.54 * 17.4 = 79.0g Protein
// 4.54 * 0 = 0g Carbs
// 4.54 * 8.1 = 36.77g Fat

// Shan Seasoning (per 100g): 300 kcal, 10g P, 50g C, 10g F
// 0.25 * 300 = 75 kcal
// 0.25 * 10 = 2.5g P
// 0.25 * 50 = 12.5g C
// 0.25 * 10 = 2.5g F

// Total:
// Calories: 649.22 + 75 = 724.22 -> 724
// Protein: 79.0 + 2.5 = 81.5g
// Carbs: 0 + 12.5 = 12.5g
// Fat: 36.77 + 2.5 = 39.27 -> 39.3g

const kabab = recipes.find((r: any) => r.name === 'Zabiha Chicken Kabab');
if (kabab) {
    kabab.calories = 724;
    kabab.protein = "81.5g";
    kabab.carbs = "12.5g";
    kabab.fat = "39.3g";
}

fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));
console.log('Updated recipes.json');
