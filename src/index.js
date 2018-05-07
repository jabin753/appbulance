var app = require('./config/app')
var morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

var server = app.listen(app.get('port'),()=>{
	console.log('Servidor iniciado en el puerto',app.get('port'))
})


