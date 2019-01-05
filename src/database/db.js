'use strict'

const setupDatabase = require('./../lib/db')
const setupUserModel = require('./../model/usuario')
//const setup[...]Model...
module.exports = async function (config) {
    const sequelize = setupDatabase(config)
    const UserModel = setupUserModel(config)

    await sequelize.authenticate()
    //relations btw models

    if(config.setup) {
        await sequelize.createSchema('perfiles')
        await sequelize.sync({force: true})
    }
    const User = {}
    return {
        User
    }
}

