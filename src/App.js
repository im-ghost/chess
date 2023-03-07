import {useEffect,useState} from 'react';
import './App.css';
import { ChessBoard } from "react-chessboard";
import { Chess } from "chessjs"
import eruda from "eruda"
function App() {
  const [game,setGame] = useState(new Chess())
  const saveGameMutate = (modify) =>{
    return setGame((g)=>{
      const update = {...g}
      modify(update)
      return update
    })
  }
  const computerMovement = () =>{
    const possibleMove = game.move();
    if(game.is_over() || game.in_draw() || possibleMove.length < 0) return;
    const randIndex = Math.floor(Math.random()*possibleMove.length)
    saveGameMutate((game)=>{
      game.move(possibleMove[randIndex])
    })
  }
  const onDrop = (source, target) =>{
    let move = null
    move= game.move({
      from:source,
      to:target,
      promotion:"q"
    })
    if(move === null) return false
    setTimeout(function() {
      computerMovement()
    }, 200);
    return true;
  }
  useEffect(()=>{
    alert("hie");
    eruda.init()
  },[])
  return (
    <div className="App">
     <ChessBoard
       postion={game.fen()}
       onDrop={onDrop}
      />
    </div>
  );
}

export default App;
