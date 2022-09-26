import { useState } from 'react'
import AddGame from '../components/AddGame';
import Header from '../components/Header';
import AllGames from '../components/AllGames'
import { GameInterface } from '../models/interfaces'

type Props = {
    
}

const Signedin = (props: Props) => {
    const [ showAddGame, setShowAddGame ] = useState<boolean>(false);
    const [ showAllGames, setShowAllGames ] = useState<boolean>(false);
    const [ showTenLatest, setShowTenLatest ] = useState<boolean>(false);
    const [ sendGames, setSendGames ] = useState<GameInterface[]>([])

    let games:GameInterface[];

    function toggleAddGame() {
        setShowAddGame(!showAddGame)
    }
    function toggleShowAll() {
        setShowAllGames(!showAllGames);
        getAllGames()
    }
    function toggleShowTen() {
        setShowTenLatest(!showTenLatest)
    };

    async function getAllGames() {
        const response = await fetch('http://localhost:8080/allgames');
        const data = await response.json();
        games = data;
        setSendGames(games);
        

        for (let i = 0; i < games.length; i++) {
            const element = games[i];
            console.log(element);
            
        }
    }

    const newGame = showAddGame ? (
        <AddGame 
        toggleAddGame={toggleAddGame} />
    )
    : ( '' );
    

    // const allGames = showAllGames ? (
    //     <AllGames
    //     toggleShowAll={toggleShowAll}
    //     games={sendGames} />
    // )
    // : ( '' );

    // SORTERA LISTAN INNAN MAPPNINGEN

    const allGames = sendGames.map((game, index)=> {
        return (
            <AllGames
            toggleShowAll={toggleShowAll}
            key={index}
            games={game}

            />
        )
    })

    // function findWinner() {
    //     for (const [name, value] of Object.entries(props.info)) {
    //       if (name.includes('player') && value.result != '') {
    //         console.log(value)
    //         highScore = parseInt(value.result)
    //       }
    //     }
    
    //   }
    

    let user = localStorage.getItem('user');

    return (
        <main>
            <Header />
            <header>
                <h2>Välkommen, {user}!</h2>
                <p>Vad vill du göra nu?</p>
                <nav>
                    <button onClick={toggleAddGame}>Lägg till ny match</button>
                    <button onClick={toggleShowAll}>Se alla matcher</button>
                    <button>Se mina 10 senaste matcher</button>
                </nav>
            </header>

            {newGame}
            {allGames}
        </main>
    )
}

export default Signedin