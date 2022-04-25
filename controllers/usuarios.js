// Separar las rutas y el controlador de la clase

// Desestructura function response (por defecto de express)
const { response } = require('express')

// Paquete para encriptar passwords
const bcryptjs = require('bcryptjs')

// Importamos modelo Usuario
const Usuario = require('../models/usuario')

// GET. Extraemos los queryparams que vienen por URL. Desestructuramos lo que interesa
const usuariosGet = async(req, res = response) => {
    
    const {limite = 15, desde = 0} = req.query
    const query = { estado: true }
    
    const usuarios = await Usuario.find(query)
        .skip( Number(desde))
        .limit( Number(limite))

    const total = await Usuario.count(query)   

    res.status(200).json({
       total,
       usuarios
    })
}

// PUT. Requiere un request que viene como parametro en la URL. Ejemplo ID de usuario p/modificar
const usuariosPut = async(req, res = response) => {
    
    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario)
}

// POST. Requiere un request por el body. Desestructuramos lo que interesa. Ejemplo creacion de usuario
const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({nombre, correo, password, rol})
    
    // Encriptar Password
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)
    
    // Grabacion de usuario
    await usuario.save()

    res.json(usuario)
}

const usuariosDelete = async (req, res = response) => {
    
    const { id } = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    
    res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
    res.status(200).json({
        msg: 'Usuario modificado - Desde Controller'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}