"use strict"

const deleteUser = async(userId,models) => {
    var user = await models.user.destroy({
        where:{
            id: userId
        }
    })
    return Promise.resolve('user deleted')
}

module.exports = {
    deleteUser,
}