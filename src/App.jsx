import { useState } from "react";
import { WINNING_COMBINATIONS } from "./WinCases.js";
import Player from "./componenets/Player";
import GameBoard from "./componenets/GameBoard";
import Log from "./componenets/Log";
import GameOver from "./componenets/GameOver.jsx";


const mainBoard = [
  [null , null , null ] ,
  [null , null , null ] ,
  [null , null , null ] 
]

function drivenActivePlayer(gameTurn) {
  let selectedPlayer = "X"
  
  if (gameTurn.length > 0 &&  gameTurn[0].player === 'X'  ) {
    selectedPlayer= "O"
  }
  
  return selectedPlayer
}


function App() {
  const [ gameTurn , setGameTurn ] = useState([])
  const [ playerName , setPlayerName ] = useState( { 'X' : 'Player-1' , 'O' : 'Player-2' } )
  const activePlayer = drivenActivePlayer(gameTurn)
  
  let gameBoard = [...mainBoard.map(array => [...array])]
  
  for ( const turn of gameTurn ) {
      const { square , player } = turn
      const { row , col } = square
    
      gameBoard[row][col] = player
  }

  let winner = null ;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    
    if ( firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = playerName[firstSquareSymbol]
    }
  }

  let isDraw ;

  if (gameTurn.length === 9 && !winner) {
    isDraw = true
  }

  function handleActivePlayer(rowIndex , colIndex) {  
    setGameTurn( prevTurn => {
      const selectedPlayer = drivenActivePlayer(prevTurn)

      let updatedTurn = [  { square:{row: rowIndex , col: colIndex } , player: selectedPlayer }  ,
        ...prevTurn
      ];
        console.log(gameTurn[0])
        return updatedTurn
    })
  }
  
  function handleRestart() {
    setGameTurn([])
  }

  function handlePlayerName(symbol , playerName) {
    setPlayerName( prevName => {
      return {
        ...prevName , 
        [symbol] : playerName
      }
    } )
  }

  return (
    <main>
      <div id='game-container' >
        <ol id="players" className="highlight-player" >
          <Player name={"Player-1"} symbol={"X"} isActive={activePlayer === 'X'} onNew={handlePlayerName} />
          <Player name={"Player-2"} symbol={"O"} isActive={activePlayer === 'O'} onNew={handlePlayerName} />
        </ol>
        {(winner || isDraw ) && <GameOver winner={winner} onRestart={handleRestart} /> }
        <GameBoard 
          onSelect={handleActivePlayer} 
          board = {gameBoard}
        />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App
