var consultas = require('../model/model')
module.exports = {
  crum: (req,res)=>{

  },
  user: (req,res)=>{
    res.render('user-registration',{pageTitle:'appbulance - registro'})
  },
  addUser: consultas.addUser,
  tamp: (req,res)=>{

  }
}