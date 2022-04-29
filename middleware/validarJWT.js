// Middleware, solo pueden hacer delete usuario con token valido
const { response, request } = require('express')

const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token')
    
    // Si no llega token por header
    if (!token) {
        return res.status(401).json ({
            msg: 'No hay token en la peticion'
        })
    }

    // El token que llega por header debe ser concordante con la key
    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const usuario =  await Usuario.findById(uid)

        // Si el usuario no existe
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido. Usuario no existente'
            })
        }

        // Si el usuario tiene estado false, no deberia poder eliminarse
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido. Usuario en estado FALSE'
            })
        }

        req.usuario = usuario
     
        next()

    } catch (error) {

        console.log(error)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }    
}

module.exports = {
    validarJWT
}