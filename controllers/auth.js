const bcryptjs = require('bcryptjs')
const { response } = require('express')
const { generarJWT } = require('../helpers/generarJWT')
const Usuario = require('../models/usuario')


const login = async(req, res = response) => {

    const { correo, password } = req.body

    try {
        
        // Verificar si usuario/correo existe en la BD
        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario o Password no son correctos'
            })
        }

        // Verificar si usuario esta activo en la BD
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario no activo en la BD'
            })
        }

        // Verificar password comparando el del body con el de la BD
        const validPass = bcryptjs.compareSync(password, usuario.password)
        if (!validPass) {
            return res.status(400).json({
                msg: 'El password no es correcto'
            })
        }

        // Generar JWT 
        const token = await generarJWT(usuario.id)
               
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.statys(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}