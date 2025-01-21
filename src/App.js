import "./App.css";
import { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isNextX, setIsNextX] = useState(true);

  const handeClick = (index) => {
    // Если уже кто-то выиграл или клетка занята
    if (calculateWinner(board) || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isNextX ? "X" : "0";

    setBoard(newBoard);
    setIsNextX(!isNextX);
  };

  const renderCell = (index) => {
    return (
      <div className="cell" onClick={() => handeClick(index)}>
        {board[index]}
      </div>
    );
  };

  const winner = calculateWinner(board);
  // проверка на ничью, заполнены ли клетки
  const isDraw = !winner && board.every((cell) => cell !== null);
  // проверка на есть ли победитель или дальше игра идет
  const status = winner
    ? `Победитель: ${winner}`
    : isDraw
    ? "Ничья!"
    : `Следующий ход: ${isNextX ? "X" : "O"}`;


  const getStatusClass = () => {
    if (winner === "X") return "winner-x"; // синий для X
    if (winner === "0") return "winner-o"; // зеленая для 0
    if (isDraw) return "draw"; // красный для ничьей
    return "";
  };

  return (
    <div className="app">
      <div className="board">
        {Array.from({ length: 9 }).map((_, index) => renderCell(index))}
      </div>
      <div className={`status ${getStatusClass()}`}>{status}</div>
    </div>
  );
}

function calculateWinner(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

export default App;
