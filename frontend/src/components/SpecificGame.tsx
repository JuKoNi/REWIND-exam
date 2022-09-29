import { useState } from 'react'
import { GameInterface } from '../models/interfaces'

type Props = {
    toggleFilterGame: () => void
    key: number
    games: GameInterface
}

const SpecificGame = (props: Props) => {
    const [ editGame, setEditGame ] = useState<boolean>(false)

  return (
    <ul className='games-list'>
    <p>{props.games.date}</p>
    <p>{props.games.typeOfGame}</p>
    <p>{props.games.winner}</p>
    <p>{props.games.loser}</p>
    <p>{props.games.highScore} - {props.games.lowScore}</p>
    <p className='edit'>Redigera</p>
</ul>
  )
}

export default SpecificGame