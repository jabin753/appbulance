const bd = require('../model/model')
module.exports = server => {
    const io = require('socket.io')(server)
    io.on('connection', (socket) => {
        console.log('cliente conectado:')
        socket.on('sendPetition', (data) => {
            io.emit('receivePetition', data)
        })

    })
}
