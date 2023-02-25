const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  function setBoard(index, sign) {
    board[index] = sign;
  }

  function getBoard(index) {
    return board[index];
  }

  return { board, setBoard, getBoard };
})();

const makePlayer = function (name, sign) {
  const playerName= name;
  const playerSign = sign;

  
  return { name, sign };
};

const gameController = (function () {
  const playerX = makePlayer("playerX", "X");
  const playerO = makePlayer("playerO", "O");
  let round = 1;
  

  // function getSign(){
  //   if(round%2===1) return 'x';
  //   else if (round%2===0) return 'o';
  // }

  function makeMove(index) {
    round++;
    if (gameBoard.board[index] !== "" || checkWinner()) {
      return;
    }
    else if (whoseTurn()=='x') {
      gameBoard.board[index] = 'x';
      
    } else if (whoseTurn()=='o') {
      gameBoard.board[index] = 'o';
      
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
        if (gameBoard.getBoard(a)!=="" && 
            gameBoard.getBoard(a)===gameBoard.getBoard(b)&&
            gameBoard.getBoard(a)===gameBoard.getBoard(c)){
            return gameBoard.getBoard(a)
        }
    };

    return false
    
  }

  function whoseTurn(){
    if (round%2 === 1) return 'x';
    else if (round%2 ===0) return 'o';

    

    
  }

  function restartGame(){
    window.location.reload()
  }



  return { makeMove, checkWinner, whoseTurn, restartGame, round };
})();


// const cells  = document.querySelectorAll('.cell');

// cells.forEach((cell)=>{
//   cell.addEventListener('click', ()=>{
//     if (gameController.whoseTurn() === 'x'){
//       cell.classList.add('x')
//     }
//     else if (gameController.whoseTurn() === 'circle'){
//       cell.classList.add('circle')
//     }

    
//   })
// })

const displayController = (function(){
  const cells = document.querySelectorAll('.cell');
  const playerDisplay = document.querySelector('.player');
  function displaySign(){
    for(let i=0; i<gameBoard.board.length; i++){
      if(gameBoard.board[i]=== 'x'){
        cells[i].classList.add('x')
      }else if(gameBoard.board[i]=== 'o'){
        cells[i].classList.add('circle')
      }else if (gameBoard.board[i]=== ''){
        cells[i].classList.remove('circle');
        cells[i].classList.remove('x');
      }
  
    }
  }

  function updatePlayerDisplay(){
    let winner = gameController.checkWinner();
    let text = ""
    
    
    if (winner) {
      text =  `Player ${winner} Has Won!`    }
    else{
      text = gameController.whoseTurn()==='x'? 'Player O Turn' : 'Player X Turn';
    }
    playerDisplay.innerHTML = text

  };

  return {displaySign, updatePlayerDisplay}

  
})()


const cells = document.querySelectorAll('.cell');
    cells.forEach((cell)=>{
      cell.addEventListener('click', ()=>{
        const index = cell.id;
        gameController.makeMove(index);
        displayController.displaySign();
        displayController.updatePlayerDisplay();
      })
    })

const restartBtn = document.querySelector('.restart-btn');

restartBtn.addEventListener('click', ()=>{
  console.log('clicked')
  gameController.restartGame();
  displayController.updatePlayerDisplay();
  displayController.displaySign();
  
})