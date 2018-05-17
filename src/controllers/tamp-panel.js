var path = require('path')
var rootViewPath = 'TAMP Panel'
module.exports = {
  inicio: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-inicio'),{pageTitle:'panel - inicio',style:req.user.style})
  }
}
