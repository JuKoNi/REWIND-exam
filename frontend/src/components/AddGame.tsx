import { useState, useEffect, ChangeEvent } from 'react';
import { API_URL } from '../models/constant';


type Props = {
    toggleAddGame: () => void
}

const AddGame = (props: Props) => {
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

    const handleNumber = (e:FormType) => {
        setNumberOfPlayers(e.target.value);
    };
    function titleCase(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    async function addGame(event:React.FormEvent<HTMLInputElement>) { 

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
        let endpoint = '/addgame';
        const response = await fetch(API_URL + endpoint, {
            method: 'POST',
            body: JSON.stringify(games),
            headers: {'Content-Type': 'application/json'}
          });
          const data = await response.json();

          props.toggleAddGame()
        
    }
  return (
    <form action="" className='add-game-form popup'>
        <div className='date'>
            <label htmlFor="date">Datum:</label>
            <input  onChange={(e) => setDate(e.target.value)} type="date" name="date" id="date" required/>
        </div>

        <div className='type'>
            <label htmlFor="typeOfGame">Typ av match:</label>
            <input  onChange={(e) => setTypeOfGame(e.target.value)} type="text" name="typeOfGame" id="typeOfGame" required/>
        </div>

        <div className='numberOf'>
            <label htmlFor="numberOfPlayers">Antal spelare:</label>
            <select name="numberOfPlayers" value={numberOfPlayers} onChange={handleNumber} id="numberOfPlayers" required>
            
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </div>
        { numberOfPlayers === "1" ? (
            <div>

                <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="" id="" placeholder='Användarnamn' required/>
                <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="" id="" placeholder='Resultat' required/>
                
            </div>

        ) : ('')}
        { numberOfPlayers === "2" ? (
            <div className='multiple-players'>
                <div>
                    <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 1' required/>
                    <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 1' required/>
                </div>

                <div>
                    <input onChange={(e) => setPlayerTwo(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 2' required/>
                    <input onChange={(e) => setResultPlayerTwo(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 2' required/>
                </div>
                
            </div>

        ) : ('')}
        { numberOfPlayers === "3" ? (
            <div className='multiple-players'>

                <div>
                    <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 1' required/>
                    <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 1' required/>
                </div>

                <div>
                    <input onChange={(e) => setPlayerTwo(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 2' required/>
                    <input onChange={(e) => setResultPlayerTwo(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 2' required/>
                </div>

                <div>
                    <input onChange={(e) => setPlayerThree(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 3' required/>
                    <input onChange={(e) => setResultPlayerThree(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 3' required/>
                </div>
                
            </div>
        ) : ('')}
         { numberOfPlayers === "4" ? (
            <div className='multiple-players'>

                <div>
                    <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 1' required/>
                    <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 1' required/>
                </div>

                <div>
                    <input onChange={(e) => setPlayerTwo(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 2' required/>
                    <input onChange={(e) => setResultPlayerTwo(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 2' required/>
                </div>

                <div>
                    <input onChange={(e) => setPlayerThree(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 3' required/>
                    <input onChange={(e) => setResultPlayerThree(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 3' required/>
                </div>

                <div>
                    <input onChange={(e) => setPlayerFour(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 4' required/>
                    <input onChange={(e) => setResultPlayerFour(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 4' required/>
                </div>
                
            </div>
        ) : ('')}

        <div>    
            <input className='btn' onClick={addGame} type="submit" value="Lägg till match" />
            <button className='btn abort' onClick={props.toggleAddGame}>Avbryt</button>
        </div> 

    </form>
  )
}

export default AddGame