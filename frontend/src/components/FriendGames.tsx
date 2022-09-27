import { useState } from 'react'
import { GameInterface } from '../models/interfaces'

type Props = {
    toggleFilterName: () => void
    games: GameInterface
    key: number
}

const FriendGames = (props: Props) => {
    const [ nameToFind, setNameToFind ] = useState<string>('')
    const [ editGame, setEditGame ] = useState<boolean>(false)

    let winner:string = '';
    let loser:string = '';
    let highScore:number = 0;
    let lowScore:number = 10000;
      
    findWinner();
  
    function findWinner():void {
  
      for (const [name, value] of Object.entries(props.games)) {
  
        if (name.includes('player') && value.result != '') {
  
          if (parseInt(value.result) > highScore) {
            highScore = parseInt(value.result);
            winner = value.name;
          } else if (parseInt(value.result) == highScore) {
            winner = winner ? winner +' ' +'&'+ ' ' + value.name : value.name;
          }
          if (parseInt(value.result) < lowScore) {
            lowScore = parseInt(value.result);
            loser = value.name;
          } else if (parseInt(value.result) == lowScore) {
            loser = loser ? loser +' ' +'&'+ ' ' + value.name : value.name;
          }
        }
      }
  
    }
  return (
    <ul className='games-list'>
    <p>{props.games.date}</p>
    <p>{props.games.typeOfGame}</p>
    <p>{winner}</p>
    <p>{loser}</p>
    <p>{highScore} - {lowScore}</p>
    <p className='edit'>Redigera</p>
</ul>
  )
}


export default FriendGames