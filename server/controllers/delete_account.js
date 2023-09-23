const UserModel = require("../model/models")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const delete_account = async (req, res, next) => {
    try {
        const auth_headers = req.headers.authorization
        const token = auth_headers.split(" ")[1]

        if (!token) {
            return res.json({
                message: "You are not authorized to access this page."
            })
        }

        jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
            if (err) {
                return res.json({
                   message: "You are not authorized to access this page."
                })
            }

            const result = await UserModel.findByIdAndDelete(decoded.id)

            if (!result) {
                return res.json({
                    message: "User doesn't exists."
                })
            }
            res.json({
                message: "User successfuly deleted."
            })
        })
    } catch (error) {
        
    }
}

module.exports = delete_account