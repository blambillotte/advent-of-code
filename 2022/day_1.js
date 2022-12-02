const fs = require("fs");

const readFile = (filename) => {
  return fs.readFileSync(process.cwd() + "/inputs/" + filename).toString();
};

const input = readFile("day_1.txt")
  .split("\n\n")
  .map((group) => group.split("\n"));

function sumCalories(elfCaloriesArr) {
  return elfCaloriesArr.reduce((acc, cal) => {
    return acc + parseInt(cal);
  }, 0);
}

// Part 1
const max = input.reduce((currentMax, elfCalories) => {
  const elfSum = sumCalories(elfCalories);

  if (elfSum > currentMax) {
    currentMax = elfSum;
  }
  return currentMax;
}, 0);

console.log("part 1", max);

// Part 2
const sortedElfTotals = input.map(sumCalories).sort((a, b) => b - a);
const [elf1, elf2, elf3, ...rest] = sortedElfTotals;

console.log("part 2", elf1 + elf2 + elf3);
