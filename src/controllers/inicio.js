var bd = require('../config/dbConnection')
var consultas = require('../model/model')

exports.inicio = (req,res)=>{
    res.render('index')
  }

exports.panel = (req,res)=>{
  res.render('panel')
}

exports.time = (req,res)=>{
  bd.query(consultas.showDate,(err,result)=>{
  res.render('time',{pageTitle : 'Fecha',time: result.rows})
  })
}
