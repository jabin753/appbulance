import { Router } from 'express'
import path from 'path'

const rootViewPath = 'CRUM Panel'
var router = Router()
// Routing /crum/*
router.use((req, res, next) => {
  if (req.isAuthenticated() && req.user.tipo_usr === 1) {
    next()
  } else {
    res.redirect('/usuario/ingreso')
  }
})
router.get('/inicio', (req, res) => {
  res.render(path.join(rootViewPath, 'panel-inicio'),
    {
      pageTitle: 'Appbulance (CRUM) - Inicio'
    })
})
router.get('/peticiones', (req, res) => {
  res.render(path.join(rootViewPath, 'panel-peticiones'),
    {
      pageTitle: 'Appbulance (CRUM) - Peticiones'
    })
})
router.get('/tamps', (req, res) => {
  res.render(path.join(rootViewPath, 'panel-tamps'),
    {
      pageTitle: 'Appbulance (CRUM) - Tamps'
    })
})
router.get('/unidades', (req, res) => {
  res.render(path.join(rootViewPath, 'panel-unidades'),
    {
      pageTitle: 'Appbulance (CRUM) - Unidades'
    })
})
router.get('/usuarios', (req, res) => {
  res.render(path.join(rootViewPath, 'panel-usuarios'),
    {
      pageTitle: 'Appbulance (CRUM) - Usuarios'
    })
  router.get('/configuracion', (req, res) => {
    res.render(path.join(rootViewPath, 'panel-configuracion'),
      {
        pageTitle: 'Appbulance (CRUM) - Configuración'
      })
  })
})

export default router
