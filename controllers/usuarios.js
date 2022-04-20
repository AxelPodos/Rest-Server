// Separar las rutas y el controlador de la clase

// Desestructura function Router (por defecto de express)
const { response } = require('express')

// GET. Extraemos los queryparams que vienen por URL. Desestructuramos lo que interesa
const usuariosGet = (req, res = response) => {
    const {id, nombre = "No Name", apellido} = req.query
    res.status(200).json({
        msg: 'Usuario devuelto - Desde Controller',
        id,
        nombre,
        apellido
    })
}

// PUT. Requiere un request que viene como parametro en la URL. Ejemplo ID de usuario p/modificar
const usuariosPut = (req, res = response) => {
    const id = req.params.id
    res.status(200).json({
        msg: 'Usuario modificado - Desde Controller',
        id
    })
}

// POST. Requiere un request por el body. Desestructuramos lo que interesa. Ejemplo creacion de usuario
const usuariosPost = (req, res = response) => {
    const { nombre, edad, id } = req.body
    res.status(200).json({
        msg: 'Usuario creado - Desde Controller',
        nombre,
        edad,
        id
    })
}

const usuariosDelete = (req, res = response) => {
    res.status(200).json({
        msg: 'Usuario eliminado - Desde Controller'
    })
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