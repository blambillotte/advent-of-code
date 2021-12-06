const fs = require("fs");

const readFile = (filename) => {
  return fs.readFileSync(process.cwd() + "/inputs/" + filename).toString();
};

const input = readFile("day_6.txt")
  .split(",")
  .map((stringNum) => parseInt(stringNum));

const DAYS_TO_RUN = 256;

const processDayPart1 = ({ currentDay, previousDayArr }) => {
  const newDayFish = [];
  const newDayBabies = [];

  previousDayArr.forEach((day) => {
    if (day === 0) {
      newDayBabies.push(8);
      newDayFish.push(6);
    } else {
      newDayFish.push(day - 1);
    }
  });

  const newDayArr = [...newDayFish, ...newDayBabies];
  console.log({ currentDay, newDayArr, length: newDayArr.length });

  if (currentDay === DAYS_TO_RUN) {
    return newDayArr;
  }

  processDayPart1({ currentDay: currentDay + 1, previousDayArr: newDayArr });
};

// processDayPart1({ currentDay: 1, previousDayArr: input });

// ***********************************
// Part 2

const ageMap = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
};

// initialize ageMap with input values
input.forEach((fishAge) => ageMap[fishAge]++);

for (let currentDay = 0; currentDay < DAYS_TO_RUN; currentDay++) {
  const ageMapClone = { ...ageMap };
  ageMap[7] = ageMapClone[8];
  ageMap[6] = ageMapClone[7] + ageMapClone[0];
  ageMap[5] = ageMapClone[6];
  ageMap[4] = ageMapClone[5];
  ageMap[3] = ageMapClone[4];
  ageMap[2] = ageMapClone[3];
  ageMap[1] = ageMapClone[2];
  ageMap[8] = ageMapClone[0];
  ageMap[0] = ageMapClone[1];
}

console.log(ageMap);

const part2Result = Object.entries(ageMap).reduce((acc, [_k, numFish]) => {
  console.log(acc, numFish);
  return acc + numFish;
}, 0);

console.log(part2Result);
