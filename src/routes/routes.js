var inicio = require('../controllers/inicio')
var panel  = require('../controllers/crum-panel')
var login  = require('../controllers/login')
var registration  = require('../controllers/registration')
module.exports = (app,passport) => {    
    app.get('/',inicio.inicio)
    
    app.get('/usuario/registro',registration.user)
    app.post('/usuario/registro',registration.addUser)
    
    app.get('/usuario/ingreso',login.sesion,login.user)
    app.post('/usuario/ingreso',passport.authenticate('local-usuario',{
        successRedirect : '/panel',
        failureRedirect : '/usuario/ingreso'
    }))
    
    app.get('/panel',panel.sesion,panel.inicio)
    app.get('/panel/*',panel.sesion)
    app.get('/panel/peticiones',panel.peticiones)
    app.get('/panel/tamps',panel.tamps)
    app.get('/panel/unidades',panel.unidades)
    app.get('/panel/usuarios',panel.usuarios)
    app.get('/panel/configuracion',panel.configuracion)
    
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/usuario/ingreso');
    })
    app.get('/*',(req,res)=>{
        res.render('partials/template/404')
    })
}
