import { Router } from 'express'
import path from 'path'
import passport from './../../../config/passport'
const rootViewPath = 'User panel'

var router = Router()
// Routing /usuario/*
function validateUserRoute (req, res, next) {
  if (req.isAuthenticated()) {
    console.log('auth')
    switch (req.user.tipo_usr) {
      case 1: res.redirect('/crum/inicio')
        break
      case 2: res.redirect('/usuario/inicio')
        break
      case 3: res.redirect('/tamp/inicio')
    }
  } else next()
}
function isUserAuthenticated (req, res, next) {
  if (req.isAuthenticated() && req.user.tipo_usr === 2) {
    next()
  } else {
    res.redirect('/usuario/ingreso')
  }
}
router.get('/ingreso', validateUserRoute,
  (req, res) => {
    res.render('user-login', { pageTitle: 'Appbulance - Login', flashMessage: req.flash('user-login') })
  })
router.post('/ingreso', passport.authenticate('local', { failureRedirect: '/usuario/ingreso' }), validateUserRoute)
router.get('/inicio', isUserAuthenticated,
  (req, res) => {
    res.render(path.join(rootViewPath, 'panel-inicio'), { pageTitle: 'Appbulance - Inicio' })
  })
export { validateUserRoute }
export default router
