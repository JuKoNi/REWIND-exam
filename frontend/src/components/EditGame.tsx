import { useState, ChangeEvent, useEffect } from 'react'
import { GameInterface } from '../models/interfaces'

type Props = {
    toggleEditGame:() => void
    games:GameInterface
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

    type FormType = ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> ;

    useEffect(() => {
        setNumberOfPlayers(props.games.numberOfPlayers)
    }, [])
    

    const handleNumber = (e:FormType) => {
        setNumberOfPlayers(props.games.numberOfPlayers);
    };

    async function addGame(event:any) { 

        function titleCase(str:string){
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
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
        const response = await fetch('http://localhost:8080/addgame', {
            method: 'POST',
            body: JSON.stringify(games),
            headers: {'Content-Type': 'application/json'}
          });
          const data = await response.json();
          console.log(data);
        
    }


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
        <select name="numberOfPlayers" defaultValue={props.games.numberOfPlayers} onChange={handleNumber} id="numberOfPlayers" required>
        
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
                <input onChange={(e) => setPlayerFour(e.target.value)} type="text" name="" id="" defaultValue={props.games.playerFour.name || ''} required/>
                <input onChange={(e) => setResultPlayerFour(e.target.value)} type="number" name="" id="" defaultValue={props.games.playerFour.result}  required/>
            </div>
            
        </div>
    ) : ('')}

    <div>    
        <input className='btn' onClick={addGame} type="submit" value="Redigera match" />
        <button className='btn abort' onClick={props.toggleEditGame}>Avbryt</button>
    </div> 






</form>
  )
}

export default EditGame