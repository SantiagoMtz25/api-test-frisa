const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();  

const connection = async() => {
    try {
        const conn = await mongoose.connect( process.env.DB_URL || 'mongodb+srv://mongodb:XGFgy1CM8f0vGSIb@cluster0.bdlshv5.mongodb.net/' );
        console.log(`Database conection succesful, mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = connection