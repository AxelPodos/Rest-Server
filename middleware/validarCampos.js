// Al inicio de cualquier request, verificamos posibles error de los request en nuestra API

// Desestructura function validationResult (por defecto de express validator)
const { validationResult } = require('express-validator')

// Los middlewares tienen un tercer parametro llamado next
const validarCampos = (req, res, next) => {
    const errors = validationResult(req) 
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    next()
}

module.exports = {
    validarCampos
}