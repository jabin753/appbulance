'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupUserModel(config) {
    const sequelize = setupDatabase(config)

    return sequelize.define('usuario', {
        idUsr: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: sequelize.fn('uuid_generate_v4'),
            primaryKey: true,
            field: 'id_usr'
        },
        emailUsr: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            field: 'email_usr'
        },
        telefonoUsr: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
            field: 'telefono_usr'
        },
        contrasenaUsr: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'contrasena_usr'
        },
        tipoUsr: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: '2',
            field: 'tipo_usr'
        },
        fechaRegistroUsr: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'fecha_registro_usr'
        },
        fechaUltimoAccesoUsr: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            field: 'fecha_ultimo_acceso_usr'
        },
        ipUltimoAccesoUsr: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'ip_ultimo_acceso_usr'
        },
        validoUsr: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'valido_usr'
        }
    }, {
            schema: 'perfiles',
            tableName: 'usuarios'
        });
}