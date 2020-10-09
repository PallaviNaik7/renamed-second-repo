"use strict"

const getUser = async(userId,models)=>{

    var [users] = await models.user.findAll({
        attributes:[
            'id', 'firstname'
        ],
        where:{
            id:userId
        }
    }

    )
    console.log(users.dataValues)

    var [user] = await models.sequelize.query(
        `SELECT u."id",u."firstname",u."lastname",u."email",u."phone" 
        FROM users AS u
        WHERE u."id" = ${userId}`
    ) 
    return Promise.resolve(user)
}

module.exports = {
    getUser,
}