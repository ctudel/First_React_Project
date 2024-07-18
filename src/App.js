import { useState } from 'react';

// Define square component
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
        {value}
    </button>
  );
}

// Use 'export' to make function accessible outside of this file
export default function Board() {
  // Create a state for current player (X or O)
  const [xIsNext, setXIsNext] = useState(true);
  // Create an array with 9 elements and set them to null
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Function to handle clicks on squares
  function handleClick(i) {

    // Return early if a value exists
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // Create a copy of array
    const nextSquares = squares.slice();

    // Change value in array and truth value accordingly
    if (xIsNext) {
      nextSquares[i] = 'X'

    } else {
      nextSquares[i] = 'O';
    }

    // Update the state with the new array
    setSquares(nextSquares);

    // Set truth value to the inverse of current value
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;

  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // Create Components and pass the value in array above
  //   to each component accordingly
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );

  function calculateWinner(squares) {

    // Define winning combinations
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
      // Validate squares at indicies `a`, `b`, and `c` are all equal and not null
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    // null if there is no winner
    return null;
  }
}
