
var path = require('path')
var rootViewPath = 'User panel'
module.exports = {
  inicio: (req,res)=>{
    console.log(req.user.style)
    res.render(path.join(rootViewPath,'panel-inicio'),{pageTitle:'panel - inicio',style:req.user.style})
  },
  historial_peticiones: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-peticiones'),{pageTitle:'panel - peticiones',style:req.user.style})
  },
  sesion: (req,res,next) =>{
    if (req.isAuthenticated()) {
      if(req.user.tipo_usr === 2){
        next()
      } else res.redirect('/usuario/ingreso')
    } else {
      res.redirect('/usuario/ingreso')
    }
  }
}
