import { useState } from 'react'
import { GameInterface } from '../models/interfaces'

type Props = {
    toggleFilterGame: () => void
    key: number
    games: GameInterface
}

const SpecificGame = (props: Props) => {

  return (
    <div>
      <header className='game-header game'>
        <h4>Datum</h4>
        <h4>Typ av match</h4>
        <h4>Vinnare</h4>
        <h4>Förlorare</h4>
        <h4>Resultat</h4>
      </header>
      <ul className='games-list game'>
        <p>{props.games.date}</p>
        <p>{props.games.typeOfGame}</p>
        <p>{props.games.winner}</p>
        <p>{props.games.loser}</p>
        <p>{props.games.highScore} - {props.games.lowScore}</p>
      </ul>
    </div>
  )
}

export default SpecificGame