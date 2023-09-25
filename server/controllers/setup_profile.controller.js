const jwt = require("jsonwebtoken")
const UserModel = require("../model/models")
require("dotenv").config()

const setup_profile = (req, res, next) => {
    const auth_headers = req.headers.authorization
    const token = auth_headers.split(" ")[1]
    
    jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
            const result = await UserModel.findByIdAndUpdate(decoded.id, req.body)

            const {password, ...rest} = result
            res.status(200).json(rest)
        })
}

module.exports = setup_profile