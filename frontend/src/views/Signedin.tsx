import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddGame from '../components/AddGame';
import Header from '../components/Header';
import AllGames from '../components/AllGames'
import MyGames from '../components/MyGames';
import FriendGames from '../components/FriendGames';
import SpecificGame from '../components/SpecificGame';
import { GameInterface } from '../models/interfaces';
import { API_URL } from '../models/constant'


type Props = {
    
}

const Signedin = (props: Props) => {

    const [ showAddGame, setShowAddGame ] = useState<boolean>(false);
    const [ showAllGames, setShowAllGames ] = useState<boolean>(false);
    const [ showTenLatest, setShowTenLatest ] = useState<boolean>(false);
    const [ showFilterGame, setShowFilterGame ] = useState<boolean>(false);
    const [ showFilterName, setShowFilterName ] = useState<boolean>(false);

    const [ gameState, setGameState ] = useState<GameInterface[]>([]);
    const [ myGameState, setMyGameState ] = useState<GameInterface[]>([]);
    const [ friendGameState, setFriendGameState ] = useState<GameInterface[]>([]);
    const [ specificGameState, setSpecificGameState ] = useState<GameInterface[]>([]);

    const [ nameToFind, setNameToFind ] = useState<string>('');
    const [ gameToFind, setGameToFind ] = useState<string>('');
    const [ gameToEdit, setGameToEdit ] = useState<string>('');
    const [ wins, setWins ] = useState<number>(0);
    const [ attendedGames, setAttendedGames ] = useState<number>(0);

    let games:GameInterface[];
    let user = localStorage.getItem('user');

    const navigate = useNavigate();

    function logOut() {
        localStorage.setItem("user", '');
        navigate('/')
      }

    function titleCase(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    function sortList(list: GameInterface[]) {
        list.sort((a, b) => {
            if(a.date > b.date) {
                return -1;
            } else if (a.date < b.date) {
                return  1;
            }
            return 0;
        })

        return list;
    };
    

    function findWinner(popGames:GameInterface[]) {
        for (let game of popGames) {

        if (game.numberOfPlayers === "1") {
          game.loser = "(ingen)";
          game.lowScore = 0
        }

        for (const [name, value] of Object.entries(game)) {
          if ( game.numberOfPlayers === "2" && game.playerOne.result === game.playerTwo.result) {
            game.loser = "(ingen)"
          }
    
          if (name.includes('player') && value.result != '') {
            if (!game.highScore) {
                game.highScore = 0;
            }
            if (!game.lowScore) {
                game.lowScore = 10000;
            }
            
            if (parseInt(value.result) > game.highScore) {
              game.highScore = parseInt(value.result);
              game.winner = (value.name);
            } else if (parseInt(value.result) == game.highScore) {
              game.winner = game.winner ? game.winner +' ' +'&'+ ' ' + value.name : value.name;
            }
            if (parseInt(value.result) < game.lowScore) {
              game.lowScore = parseInt(value.result);
              game.loser = value.name;
            } else if (parseInt(value.result) == game.lowScore) {
              game.loser = game.loser ? game.loser +' ' +'&'+ ' ' + value.name : value.name;
            }
          }
        }
      }
      return popGames;
    };


    // Toggles
    function toggleAddGame() {
        setShowAddGame(!showAddGame);
        setShowAllGames(false);
        setShowTenLatest(false);
        setShowFilterGame(false);
        setShowFilterName(false);
    };
    function toggleShowAll() {
        setShowAllGames(!showAllGames);
        setShowAddGame(false);
        setShowTenLatest(false);
        setShowFilterGame(false);
        setShowFilterName(false);

        getAllGames()

    };
    function toggleShowTen() {
        setShowTenLatest(!showTenLatest);
        setShowAddGame(false);
        setShowAllGames(false);
        setShowFilterGame(false);
        setShowFilterName(false);

        if(showTenLatest === false) {
            setWins(0)
        }

        getMyGames()
    };
    function toggleFilterGame() {
        setShowFilterGame(!showFilterGame);
        setShowAddGame(false);
        setShowAllGames(false);
        setShowTenLatest(false);
        setShowFilterName(false);

        if (showFilterGame === false) {
            setGameToFind('')
        }
    };
    function toggleFilterName() {
        setShowFilterName(!showFilterName);
        setShowAddGame(false);
        setShowAllGames(false);
        setShowTenLatest(false);
        setShowFilterGame(false);

        if(showFilterName === false) {
            setNameToFind('')
        }
    };
    function toggleEditGame() {
        setGameToEdit(gameToEdit)
      }


    // API calls
    async function getAllGames() {
        let endpoint = '/allgames'
        const response = await fetch(API_URL + endpoint);
        const data = await response.json();
        games = data;

        games = findWinner(games);
        setGameState(games);
    };

    async function getMyGames() {
        let endpoint = "/usergames/" + user;
        const response = await fetch(API_URL + endpoint);
        const data = await response.json();

        games = data;
        setAttendedGames(attendedGames => (attendedGames = games.length > 10 ? 10 : games.length));
        
        games = findWinner(games);

        
        for (let obj of games) {
  
            if(obj.winner.includes(user!)) {
                setWins(wins => (wins +1));
                console.log(obj.loser)     
            } 
        }
        
        setMyGameState(games);

    };
    async function getFriendsGames() {
        let endpoint = "/usergames/" + (titleCase(nameToFind));
        const response = await fetch(API_URL + endpoint);
        const data = await response.json();

        games = data;

        games = findWinner(games);
        setFriendGameState(games);
    };

    async function getSpecificGame() {
        let endpoint = "/games/" + (titleCase(gameToFind));
        const response = await fetch(API_URL + endpoint);
        const data = await response.json();
        console.log(data)
        games = data;
        
        games = findWinner(games);
        setSpecificGameState(games);
    };



    // Show components
    const newGame = showAddGame ? (
        <AddGame 
        toggleAddGame={toggleAddGame} />
    )
    : ( '' );
    


    let sortedGames = sortList([...gameState]);

    const allGames = sortedGames.map((game, index)=> {
        return (
 
            <AllGames
            toggleShowAll={toggleShowAll}
            key={index}
            games={game}
            getAllGames={getAllGames}
            toggleEditGame={toggleEditGame}

            />

        )
    });

    
    let mySortedGames = sortList([...myGameState]);

    mySortedGames.length = mySortedGames.length > 10 ? 10 : mySortedGames.length;

    const myGames = mySortedGames.map((game, index) => {
        return (

            <MyGames 
            toggleShowTen={toggleShowTen}
            key={index}
            games={game}
            user={user}
            toggleEditGame={toggleEditGame}
            getAllGames={getAllGames}
            />
        )
    });

    let friendSortedGames = sortList([...friendGameState])

    const friendGames = friendSortedGames.map((game, index) => {
        return (

            <FriendGames 
            toggleFilterName={toggleFilterName}
            key={index}
            games={game}
            />
        )
    });

    let specificSortedGames = sortList([...specificGameState])

    const specificGame = specificSortedGames.map((game, index) => {
        return (

            <SpecificGame
            toggleFilterGame={toggleFilterGame}
            key={index}
            games={game}
            />
        )
    })

    return (
        <main>
            <button onClick={logOut} className='logout btn'>Logga ut</button>
            <Header />
            
            <header className='welcome-section'>
                <h2 className='welcome'>Välkommen, {user}!</h2>
                <p className='welcome-text'>Vad vill du göra nu?</p>
                <nav className='btn-section'>
                    <button onClick={toggleAddGame} className='btn'>Lägg till ny match</button>
                    <button onClick={toggleShowAll} className='btn'>Se alla matcher</button>
                    <button onClick={toggleShowTen} className='btn'>Se mina senaste matcher</button>
                    <button onClick={toggleFilterGame} className='btn'>Filtrera på typ av match</button>
                    <button onClick={toggleFilterName} className='btn'>Filtrera på användarnamn</button>
                </nav>
            </header>

            {showAllGames ? <section className='games-section popup'>
                <h1>Alla registrerade matcher:</h1>
                <header className='game-header'>
                    <h4>Datum</h4>
                    <h4>Typ av match</h4>
                    <h4>Vinnare</h4>
                    <h4>Förlorare</h4>
                    <h4>Resultat</h4>
                </header>
                {allGames}
            </section> : ' '}

            {showTenLatest ? <section className='games-section popup'>
                <h1>{user} har vunnit {wins} av {attendedGames} matcher.</h1>
                <header className='game-header'>
                    <h4>Datum</h4>
                    <h4>Typ av match</h4>
                    <h4>Vinnare</h4>
                    <h4>Förlorare</h4>
                    <h4>Resultat</h4>
                </header>
                {myGames}
            </section> : ' '}

            {showFilterName ? <section className='games-section search popup'>
                <input onChange={(e) => setNameToFind(e.target.value)} type="text" name="" id="" placeholder='Ange användarnamn'/>
                <button className='btn' onClick={getFriendsGames}>Se alla matcher {titleCase(nameToFind)} deltagit i</button>
                <header className='game-header'>
                    <h4>Datum</h4>
                    <h4>Typ av match</h4>
                    <h4>Vinnare</h4>
                    <h4>Förlorare</h4>
                    <h4>Resultat</h4>
                </header>
                {friendGames}
            </section> : ' '}

            {showFilterGame ? <section className='games-section search popup'>
                <input onChange={(e) => setGameToFind(e.target.value)} type="text" name="" id="" placeholder='T.ex tennis, yatzy etc'/>
                <button className='btn' onClick={getSpecificGame}>Sök</button>
                <header className='game-header'>
                    <h4>Datum</h4>
                    <h4>Typ av match</h4>
                    <h4>Vinnare</h4>
                    <h4>Förlorare</h4>
                    <h4>Resultat</h4>
                </header>
                {specificGame}
            </section> : ' '}

            {newGame}

            
        </main>
    )
}

export default Signedin