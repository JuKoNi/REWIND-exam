const express = require('express');
const nedb = require('nedb-promise');
const cors = require('cors');
const app = express();

// säg till servern att alla får utnjyttja vårt API
app.use(cors({origin: '*'}));
app.use(express.json());

// en databas för konton
const accountsDB = new nedb({filename: 'accounts.db', autoload: true});

// en databas för matcher
const gamesDB = new nedb({filename: 'games.db', autoload: true});



// skapa konto - endpoint
app.post('/signup', async (request, response) => {
    // vi kommer få in användarens anv.namn och lösen i en body
    const credentials = request.body;
    console.log(credentials);

    const responseObject = {
        success: true,
        usernameExists: false,

    };
    // kolla igenom databasen om användarnamnet som skickats in redan existerar
    const usernameExists = await accountsDB.find({ username: credentials.username });
    // .find() returnerar en lista på alla träffar
    if ( usernameExists.length > 0 ) {
        responseObject.usernameExists = true;
    }
    if ( responseObject.usernameExists ) {
        responseObject.success = false;
    } else {
        // om användarnamn är unikt tjoffa in i account.db
        // hasha vårt lösenord vid bcrypt eller liknande
        accountsDB.insert(credentials);
    }
    response.json(responseObject);
});

// logga in - endpoint
app.post('/login', async (request, response) => {
    // vi kommer få in användarens anv.namn och lösen i en body
    const credentials = request.body;

    const responseObject = {
        success: false,
        user: ''
    }
    console.log(credentials);
    // kollar mot accounts.db om användare med namnet finns
    const account = await accountsDB.find({$and: [{username: credentials.username}, {password: credentials.password}] }); 
    if (account.length > 0) {

            console.log('korrekt lösenord', account[0]);
            responseObject.user = account[0].username;
            responseObject.success = true;
            // vi vill kolla om användaren har intressent
            // om det finns; skicka med i responseObject
    } else {
        responseObject.success = false;
    }
    response.json(responseObject);
});

// lägg till match --endpoint
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
    const allGames = await gamesDB.find({ });
    if ( allGames.length > 0) {
        response.send(allGames)
    }
    console.log(allGames);
    console.log('hämtar alla matcher');

    
})

// hämta användarens matcher
app.get('/usergames/:user', async (request, response) => {

    console.log(request.params.user);
    let user = request.params.user;

    const myGames = await gamesDB.find({ $or: [{ "playerOne.name": user }, { "playerTwo.name": user }, { "playerThree.name": user }, { "playerFour.name": user }] })
    if ( myGames.length > 0 ) {
        response.send(myGames)
    }
})

// hämta EN användares matcher
app.get('/usergames/:user', async (request, response) => {
    console.log(request.params.user)

    const friendsGames = await gamesDB.find({ $or: [{ "playerOne.name": user }, { "playerTwo.name": user }, { "playerThree.name": user }, { "playerFour.name": user }] })
    if ( friendsGames.length > 0 ) {
        response.send(friendsGames)
    }
})

// hämta ALLA matcher av ett slag
app.get('/games/:game', async (request, response) => {
    console.log(request.params.game)

    const specificGame = await gamesDB.find({ "typeOfGame": request.params.game})
    if ( specificGame.length > 0 ) {
        response.send(specificGame)
    }
})


// starta servern
app.listen(8080, () => {
    console.log('Server is running on port 8080');
})