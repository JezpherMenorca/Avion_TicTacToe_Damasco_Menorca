const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  
let moveHistory = [];
let currentMoveIndex = -1;
let startingPlayer = '';

const cells = document.querySelectorAll('[data-cell]');
const messageContainer = document.querySelector('.message-container');
const message = document.querySelector('.message');
const resetBtn = document.querySelector('.reset-btn');
const previousBtn = document.querySelector('.previous-btn');
const nextBtn = document.querySelector('.next-btn');
const moveCounter = document.querySelector('.move-counter');
const xFirstBtn = document.querySelector('.x-first');
const oFirstBtn = document.querySelector('.o-first');
const chooseFirstMessage = document.querySelector('.choose-first-message');

messageContainer.style.opacity = 0;

const checkForWin = () => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return true;
      }
  
      if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return true;
      }
    }
  
    if (
      (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
      (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0])
    ) {
      return true;
    }
  
    return false;
  };
  
const checkForDraw = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          return false;
        }
      }
    }
    return true;
  };
  
const displayMessage = (msg) => {
    message.textContent = msg;
    messageContainer.style.opacity = 1;
  };
  
const hideMessage = () => {
    messageContainer.style.opacity = 0;
  };

const addMoveToHistory = (row, column) => {
  const move = {row, column};
  moveHistory.push(move);
};

const updateBoard = (moveIndex) => {
  if (moveIndex >= 0 && moveIndex < moveHistory.length) {
    cells.forEach((cell) => {
      cell.textContent = '';
    });

    for (let i = 0; i <= moveIndex; i++) {
      const move = moveHistory[i];
      const {row, column} = move;
      const currentPlayerSymbol = i % 2 === 0 ? startingPlayer : startingPlayer === 'X' ? 'O' : 'X';

      board[row][column] = currentPlayerSymbol;
      const cellIndex = row * 3 + column;
      cells[cellIndex].textContent = currentPlayerSymbol; 
    }

    currentMoveIndex = moveIndex;
    moveCounter.textContent = `Move ${currentMoveIndex + 1} / ${moveHistory.length}`;
  } else {
    console.error('Invalid');
  }
};

const nextMove = () => {
  currentMoveIndex++;
  if(currentMoveIndex >= moveHistory.length) {
    currentMoveIndex = moveHistory.length - 1;
  }
  updateBoard(currentMoveIndex);
};

const previousMove = () => {
  currentMoveIndex--;
  if(currentMoveIndex < 0) {
    currentMoveIndex = 0;
  }
  updateBoard(currentMoveIndex);
};
  

const hideMoveButtons = () => {
  previousBtn.style.opacity = 0;
  nextBtn.style.opacity = 0;
  moveCounter.style.opacity = 0;
  previousBtn.disabled = true;
  nextBtn.disabled = true;
};

const showMoveButtons = () => {
  previousBtn.style.opacity = 1;
  nextBtn.style.opacity = 1;
  moveCounter.style.opacity = 1;
  previousBtn.disabled = false;
  nextBtn.disabled = false;
};

const checkGameEnd = () => {
  if (checkForWin() || checkForDraw()) {
    showMoveButtons();
  } else {
    hideMoveButtons();
  }
};

//CHOOSE FIRST

const chooseX = () => {
  currentPlayer = 'X';
  startingPlayer = 'X';
  disableChoose();
}

const chooseO = () => {
  currentPlayer = 'O';
  startingPlayer = 'O';
  disableChoose();
}
 
const disableChoose = () => {
  xFirstBtn.style.opacity = 0;
  oFirstBtn.style.opacity = 0;
  chooseFirstMessage.style.opacity = 0;
  xFirstBtn.disabled = true;
  oFirstBtn.disabled = true;
}

const enableChoose = () => {
  xFirstBtn.style.opacity = 1;
  oFirstBtn.style.opacity = 1;
  chooseFirstMessage.style.opacity = 1;
  xFirstBtn.disabled = false;
  oFirstBtn.disabled = false;
  currentPlayer = '';
}

const handleReset = () => {
  cells.forEach(cell => cell.textContent = '');
  board.forEach(row => row.fill(''));
  enableChoose();
  hideMessage();
  moveHistory = [];
  currentMoveIndex = -1;
  hideMoveButtons();
};

const handleClick = (event) => {
  const cell = event.target;
  const rowIndex = parseInt(cell.getAttribute('data-row'));
  const colIndex = parseInt(cell.getAttribute('data-col'));
  
  if (cell.textContent === '' && !checkForWin() && !checkForDraw()) {
    cell.textContent = currentPlayer;
    board[rowIndex][colIndex] = currentPlayer;
    
    if (checkForWin()) {
      displayMessage(`Player ${currentPlayer} wins!`);
    } else if (checkForDraw()) {
      displayMessage("It's a draw!");
    } else if (currentPlayer === '') {
      currentPlayer === '';
      alert("Choose who goes first!")
    } else if (currentPlayer === 'X') {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    } else if (currentPlayer === 'O') {
      currentPlayer = currentPlayer === 'O' ? 'X': 'O';
    }
    //} else {
    //  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    //}
  }
  addMoveToHistory(rowIndex, colIndex);
  checkGameEnd();
};

cells.forEach((cell, index) => {
  const rowIndex = Math.floor(index / 3);
  const colIndex = index % 3;
    cell.setAttribute('data-row', rowIndex);
    cell.setAttribute('data-col', colIndex);
    cell.addEventListener('click', handleClick);
  });
  
  resetBtn.addEventListener('click', handleReset);
  previousBtn.addEventListener('click', previousMove);
  nextBtn.addEventListener('click', nextMove);
  xFirstBtn.addEventListener('click', chooseX);
  oFirstBtn.addEventListener('click', chooseO);
  hideMoveButtons();