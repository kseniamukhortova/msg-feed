var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function(_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (_req, res) => res.send('Hello World!'))

app.listen(3001, () => console.log(`Example app listening on port 3001!`))
app.get('/*', function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.post('/*', function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

let messages = [
    {
        id: 1,
        created_at: new Date(2019, 0, 1, 1, 50).toISOString(),
        message: 'Happy New Year!',
        user_id: 1
    },
    {
        id: 2,
        created_at: new Date(2019, 1, 14, 6, 34).toISOString(),
        message: 'Lets go party!',
        user_id: 2
    },
    {
        id: 3,
        created_at: new Date(2019, 4, 3, 13, 45).toISOString(),
        message: 'Weather is fine today',
        user_id: 3
    },
    {
        id: 4,
        created_at: new Date(2019, 4, 3, 13, 45).toISOString(),
        message: 'Second msg by John',
        user_id: 1
    }
]

app.get('/messages', function(_req, res) {
    res.send({ messages })
})


let users = [
    {
        id: 1,
        name: 'John Doe',
        bio: 'Bio of John Doe'
    },
    {
        id: 2,
        name: 'Alex',
        some_data: 'Bio of Alex'
    },
    {
        id: 3,
        name: 'Norma',
        bio: 'Bio of Norma'
    }
]

let msgIdCounter = messages.length
let userIdCounter = users.length

app.get('/users', function(_req, res) {
    res.send({ users })
})

app.get('/user', function(req, res) {
    const { id } = req.query
    res.send(users.find(u => u.id === id))
})

app.post('/add_message', function (req, res) {
    const { message, user_id } = req.body
    const id = ++ msgIdCounter
    const msg = { 
        id, 
        user_id, 
        message,
        created_at: new Date().toISOString()
    }
    messages.push(msg)
    res.send(msg)
});

app.post('/add_user', function (req, res) {
    const { name } = req.body
    const id = ++ userIdCounter
    const user = { id, name }
    users.push(user)
    res.send(user)
});