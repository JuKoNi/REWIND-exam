import React from 'react';
import { GameInterface } from '../models/interfaces'


type Props = {
    toggleShowAll: () => void,
    games:GameInterface,
    key:number
    
}


const AllGames = (props: Props) => {
  //const [[winner], [loser], [highScore], [lowScore]] = findWinner();
  let winner:string = '';
  let loser:string = '';
  let highScore:number = 0;
  let lowScore:number = 10000;
    
  findWinner();
  // function findWinner() {
  //   if (props.info.numberOfPlayers === "2") {
  //     if(parseInt(props.info.playerOne.result) > parseInt(props.info.playerTwo.result)) {
  //       winner = props.info.playerOne.name;
  //     } else if (parseInt(props.info.playerOne.result) < parseInt(props.info.playerTwo.result)) {
  //       winner = props.info.playerTwo.name;
  //     } else {
  //       winner = props.info.playerOne.name+ ' ' +'&'+ ' ' + props.info.playerTwo.name;
  //     }
  //   }    
  //   if (props.info.numberOfPlayers === "3") {
  //     if(parseInt(props.info.playerOne.result) > parseInt(props.info.playerTwo.result &&
  //       parseInt(props.info.playerOne.result) > parseInt(props.info.playerThree.result)) {
  //       winner = props.info.playerOne.name
  //     }
  //       else if (parseInt(props.info.playerTwo.result) > parseInt(props.info.playerOne.result &&
  //         parseInt(props.info.playerTwo.result) > parseInt(props.info.playerThree.result)) {
  //         winner = props.info.playerTwo.name
  //         }
  //       }
  //     }

  //   }
  //   return winner;

 
  
  // }

  function findWinner():void {
    console.log(props.games);
    

    for (const [name, value] of Object.entries(props.games)) {
      console.log(value)
      if (name.includes('player') && value.result != '') {
        console.log(value)
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
    <section>
      <header>
        <h4>Datum</h4>
        <h4>Typ av match</h4>
        <h4>Vinnare</h4>
        <h4>Förlorare</h4>
        <h4>Resultat</h4>
      </header>
      <ul>
        <p>{props.games.date}</p>
        <p>{props.games.typeOfGame}</p>
        <p>{winner}</p>
        <p>{loser}</p>
        <p>{highScore} - {lowScore}</p>
      </ul>
    </section>
  )
}

export default AllGames