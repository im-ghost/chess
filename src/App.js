import React, { useState } from 'react';
import _ from 'lodash';
import eruda from 'eruda';
import { Chess }  from 'chess.js';
import { Chessboard } from 'react-chessboard';

const game = new Chess();
const App = () => {
React.useEffect(()=>{
  eruda.init();
},[])
  const [board, setBoard] = useState(game);
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handlePieceClick = (position) => {
    const piece = game.get(position);
    if (!piece) return;

    const validMoves = game.moves({ square: position });
    setSelectedSquare(position);

    const newBoard = _.cloneDeep(game.board());
    validMoves.forEach((move) => {
      const movePosition = move.slice(-2);
      newBoard[movePosition].highlight = 'yellow';
    });

    setBoard(newBoard);
  };

  const handleSquareClick = (position) => {
    if (selectedSquare) {
      const move = `${selectedSquare}-${position}`;
      const isValidMove = game.move(move);
      if (isValidMove) {
        setSelectedSquare(null);
        const newBoard = _.cloneDeep(game.board());
        setBoard(newBoard);
        if (game.game_over()) {
          endGame();
        } else {
          computerMove();
        }
      }
    }
  };

  const computerMove = () => {
    const moves = game.moves();
    const randomIndex = Math.floor(Math.random() * moves.length);
    const move = moves[randomIndex];
    game.move(move);
    const newBoard = _.cloneDeep(game.board());
    setBoard(newBoard);
    if (game.game_over()) {
      endGame();
    }
  };

  const endGame = () => {
    const result = game.in_checkmate() ? 'You won!' : 'It\'s a draw!';
    alert(result);
    game.reset();
    const newBoard = _.cloneDeep(game.board());
    setBoard(newBoard);
  };

  return (
    <Chessboard
      position={game.fen()}
      onPieceClick={handlePieceClick}
      onSquareClick={handleSquareClick}
    />
  );
};
export default App;
