const UserModel = require("../model/models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const sign_in_controller = async (req, res, next) => {
    const user = await UserModel.findOne({"email": req.body.email})
    if (!user) {
        return res.json({
            message: "User is with provided email doesn't exist."
        })
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) throw Error("error occured while crytping.")

        if (!result) {
            return res.json({
                message: "Password doesn't match."
            })
        }

        jwt.sign({"id": user._id}, process.env.TOKEN_KEY, {expiresIn: "7d"}, (err, token) => {
            if (err) throw Error("couldn't create a token.")
            res.status(200).json({
                token: token
            })
        })
        
    })
}

module.exports = sign_in_controller