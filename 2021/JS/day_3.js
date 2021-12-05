const fs = require("fs");

const readFile = (filename) => {
  return fs.readFileSync(process.cwd() + "/inputs/" + filename).toString();
};

const input = readFile("day_3.txt")
  .split("\n")
  .map((binaryString) => {
    return binaryString.split("").map((string) => parseInt(string));
  });

const groupByPosition = input.reduce((acc, current) => {
  current.forEach((value, index) => {
    if (!acc[index]) acc[index] = [];
    acc[index].push(value);
  });
  return acc;
}, []);

const mostCommonBit = groupByPosition.reduce((acc, current, index) => {
  const bitSum = current.reduce((sum, bit) => sum + bit, 0);
  const isMostlyOne = bitSum / current.length >= 0.5;
  const result = isMostlyOne
    ? { mostCommon: 1, leastCommon: 0 }
    : { mostCommon: 0, leastCommon: 1 };
  acc[index] = result;
  return acc;
}, []);

const binaryToDecimal = (binary) => parseInt(binary, 2);

const part1 = () => {
  const gammaBinary = mostCommonBit.reduce(
    (acc, bit) => `${acc}${bit.mostCommon}`,
    ""
  );

  const gammaDecimal = binaryToDecimal(gammaBinary);

  const epsilonBinary = mostCommonBit.reduce(
    (acc, bit) => `${acc}${bit.leastCommon}`,
    ""
  );

  const epsilonDecimal = binaryToDecimal(epsilonBinary);

  const powerConsumption = gammaDecimal * epsilonDecimal;

  return { gammaDecimal, epsilonDecimal, powerConsumption };
};
console.log(groupByPosition);
console.log(mostCommonBit);
console.log(part1());
