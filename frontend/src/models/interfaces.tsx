export interface GameInterface {
    typeOfGame: string,
    date: string,
    numberOfPlayers: string,
    winner: string,
    loser: string,
    highScore: number,
    lowScore: number,
    playerOne: {
        name: string,
        result: number
    },
    playerTwo: {
        name: string,
        result: number
    },
    playerThree: {
        name: string,
        result: number
    },
    playerFour: {
        name: string,
        result: number
    },
    name: string,
    result: string
}

export interface ResultInterface {
    winners:any,
    losers:any,
    highScore:number,
    lowScore:number
}