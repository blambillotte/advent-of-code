const fs = require("fs");

const readFile = (filename) => {
  return fs.readFileSync(process.cwd() + "/inputs/" + filename).toString();
};

const input = readFile("day_8.txt")
  .split("\n")
  .map((line) => {
    const [inputValues, outputValues] = line.split(" | ");
    return {
      inputValues: inputValues.split(" "),
      outputValues: outputValues.split(" "),
    };
  });

const length1 = 2;
const length4 = 4;
const length7 = 3;
const length8 = 7;

const isUniqueNumberSegment = (numberSegment) => {
  const validLengths = [length1, length4, length7, length8];

  return !!validLengths.find((num) => num === numberSegment.length);
};

// const part1 = input.reduce((acc, { outputValues }) => {
//   const lineSum = outputValues.reduce((acc, outputString) => {
//     if (isUniqueNumberSegment(outputString)) acc++;
//     return acc;
//   }, 0);
//   return (acc += lineSum);
// }, 0);

// console.log(part1);

const knownNumberSet = (inputValues, knownLength) =>
  new Set(
    inputValues
      .find((inputString) => inputString.length === knownLength)
      .split("")
  );

const generateSegmentMap = () => {
  const segmentMap = {
    a: null,
    b: null,
    c: null,
    d: null,
    e: null,
    f: null,
    g: null,
  };

  for ({ inputValues } of input) {
    // const inputLength = input.length;

    const oneSet = knownNumberSet(inputValues, length1);
    const fourSet = knownNumberSet(inputValues, length4);
    const sevenSet = knownNumberSet(inputValues, length7);
    const eightSet = knownNumberSet(inputValues, length8);

    // upper bar
    const upperBar = [...sevenSet].filter((x) => !oneSet.has(x))[0];
    segmentMap.a = upperBar;

    const middlePossible = [...fourSet].filter((x) => !oneSet.has(x));
    // middle is present in 7 out of 10 digits, find which
    // const inputValues.filter((val) => val.length)

    console.log({ middlePossible, fourSet, oneSet });
  }
};

generateSegmentMap();

// 8:
// aaaa
// b    c
// b    c
// dddd
// e    f
// e    f
// gggg
