var app = require('./config/app')
var morganBody = require('morgan-body')
morganBody(app) //Dev: Muestra requests y responses del servidor
var server = app.listen(app.get('port'),()=>{
	console.log('Servidor iniciado en el puerto',app.get('port'))
})


