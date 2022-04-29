// Optimizacion de importaciones en NODE

// Importamos el middleware de validador campos
const validaCampos = require('../middleware/validarCampos')

// Importamos el middleware de validador Tokens       
const validaJWT = require('../middleware/validarJWT')

// Importamos el middleware de validador de roles
const validaRoles = require('../middleware/validarRoles')

module.exports = {
    ...validaCampos, 
    ...validaJWT, 
    ...validaRoles
}