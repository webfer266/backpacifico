const Role = require("../models/role");
const User = require("../models/user")

const existRole = async (rol= '') => {
    const role = await Role.findOne({rol});

    if(!role){
        throw new Error(`The role ${rol} does not exist`);
    }
}


const userExistsById = async (id) =>{

    const user = await User.findById(id);
    if(!user){
        throw new Error(`The user with the ${id} does not exist`);
    }
}

const userExistEmail = async (correo = '') => {

    const existEmail = await User.findOne({correo});
    if(existEmail){
        throw new Error (`The email ${correo} already exist`);
    }
}

module.exports = {
    existRole,
    userExistsById,
    userExistEmail
}