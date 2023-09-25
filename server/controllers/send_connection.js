const Connection = require("../model/Connection");
const jwt = require("jsonwebtoken")

const send_connection = async (req, res, next) => {
    try {

      const auth_headers = req.headers.authorization
      const token = auth_headers.split(" ")[1]
    
      jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
        
        const {receiverId} = req.body;

        if (!receiverId) {
          return res.status(400).json({
            message: "Bad request."
          })
        }
    
        const connection = new Connection({
          senderId: decoded.id,
          receiverId,
        });
    
        await connection.save();
    
        res.status(200).json({ message: 'Connection request sent successfully' });
        })
      } catch (error) {
        console.error(error);
      }
}

module.exports = send_connection