var consultas = require('../model/model')
module.exports = {
  crum: (req,res)=>{

  },
  user: (req,res)=>{
    res.render('user-login',{pageTitle:'appbulance - login'})
  },
  validateUser: (req,res)=>{
    
  },
  sesion:(req,res,next) =>{
    if (req.isAuthenticated()) { 
      res.redirect('/panel')
    } else {
      next()
    }
  }
}