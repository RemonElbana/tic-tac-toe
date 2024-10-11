/* eslint-disable react/prop-types */
import {useState} from 'react'

export default function Player( {name , symbol , isActive , onNew } ) {

    const [ isEditing , setIsEditing ] = useState(false)
    const [ playerName , setPlayerName ] = useState(name)

    
    let content 
    
    if (isEditing) {
        function handleChange(event) {
            setPlayerName(event.target.value) 
            onNew(symbol , event.target.value) //  event.target.value  ===> this gives us the name as we type 
            console.log(event.target.value)
        }
        content = 
            <>
                <span className="player" >
                        <input type="text" value={playerName} onChange={handleChange} />
                        <span className="player-symbol" >{symbol}</span>
                    </span>
                <button onClick={() => setIsEditing(false) }  >Save</button>
            </>
    } else {
        content = 
        <>
            <span className="player" >
                <span className="player-name" >{playerName}</span>
                <span className="player-symbol" >{symbol}</span>
            </span>
            <button onClick={() => setIsEditing(true)} >Edit</button>
        </>
    }

    return(
        <li className={isActive ? 'active' : undefined} >
            {content}
        </li>
    )
}