import { useState, ChangeEvent, useEffect } from 'react';
import { GameInterface } from '../models/interfaces';
import { API_URL } from '../models/constant';

type Props = {
    toggleEditGame:() => void
    games:GameInterface,
    getAllGames:any
    setGameToEdit:any
}

const EditGame = (props: Props) => {

    const [ numberOfPlayers, setNumberOfPlayers ] = useState<string>("1");
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
    }, [])
    

    const handleNumber = () => {
        setNumberOfPlayers(props.games.numberOfPlayers);
    };

    function titleCase(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    async function editGame(event:React.FormEvent<HTMLInputElement>) { 

        event.preventDefault();

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
        
        const response = await fetch(API_URL + endpoint, {
            method: 'POST',
            body: JSON.stringify(games),
            headers: {'Content-Type': 'application/json'}
          });
          const data = await response.json();

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
        <select name="numberOfPlayers" value={props.games.numberOfPlayers} onChange={handleNumber} id="numberOfPlayers" required>
        
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
    </div>
    { numberOfPlayers === "1" ? (
        <div>

            <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="" id="" defaultValue={props.games.playerOne.name} required/>
            <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="" id="" defaultValue={props.games.playerOne.result} required/>
            
        </div>

    ) : ('')}
    { numberOfPlayers === "2" ? (
        <div className='multiple-players'>
            <div>
                <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="" id="" defaultValue={props.games.playerOne.name} required/>
                <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="" id="" defaultValue={props.games.playerOne.result}  required/>
            </div>

            <div>
                <input onChange={(e) => setPlayerTwo(e.target.value)} type="text" name="" id="" defaultValue={props.games.playerTwo.name} required/>
                <input onChange={(e) => setResultPlayerTwo(e.target.value)} type="number" name="" id="" defaultValue={props.games.playerTwo.result}  required/>
            </div>
            
        </div>

    ) : ('')}
    { numberOfPlayers === "3" ? (
        <div className='multiple-players'>

            <div>
                <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="" id="" defaultValue={props.games.playerOne.name} required/>
                <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="" id="" defaultValue={props.games.playerOne.result}  required/>
            </div>

            <div>
                <input onChange={(e) => setPlayerTwo(e.target.value)} type="text" name="" id="" defaultValue={props.games.playerTwo.name} required/>
                <input onChange={(e) => setResultPlayerTwo(e.target.value)} type="number" name="" id="" defaultValue={props.games.playerTwo.result}  required/>
            </div>

            <div>
                <input onChange={(e) => setPlayerThree(e.target.value)} type="text" name="" id="" defaultValue={props.games.playerThree.name} required/>
                <input onChange={(e) => setResultPlayerThree(e.target.value)} type="number" name="" id="" defaultValue={props.games.playerThree.result}  required/>
            </div>
            
        </div>
    ) : ('')}
     { numberOfPlayers === "4" ? (
        <div className='multiple-players'>

            <div>
                <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="" id="" defaultValue={props.games.playerOne.name} required/>
                <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="" id="" defaultValue={props.games.playerOne.result}  required/>
            </div>

            <div>
                <input onChange={(e) => setPlayerTwo(e.target.value)} type="text" name="" id="" defaultValue={props.games.playerTwo.name} required/>
                <input onChange={(e) => setResultPlayerTwo(e.target.value)} type="number" name="" id="" defaultValue={props.games.playerTwo.result}  required/>
            </div>

            <div>
                <input onChange={(e) => setPlayerThree(e.target.value)} type="text" name="" id="" defaultValue={props.games.playerThree.name} required/>
                <input onChange={(e) => setResultPlayerThree(e.target.value)} type="number" name="" id="" defaultValue={props.games.playerThree.result}  required/>
            </div>

            <div>
                <input onChange={(e) => setPlayerFour(e.target.value)} type="text" name="" id="" defaultValue={props.games.playerFour.name} required/>
                <input onChange={(e) => setResultPlayerFour(e.target.value)} type="number" name="" id="" defaultValue={props.games.playerFour.result}  required/>
            </div>
            
        </div>
    ) : ('')}

    <div>    
        <input className='btn edit' onClick={editGame} type="submit" value="Redigera match" />
        <button className='btn abort' onClick={() => props.setGameToEdit('')}>Avbryt</button>
    </div> 






</form>
  )
}

export default EditGame