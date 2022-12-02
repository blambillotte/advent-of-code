const fs = require("fs");

const readFile = (filename) => {
  return fs.readFileSync(process.cwd() + "/inputs/" + filename).toString();
};

const input = readFile("day_2.txt")
  .split("\n")
  .map((line) => line.split(" "));

const SELECTION_SCORES = {
  X: 1,
  Y: 2,
  Z: 3,
};

WIN_SCORE = 6;
DRAW_SCORE = 3;

const WINNING_COMBINATIONS = {
  A: "Y",
  B: "Z",
  C: "X",
};

const DRAW_COMBINATIONS = {
  A: "X",
  B: "Y",
  C: "Z",
};

const part1 = input.reduce((scoreAcc, play) => {
  const [theirPlay, myPlay] = play;

  const selectionScore = SELECTION_SCORES[myPlay];

  const isWin = WINNING_COMBINATIONS[theirPlay] === myPlay;
  const isDraw = DRAW_COMBINATIONS[theirPlay] === myPlay;

  if (isWin) {
    return scoreAcc + WIN_SCORE + selectionScore;
  } else if (isDraw) {
    return scoreAcc + DRAW_SCORE + selectionScore;
  } else {
    return scoreAcc + selectionScore;
  }
}, 0);

console.log(part1);

// ------ Part 2 --------

const LOSING_COMBINATIONS = {
  A: "Z",
  B: "X",
  C: "Y",
};

const part2 = input.reduce((scoreAcc, play) => {
  const [theirPlay, neededOutcome] = play;

  let playScore = 0;
  let winLoseOrDrawScore = 0;

  switch (neededOutcome) {
    case "X":
      // lose
      const losingPlay = LOSING_COMBINATIONS[theirPlay];
      playScore = SELECTION_SCORES[losingPlay];

      break;

    case "Y":
      // draw
      const drawPlay = DRAW_COMBINATIONS[theirPlay];
      playScore = SELECTION_SCORES[drawPlay];
      winLoseOrDrawScore = DRAW_SCORE;
      break;

    case "Z":
      // Win
      const winningPlay = WINNING_COMBINATIONS[theirPlay];
      playScore = SELECTION_SCORES[winningPlay];
      winLoseOrDrawScore = WIN_SCORE;
      break;
  }

  return scoreAcc + playScore + winLoseOrDrawScore;
}, 0);

console.log(part2);
