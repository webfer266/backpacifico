const User = require('../models/user');
const bcryptjs = require("bcryptjs");



const getUser = async(req, res) =>{
    try {
        const {desde = 0, limite=5} = req.query;

        const query = {estado:true}
    
        const [total, user] = await Promise.all([
            User.find(query).count(),
            User.find(query)
                .limit(Number(limite))
                .skip(Number(desde))
        ]);
    
        res.json({
            total,
            user
        })
    } catch (error) {
        throw new Error('Error en el servidor', error)
    }
 
}

const getUserById = async(req, res) =>{
    const {id} = req.params;
    const user = await User.findById(id);
    (user)?res.json(user): Error(`User with id${id} not found`);
    
}

const createUser = async(req, res) => {

    const {nombre, password, rol, correo} = req.body;

    const user = new User({nombre,correo,rol,password});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);

    user.save();
    res.status(201).json(user);
}

const updateUser = async(req, res) => {

    const {id} = req.params;
    const {_id, google, password, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password,salt);
    }

    const user = await User.findByIdAndUpdate(id, resto, {new:true});
    await user.save();

    res.json(user)
}

const deleteUser = async(req,res) => {

    const {id} = req.params;

    const usuario = await User.findByIdAndUpdate(id,{estado:false}, {new:true});

    res.json(usuario)
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}