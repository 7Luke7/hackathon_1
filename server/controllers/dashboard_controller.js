require("dotenv").config()
const jwt = require("jsonwebtoken")
const UserModel = require("../model/models")

const dashboard_controller = (req, res, next) => {
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

            const user = await UserModel.findById(decoded.id)
            
            const {password, ...rest} = user._doc
            res.status(200).json(rest)
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = dashboard_controller