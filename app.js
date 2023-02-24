const gameBoard = (function () {
  let board = ["X", "X", "X", "O", "O", "O", "", "", ""];

  function setBoard(index, sign) {
    board[index] = sign;
  }

  function getBoard(index) {
    return board[index];
  }

  return { board, setBoard, getBoard };
})();

const makePlayer = function (name, sign) {
  const playerName = name;
  const playerSign = sign;

  function getSign() {
    return playerSign;
  }
  return { playerName, getSign };
};

const gameController = (function () {
  const playerX = makePlayer("playerX", "X");
  const playerO = makePlayer("playerO", "O");
  let round = 1;

  function makeMove(index) {
    if (gameBoard.board[index] !== "" || !checkWinner()) return;
    if (round % 2 === 1) {
      gameBoard.setBoard(index, playerX.getSign());
      round++;
    } else if (round % 2 === 0) {
      gameBoard.setBoard(index, playerO.getSign());
      round++;
    }


  }

  function checkWinner() {
    let winnerCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const condition of winnerCombos){
        let [a,b,c] = condition;
        if (gameBoard.getBoard(a)===gameBoard.getBoard(b)&&gameBoard.getBoard(a)===gameBoard.getBoard(c)){
            return [a,b,c]
        }
    };

    return false
    
  }

  return { makeMove, checkWinner };
})();
