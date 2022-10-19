import { useState} from 'react';
import { GameInterface } from '../models/interfaces';
import EditGame from './EditGame'
import MyGames from './MyGames';




type Props = {
    toggleShowAll: () => void,
    editGame: () => void
    games:GameInterface,
    key:number
    getAllGames:any

}


const AllGames = (props: Props) => {
  const [ gameToEdit, setGameToEdit ] = useState<string>('');
  const [ showEditGame, setShowEditGame ] = useState<boolean>(false);

  function toggleEditGame() {
    setShowEditGame(!showEditGame);
    setGameToEdit(props.games._id)
}


  let haxxor = false;
  haxxor = gameToEdit ? true : false;
  const editOneGame = haxxor && props.games._id === gameToEdit ? (
    <EditGame 
    toggleEditGame={toggleEditGame}
    editGame={props.editGame}
    games={props.games}
    getAllGames={props.getAllGames}
    setGameToEdit={setGameToEdit} />)
    : ( ' ' );



  return (
      <div>
        {showEditGame ? editOneGame : ''}
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
          <p onClick={toggleEditGame} className='edit'>Redigera</p>
        </ul>

      </div>


  )
}

export default AllGames