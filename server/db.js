const mongoose = require("mongoose");

const db = async ()=> {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Terkoneksi ${conn.connection.host}`);
    } catch (error){
        console.error("gagal terkoneksi");
        process.exit(1);
    }
}

module.exports = db;