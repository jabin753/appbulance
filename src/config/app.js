var morgan = require('morgan')
var path = require('path')
var express = require('express')
var cookieParser = require('cookie-parser')
var passport = require('passport')
    require('./passport')(passport)
var flash = require('connect-flash')
var BDPrueba = require('./dbConnection').prueba()
var session = require('express-session')

var app = express()

//Configuraciones

app.set('port',process.env.port || 8888);// Puerto de operación de la aplicación
app.set('view engine','ejs') //Configuración del motor de vistas
app.set('views', path.join(__dirname, '../views')) //Directorio donde están las vistas

//Middleware

// set a cookie

app.use(express.json())//Cuerpo de petición y respuesta en formato json
app.use(express.urlencoded({extended: false}))//Codificación en la url omitida
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'..','public')))//Ruta de archivos estáticos
app.use(morgan('tiny'))
app.use(session({//Sesión secreta. Requerida por passport
    secret: '::appbulance2018::',
    cookie:{maxAge:900000000000},
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session()) //Logins persistentes
//Rutas
require('../routes/api')(app)
require('../routes/routes')(app,passport)

module.exports = app
