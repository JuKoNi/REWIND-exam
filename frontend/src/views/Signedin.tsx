import { useState } from 'react'
import AddGame from '../components/AddGame';
import Header from '../components/Header';
import AllGames from '../components/AllGames'
import MyGames from '../components/MyGames';
import FriendGames from '../components/FriendGames';
import { GameInterface } from '../models/interfaces'

type Props = {
    
}

const Signedin = (props: Props) => {
    const [ showAddGame, setShowAddGame ] = useState<boolean>(false);
    const [ showAllGames, setShowAllGames ] = useState<boolean>(false);
    const [ showTenLatest, setShowTenLatest ] = useState<boolean>(false);
    const [ showFilterGame, setShowFilterGame ] = useState<boolean>(false);
    const [ showFilterName, setShowFilterName ] = useState<boolean>(false);

    const [ myGameState, setMyGameState ] = useState<GameInterface[]>([]);
    const [ gameState, setGameState ] = useState<GameInterface[]>([]);
    const [ friendGameState, setFriendGameState ] = useState<GameInterface[]>([]);

    const [ nameToFind, setNameToFind ] = useState<string>('')

    let games:GameInterface[];
    let user = localStorage.getItem('user');

    // Toggles
    function toggleAddGame() {
        setShowAddGame(!showAddGame)
    }
    function toggleShowAll() {
        setShowAllGames(!showAllGames);
        getAllGames()
    }
    function toggleShowTen() {
        setShowTenLatest(!showTenLatest)
        getMyGames()
    };
    function toggleFilterGame() {
        setShowFilterGame(!showFilterGame)
    };
    function toggleFilterName() {
        setShowFilterName(!showFilterName)
    }

    // API calls
    async function getAllGames() {
        const response = await fetch('http://localhost:8080/allgames');
        const data = await response.json();
        games = data;
        setGameState(games);
        

        for (let i = 0; i < games.length; i++) {
            const element = games[i];
            console.log(element);
            
        }
    };

    async function getMyGames() {
        let url = "http://localhost:8080/usergames/" + user;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        games = data;
        setMyGameState(games);
        console.log('i getmygames')
        

        for (let i = 0; i < 10; i++) {
            const element = games[i];
            console.log(element);
            
        }
    };
    async function getFriendsGames() {
        function titleCase(str:string){
            return str.charAt(0).toUpperCase() + str.slice(1);
          }

        let url = "http://localhost:8080/usergames/" + (titleCase(nameToFind));
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        games = data;
        setFriendGameState(games);
        console.log('i getFRIENDgames')
        

        for (let i = 0; i < 10; i++) {
            const element = games[i];
            console.log(element);
            
        }
    };



    // Show components
    const newGame = showAddGame ? (
        <AddGame 
        toggleAddGame={toggleAddGame} />
    )
    : ( '' );
    

    // SORTERA LISTAN INNAN MAPPNINGEN
    let sortedGames = gameState.sort((a, b) => {
        if(a.date > b.date) {
            return -1;
        } else if (a.date < b.date) {
            return  1;
        }
        return 0;
    });

    const allGames = sortedGames.map((game, index)=> {
        return (
 
            <AllGames
            toggleShowAll={toggleShowAll}
            key={index}
            games={game}

            />

        )
    });

    const myGames = myGameState.map((game, index) => {
        return (
            <MyGames 
            toggleShowTen={toggleShowTen}
            key={index}
            games={game}/>
        )
    });

    const friendGames = friendGameState.map((game, index) => {
        return (
            <FriendGames 
            toggleFilterName={toggleFilterName}
            key={index}
            games={game}/>
        )
    })


    return (
        <main>
            <Header />
            
            <header className='welcome-section'>
                <h2 className='welcome'>Välkommen, {user}!</h2>
                <p className='welcome-text'>Vad vill du göra nu?</p>
                <nav className='btn-section'>
                    <button onClick={toggleAddGame} className='btn'>Lägg till ny match</button>
                    <button onClick={toggleShowAll} className='btn'>Se alla matcher</button>
                    <button onClick={toggleShowTen} className='btn'>Se mina 10 senaste matcher</button>
                    <button onClick={toggleFilterGame} className='btn'>Filtrera på typ av match</button>
                    <button onClick={toggleFilterName} className='btn'>Filtrera på användarnamn</button>
                </nav>
            </header>

            {showAllGames ? <section className='games-section'>
                <h1>Alla registrerade matcher:</h1>
                <header className='game-header'>
                    <h4>Datum</h4>
                    <h4>Typ av match</h4>
                    <h4>Vinnare</h4>
                    <h4>Förlorare</h4>
                    <h4>Resultat</h4>
                </header>
                {allGames}
            </section> : ''}

            {showTenLatest ? <section className='games-section'>
                <h1>Alla registrerade matcher {user} deltagit i:</h1>
                <header className='game-header'>
                    <h4>Datum</h4>
                    <h4>Typ av match</h4>
                    <h4>Vinnare</h4>
                    <h4>Förlorare</h4>
                    <h4>Resultat</h4>
                </header>
                {myGames}
            </section> : ''}

            {showFilterName ? <section className='games-section search'>
                <input onChange={(e) => setNameToFind(e.target.value)} type="text" name="" id="" placeholder='Ange användarnamn'/>
                <button className='btn' onClick={getFriendsGames}>Sök</button>
                <h1>Alla registrerade matcher {nameToFind} deltagit i:</h1>
                <header className='game-header'>
                    <h4>Datum</h4>
                    <h4>Typ av match</h4>
                    <h4>Vinnare</h4>
                    <h4>Förlorare</h4>
                    <h4>Resultat</h4>
                </header>
                {friendGames}
            </section> : ''}

            {newGame}
            
        </main>
    )
}

export default Signedin