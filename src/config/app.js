import morgan from 'morgan'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import passport from './passport'
import flash from 'connect-flash'
import postgresConnection from './dbConnection'
import session from 'express-session'
import 'dotenv/config'

import routes from './../routes'
var app = express()
postgresConnection.prueba()

// Configuraciones

app.set('port', process.env.PORT)// Puerto de operación de la aplicación
app.set('view engine', 'ejs') // Configuración del motor de vistas
app.set('views', path.join(__dirname, '../views')) // Directorio donde están las vistas

// Middleware

// set a cookie

app.use(express.json())// Cuerpo de petición y respuesta en formato json
app.use(express.urlencoded({ extended: false }))// Codificación en la url omitida
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '..', 'public')))// Ruta de archivos estáticos
app.use(morgan('tiny'))
app.use(session({// Sesión secreta. Requerida por passport
  secret: process.env.SESSIONTOKEN,
  cookie: { maxAge: 900000000000 },
  resave: true,
  saveUninitialized: true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session()) // Logins persistentes

// Rutas
app.use('/', routes)

export default app
