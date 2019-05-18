import api from './api'
import usuario from './app/usuario'
import { validateUserRoute } from './app/usuario/'
import crum from './app/crum'
import { Router } from 'express'

// app.get('/tamp/inicio', tamp.sesion, tamp.inicio)
const staticRoutes = {
  inicio: (req, res) => {
    res.render('index-appbulance',
      { pageTitle: 'Appbulance - Sitio Oficial' })
  },
  faq: (req, res) => {
    res.render('index-appbulance-faq',
      { pageTitle: 'Appbulance - Preguntas frecuentes' })
  },
  web_version: (req, res) => {
    res.render('index-appbulance-web',
      { pageTitle: 'Appbulance - Version web' })
  }
}
var routes = Router()

routes.use('/api', api)
routes.use('/crum', crum)
routes.use('/usuario', usuario)

routes.get('/', validateUserRoute, staticRoutes.inicio)
routes.get('/faq', staticRoutes.faq)
routes.get('/web_version', staticRoutes.web_version)
routes.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/usuario/ingreso')
})
routes.get('/*', (req, res) => {
  res.render('partials/template/404')
})
export default routes
