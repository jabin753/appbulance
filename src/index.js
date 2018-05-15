var app = require('./config/app')
var http = require('http').Server(app)
var io = require('socket.io')(http)

//Test Socket-io

io.on('connection',(socket)=>{
	console.log('cliente conectado')
})
http.listen(app.get('port'),()=>{
	console.log('Servidor iniciado en el puerto ',app.get('port'))
})


