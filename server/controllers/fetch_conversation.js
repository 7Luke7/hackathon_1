require("dotenv").config()
const Conversation = require("../model/Conversation")
const jwt = require("jsonwebtoken")

const conversation = async (req, res) => {
    try {
        const auth_headers = req.headers.authorization
        const token = auth_headers.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "You are not authorized to access this page."
            })
        }

        jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
            
            console.log(req.params.id)
            console.log(decoded.id)
            const messages = await Conversation.findById(req.params.id).populate("messages").exec()
            
              console.log(messages)
            res.status(200).json({message: messages})  
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = conversation