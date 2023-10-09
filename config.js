const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();  

//const url = process.env.DB_URL
const connection = async() => {
    try {
        const conn = await mongoose.connect( "mongodb+srv://mongodb:XGFgy1CM8f0vGSIb@cluster0.bdlshv5.mongodb.net/frisa_app_db" );
        console.log(`Database conection succesful, mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error.message)
    }
}


module.exports = connection