var bd = require('../config/dbConnection')
module.exports = server => {
    const io = require('socket.io')(server)
    io.on('connection', (socket) => {
        console.log('cliente conectado:')
        socket.on('sendPetition', (data) => {
            bd.query('SELECT peticiones.id_pt,\
            peticiones.id_p,\
            peticiones.ubicacion_pt,\
            peticiones.direccion_pt,\
            to_char(timestamp_pt,\'DD-MM-YYYY\') AS fecha_pt,\
            to_char(timestamp_pt,\'HH:MI\') AS hora_pt,\
            pacientes.apellido_paterno_prs || \' \' || pacientes.apellido_materno_prs || \' \' || pacientes.nombre_prs AS nombre_prs\
            FROM perfiles.pacientes INNER JOIN peticiones.peticiones\
            ON peticiones.id_p = pacientes.id_p\
            WHERE id_pt = $1',[data.id_pt])
            .then(res => {
                io.emit('receivePetition', res.rows[0])

            })
            .catch(e => console.log(e));
            
        })

    })
}
