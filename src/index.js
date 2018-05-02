var app = require('./config/app')
var morgan = require('morgan')
app.use(morgan('dev'))

var server = app.listen(app.get('port'),()=>{
	console.log('Servidor iniciado en el puerto',app.get('port'))
})


