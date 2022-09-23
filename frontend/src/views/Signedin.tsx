import { useState } from 'react'
import AddGame from '../components/AddGame';
import Header from '../components/Header';

type Props = {
    
}

const Signedin = (props: Props) => {
    const [ showAddGame, setShowAddGame ] = useState<boolean>(false);
    const [ showAllGames, setShowAllGames ] = useState<boolean>(false);
    const [ showTenLatest, setShowTenLatest ] = useState<boolean>(false);

    function toggleAddGame() {
        setShowAddGame(!showAddGame)
    }
    function toggleShowAll() {
        setShowAllGames(!showAllGames)
    }
    function toggleShowTen() {
        setShowTenLatest(!showTenLatest)
    }

    const newGame = showAddGame ? (
        <AddGame 
        toggleAddgame={toggleAddGame} />
    )
    : ( '' );



    let user = localStorage.getItem('user');

    return (
        <main>
            <Header />
            <header>
                <h1>Välkommen, {user}!</h1>
                <p>Vad vill du göra nu?</p>
                <nav>
                    <button onClick={toggleAddGame}>Lägg till ny match</button>
                    <button>Se alla matcher</button>
                    <button>Se mina 10 senaste matcher</button>
                </nav>
            </header>

            {newGame}
        </main>
    )
}

export default Signedin