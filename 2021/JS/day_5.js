const fs = require("fs");

const readFile = (filename) => {
  return fs.readFileSync(process.cwd() + "/inputs/" + filename).toString();
};

const input = readFile("day_5.txt")
  .split("\n")
  .map((lines) => {
    const [start, end] = lines.split(" -> ");
    const [startX, startY] = start.split(",");
    const [endX, endY] = end.split(",");
    return {
      start: { x: parseInt(startX), y: parseInt(startY) },
      end: { x: parseInt(endX), y: parseInt(endY) },
    };
  });

const getRange = (from, to) => {
  const step = from < to ? 1 : -1;
  return [...Array(Math.floor((to - from) / step) + 1)].map(
    (_, i) => from + i * step
  );
};

const calculationPoints = (line) => {
  const { start, end } = line;
  if (start.x === end.x) {
    const range = getRange(start.y, end.y);
    return range.map((position) => `${start.x},${position}`);
  } else if (start.y === end.y) {
    const range = getRange(start.x, end.x);
    return range.map((position) => `${position},${start.y}`);
  } else {
    // part 1 direction say to ignore diagonal
    // return null;
    const rangeX = getRange(start.x, end.x);
    const rangeY = getRange(start.y, end.y);
    if (rangeX.length !== rangeY.length) throw new Error("Non diagonal range!");

    return rangeX.map((position, i) => `${position},${rangeY[i]}`);
  }
};

const resultMap = {};

for (let line of input) {
  const linePoints = calculationPoints(line);
  if (linePoints) {
    linePoints.forEach((point) => {
      if (!resultMap[point]) {
        resultMap[point] = 1;
      } else {
        resultMap[point]++;
      }
    });
  }
}

let resultCount = 0;

for (let [_key, value] of Object.entries(resultMap)) {
  if (value > 1) resultCount++;
}

console.log(resultCount);
