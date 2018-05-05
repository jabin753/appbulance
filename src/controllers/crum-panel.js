
var path = require('path')
var rootViewPath = 'CRUM Panel'
module.exports = {
  inicio: (req,res)=>{
    var reqs = req,res
    console.log(req.user)
    res.render(path.join(rootViewPath,'panel-inicio'),{pageTitle:'panel - inicio'})
  },
  peticiones: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-peticiones'),{pageTitle:'panel - peticiones'})
  },
  tamps: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-tamps'),{pageTitle:'panel - tamps'})
  },
  unidades: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-unidades'),{pageTitle:'panel - unidades'})
  },
  usuarios: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-usuarios'),{pageTitle:'panel - usuarios atendidos'})
  },
  configuracion: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-configuracion'),{pageTitle:'panel - configuracion'})
  },
  sesion: (req,res,next) =>{
    if (req.isAuthenticated()) { 
      next()
    } else {
      res.redirect('/usuario/ingreso');
    }
  }
}
