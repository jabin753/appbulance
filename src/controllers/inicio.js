var consultas = require('../model/model')
module.exports = {
  inicio: (req,res)=>{
    res.render('index',{pageTitle:'Appbulance - Bienvenido'})
  }
}