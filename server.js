const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

// creating a route 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
// till here server is created.


// seting up socket.io
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected.....')

    // listening a event named 'message'
    socket.on('message', (msg) => {
        // it will send the message to all of those who is connected to server except the one who sends the message.
        socket.broadcast.emit('message', msg)
    })
})
