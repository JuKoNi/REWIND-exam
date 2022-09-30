import { useState } from 'react'
import { GameInterface } from '../models/interfaces'
import EditGame from './EditGame'

type Props = {
    toggleShowTen: ()=> void,
    games: GameInterface,
    key: number
    user: any
    toggleEditGame: () => void
    getAllGames:any
}

const MyGames = (props: Props) => {
    const [ gameToEdit, setGameToEdit ] = useState<string>('');


    let haxxor = false;
    haxxor = gameToEdit ? true : false;
    const editOneGame = haxxor && props.games._id === gameToEdit ? (
      <EditGame 
      toggleEditGame={props.toggleEditGame}
      games={props.games}
      getAllGames={props.getAllGames}
      setGameToEdit={setGameToEdit} />)
      : ( '' );

  return (
    <div>
      {editOneGame}
      <ul className='games-list'>
        <p>{props.games.date}</p>
        <p>{props.games.typeOfGame}</p>
        <p>{props.games.winner}</p>
        <p>{props.games.loser}</p>
        <p>{props.games.highScore} - {props.games.lowScore}</p>
        <p className='edit' onClick={() =>setGameToEdit(props.games._id)}>Redigera</p>
      </ul>
    </div>
  )
}

export default MyGames