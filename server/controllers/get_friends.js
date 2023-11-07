require("dotenv").config()
const jwt = require("jsonwebtoken")
const UserModel = require("../model/models")

const get_friends = async (req, res, next) => {        
    try {

        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "Not authorized"
            })
        }
      const auth_headers = req.headers.authorization
      const token = auth_headers.split(" ")[1]
        
      jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
        const friends = await UserModel.findById(decoded.id).populate('friends').exec()

        const friends_mapped = friends.friends.map((f) => ({
            id: f._id.toString(),
            username: f.username,
            conversationId: f.conversation.toString()
        }))

        return res.status(200).json(friends_mapped)
      })

    } catch (error) {
        console.log(error)
    }
}

module.exports = get_friends