const User = require('../models/user');
const bcryptjs = require("bcryptjs");
const Api = require('../helpers/reponse-Api')



const getUser = async (req, res) => {
    const responseApi = new Api()
    try {
        const { desde = 0, limite = 5 } = req.query;

        const query = { estado: true }

        const [total, user] = await Promise.all([
            User.find(query).count(),
            User.find(query)
                .limit(Number(limite))
                .skip(Number(desde))
        ]);
        if (total === 0) {
            responseApi.setState("200", "success", "Users not found")
            responseApi.setResult({ total, user })
        } else {
            responseApi.setState("200", "success", "Users found")
            responseApi.setResult({ total, user })
        }
    } catch (error) {
        responseApi.setState("500", "error", "Request Failed");
        responseApi.setResult(error);

    }
    res.json(responseApi.toResponse());
}

const getUserById = async (req, res) => {
    const responseApi = new Api()

    const { id } = req.params;
    const user = await User.findById(id);
    (user) ? responseApi.setResult(user) : responseApi.setState("404", "error", "User with id${id} not found");
    res.json(responseApi.toResponse());
}

const createUser = async (req, res) => {
    const responseApi = new Api()
    const { nombre, password, rol, correo } = req.body;

    const user = new User({ nombre, correo, rol, password });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    user.save();

    responseApi.setState("201", "success", "User created successfully")
    responseApi.setResult(user)

    res.json(responseApi.toResponse());
}

const updateUser = async (req, res) => {
    const responseApi = new Api()

    const { id } = req.params;
    const { _id, google, password, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto, { new: true });
    await user.save();

    responseApi.setState("201", "success", "User updated successfully")
    responseApi.setResult(user)

    res.json(responseApi.toResponse());
}

const deleteUser = async (req, res) => {
    const responseApi = new Api()

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { estado: false }, { new: true });

    responseApi.setState("201", "success", "User deleted successfully")
    responseApi.setResult(user)

    res.json(responseApi.toResponse());
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}