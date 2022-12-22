const express = require ('express')
const handlebars = require ('express-handlebars')
const {Server } = require ('socket.io')
const routerViews = require ('./routes/views.router.js')

const app = express()
const httpServer = app.listen(8080, () => console.log('Listening...'))
const io = new Server(httpServer)

//Config engine templates

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use (express.static(__dirname + '/public'))
app.use ("/", routerViews)

const message = []

io.on ('connection', socket => {
    console.log('New cliente connected');

    socket.on('message', data => {
        message.push(data)
        io.emit('logs', message)
    })
})