require("dotenv").config()
const jwt = require("jsonwebtoken")
const UserModel = require("../model/models")

const delete_connection = async (req, res, next) => {
    try {
        const auth_headers = req.headers.authorization
        const token = auth_headers.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "You are not authorized to access this page."
            })
        }

        jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {

            const delete_for_one = await UserModel.findByIdAndUpdate(decoded.id, {$pull: {friends: req.params.id}})  
            const delete_for_two = await UserModel.findByIdAndUpdate(req.params.id, {$pull: {friends: decoded.id}})  

            res.status(200).json({
                removed: true
            })
        })
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = delete_connection