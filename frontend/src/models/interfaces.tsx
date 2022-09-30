export interface GameInterface {
    _id: string
    typeOfGame: string,
    date: string,
    numberOfPlayers: string,
    winner: string,
    loser: string,
    highScore: number,
    lowScore: number,
    playerOne: {
        name: string,
        result: string
    },
    playerTwo: {
        name: string,
        result: string
    },
    playerThree: {
        name: string,
        result: string
    },
    playerFour: {
        name: string,
        result: string
    },
    name: string,
    result: string
}
