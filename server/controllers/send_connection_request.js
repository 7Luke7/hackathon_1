const jwt = require("jsonwebtoken");
const UserModel = require("../model/models");
const FriendRequest = require("../model/Friend");

const send_connection_request = async (req, res, next) => {
    try {
        const auth_headers = req.headers.authorization
        const token = auth_headers.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "You are not authorized to access this page."
            })
        }

        jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {

            const friendRequest = await new FriendRequest({
                sender: decoded.id,
                recipient: req.params.id,
            });
            
            const update_sender = await UserModel.findByIdAndUpdate(decoded.id, {
                $push: { outgoingFriendRequests: req.params.id } 
            });


            // Update recipient's incomingFriendRequests
            const update_recipient = await UserModel.findByIdAndUpdate(req.params.id, {
                $push: {incomingFriendRequests: decoded.id}
            });


            friendRequest.save();

            return res.status(200).json({removed: false})
        })
    } catch (error) {
        console.log(error)
    }
} 

module.exports = send_connection_request