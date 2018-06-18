const bd = require('../model/model')
module.exports = server => {
    const io = require('socket.io')(server)
    io.on('connection',(socket)=>{
        socket.on('sendPetition',(data) => {
            bd.POST_pt(data)
            io.emit('receivePetition',data)
        })

    })
}
