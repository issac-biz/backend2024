const express = require('express')
const mongoose = require('mongoose')
const dummyRouter = require('./routers/dummy')

mongoose.connect(`mongodb://localhost:27017/fattishop}`)
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((err) => {
        console.error('Database connection error: ' + err);
    })
    .finally(() => {
        console.log('mongoose.connection.db: ' + mongoose.connection.db);
    });

const app = express()
const port = process.env.PORT || 3000

app.use(dummyRouter)

// static content
app.use(express.static(__dirname + '/public'))
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.htm');
})
// custom 404 page
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})
// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`)
)

