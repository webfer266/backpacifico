const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbConnection = async () =>{

    try {
        
        await mongoose.connect(process.env.CONNECTION_BD,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4
        });

        console.log('Base de datos conectada correctamente');

    } catch (error) {
       console.log(error); 
       throw new Error('Error al conectar la base de datos')
    }
}

module.exports = {
    dbConnection
}