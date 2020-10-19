"use strict"

const createUser = async(reqbody,models) =>{
    
    const acceptedParameters = {
            
      }
    console.log(Object.keys(acceptedParam)) 
    console.log(Object.keys(reqbody))

    if(JSON.stringify(Object.keys(acceptedParam))==JSON.stringify(Object.keys(reqbody))){
        console.log(`${Object.keys(acceptedParam)} and ${Object.keys(reqbody)} are equal`)
    }else{console.log("Are not equal")}

    var user = await models.user.create({
        firstname: reqbody.firstname,
        lastname: reqbody.lastname,
        email: reqbody.email,
        phone: reqbody.phone
    })
    return Promise.resolve({ user: { id: user.id , firstname:reqbody.firstname,
    lastname: reqbody.lastname,email:reqbody.email,phone:reqbody.phone}})
}

module.exports = {
    createUser,
}