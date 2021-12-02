const importer = require("../importer");

const data = importer.importFile("./day_3/input.txt");
const lines = data.split("\n");
const lineA = lines[0].split(",");
const lineB = lines[1].split(",");

// const testLineA = [
//   "R75",
//   "D30",
//   "R83",
//   "U83",
//   "L12",
//   "D49",
//   "R71",
//   "U7",
//   "L72"
// ];
// const testLineB = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R8"];

// const testLIne2A = [
//   "R98",
//   "U47",
//   "R26",
//   "D63",
//   "R33",
//   "U87",
//   "L62",
//   "D20",
//   "R33",
//   "U53",
//   "R51"
// ];

// const testLIne2B = [
//   "U98",
//   "R91",
//   "D20",
//   "R16",
//   "D67",
//   "R40",
//   "U7",
//   "R15",
//   "U6",
//   "R7"
// ];

function enumeratePath({
  currentCoordinates,
  distance,
  axis,
  shouldIncrement
}) {
  const newPathSegment = new Array(parseInt(distance)).fill(1);

  return newPathSegment.map((_el, i) => {
    const newCoordinate = Object.assign({}, currentCoordinates);
    const step = i + 1;

    if (shouldIncrement) {
      newCoordinate[axis] += step;
    } else {
      newCoordinate[axis] -= step;
    }
    return newCoordinate;
  });
}

function getNewPathSegment({ code, currentCoordinates }) {
  const directionKey = code.substring(0, 1);
  const distance = code.substring(1);

  switch (directionKey) {
    case "U":
      return enumeratePath({
        shouldIncrement: true,
        currentCoordinates,
        axis: "y",
        distance
      });
    case "D":
      return enumeratePath({
        shouldIncrement: false,
        currentCoordinates,
        axis: "y",
        distance
      });
    case "L":
      return enumeratePath({
        shouldIncrement: false,
        currentCoordinates,
        axis: "x",
        distance
      });
    case "R":
      return enumeratePath({
        shouldIncrement: true,
        currentCoordinates,
        axis: "x",
        distance
      });
    default:
      throw "invalid direction";
  }
}

function calculatePath(directionArr) {
  let pathArr = [{ x: 0, y: 0 }];
  directionArr.forEach(code => {
    const newSegment = getNewPathSegment({
      code,
      currentCoordinates: pathArr.slice(-1)[0]
    });
    pathArr = [...pathArr, ...newSegment];
  });
  return pathArr;
}

function findClosestIntersection(intersections) {
  const distances = intersections.map(el => {
    return Math.abs(el.x) + Math.abs(el.y);
  });

  // skip index 0, which is the shared starting point
  const distance = distances.sort((a, b) => a - b)[1];
  console.log("Shortest Distance:", distance);
  console.timeEnd("Calculating");
}

function run(lineAInstructions, lineBInstructions) {
  console.time("Calculating");
  const lineAPath = calculatePath(lineAInstructions);
  const lineBPath = calculatePath(lineBInstructions);

  const intersections = lineAPath.filter(
    elA =>
      !!lineBPath.filter(elB => elA.y === elB.y && elA.x === elB.x).length > 0
  );

  findClosestIntersection(intersections);
}

// run(testLineA, testLineB);

run(lineA, lineB);
