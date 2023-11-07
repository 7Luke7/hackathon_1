require("dotenv").config()
const express = require("express")
const http = require("http")
const app = express();
const socketIo = require('socket.io');
const cors = require("cors");
const jwt = require("jsonwebtoken")
const Message = require("./model/Message");
const Conversation = require("./model/Conversation");

app.use(cors())

const server = http.createServer(app)
const io = new socketIo.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
            

        socket.on("sendMessage", async (data) => {
            const parsedObject = JSON.parse(data)

            console.log(data)

                jwt.verify(parsedObject.token, process.env.TOKEN_KEY, async (err, decoded) => {
                    const new_message = await new Message({
                        conversation: parsedObject.conversation_id,
                        sender: decoded.id,
                        content: parsedObject.message
                    })

                    const new_convo_message = await Conversation.findByIdAndUpdate(
                        parsedObject.conversation_id, 
                        { $push: { messages: new_message._id } }
                    )

                    console.log(new_convo_message)
                    new_message.save()
                    new_convo_message.save()                
            })
            
        }) 
    })

module.exports = {
    io,
    app,
    express,
    server
}