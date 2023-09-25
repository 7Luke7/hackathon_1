const Connection = require("../model/Connection")
const UserModel = require("../model/models")
const jwt = require("jsonwebtoken")

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

            const connection = await Connection.find({receiverId: decoded.id})
            const actual_sender_id = connection.map((n) => {
                return n.senderId
            })


            const senderPromises = actual_sender_id.map(async (id) => {
                const get_sender = await UserModel.findById(id);
                return get_sender;
            });
                    Promise.all(senderPromises)
    .then((senders) => {
        const connectionsWithSenders = connection.map((conn, index) => ({
            ...conn.toObject(),
            sender: senders[index],
          }));
          const filtered = connectionsWithSenders.filter((send) => {
            return send.status === "pending"
          })
          res.status(200).json(filtered);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
        })
    } catch (error) {
        console.log(error)        
    }
}

module.exports = get_connections