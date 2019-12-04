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

function hasDoubleDigit(number) {
  return !!number.toString().match(/([0-9])\1{1,}/);
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
  let matchingResults = [];
  let matchingResultCount = 0;

  for (i = 0; i < passwords.length; i++) {
    const password = passwords[i];
    if (hasDoubleDigit(password) && doesNotDecrease(password)) {
      matchingResults.push(password);
      matchingResultCount++;
    }
  }
  console.log(matchingResults);
  console.log(matchingResultCount);
}

const digitArr = range(CONFIG.min, CONFIG.max);
run(digitArr);

// console.log([CONFIG.min, ...CONFIG.max]);

console.log(hasDoubleDigit(12345));
console.log(hasDoubleDigit(112345));
console.log(doesNotDecrease(12323));
console.log(doesNotDecrease(12356));
console.log(doesNotDecrease(123561));
