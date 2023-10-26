const jwt = require("jsonwebtoken")
const FriendRequest = require("../model/Friend")

const get_connections = async (req, res, next) => {
    try {
        const auth_headers = req.headers.authorization
        const token = auth_headers.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "You are not authorized to access this page."
            })
        }

        jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {

            const connection = await FriendRequest.find({recipient: decoded.id}).populate("sender").exec()

            res.status(200).json(connection)

        })
    } catch (error) {
        console.log(error)        
    }
}

module.exports = get_connections