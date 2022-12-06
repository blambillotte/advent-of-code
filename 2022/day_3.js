const fs = require("fs");

const readFile = (filename) => {
  return fs.readFileSync(process.cwd() + "/inputs/" + filename).toString();
};

const input = readFile("day_3.txt").split("\n");

const data = input.map((ruckSack) => {
  const charArr = ruckSack.split("");

  const half = Math.ceil(charArr.length / 2);
  const left = charArr.slice(0, half);
  const right = charArr.slice(half);

  if (left.length !== right.length) {
    throw new Error("Invalid Rucksack");
  }

  const intersectionChar = left.find((leftChar) =>
    right.find((rightChar) => rightChar === leftChar)
  );

  return {
    intersectionChar,
    priority: charToPriority(intersectionChar),
    charArr,
  };
});

/**
  Convert alpha characters to the following number "priorities"
  * Lowercase item types a through z have priorities 1 through 26.
  * Uppercase item types A through Z have priorities 27 through 52. 
*/
function charToPriority(char) {
  const charCode = char.charCodeAt(0);
  const isCapitalLetter = charCode <= 90;

  return isCapitalLetter ? charCode - 38 : charCode - 96;
}

const part1 = data.reduce((acc, ruckSack) => acc + ruckSack.priority, 0);
console.log("part 1:", part1);

const chunk = (array, size) =>
  array.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(array.slice(i, i + size));
    return acc;
  }, []);

const threeElfGroupings = chunk(data, 3);

const part2 = threeElfGroupings.reduce((acc, threeElfGrouping) => {
  const [elf1, elf2, elf3] = threeElfGrouping;

  const twoWayIntersection = elf1.charArr.filter((elf1Char) =>
    elf2.charArr.includes(elf1Char)
  );
  const threeWayIntersection = elf3.charArr.find((elf3Char) =>
    twoWayIntersection.find((intersectionChar) => intersectionChar === elf3Char)
  );

  const priority = charToPriority(threeWayIntersection);

  return acc + priority;
}, 0);

console.log("part2:", part2);
