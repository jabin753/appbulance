
var path = require('path')
var rootViewPath = 'User panel'
module.exports = {
  inicio: (req, res) => {
    res.render(path.join(rootViewPath, 'panel-inicio'), { pageTitle: 'Appbulance - Inicio', style: req.user.style })
  },
  historial_peticiones: (req, res) => {
    res.render(path.join(rootViewPath, 'panel-peticiones'), { pageTitle: 'Appbulance - Historial', style: req.user.style })
  },
  sesion: (req, res, next) => {
    if (req.isAuthenticated() && req.user.tipo_usr === 2) {
      next()
    } else {
      res.redirect('/usuario/ingreso')
    }
  }
}
