var path = require('path')
var rootViewPath = 'TAMP Panel'
module.exports = {
  inicio: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-inicio'),{pageTitle:'panel - inicio',style:req.user.style})
  },
  sesion: (req,res,next)=>{
    if (req.isAuthenticated()) {
      if(req.user.tipo_usr === 3){
        next()
      }
    } else {
      res.redirect('/usuario/ingreso')
    }
  }
}
