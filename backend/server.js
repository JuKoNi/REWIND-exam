const express = require('express');
const nedb = require('nedb-promise');
//var Datastore = require('nedb');
const cors = require('cors');
const app = express();


app.use(cors({origin: '*'}));
app.use(express.json());

// en databas för konton
const accountsDB = new nedb({filename: 'accounts.db', autoload: true});

// en databas för matcher
const gamesDB = new nedb({filename: 'games.db', autoload: true});



// skapa konto 
app.post('/signup', async (request, response) => {

    const credentials = request.body;

    const responseObject = {
        success: true,
        usernameExists: false,

    };

    const usernameExists = await accountsDB.find({ username: credentials.username });

    if ( usernameExists.length > 0 ) {
        responseObject.usernameExists = true;
    }
    if ( responseObject.usernameExists ) {
        responseObject.success = false;
    } else {

        accountsDB.insert(credentials);
    }
    response.json(responseObject);
});

// logga in 
app.post('/login', async (request, response) => {

    const credentials = request.body;

    const responseObject = {
        success: false,
        user: ''
    }

    const account = await accountsDB.find({$and: [{username: credentials.username}, {password: credentials.password}] }); 
    if (account.length > 0) {
            responseObject.user = account[0].username;
            responseObject.success = true;

    } else {
        responseObject.success = false;
    }
    response.json(responseObject);
});

// lägg till match 
app.post('/addgame', async (request, response) => {

    const gameInfo = request.body;

    const responseObject = {
        success: true,
        gameInfo: gameInfo
    }

    gamesDB.insert(gameInfo);
    response.json(responseObject);
});

// hämta ALLA matcher 
app.get('/allgames', async (request, response) => {
    const allGames =  await gamesDB.find({ });
    if ( allGames.length > 0) {
        response.send(allGames)
    }
 
})

// hämta användarens matcher 
app.get('/usergames/:user', async (request, response) => {

    let user = request.params.user;

    const myGames = await gamesDB.find({ $or: [{ "playerOne.name": user }, { "playerTwo.name": user }, { "playerThree.name": user }, { "playerFour.name": user }] })
    if ( myGames.length > 0 ) {
        response.send(myGames)
    }
})

// hämta EN användares matcher
app.get('/usergames/:user', async (request, response) => {

    const friendsGames = await gamesDB.find({ $or: [{ "playerOne.name": user }, { "playerTwo.name": user }, { "playerThree.name": user }, { "playerFour.name": user }] })
    if ( friendsGames.length > 0 ) {
        response.send(friendsGames)
    }
})

// hämta ALLA matcher av ett slag
app.get('/games/:game', async (request, response) => {

    const specificGame = await gamesDB.find({ "typeOfGame": request.params.game})
    if ( specificGame.length > 0 ) {
        response.send(specificGame)
    }
});

// TA BORT och LÄGG TILL en match baserat på ID
app.post('/editgame/:id', async (request, response) => {
    const ID = request.params.id
    const gameInfo = request.body

    const responseObject = {
        message: {gameInfo}
    }

    gamesDB.remove({ "_id": ID });

    gamesDB.insert(gameInfo);

    response.json(responseObject);
})

// TA BORT en match baserat på ID
// SKITER I DEN HÄR PGA KRÅNGEL O HAR INTE TIIIID
// app.post('/deletegame/:id', async (request, response) => {
//     const ID = request.params.id

//     await gamesDB.remove({ "_id": ID });
//     response.json({success: true})
// })


// starta servern
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})