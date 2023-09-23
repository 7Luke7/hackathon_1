const mongoose = require("mongoose")

const connection_function = async () => {
    try {
        await mongoose.connect("mongodb+srv://Luka:iMBmNDY0SllE0m5Z@cluster0.nuj84.mongodb.net/Language_exchange")
        console.log("Connected to database")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connection_function