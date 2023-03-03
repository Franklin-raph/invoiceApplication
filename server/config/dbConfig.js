const mongoose = require('mongoose')
require("dotenv").config();
const dbConnectionString = process.env.MONGO_REMOTE_URL

mongoose.set("strictQuery", true);

const dbConnectionMethod = async () => {
    try {
        await mongoose.connect(dbConnectionString)
        console.log("Db Connected")
    } catch (error) {
        console.log(Error)
        process.exit(1)
    }
}

module.exports = { dbConnectionMethod }