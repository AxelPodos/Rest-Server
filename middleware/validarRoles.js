const { response, request } = require('express')

// Middleware para validar acciones del ADMIN_ROLE
const esAdministrador = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        })
    }

    const { rol, nombre } = req.usuario

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} Inválido. No es administrador`
        })
    }

    next()
}

// Middleware para verificar roles validos
const tieneRol = (...roles) => {

    return (req = request, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            })
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(500).json({
                msg: `El servicio requiere uno de estos roles: ${roles} --- Usted es: ${req.usuario.rol}`
            })
        }

        next()
    }
}

module.exports = {
    esAdministrador,
    tieneRol
}