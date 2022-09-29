import { useState} from 'react';
import { GameInterface } from '../models/interfaces';
import EditGame from './EditGame'



type Props = {
    toggleShowAll: () => void,
    games:GameInterface,
    key:number

}


const AllGames = (props: Props) => {
  const [ editGame, setEditGame ] = useState<boolean>(false);


  function toggleEditGame() {
    console.log(props.games.date);
    setEditGame(!editGame)
  }
  const editOneGame = editGame ? (
    <EditGame 
    toggleEditGame={toggleEditGame}
    games={props.games} />)
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
          <p onClick={toggleEditGame} className='edit'>Redigera</p>
        </ul>

      </div>


  )
}

export default AllGames