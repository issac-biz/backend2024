const express = require('express')
const testRouter = require('./routers/test')

const app = express()
const port = process.env.PORT || 3000

app.use(testRouter)

// static content
app.use(express.static(__dirname + '/public'))
app.get('/', function (req, res) {
    res.redirect('/index.htm');
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

