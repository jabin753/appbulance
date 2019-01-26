'use strict'

const setupDatabase = require('./../lib/db')
const setupUser = require('./../lib/user')
const setupUserModel = require('./../model/usuario')
//const setup[...]Model...
module.exports = async function (config) {
    const sequelize = setupDatabase(config)
    const UserModel = setupUserModel(config)

    await sequelize.authenticate()
    //relations btw models

    if(config.setup) {
        await sequelize.sync({force: true})
    }
    const User = setupUser(UserModel)
    return {
        User,
        sequelize
    }
}

