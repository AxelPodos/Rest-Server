// Express basado en clases
const express = require('express')
const cors = require('cors')
const {dbConnection} = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // Autenticacion
        this.authPath = '/api/auth'

        // Conectar a BD
        this.conectarDB()

        // Middlewares
        this.middlewares()
        
        // Rutas de la App
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {

        // NPM Cors
        this.app.use(cors())

        // Lectura y parseo del body. Cualquier info desde el body, la intenta serializar
        this.app.use(express.json())

        // Directorio Publico
        this.app.use(express.static('public'))
    }

    // Patch principal que requiere la ruta de user
    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
        this.app.use(this.authPath, require('../routes/auth'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}

module.exports = Server