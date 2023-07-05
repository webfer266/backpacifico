const {Schema,model} = require('mongoose');

const UserSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    cedula: {
        type: Number
    },
    celular: {
        type: Number
    },
    direccion: {
        type: String
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('User',UserSchema);