export interface GameInterface {
    typeOfGame: string,
    date: string,
    numberOfPlayers: string,
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