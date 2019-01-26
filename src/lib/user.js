'use strict'
module.exports = function setupUser (UserModel) {
    function findAll(cond) {
        return UserModel.findAll(cond)
    }
    function findByUuid (uuid) {
        return UserModel.findOne({
            where: {uuid}
        })
    }
    return {
        findAll,
        findByUuid
    }
}