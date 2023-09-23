const jwt = require("jsonwebtoken")
const UserModel = require("../model/models")
require("dotenv").config()

const setup_profile = (req, res, next) => {
    const auth_headers = req.headers.authorization
    const token = auth_headers.split(" ")[1]

    if (!token) {
        return res.json({
            message: "You are not authorized to access this page."
        })
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "You are not authorized to access this page."
                })
            }

            let pos = 0
            req.body.languagesLearning.forEach((language, i) => {
                if (i > 0) {
                    if (language.language === req.body.languagesLearning[pos].language) {
                        return res.status(400).json({
                            message: "You can't provide same languages twice."
                        })
                    }
                    pos++
                }
            })

            const result = await UserModel.updateOne({_id: decoded.id}, req.body)

            const {password, ...rest} = result
            res.status(200).json(rest)
        })
}

module.exports = setup_profile