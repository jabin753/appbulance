
var path = require('path')
var rootViewPath = 'CRUM Panel'
module.exports = {
  inicio: (req,res)=>{
    console.log(req.user.style)
    res.render(path.join(rootViewPath,'panel-inicio'),{pageTitle:'Appbulance (CRUM) - Inicio',style:req.user.style})
  },
  peticiones: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-peticiones'),{pageTitle:'Appbulance (CRUM) - Peticiones',style:req.user.style})
  },
  tamps: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-tamps'),{pageTitle:'Appbulance (CRUM) - TAMPS',style:req.user.style})
  },
  unidades: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-unidades'),{pageTitle:'Appbulance (CRUM) - Unidades',style:req.user.style})
  },
  usuarios: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-usuarios'),{pageTitle:'Appbulance (CRUM) - Usuarios atendidos',style:req.user.style})
  },
  configuracion: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-configuracion'),{pageTitle:'Appbulance (CRUM) - Configuracion',style:req.user.style})
  },
  sesion: (req,res,next) =>{
    if (req.isAuthenticated()) { 
      next()
    } else {
      res.redirect('/crum/ingreso')
    }
  }
}
