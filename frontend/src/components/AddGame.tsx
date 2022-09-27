import { useState, useEffect, ChangeEvent } from 'react';


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
    <form action="" className='add-game-form'>
        <label htmlFor="date">Datum:</label>
        <input  onChange={(e) => setDate(e.target.value)} type="date" name="date" id="date" />

        <label htmlFor="typeOfGame">Typ av match:</label>
        <input  onChange={(e) => setTypeOfGame(e.target.value)} type="text" name="typeOfGame" id="typeOfGame" />

        <label htmlFor="numberOfPlayers">Antal spelare:</label>
        <select name="numberOfPlayers" value={numberOfPlayers} onChange={handleNumber} id="numberOfPlayers">
        
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        { numberOfPlayers === "1" ? (
            <div>

                <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="" id="" placeholder='Användarnamn' />
                <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="" id="" placeholder='Resultat' />
                
            </div>

        ) : ('')}
        { numberOfPlayers === "2" ? (
            <div className='multiple-players'>

                <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 1' />
                <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 1' />

                <input onChange={(e) => setPlayerTwo(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 2' />
                <input onChange={(e) => setResultPlayerTwo(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 2' />
                
            </div>

        ) : ('')}
        { numberOfPlayers === "3" ? (
                <div className='multiple-players'>

                <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 1' />
                <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 1' />
        
                <input onChange={(e) => setPlayerTwo(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 2' />
                <input onChange={(e) => setResultPlayerTwo(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 2' />
        
                <input onChange={(e) => setPlayerThree(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 3' />
                <input onChange={(e) => setResultPlayerThree(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 3' />
                
            </div>
        ) : ('')}
         { numberOfPlayers === "4" ? (
                <div className='multiple-players'>

                <input onChange={(e) => setPlayerOne(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 1' />
                <input onChange={(e) => setResultPlayerOne(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 1' />
        
                <input onChange={(e) => setPlayerTwo(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 2' />
                <input onChange={(e) => setResultPlayerTwo(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 2' />
        
                <input onChange={(e) => setPlayerThree(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 3' />
                <input onChange={(e) => setResultPlayerThree(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 3' />

                <input onChange={(e) => setPlayerFour(e.target.value)} type="text" name="" id="" placeholder='Användarnamn spelare 4' />
                <input onChange={(e) => setResultPlayerFour(e.target.value)} type="number" name="" id="" placeholder='Resultat spelare 4' />
                
            </div>
        ) : ('')}


        <input className='btn' onClick={addGame} type="submit" value="Lägg till match" />






    </form>
  )
}

export default AddGame