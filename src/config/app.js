var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var flash = require('connect-flash')
var passport = require('passport');
    require('./passport')(passport)
    
var session = require('express-session')
var app = express()

app.use(bodyParser.json())//Cuerpo de petición y respuesta en formato json
app.use(bodyParser.urlencoded({extended: false}))//Codificación en la url omitida
app.use(cookieParser())

app.use(express.static(path.join(__dirname,'..','public')))//Ruta de archivos estáticos
//app.set(express.static('index',false)) //Omite el archivo index.html por defecto

app.set('port',process.env.port || 8888);// Puerto de operación de la aplicación

//Gestión de rutas
require('../routes/routes')(app,passport)

app.use(session({//Sesión secreta. Requerida por passport
    secret: '::appbulance2018::',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session()) //Logins persistentes
app.use(flash)// uso de connect-flash para mensajes de sesión

app.set('view engine','ejs') //Configuración del motor de vistas
app.set('views', path.join(__dirname, '../views')) //Directorio donde están las vistas



module.exports = app
