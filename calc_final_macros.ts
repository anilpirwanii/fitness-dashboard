const totalCalories = 1386;
const totalProtein = 247.4;
const totalCarbs = 12.7;
const totalFat = 36.6;
const finalWeight = 723;

const perGram = {
  kcal: (totalCalories / finalWeight).toFixed(4),
  protein: (totalProtein / finalWeight).toFixed(4),
  carbs: (totalCarbs / finalWeight).toFixed(4),
  fat: (totalFat / finalWeight).toFixed(4)
};

const per100g = {
  kcal: (totalCalories / finalWeight * 100).toFixed(2),
  protein: (totalProtein / finalWeight * 100).toFixed(2),
  carbs: (totalCarbs / finalWeight * 100).toFixed(2),
  fat: (totalFat / finalWeight * 100).toFixed(2)
};

console.log('Per Gram:');
console.log(JSON.stringify(perGram, null, 2));
console.log('\nPer 100g:');
console.log(JSON.stringify(per100g, null, 2));
