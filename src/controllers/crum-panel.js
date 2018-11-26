
var path = require('path')
var rootViewPath = 'CRUM Panel'
var model = require('../model/model')
module.exports = {
  inicio: (req, res) => {
    res.render(path.join(rootViewPath, 'panel-inicio'),
      {
        pageTitle: 'Appbulance (CRUM) - Inicio',
        style: req.user.style
      })
  },
  peticiones: model.crumPanelPeticiones,
  peticiones_A: model.crumPanelPeticiones_A,
  peticiones_B: model.crumPanelPeticiones_B,
  peticiones_C: model.crumPanelPeticiones_C,

  tamps: model.crumPanelTamps,
  tamps_A: model.crumPanelTamps_A,
  tamps_B: model.crumPanelTamps_B,
  tamps_C: model.crumPanelTamps_C,

  unidades: model.crumPanelUnidades,
  unidades_A: model.crumPanelUnidades_A,
  unidades_B: model.crumPanelUnidades_B,
  unidades_C: model.crumPanelUnidades_C,

  usuarios: model.crumPanelUsuarios,
  usuarios_A: model.crumPanelUsuarios_A,
  usuarios_B: model.crumPanelUsuarios_B,
  usuarios_C: model.crumPanelUsuarios_C,

  configuracion: (req, res) => {
    res.render(path.join(rootViewPath, 'panel-configuracion'),
      {
        pageTitle: 'Appbulance (CRUM) - Configuracion',
        style: req.user.style
      })
  },
  sesion: (req, res, next) => {
    if (req.isAuthenticated() && req.user.tipo_usr === 1) {
      next()
    } else {
      res.redirect('/usuario/ingreso')
    }
  }
}
