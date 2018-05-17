var consultas = require('../model/model')
module.exports = {
  crum: (req,res)=>{
    res.render('crum-login',{pageTitle:'Appbulance (CRUM) - Login'})
  },
  user: (req,res)=>{
    res.render('user-login',{pageTitle:'Appbulance - Login'})
  },
  validateUser: (req,res,next)=>{
    if (req.isAuthenticated()) { 
      res.redirect('/usuario/inicio')
    } else {
      next()
    }

  },
  validateCrum: (req,res,next) =>{
    if (req.isAuthenticated()) { 
      res.redirect('/crum/inicio')
    } else {
      next()
    }
  },
  validateTamp: ()=>{}
}