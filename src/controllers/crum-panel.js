
var path = require('path')
var rootViewPath = 'CRUM Panel'
var model = require('../model/model')
module.exports = {
  inicio: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-inicio'),
    {pageTitle:'Appbulance (CRUM) - Inicio',
    style:req.user.style})
  },
  peticiones: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-peticiones'),
    {pageTitle:'Appbulance (CRUM) - Peticiones',
    style:req.user.style})
  },
  tamps: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-tamps'),
    {pageTitle:'Appbulance (CRUM) - TAMPS',
    style:req.user.style})
  },
  unidades: model.crumPanelUnidades,
  usuarios: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-usuarios'),
    {pageTitle:'Appbulance (CRUM) - Usuarios atendidos',
    style:req.user.style})
  },
  configuracion: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-configuracion'),
    {pageTitle:'Appbulance (CRUM) - Configuracion',
    style:req.user.style})
  },
  sesion: (req,res,next) =>{
    if (req.isAuthenticated() && req.user.tipo_usr === 1) {
      next()
    } else {
      res.redirect('/usuario/ingreso')
    }
  }
}
