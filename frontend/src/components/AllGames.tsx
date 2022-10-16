import { useState} from 'react';
import { GameInterface } from '../models/interfaces';
import EditGame from './EditGame'
import MyGames from './MyGames';




type Props = {
    toggleShowAll: () => void,
    toggleEditGame: () => void
    games:GameInterface,
    key:number
    getAllGames:any

}


const AllGames = (props: Props) => {
  const [ gameToEdit, setGameToEdit ] = useState<string>('');


  let haxxor = false;
  haxxor = gameToEdit ? true : false;
  const editOneGame = haxxor && props.games._id === gameToEdit ? (
    <EditGame 
    toggleEditGame={props.toggleEditGame}
    games={props.games}
    getAllGames={props.getAllGames}
    setGameToEdit={setGameToEdit} />)
    : ( ' ' );



  return (
      <div>
        {editOneGame}
        <header className='game-header'>
          <h4>Datum</h4>
          <h4>Typ av match</h4>
          <h4>Vinnare</h4>
          <h4>Förlorare</h4>
          <h4>Resultat</h4>
        </header>
        <ul className='games-list'>
          <p>{props.games.date}</p>
          <p>{props.games.typeOfGame}</p>
          <p>{props.games.winner}</p>
          <p>{props.games.loser}</p>
          <p>{props.games.highScore} - {props.games.lowScore}</p>
          <p onClick={() =>setGameToEdit(props.games._id)} className='edit'>Redigera</p>
        </ul>

      </div>


  )
}

export default AllGames