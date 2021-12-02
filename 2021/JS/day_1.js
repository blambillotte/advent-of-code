const fs = require("fs");

const readFile = (filename) => {
  return fs.readFileSync(process.cwd() + "/inputs/" + filename).toString();
};

const input = readFile("day_1.txt")
  .split("\n")
  .map((num) => parseInt(num));

const countIncreases = (arr) =>
  arr.reduce(
    (acc, current, currIndex) => {
      if (currIndex === 0) return acc;

      const previous = arr[currIndex - 1];
      const hasIncreased = current > previous;

      if (hasIncreased) acc.increaseCount++;

      return acc;
    },
    { increaseCount: 0 }
  );

const part1 = countIncreases(input);
console.log("part1:", part1);

const part2 = () => {
  const measurementWindows = input.reduce((acc, current, currIndex) => {
    const second = input[currIndex + 1];
    const third = input[currIndex + 2];
    // Ignore the remaining two array values as they can't create a 3 item window
    if (!second || !third) return acc;

    const sum = current + second + third;
    acc.push(sum);

    return acc;
  }, []);

  const result = countIncreases(measurementWindows);
  console.log("part2:", result);
};

part2();
