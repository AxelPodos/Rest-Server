// Modelo Usuario. Extraemos el Schema y model
const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        //enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'] Comenté el enum de roles para verificacion desde la database roles en Mongo
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

// Funcion para sacar campos que no nos interesa que sean devueltos (en este caso el password y el __v). Chequear en Postman
UsuarioSchema.methods.toJSON = function() {
    const {__v, password, ...usuario} = this.toObject()
    return usuario
}

// Usando el model, exportamos. La palabra Usuarios: nombre coleccion
module.exports = model('Usuario', UsuarioSchema)