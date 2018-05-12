var app = require('./config/app')

var server = app.listen(app.get('port'),()=>{
	console.log('Servidor iniciado en el puerto',app.get('port'))
})


