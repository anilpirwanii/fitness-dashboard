const chickenRaw = 972;
const chickenYield = 0.75;
const spice = 13;
const milkVolume = 300;
const milkSolidsPercent = 0.13;

const chickenCooked = chickenRaw * chickenYield;
const milkSolids = milkVolume * milkSolidsPercent;
const total = chickenCooked + spice + milkSolids;

console.log(`Chicken cooked: ${chickenCooked}g`);
console.log(`Spice: ${spice}g`);
console.log(`Milk solids: ${milkSolids}g`);
console.log(`Total: ${total}g`);
