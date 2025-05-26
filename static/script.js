// Tic-Tac-Toe front-end logic with dynamic board size, Two Player and Single Player modes
document.addEventListener('DOMContentLoaded', () => {
  const boardEl = document.getElementById('board');
  const resetBtn = document.getElementById('reset');
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  const sizeInput = document.getElementById('size-input');
  const themeSelect = document.getElementById('theme-select');

  let board = [];
  let currentSymbol = 'X';
  let gameOver = false;

  function init() {
    const size = Math.max(3, Math.min(10, parseInt(sizeInput.value, 10) || 3));
    board = Array.from({ length: size }, () => Array(size).fill(null));
    currentSymbol = 'X';
    gameOver = false;
    renderBoard();
  }

  function getMode() {
    const sel = Array.from(modeRadios).find(r => r.checked);
    return sel ? sel.value : '2p';
  }

  function renderBoard() {
    const size = board.length;
    boardEl.innerHTML = '';
    boardEl.style.display = 'grid';
    boardEl.style.gridTemplateColumns = `repeat(${size}, 100px)`;
    boardEl.style.gridTemplateRows = `repeat(${size}, 100px)`;

    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        const cellEl = document.createElement('div');
        cellEl.className = 'cell' + ((cell !== null || gameOver) ? ' disabled' : '');
        cellEl.dataset.row = r;
        cellEl.dataset.col = c;
        cellEl.textContent = cell || '';
        if (cell === null && !gameOver) {
          cellEl.addEventListener('click', onCellClick);
        }
        boardEl.appendChild(cellEl);
      });
    });
  }

  function onCellClick(e) {
    const r = +e.target.dataset.row;
    const c = +e.target.dataset.col;
    if (gameOver || board[r][c] !== null) return;

    const mode = getMode();
    // Two-player
    if (mode === '2p') {
      board[r][c] = currentSymbol;
      renderBoard();
      let winner = checkWinner();
      if (winner) return endGame(winner);
      currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
      return;
    }

    // Single-player: human X
    board[r][c] = 'X';
    renderBoard();
    let winner = checkWinner();
    if (winner) return endGame(winner);

    // AI move O
    const [aiR, aiC] = aiBestMove();
    board[aiR][aiC] = 'O';
    renderBoard();
    winner = checkWinner();
    if (winner) endGame(winner);
  }

  function aiBestMove() {
    const empties = [];
    board.forEach((row, i) =>
      row.forEach((v, j) => v === null && empties.push([i, j]))
    );

    // 1. Win if possible
    for (const [i, j] of empties) {
      board[i][j] = 'O';
      if (checkWinner() === 'O') { board[i][j] = null; return [i, j]; }
      board[i][j] = null;
    }
    // 2. Block player win
    for (const [i, j] of empties) {
      board[i][j] = 'X';
      if (checkWinner() === 'X') { board[i][j] = null; return [i, j]; }
      board[i][j] = null;
    }
    // 3. Center
    const size = board.length;
    if (size % 2 === 1) {
      const m = Math.floor(size / 2);
      if (board[m][m] === null) return [m, m];
    }
    // 4. Corners
    const corners = [[0,0],[0,size-1],[size-1,0],[size-1,size-1]];
    for (const [i, j] of corners) {
      if (board[i][j] === null) return [i, j];
    }
    // 5. Random
    return empties[Math.floor(Math.random() * empties.length)];
  }

  function checkWinner() {
    const size = board.length;
    const lines = [];

    // rows & columns
    for (let i = 0; i < size; i++) {
      lines.push([...board[i]]);
      lines.push(board.map(r => r[i]));
    }
    // diagonals
    lines.push(board.map((r, i) => r[i]));
    lines.push(board.map((r, i) => r[size - 1 - i]));

    for (const line of lines) {
      if (line[0] && line.every(x => x === line[0])) return line[0];
    }
    // draw
    if (board.flat().every(x => x !== null)) return 'Draw';
    return null;
  }

  function endGame(result) {
    gameOver = true;
    renderBoard();
    alert(result === 'Draw' ? 'Draw!' : `${result} wins!`);
  }

  // UI listeners
  resetBtn.addEventListener('click', init);
  sizeInput.addEventListener('change', init);
  modeRadios.forEach(r => r.addEventListener('change', init));
  themeSelect.addEventListener('change', renderBoard);

  init();
});
