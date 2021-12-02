// Fuel required to launch a given module is based on its mass.
// Specifically, to find the fuel required for a module,
// take its mass, divide by three, round down, and subtract 2.
const inputs = require("./inputs");

const calculateFuel = mass => {
  return Math.floor(mass / 3) - 2;
};

// Test values
console.log("Test Values:");
console.log(calculateFuel(12) === 2);
console.log(calculateFuel(14) === 2);
console.log(calculateFuel(1969) === 654);
console.log(calculateFuel(100756) === 33583);
console.log("--------------");

const run = inputArr => {
  return inputArr.reduce((acc, input) => {
    const fuel = calculateFuel(input);
    const sum = acc + fuel;
    console.table([{ input, fuel, sum }]);
    return sum;
  }, 0);
};

const finalValue = run(inputs.values);
console.log("--------------");
console.log("Final Value:", finalValue);
