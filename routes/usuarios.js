// Separar las rutas y el controlador de la clase

// Desestructura function Router (por defecto de express)
const { Router } = require('express')

// Desestructura funcion check (por defecto de express validator)
const { check } = require('express-validator')

// Optimizacion de importaciones en NODE
const { validarCampos, validarJWT, esAdministrador, tieneRol } = require('../middleware/index')

// Importamos helpers        
const { esRolValido, emailExiste, existeUsuarioConId } = require('../helpers/dbValidators')

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios')

const router = Router()

router.get('/', usuariosGet)

// Check actua como un middleware de verificacion hasta llegar al PUT
router.put('/:id', [
   check('id', 'No es un ID válido').isMongoId(),
   check('id').custom(existeUsuarioConId),
   check('rol').custom(esRolValido),
   validarCampos        
], usuariosPut)

// Check actua como un middleware de verificacion hasta llegar al POST
router.post('/',[
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),                   
   check('password', 'El password debe ser de mas de 6 letras').isLength({min: 6}),                   
   check('correo', 'El correo no es válido').isEmail(),   
   check('correo').custom(emailExiste),  
   check('rol').custom(esRolValido),     
   validarCampos        
], usuariosPost)

// Check actua como un middleware de verificacion hasta llegar al DELETE
router.delete('/:id', [
   validarJWT,
   // esAdministrador,
   tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
   check('id', 'No es un ID válido').isMongoId(),
   check('id').custom(existeUsuarioConId),
   validarCampos   
] ,usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router