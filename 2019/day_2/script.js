const importer = require("../importer");

const data = importer.importFile("./day_2/input.txt");
const dataArr = data.split(",").map(Number);

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function perform(func, opcodeIndex, instructionList, onSuccess) {
  const inputAIndex = instructionList[opcodeIndex + 1];
  const inputBIndex = instructionList[opcodeIndex + 2];
  const outputIndex = instructionList[opcodeIndex + 3];

  const output = func(
    instructionList[inputAIndex],
    instructionList[inputBIndex]
  );

  instructionList[outputIndex] = output;

  const nextOpcodeIndex = opcodeIndex + 4;

  opcode(nextOpcodeIndex, instructionList, onSuccess);
}

function opcode(opcodeIndex, instructionList, onSuccess) {
  const currentOpcode = instructionList[opcodeIndex];

  switch (currentOpcode) {
    case 1:
      return perform(add, opcodeIndex, instructionList, onSuccess);
    case 2:
      return perform(multiply, opcodeIndex, instructionList, onSuccess);
    case 99:
      return onSuccess(instructionList);
    default:
      throw "invalid opcode";
  }
}

function run(instructionList, onSuccess) {
  const initialIndex = 0;
  return opcode(initialIndex, instructionList, onSuccess);
}

console.log("Final Answer:");
const clonedArray = dataArr.slice(0);

run(clonedArray, data => {
  console.log(data);
});

// const testCase1 = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
// const testCase2 = [1, 0, 0, 0, 99];
// const testCase3 = [2, 3, 0, 3, 99];
// const testCase4 = [2, 4, 4, 5, 99, 0];
// const testCase5 = [1, 1, 1, 4, 99, 5, 6, 0, 99];

// console.log("Test Case 1:", testCase1);
// run(testCase1);

// console.log("Test Case 2:", testCase2);
// run(testCase2);

// console.log("Test Case 3:", testCase3);
// run(testCase3);

// console.log("Test Case 4:", testCase4);
// run(testCase4);

// console.log("Test Case 5:", testCase5);
// run(testCase5);

// Part 2
// function findNounAndVerb({ noun, verb, targetValue }) {
//   const clonedArray = dataArr.slice(0);

//   clonedArray[1] = noun;
//   clonedArray[2] = verb;
//   // console.log(clonedArray);

//   const attemptValue = run(dataArr, attempt => {
//     return attempt[0];
//   });

//   console.log(attemptValue);
//   console.log(attemptValue == targetValue);
//   console.log("++++++");

//   if (attemptValue != targetValue && dataArr[1] < 100) {
//     clonedArray[1]++;
//     console.log(clonedArray);
//     findNounAndVerb({
//       clonedArray,
//       noun: clonedArray[1],
//       verb: clonedArray[2],
//       targetValue
//     });
//   }
// }

// const clonedArray2 = dataArr.slice(0);
// findNounAndVerb({
//   dataArr: clonedArray2,
//   noun: 0,
//   verb: 0,
//   targetValue: 19690720
// });
