// Paquete JWT para el manejo de tokens
const jwt = require('jsonwebtoken')

// Generacion de token que recibe user identifier (unique)
const generarJWT = (uid = '') => {

    return new Promise ( (resolve, reject) => {

        // payload: cuerpo del token. El uid es lo unico que se almacena en el payload
        const payload = { uid }

        // Firma de nuevo token, que pide payload, una clave secreta y tiempo de expiracion
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            } else {
                resolve(token)
            }
        })    
    })
}

module.exports = {
    generarJWT
}