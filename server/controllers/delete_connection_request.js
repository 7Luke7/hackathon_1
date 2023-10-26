const jwt = require("jsonwebtoken")
const FriendRequest = require("../model/Friend")
const UserModel = require("../model/models")

const delete_connection_request = (req, res, next) => {
    try {
        const auth_headers = req.headers.authorization
        const token = auth_headers.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "You are not authorized to access this page."
            })
        }

        jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {

            const requests = await FriendRequest.findById(req.params.id)

            const update_sender = await UserModel.findByIdAndUpdate(requests.sender, {$pull: {
                    outgoingFriendRequests: requests.recipient
            }});
        
                // Update recipient's incomingFriendRequests
            const update_recipient = await UserModel.findByIdAndUpdate(requests.recipient, {$pull: {
                incomingFriendRequests: requests.sender 
            }});

            await FriendRequest.findByIdAndDelete(requests._id)                
            res.status(200).json({removed: true})
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = delete_connection_request