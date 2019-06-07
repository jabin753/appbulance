import { Router } from 'express'
import bd from './../../config/dbConnection'
var router = Router()
// Main middleware for /api/admin/*
router.use(function (req, res, next) {
  if (req.user.tipo_usr !== 1) {
    res.status(403).json({
      status: 'Petición denegada. Permisos insuficientes'
    })
  }
  next()
})
// RUTAS AMBULANCIAS
router.get('/a', async (req, res) => {
  try {
    const { rows } = await bd.query('SELECT * FROM get_a()')
    res.json(rows)
  } catch (err) {
    res.json({ state: 'error', content: err })
  }
})
router.post('/a', async (req, res) => {
  try {
    var { num_placa_a, num_economico_a, estado_a, posicion_actual_a } = req.body
    if (typeof num_placa_a === 'undefined') { num_placa_a = '' }
    if (typeof num_economico_a === 'undefined') { num_economico_a = '' }
    if (typeof estado_a === 'undefined') { estado_a = '' }
    if (typeof posicion_actual_a === 'undefined') { posicion_actual_a = '' }
    const { rows } = await bd.query('SELECT * FROM post_a($1,$2,$3,point($4,$5))', [num_placa_a, num_economico_a, estado_a, posicion_actual_a.x, posicion_actual_a.y])
    res.json(rows)
  } catch (err) {
    res.json({ state: 'error', content: err })
  }
})
router.get('/a/:id_a', async (req, res) => {
  try {
    const { rows } = await bd.query('SELECT * FROM get_a()')
    res.json(rows)
  } catch (err) {
    res.json({ state: 'error', content: err })
  }
})
router.put('/a/:id_a', async (req, res) => {
  try {
    const { id_a } = req.params
    var { num_placa_a, num_economico_a, estado_a, posicion_actual_a } = req.body
    if (typeof num_placa_a === 'undefined') { num_placa_a = '' }
    if (typeof num_economico_a === 'undefined') { num_economico_a = '' }
    if (typeof estado_a === 'undefined') { estado_a = '' }
    if (typeof posicion_actual_a === 'undefined') { posicion_actual_a = '' }
    const { rows } = await bd.query('SELECT * FROM put_a($1,$2,$3,$4,point($5,$6))', [id_a, num_placa_a, num_economico_a, estado_a, posicion_actual_a.x, posicion_actual_a.y])
    res.json(rows)
  } catch (err) {
    console.log(err)
    res.json({ state: 'error', content: err })
  }
})
router.delete('/a/:id_a', async (req, res) => {
  try {
    const { id_a } = req.params
    const { rows } = await bd.query('SELECT * FROM delete_a($1)', [id_a])
    res.json(rows)
  } catch (err) {
    res.json({ state: 'error', content: err })
  }
})

// RUTAS PACIENTES

router.get('/p', async (req, res) => {
  try {
    const { rows } = await bd.query('SELECT * FROM pacientes')
    res.json(rows)
  } catch (err) {
    res.status(304).json({ state: 'error', content: err })
  }
})
//     .post()
// router.route('/p/:id_p')
//     .get()
//     .put()
//     .delete()
router.get('/pt', async (req, res) => {
  try {
    const { rows } = await bd.query('SELECT peticiones.id_pt,\
      peticiones.id_p,\
      peticiones.ubicacion_pt,\
      peticiones.direccion_pt,\
      to_char(timestamp_pt,\'DD-MM-YYYY\') AS fecha_pt,\
      to_char(timestamp_pt,\'HH:MI\') AS hora_pt,\
      peticiones.resuelto,\
      pacientes.apellido_paterno_prs || \' \' || pacientes.apellido_materno_prs || \' \' || pacientes.nombre_prs AS nombre_prs\
      FROM perfiles.pacientes INNER JOIN peticiones.peticiones\
      ON peticiones.id_p = pacientes.id_p\
      ORDER BY to_char(timestamp_pt,\'YYYY-MM-DD\') DESC')
    res.json(rows)
  } catch (err) {
    res.json({ state: 'error', content: err })
  }
})
router.get('/pt/:id_pt', async (req, res) => {
  try {
    const { id_pt } = req.params
    const { rows } = await bd.query('SELECT * FROM get_pt($1)', [id_pt])
    res.json(rows)
  } catch (err) {
    res.json({ state: 'error', content: err })
  }
})
router.put('/pt/:id_pt', async (req, res) => {
  try {
    const { id_pt } = req.params
    var { ubicacion_pt, direccion_pt, id_p } = req.body
    if (typeof ubicacion_pt === 'undefined') { ubicacion_pt = '' }
    if (typeof direccion_pt === 'undefined') { direccion_pt = '' }
    if (typeof id_p === 'undefined') { id_p = '' }
    const { rows } = await bd.query('SELECT put_pt($1,point($2,$3),$4,$5,$6)', [id_pt, ubicacion_pt.x, ubicacion_pt.y, direccion_pt, id_p, id_cm])
    res.json(rows)
  } catch (err) {
    console.log(err)
    res.json({ state: 'error', content: err })
  }
})
router.delete('/pt/:id_pt', async (req, res) => {
  try {
    const { id_pt } = req.params
    const { rows } = await bd.query('SELECT delete_pt($1)', [id_pt])
    res.json(rows)
  } catch (err) {
    res.json({ state: 'error', content: err })
  }
})

