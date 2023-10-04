const FriendRequest = require("../model/Friend")

const delete_connection = async (req, res, next) => {
    try {
        const delete_con = await FriendRequest.findByIdAndUpdate(req.params.id, {status})  
        res.status(200).json({
            message: "Declined successfully."
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = delete_connection