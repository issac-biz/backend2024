const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const dummyRouter = require('./routers/dummy')
const userRouter = require('./routers/user')
const sessionRouter = require('./routers/session')
const app = express()

const port = process.env.PORT || 3000
app.use(express.json())

// db connection
mongoose.connect('mongodb://localhost:27017/fattishop')
    .then(() => {
        console.log('Database connection successful');
        console.log('mongoose.connection.db: ' + mongoose.connection.db.databaseName);
    })
    .catch((err) => {
        console.error('Database connection error: ' + err);
    })

// session configuration
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/fattishop',
    collection: 'sessions'
})

store.on('error', function(error) {
    console.log('session store error: ' + error);
})

app.use(session({
    secret: 'should be saved somewhere',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 60*60*1000 // session timeout of 60 minutes
     }
}))

// api routes
app.use('/api/dummies', dummyRouter)
app.use('/api/users', userRouter)
app.use('/api/sessions', sessionRouter)

// static content
app.use(express.static(__dirname + '/public'))
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.htm');
})
// custom 404 page
app.use((req, res) => {
    res.status(404)
    res.json({message: '404 - Not Found'})
})
// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.json({message: '500 - Server Error'})
})

// start http server
app.listen(port, () => console.log(
    `Express started on http://0.0.0.0:${port}; ` +
    `press Ctrl-C to terminate.`)
)

