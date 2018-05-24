var app = require('./config/app')
/*Linea solo para sincronizar, no fue nada modificado*/
var server = app.listen(app.get('port'),()=>{
	var host = server.address().address
    var port = server.address().port
	console.log('Servidor iniciado en %s:%s',host,port)
	
})


