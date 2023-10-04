const jwt = require("jsonwebtoken")
// const Friend = require("../model/Friend")
const UserModel = require("../model/models")
const FriendRequest = require("../model/Friend")

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
        // const friend_requests = await FriendRequest.find({recipient: decoded.id}).populate('sender').exec()
        const friends = await UserModel.findById(decoded.id).populate('friends.friends').exec()

        console.log(friends.friends)

        return res.status(200).json(friends)
      })

    } catch (error) {
        console.log(error)
    }
}

module.exports = get_friends