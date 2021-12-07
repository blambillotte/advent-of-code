const fs = require("fs");

const readFile = (filename) => {
  return fs.readFileSync(process.cwd() + "/inputs/" + filename).toString();
};

const input = readFile("day_7.txt")
  .split(",")
  .map((stringNum) => parseInt(stringNum));

const sortedInput = input.sort((a, b) => a - b);
const dedupedInput = [...new Set(sortedInput)];

const minFuelPosition = { fuelUsed: 0, position: 0 };

const getRange = (from, to) => {
  const step = from < to ? 1 : -1;
  return [...Array(Math.floor((to - from) / step) + 1)].map(
    (_, i) => from + i * step
  );
};

const part2CalculateFuel = (distance) => {
  if (distance === 0) return 0;

  const range = getRange(1, distance);
  return range.reduce((acc, rangeNum) => (acc += rangeNum));
};

const inputRange = getRange(
  Math.min(...dedupedInput),
  Math.max(...dedupedInput)
);

for (let [i, currentNum] of Object.entries(inputRange)) {
  const fuelUsed = sortedInput.reduce((acc, input) => {
    const distance = Math.abs(currentNum - input);
    return acc + part2CalculateFuel(distance);
  }, 0);

  if (i === "0" || fuelUsed < minFuelPosition.fuelUsed) {
    minFuelPosition.fuelUsed = fuelUsed;
    minFuelPosition.position = currentNum;
  }
}

console.log(minFuelPosition);
