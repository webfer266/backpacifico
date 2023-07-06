const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const User = require("../models/user");
const { reponse, request } = require('express');



const login = async  (req=request, res = reponse) => {

    const {password , correo} = req.body;
    try {

        const user = await User.findOne({correo});
        if(!user){
           return res.status(400).json({
                msg: 'User/Password not correct -correo'
            });
        }

        if (!user.estado) {
            return res.status(400).json({
                msg: 'User/Password not correct -estado'
            });
        }

        const verficarPassword = await bcryptjs.compare(password, user.password);
        if (!verficarPassword) {
             return res.status(400).json({
                msg: 'User/Password not correct -password'
            });
        }
        const token = await generateJWT(user.uid);
        
        res.json({
            user,
            token
        });  
         
        
        
    } catch (error) {
        // req.status(400).json({
        //     msg: 'Something went wrong'
        // }) 
        console.log(error);
    }
}

module.exports = {
    login
}