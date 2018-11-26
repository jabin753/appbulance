const bd = require('../config/dbConnection');
module.exports = app => {

    app.all('/api/*', async (req, res, next) => {
        console.log('API call')
        if (req.user === undefined) {
            res.status(403).json({
                status: 'Petición denegada, debes de contar con una sesión abierta'
            })
        }
        else next()
    })
    app.all('/api/admin/*', async (req, res, next) => {
        console.log('API admin call')
        if (req.user.tipo_usr !== 1) {
            res.status(403).json({
                status: 'Petición denegada. Permisos insuficientes'
            })
        }
        next()
    })
    //AMBULANCIAS
    app.get('/api/admin/a', async (req, res) => {
        try {
            const { rows } = await bd.query('SELECT * FROM get_a()')
            res.json(rows)
        }
        catch (err) {
            res.json({ state: "error", content: err })
        }

    })
    app.get('/api/admin/a/:id_a', async (req, res) => {
        try {
            const { id_a } = req.params
            const { rows } = await bd.query('SELECT * FROM get_a($1)', [id_a])
            res.json(rows)
        }
        catch (err) {
            res.json({ state: "error", content: err })
        }
    })
    app.post('/api/admin/a', async (req, res) => {
        try {
            var { num_placa_a, num_economico_a, estado_a, posicion_actual_a } = req.body
            if (typeof num_placa_a === 'undefined') { num_placa_a = ''; }
            if (typeof num_economico_a === 'undefined') { num_economico_a = ''; }
            if (typeof estado_a === 'undefined') { estado_a = ''; }
            if (typeof posicion_actual_a === 'undefined') { posicion_actual_a = ''; }
            const { rows } = await bd.query('SELECT * FROM post_a($1,$2,$3,point($4,$5))', [num_placa_a, num_economico_a, estado_a, posicion_actual_a.x, posicion_actual_a.y])
            res.json(rows)
        }
        catch (err) {
            res.json({ state: "error", content: err })
        }
    })
    app.put('/api/admin/a/:id_a', async (req, res) => {
        try {
            const { id_a } = req.params
            var { num_placa_a, num_economico_a, estado_a, posicion_actual_a } = req.body
            if (typeof num_placa_a === 'undefined') { num_placa_a = ''; }
            if (typeof num_economico_a === 'undefined') { num_economico_a = ''; }
            if (typeof estado_a === 'undefined') { estado_a = ''; }
            if (typeof posicion_actual_a === 'undefined') { posicion_actual_a = ''; }
            const { rows } = await bd.query('SELECT * FROM put_a($1,$2,$3,$4,point($5,$6))', [id_a, num_placa_a, num_economico_a, estado_a, posicion_actual_a.x, posicion_actual_a.y])
            res.json(rows)
        }
        catch (err) {
            console.log(err);
            res.json({ state: "error", content: err })
        }
    })
    app.delete('/api/admin/a/:id_a', async (req, res) => {
        try {
            const { id_a } = req.params
            const { rows } = await bd.query('SELECT * FROM delete_a($1)', [id_a])
            res.json(rows)
        }
        catch (err) {
            res.json({ state: "error", content: err })
        }
    })

    //PACIENTES
    app.get('/api/admin/p', async (req, res) => {
        try {
            const { rows } = await bd.query('SELECT * FROM pacientes');
            res.json(rows);
        }
        catch (err) {
            res.status(304).json({ state: "error", content: err })
        }
    })
    //PETICIONES
    app.get('/api/admin/pt', async (req, res) => {
        try {
            const { rows } = await bd.query('SELECT\
            peticiones.*,\
            pacientes.nombre_prs, \
            pacientes.apellido_paterno_prs, \
            pacientes.apellido_materno_prs \
          FROM \
            perfiles.pacientes, \
            peticiones.peticiones \
          WHERE \
            peticiones.id_p = pacientes.id_p;')
            res.json(rows)
        }
        catch (err) {
            res.json({ state: "error", content: err })
        }

    })
    app.get('/api/admin/pt/:id_pt', async (req, res) => {
        try {
            const { id_pt } = req.params
            const { rows } = await bd.query('SELECT * FROM get_pt($1)', [id_pt])
            res.json(rows)
        }
        catch (err) {
            res.json({ state: "error", content: err })
        }
    })
    // For user.tipo_usr = 2
    app.post('/api/pt', async (req, res) => {
        try {
            var { ubicacion_pt_x, ubicacion_pt_y, direccion_pt } = req.body
            var { id_p } = req.user
            if (typeof ubicacion_pt === 'undefined') { ubicacion_pt = ''; }
            if (typeof direccion_pt === 'undefined') { direccion_pt = ''; }
            const { rows } = await bd.query('SELECT * FROM post_pt(point($1,$2),$3,$4)', [ubicacion_pt_x, ubicacion_pt_y, direccion_pt, id_p])
            res.json(rows)
        }
        catch (err) {
            console.log(err)
            res.json({ state: "error", content: err })
        }
    })
    app.put('/api/admin/pt/:id_pt', async (req, res) => {
        try {
            const { id_pt } = req.params
            var { ubicacion_pt, direccion_pt, id_p } = req.body
            if (typeof ubicacion_pt === 'undefined') { ubicacion_pt = ''; }
            if (typeof direccion_pt === 'undefined') { direccion_pt = ''; }
            if (typeof id_p === 'undefined') { id_p = ''; }
            const { rows } = await bd.query('SELECT put_pt($1,point($2,$3),$4,$5,$6)', [id_pt, ubicacion_pt.x, ubicacion_pt.y, direccion_pt, id_p, id_cm])
            res.json(rows)
        }
        catch (err) {
            console.log(err);
            res.json({ state: "error", content: err })
        }
    })
    app.delete('/api/admin/pt/:id_pt', async (req, res) => {
        try {
            const { id_pt } = req.params
            const { rows } = await bd.query('SELECT delete_pt($1)', [id_pt])
            res.json(rows)
        }
        catch (err) {
            res.json({ state: "error", content: err })
        }
    })
}