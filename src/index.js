var app = require('./config/app')

var server = app.listen(app.get('port'),()=>{
	var host = server.address().address
    var port = server.address().port
	console.log('Servidor iniciado en %s:%s',host,port)
	
})

var io = require('socket.io')(server)
io.on('connection',(socket)=>{
	console.log('Cliente conectado')
	
})