// USUARIOS
router.get('/u', async (req, res) => {
  try {
    const { rows } = await bd.query('SELECT * FROM get_usr()')
    res.json(rows)
  } catch (err) {
    res.json({ state: 'error', content: err })
  }
})

router.put('/u/:id_p', async (req, res) => {
  try {
    const { id_p } = req.params
    var { nombre_prs, apellido_paterno_prs, apellido_materno_prs, telefono_usr, ocupacion_prs, sexo_prs, tipo_sangre_p, fecha_nacimiento_prs, nss_p, email_usr,contrasena_usr } = req.body
    if (typeof nombre_prs === 'undefined') { nombre_prs = '' }
    if (typeof apellido_paterno_prs === 'undefined') { apellido_paterno_prs = '' }
    if (typeof apellido_materno_prs === 'undefined') { apellido_materno_prs = '' }
    if (typeof telefono_usr === 'undefined') { telefono_usr = '' }
    if (typeof ocupacion_prs === 'undefined') { ocupacion_prs = '' }
    if (typeof sexo_prs === 'undefined') { sexo_prs = '' }
    if (typeof tipo_sangre_p === 'undefined') { tipo_sangre_p = '' }
    if (typeof fecha_nacimiento_prs === 'undefined') { fecha_nacimiento_prs = '' }
    if (typeof nss_p === 'undefined') { nss_p = '' }
    if (typeof email_usr === 'undefined') { email_usr = '' }
    if (typeof contrasena_usr === 'undefined') { email_usr = '' }
    const { rows } = await bd.query('SELECT * FROM put_usr($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', [id_p, nombre_prs, apellido_paterno_prs, apellido_materno_prs, telefono_usr, ocupacion_prs, sexo_prs, tipo_sangre_p, fecha_nacimiento_prs, nss_p, email_usr,contrasena_usr])
    res.json(rows)
  } catch (err) {
    console.log(err)
    res.json({ state: 'error', content: err })
  }
})

router.put('/info_u/:id_p', async (req, res) => { //Info usuario
  try {
    const { id_p } = req.params
    var { nombre_prs, apellido_paterno_prs, apellido_materno_prs, telefono_usr, ocupacion_prs, sexo_prs, tipo_sangre_p, fecha_nacimiento_prs, nss_p, email_usr,contrasena_usr } = req.body
    if (typeof nombre_prs === 'undefined') { nombre_prs = '' }
    if (typeof apellido_paterno_prs === 'undefined') { apellido_paterno_prs = '' }
    if (typeof apellido_materno_prs === 'undefined') { apellido_materno_prs = '' }
    if (typeof telefono_usr === 'undefined') { telefono_usr = '' }
    if (typeof ocupacion_prs === 'undefined') { ocupacion_prs = '' }
    if (typeof sexo_prs === 'undefined') { sexo_prs = '' }
    if (typeof tipo_sangre_p === 'undefined') { tipo_sangre_p = '' }
    if (typeof fecha_nacimiento_prs === 'undefined') { fecha_nacimiento_prs = '' }
    if (typeof nss_p === 'undefined') { nss_p = '' }
    if (typeof email_usr === 'undefined') { email_usr = '' }
    if (typeof contrasena_usr === 'undefined') { email_usr = '' }
    const { rows } = await bd.query('SELECT * FROM put_usr($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', [id_p, nombre_prs, apellido_paterno_prs, apellido_materno_prs, telefono_usr, ocupacion_prs, sexo_prs, tipo_sangre_p, fecha_nacimiento_prs, nss_p, email_usr,contrasena_usr])
    res.json(rows)
  } catch (err) {
    console.log(err)
    res.json({ state: 'error', content: err })
  }
})

export default router
