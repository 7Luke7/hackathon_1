const jwt = require("jsonwebtoken")
const UserModel = require("../model/models")

const get_user_controller_handler = async (req, res, next) => {
    try {

        const auth_headers = req.headers.authorization
        const token = auth_headers.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "You are not authorized to access this page."
            })
        }

        jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
            const user = await UserModel.findById(req.params.id)
            const isSent = user.incomingFriendRequests.filter((r) => {
                return r.toString() === decoded.id
            })

            const isFriends = user.friends.filter((r) => {
                return r.toString() === decoded.id
            })
            

            const {password, email, friends, outgoingFriendRequests, conversation, incomingFriendRequests, ...rest} = user._doc

            return res.status(200).json({
                rest: rest,
                isSent,
                isFriends
            })
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = get_user_controller_handler