const jwt = require("jsonwebtoken")
const FriendRequest = require("../model/Friend")
const UserModel = require("../model/models")

const send_connection = async (req, res, next) => {
    try {

      
      const auth_headers = req.headers.authorization
      const token = auth_headers.split(" ")[1]
    
      jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
        
        const {recipient} = req.body;

        if (!recipient) {
          return res.status(400).json({
            message: "Bad request."
          })
        }
    
        const friendRequest = new FriendRequest({
          sender: decoded.id,
          recipient,
        });
    
        await friendRequest.save();

        await UserModel.findByIdAndUpdate(decoded.id, {
          $push: { outgoingFriendRequests: friendRequest._id }
        });
    
        // Update recipient's incomingFriendRequests
        await UserModel.findByIdAndUpdate(recipient, {
          $push: { incomingFriendRequests: friendRequest._id }
        });
    
        res.status(200).json({ message: 'Connection request sent successfully' });
        })
      } catch (error) {
        console.error(error);
      }
}

module.exports = send_connection