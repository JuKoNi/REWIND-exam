import { useState } from 'react'
import { GameInterface } from '../models/interfaces'

type Props = {
    toggleFilterName: () => void
    games: GameInterface
    key: number
}

const FriendGames = (props: Props) => {

  return (
    <div>
      <header className='game-header friend'>
        <h4>Datum</h4>
        <h4>Typ av match</h4>
        <h4>Vinnare</h4>
        <h4>Förlorare</h4>
        <h4>Resultat</h4>
      </header>


      <ul className='games-list friend'>
        <p>{props.games.date}</p>
        <p>{props.games.typeOfGame}</p>
        <p>{props.games.winner}</p>
        <p>{props.games.loser}</p>
        <p>{props.games.highScore} - {props.games.lowScore}</p>
      </ul>
    </div>

  )
}


export default FriendGames