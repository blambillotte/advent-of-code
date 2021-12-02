const fs = require("fs");

const readFile = (filename) => {
  return fs.readFileSync(process.cwd() + "/inputs/" + filename).toString();
};

const input = readFile("day_2.txt")
  .split("\n")
  .map((rawDirection) => {
    const [direction, amountString] = rawDirection.split(" ");
    const amount = parseInt(amountString);
    return { direction, amount };
  });

const reduceDirectionsPart1 = input.reduce(
  (acc, { direction, amount }) => {
    switch (direction) {
      case "forward":
        acc.horizontal += amount;
        break;
      case "down":
        acc.depth += amount;
        break;
      case "up":
        acc.depth -= amount;
        break;
    }
    return acc;
  },
  { horizontal: 0, depth: 0 }
);

const part1 = () => {
  const { horizontal, depth } = reduceDirectionsPart1;
  return horizontal * depth;
};

console.log("part1:", part1());

const reduceDirectionsPart2 = input.reduce(
  (acc, { direction, amount }) => {
    switch (direction) {
      case "forward":
        acc.horizontal += amount;
        acc.depth += acc.aim * amount;
        break;
      case "down":
        acc.aim += amount;
        break;
      case "up":
        acc.aim -= amount;
        break;
    }
    return acc;
  },
  { horizontal: 0, depth: 0, aim: 0 }
);

const part2 = () => {
  const { horizontal, depth } = reduceDirectionsPart2;
  return horizontal * depth;
};

console.log("part2:", part2());
