'use strict'

const setupDatabase = require('./../lib/db')
const setupUsuarioModel = require('./../model/usuario')
const setupPersonaModel = require('./../model/persona')
const setupPacienteModel = require('./../model/paciente')

//const setup[...]Model...
module.exports = async function (config) {
    const sequelize = setupDatabase(config)
    const UsuarioModel = setupUsuarioModel(config)
    const PersonaModel = setupPersonaModel(config)
    const PacienteModel = setupPacienteModel(config)

    await sequelize.authenticate()
    //relations btw models

    if(config.setup) {
        await sequelize.sync({force: true})
    }
    const User = UsuarioModel
    const Persona = PersonaModel
    const Paciente = PacienteModel
    return {
        User,
        Persona,
        Paciente
    }
}

