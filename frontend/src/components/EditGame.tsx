import { useState, ChangeEvent, useEffect } from 'react';
import { GameInterface } from '../models/interfaces';
import { API_URL } from '../models/constant';
import { useNavigate } from "react-router-dom";

type Props = {
    toggleEditGame: () => void
    editGame: () => void,
    games:GameInterface,
    getAllGames:any
    setGameToEdit:any
}

const EditGame = (props: Props) => {

    const [ numberOfPlayers, setNumberOfPlayers ] = useState<string>('1');
    const [ typeOfGame, setTypeOfGame ] = useState<string>('');
    const [ date, setDate ] = useState<string>('');
    const [ playerOne, setPlayerOne ] = useState<string>('');
    const [ playerTwo, setPlayerTwo ] = useState<string>('');
    const [ playerThree, setPlayerThree ] = useState<string>('');
    const [ playerFour, setPlayerFour ] = useState<string>('');
    const [ resultPlayerOne, setResultPlayerOne ] = useState<string>('');
    const [ resultPlayerTwo, setResultPlayerTwo ] = useState<string>('');
    const [ resultPlayerThree, setResultPlayerThree ] = useState<string>('');
    const [ resultPlayerFour, setResultPlayerFour ] = useState<string>('');


    useEffect(() => {
        setNumberOfPlayers(props.games.numberOfPlayers);
        setTypeOfGame(props.games.typeOfGame);
        setDate(props.games.date);
        setPlayerOne(props.games.playerOne.name);
        setResultPlayerOne(props.games.playerOne.result);
        setPlayerTwo(props.games.playerTwo.name);
        setResultPlayerTwo(props.games.playerTwo.result);
        setPlayerThree(props.games.playerThree.name);
        setResultPlayerThree(props.games.playerThree.result);
        setPlayerFour(props.games.playerFour.name);
        setResultPlayerFour(props.games.playerFour.result);
    }, []);
    let navigate = useNavigate()    

    const handleNumber = () => {
        setNumberOfPlayers(props.games.numberOfPlayers);
        console.log(numberOfPlayers)
    };

    function titleCase(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function resetPlayer1() {
        setPlayerOne('');
        setResultPlayerOne('');
    }

    function resetPlayer2() {
        setPlayerTwo('');
        setResultPlayerTwo('');
    };
    function resetPlayer3() {
        setPlayerThree('');
        setResultPlayerThree('');
    };
    function resetPlayer4() {
        setPlayerFour('');
        setResultPlayerFour('');
    };




    async function editGame(event:React.FormEvent<HTMLInputElement>) { 

        event.preventDefault();
        console.log(numberOfPlayers);
         
        
        const games:object = {
            typeOfGame: titleCase(typeOfGame),
            date: date,
            numberOfPlayers: numberOfPlayers,
            playerOne: {name: titleCase(playerOne), result: resultPlayerOne},
            playerTwo: {name: titleCase(playerTwo), result: resultPlayerTwo},
            playerThree: {name: titleCase(playerThree), result: resultPlayerThree},
            playerFour: {name: titleCase(playerFour), result: resultPlayerFour},

        };
        
        let ID = props.games._id
        const endpoint = '/editgame/' + ID
        console.log(games);
        
        const response = await fetch(API_URL + endpoint, {
            method: 'POST',
            body: JSON.stringify(games),
            headers: {'Content-Type': 'application/json'}
          });
          const data = await response.json();
          console.log(data);
          

          props.getAllGames()
          props.toggleEditGame()
        
    };
    

  return (
    <form action="" className='edit-game-form'>
    <div className='date'>
        <label htmlFor="date">Datum:</label>
        <input  onChange={(e) => setDate(e.target.value)} type="date" name="date" id="date" defaultValue={props.games.date} required/>
    </div>

    <div className='type'>
        <label htmlFor="typeOfGame">Typ av match:</label>
        <input  onChange={(e) => setTypeOfGame(e.target.value)} type="text" name="typeOfGame" id="typeOfGame" defaultValue={props.games.typeOfGame}required/>
    </div>

    <div className='numberOf'>
        <label htmlFor="numberOfPlayers">Antal spelare:</label>
        <select name="numberOfPlayers" value={numberOfPlayers} onChange={(e) => setNumberOfPlayers(e.target.value)} id="numberOfPlayers" required>
        
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
    </div>
    { numberOfPlayers === "1" ? (
        <div>
            <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="player1" id="player1" value={playerOne} required/>
            <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="result" id="result"  value={resultPlayerOne} required min="0" max="500"/>
            <span onClick={resetPlayer1}>X</span>
            
        </div>

    ) : ('')}
    { numberOfPlayers === "2" ? (
        <div className='multiple-players'>
            <div>
                <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="" id="" value={playerOne} required/>
                <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="" id="" value={resultPlayerOne} required min="0" max="500"/> <span onClick={resetPlayer1}>X</span>
            </div>

            <div>
                <input onChange={(e) => setPlayerTwo(e.target.value)} type="text" name="player2" id="player2" value={playerTwo} required/>
                <input onChange={(e) => setResultPlayerTwo(e.target.value)} type="number" name="result2" id="result2" value={resultPlayerTwo} required min="0" max="500"/>
                <span onClick={resetPlayer2}>X</span>
            </div>
            
        </div>

    ) : ('')}
    { numberOfPlayers === "3" ? (
        <div className='multiple-players'>

            <div>
                <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="player1" id="player1" value={playerOne} required/>
                <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="result1" id="result1" value={resultPlayerOne} required min="0" max="500"/>
                <span onClick={resetPlayer1}>X</span>
            </div>

            <div>
                <input onChange={(e) => setPlayerTwo(e.target.value)} type="text" name="player2" id="player2" value={playerTwo} required/>
                <input onChange={(e) => setResultPlayerTwo(e.target.value)} type="number" name="result2" id="result2" value={resultPlayerTwo} min="0" max="500" required/> <span onClick={resetPlayer2}>X</span>
            </div>

            <div>
                <input onChange={(e) => setPlayerThree(e.target.value)} type="text" name="player3" id="player3" value={playerThree} required/>
                <input onChange={(e) => setResultPlayerThree(e.target.value)} type="number" name="result3" id="result3" value={resultPlayerThree} min="0" max="500" required/> <span onClick={resetPlayer3}>X</span>
            </div>
            
        </div>
    ) : ('')}
     { numberOfPlayers === "4" ? (
        <div className='multiple-players'>

            <div>
                <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="player1" id="player1" value={playerOne} required/>
                <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="result1" id="result1" value={resultPlayerOne} min="0" max="500" required/>
                <span onClick={resetPlayer1}>X</span>
            </div>

            <div>
                <input onChange={(e) => setPlayerTwo(e.target.value)} type="text" name="player2" id="player2" value={playerTwo} required/>
                <input onChange={(e) => setResultPlayerTwo(e.target.value)} type="number" name="result2" id="result2" value={resultPlayerTwo} min="0" max="500" required/> <span onClick={resetPlayer2}>X</span>
            </div>

            <div>
                <input onChange={(e) => setPlayerThree(e.target.value)} type="text" name="player3" id="player3" value={playerThree}required/>
                <input onChange={(e) => setResultPlayerThree(e.target.value)} type="number" name="result3" id="result3" value={resultPlayerThree} min="0" max="500" required/> <span onClick={resetPlayer3}>X</span>
            </div>

            <div>
                <input onChange={(e) => setPlayerFour(e.target.value)} type="text" name="player4" id="player4" value={playerFour} required/>
                <input onChange={(e) => setResultPlayerFour(e.target.value)} type="number" name="result4" id="result4" value={resultPlayerFour} min="0" max="500" required/> <span onClick={resetPlayer4}>X</span>
            </div>
            
        </div>
    ) : ('')}

    <div>    
        <input className='btn edit' onClick={editGame} type="submit" value="Redigera match" />
        <button className='btn abort' onClick={props.toggleEditGame}>Avbryt</button> 

    </div> 






</form>
  )
}

export default EditGame