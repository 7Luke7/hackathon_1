const Connection = require("../model/Connection")
const UserModel = require("../model/models")

const accept_connection = async (req, res, next) => {
    try {
        console.log(req.body)
        const update_connection = await Connection.findByIdAndUpdate(req.params.id, req.body)  
        const sender = await UserModel.findById(update_connection.senderId)
        res.status(200).json({
            message: `Congratulations you became friends with ${sender.username}`
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = accept_connection