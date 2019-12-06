CONFIG = {
  min: 172930,
  max: 683082
};

function range(start, end) {
  var arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

// Part 1 solution
// function hasDoubleDigit(number) {
//   return !!number.toString().match(/([0-9])\1{1,}/g);
// }

// Part 2 solution
function hasDoubleDigit(number) {
  const regexMatchArr = number.toString().match(/([0-9])\1{1,}/g);
  if (!regexMatchArr) return false;

  let matchesCriteria = false;
  for (let i = 0; i < regexMatchArr.length; i++) {
    if (regexMatchArr[i].length == 2) {
      matchesCriteria = true;
    }
  }
  return matchesCriteria;
}

function doesNotDecrease(number) {
  const numArr = number
    .toString()
    .split("")
    .map(Number);

  return numArr.every((el, index, array) => {
    if (index === 0) return true;
    return el >= array[index - 1];
  });
}

function run(passwords) {
  console.time("Calculation Time");
  let matchingResults = [];
  let matchingResultCount = 0;

  for (i = 0; i < passwords.length; i++) {
    const password = passwords[i];
    if (hasDoubleDigit(password) && doesNotDecrease(password)) {
      matchingResults.push(password);
      matchingResultCount++;
    }
  }
  console.table(matchingResults);
  console.log("Final Answer:", matchingResultCount);
  console.timeEnd("Calculation Time");
}

const digitArr = range(CONFIG.min, CONFIG.max);
run(digitArr);

// Tests
// console.log(hasDoubleDigit(12345));
// console.log(hasDoubleDigit(111211345));
// console.log(doesNotDecrease(12323));
// console.log(doesNotDecrease(12356));
// console.log(doesNotDecrease(123561));
