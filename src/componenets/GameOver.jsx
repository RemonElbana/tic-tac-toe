export default function gameOver( {winner , onRestart } ) {
    let end = ''
    if (winner){
        end = <p> {winner} won! </p>
    } else {
        end = <p>  It&apos;s a Draw! </p>
    }
    return (
        <div id="game-over" >
            <h2>Game Over!</h2>
            {end}
            <p>
                <button onClick={onRestart} >Rematch!</button>
            </p>
        </div>
    )
}