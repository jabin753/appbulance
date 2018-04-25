var app = require('./config/app')

require('./routes/routes')(app)
var server = app.listen(app.get('port'),()=>{
	console.log('Servidor iniciado en el puerto',app.get('port'))
})


