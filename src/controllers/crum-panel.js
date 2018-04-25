
var path = require('path')
var rootViewPath = 'CRUM Panel'
module.exports = {
  inicio: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-inicio'))
  },
  peticiones: (req,res)=>{
    res.render(path.join(rootViewPath,'panel-peticiones'))
  },
  tamps: (req,res)=>{
   res.render(path.join(rootViewPath,'panel-tamps'))
  },
 unidades: (req,res)=>{
  console.log(req.originalUrl); // '/admin/new'
  console.log(req.baseUrl); // '/admin'
  console.log(req.path); // '/new'
     res.render(path.join(rootViewPath,'panel-unidades'))
   },
   usuarios: (req,res)=>{
     res.render(path.join(rootViewPath,'panel-usuarios'))
   },
  configuracion: (req,res)=>{
     res.render(path.join(rootViewPath,'panel-configuracion'))
   }
 }
