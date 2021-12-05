const fs = require("fs");
require("util").inspect.defaultOptions.depth = null; // log deeply nested 2d board array

const readFile = (filename) => {
  return fs.readFileSync(process.cwd() + "/inputs/" + filename).toString();
};

const [numberListString, ...boardsStringArr] =
  readFile("day_4.txt").split("\n\n");

const numberList = numberListString
  .split(",")
  .map((numString) => parseInt(numString));

// turn board row '22 13 17 11  0' into list of objects [{num: 22, drawn: false}, {num: 13, drawn: false}, {num: 17, drawn: false}, {num: 11, drawn: false}, {num: 0, drawn: false}]
const formatBoardRow = (boardRow) => {
  const normalizedSpaces = boardRow.replaceAll("  ", " ").trim();
  const rowArr = normalizedSpaces.split(" ");
  return rowArr.map((num) => {
    const parsedNum = parseInt(num);
    return { num: parsedNum, drawn: false };
  });
};

const boards = boardsStringArr.map((boardString) => {
  const boardRows = boardString.split("\n");
  return boardRows.map((row) => formatBoardRow(row));
});

const updateBoard = ({ board, number }) => {
  board.forEach((boardRow) => {
    boardRow.forEach((boardCell) => {
      if (boardCell.num === number) {
        boardCell.drawn = true;
      }
    });
  });
  return board;
};

let bingoBoard = false;

const checkColumnBingo = (columns) => {
  let anyColumnBingo = false;

  for (let column of columns) {
    // columns are an array of true or false "drawn" values
    const columnBingo = column.every((colValue) => colValue);
    if (columnBingo) {
      anyColumnBingo = true;
      break;
    }
  }

  return anyColumnBingo;
};

const checkForBingo = (board) => {
  const columns = [[], [], [], [], []];

  for (let row of board) {
    const rowDrawnArr = row.map((row) => row.drawn);
    const rowBingo = rowDrawnArr.every((drawn) => drawn);
    if (rowBingo) {
      bingoBoard = board;
      break;
    }

    row.forEach((rowCol, i) => {
      columns[i].push(rowCol.drawn);
    });
  }

  if (bingoBoard) return;

  const columnBingo = checkColumnBingo(columns);

  if (columnBingo) {
    bingoBoard = board;
  }
};

const updateBoards = (number) => {
  boards.every((board) => {
    const updatedBoard = updateBoard({ board, number });
    checkForBingo(updatedBoard);

    if (bingoBoard) return false;
    return true;
  });
};

const calculateResult = (winningNumber) => {
  const unmarkedSum = bingoBoard.reduce((acc, boardRow) => {
    const rowSum = boardRow.reduce((acc, rowCell) => {
      if (!rowCell.drawn) acc += rowCell.num;
      return acc;
    }, 0);
    acc += rowSum;
    return acc;
  }, 0);

  return unmarkedSum * winningNumber;
};

for (let number of numberList) {
  console.log(`Calling number: ${number}`);
  updateBoards(number);

  if (bingoBoard) {
    const result = calculateResult(number);
    console.log(`Bingo! for Number ${number}, Result: ${result}`);
    break;
  }
}
