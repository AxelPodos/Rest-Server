// Importamos modelo Rol y Usuario
const Role = require('../models/role')
const Usuario = require('../models/usuario')

// Verifica si el rol es válido
const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol})
    if (!existeRol) {
       throw Error(`El rol ${rol} no está registrado en la BD`)
    }
 }

 // Valida si existe el mail
 const emailExiste = async(correo = '') => {
    const existeMail = await Usuario.findOne({correo})
    if (existeMail) {
       throw new Error(`El correo: ${correo} ya está registrado en la BD`)
    }
 }

  // Valida si existe un usuario con ese ID
  const existeUsuarioConId = async(id = '') => {
   const existeUsuario = await Usuario.findById(id)
   if (!existeUsuario) {
      throw new Error(`El ID no existe: ${id}`)
   }
}

 module.exports = {
     esRolValido,
     emailExiste,
     existeUsuarioConId
 }