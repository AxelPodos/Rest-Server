// Mongoose, ODM que permite definicion de objetos tipados que se asigaran a MongoDB
const mongoose = require('mongoose')

// Conexion a MongoDB, que pide nuestro URL de conexion, y una serie de objetos por defecto de mongoose
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Base de datos online');

    } catch (error) {
        console.log(error.message)
        throw new Error('Error a la hora de inicializar la base de datos')
    }
}

module.exports = {
    dbConnection
}