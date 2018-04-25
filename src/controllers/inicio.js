var consultas = require('../model/model')
module.exports = {
  inicio: (req,res)=>{
    res.render('public page/index')
  },
  
  panel: (req,res)=>{
    res.render('panel')
  },
  
  time: (req,res)=>{
    consultas.showDate(req,res,{view:'time',pageTitle: 'Tiempo'})
  }
}