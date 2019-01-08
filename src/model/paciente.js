'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupPacienteModel(config) {
    const sequelize = setupDatabase(config)

	return sequelize.define('paciente', {
        idUsr: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: sequelize.fn('uuid_generate_v4'),
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
        },
		idPrs: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: sequelize.fn('uuid_generate_v4'),
			field: 'id_prs'
		},
		nombrePrs: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'nombre_prs'
		},
		apellidoPaternoPrs: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'apellido_paterno_prs'
		},
		apellidoMaternoPrs: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'apellido_materno_prs'
		},
		fechaNacimientoPrs: {
			type: Sequelize.DATEONLY,
			allowNull: true,
			field: 'fecha_nacimiento_prs'
		},
		sexoPrs: {
			type: Sequelize.CHAR,
			allowNull: true,
			field: 'sexo_prs'
		},
		ocupacionPrs: {
			type: Sequelize.TEXT,
			allowNull: true,
			field: 'ocupacion_prs'
		},
		idP: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: sequelize.fn('uuid_generate_v4'),
			primaryKey: true,
			field: 'id_p'
		},
		idCm: {
			type: Sequelize.UUID,
			allowNull: true,
			field: 'id_cm'
		},
		tipoSangreP: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'tipo_sangre_p'
		},
		nssP: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'nss_p'
		}
	}, {
        schema: 'perfiles',
		tableName: 'pacientes'
	});
};

