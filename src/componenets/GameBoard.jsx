// eslint-disable-next-line react/prop-types
export default function GameBoard( {onSelect , board } ) {
    return (
        <ol id="game-board" >
            {/* eslint-disable-next-line react/prop-types */}
            {board.map(( row , rowIndex ) => <li key={rowIndex} >
                <ol>
                {row.map( ( col , colIndex ) => 
                        <li key={colIndex} ><button onClick={ () => onSelect(rowIndex , colIndex)} disabled={col !== null}  >{col}</button></li>
                    )}
                </ol>
            </li> )}
        </ol>
    )
}