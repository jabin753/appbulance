var inicio = require('../controllers/inicio')
var panel  = require('../controllers/crum-panel')
var login  = require('../controllers/login')
var registration  = require('../controllers/registration')
module.exports = (app,passport) => {    
    app.get('/',inicio.inicio)
    app.get('/inicio',inicio.inicio)

    app.get('/usuario/ingreso',login.user)
    app.post('/usuario/ingreso',passport.authenticate('local'),panel.inicio)

    app.get('/usuario/registro',registration.user)
    app.post('/user-registration',registration.addUser,login.user)
    
    app.get('/panel',panel.inicio)
    app.get('/panel/inicio',panel.inicio)
    app.post('/panel',panel.inicio)

    app.get('/panel/peticiones',panel.peticiones)
    app.get('/panel/tamps',panel.tamps)
    app.get('/panel/unidades',panel.unidades)
    app.get('/panel/usuarios',panel.usuarios)
    app.get('/panel/configuracion',panel.configuracion)
    
    app.get('/*',(req,res)=>{
        res.render('partials/template/404')
    })
}
