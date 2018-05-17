
var path = require('path')
var rootViewPath = 'CRUM Panel'
module.exports = {
  inicio: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-inicio'),{pageTitle:'panel - inicio',style:req.user.style})
  },
  peticiones: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-peticiones'),{pageTitle:'panel - peticiones',style:req.user.style})
  },
  tamps: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-tamps'),{pageTitle:'panel - tamps',style:req.user.style})
  },
  unidades: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-unidades'),{pageTitle:'panel - unidades',style:req.user.style})
  },
  usuarios: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-usuarios'),{pageTitle:'panel - usuarios atendidos',style:req.user.style})
  },
  configuracion: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-configuracion'),{pageTitle:'panel - configuracion',style:req.user.style})
  },
  sesion: (req,res,next) =>{
    if (req.isAuthenticated()) {
      if(req.user.tipo_usr === 1){
        next()
      } else res.redirect('/usuario/ingreso')
    } else {
      res.redirect('/crum/ingreso')
    }
  }
}
