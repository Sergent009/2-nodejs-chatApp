const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

// creating a route 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
// till here server is created.

