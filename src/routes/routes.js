var inicio = require('../controllers/inicio')
var crum = require('../controllers/crum-panel')
var user = require('../controllers/user-panel')
var tamp = require('../controllers/tamp-panel')
var login = require('../controllers/login')
var registration = require('../controllers/registration')
module.exports = (app, passport) => {
    app.get('/', login.validate, inicio.inicio)
    app.get('/faq', inicio.faq)
    app.get('/web_version', inicio.web_version)
    app.get('/usuario/ingreso', login.validate, login.user)
    app.post('/usuario/ingreso', passport.authenticate('local', { failureRedirect: '/usuario/ingreso' }), login.validate)
    //Exclusive Users Routes
    app.get('/usuario/registro', registration.userPaciente)
    app.post('/usuario/registro', registration.addUserPaciente)
    app.get('/usuario/inicio', user.sesion, user.inicio)
    //Exclusive CRUM Routes
    app.get('/crum/inicio', crum.sesion, crum.inicio)

    app.get('/crum/peticiones', crum.sesion, crum.peticiones)
    app.get('/crum/tamps', crum.sesion, crum.tamps)
    app.get('/crum/unidades', crum.sesion, crum.unidades)
    app.get('/crum/usuarios', crum.sesion, crum.usuarios)

    app.get('/crum/configuracion', crum.sesion, crum.configuracion)
    //Exclusive TAMP Routes
    app.get('/tamp/inicio', tamp.sesion, tamp.inicio)

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/usuario/ingreso');
    })
    app.get('/*', (req, res) => {
        res.render('partials/template/404')
    })
}
