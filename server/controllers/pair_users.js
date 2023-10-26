const jwt = require("jsonwebtoken")
const UserModel = require("../model/models")
const pipeline_handler = require("./pipeline_aggregation")
  
const pair_user_handler = async (req, res, next) => {
    try {
        const auth_headers = req.headers.authorization
        const token = auth_headers.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "You are not authorized to access this page."
            })
        }

        jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "You are not authorized to access this page."
                })
            }

            const user = await UserModel.findById(decoded.id)
            
            const pipeline = pipeline_handler(res, req.body, user)
            const pipe_result = await UserModel.aggregate(pipeline).exec();

            if (pipe_result.length === 0) {
                return res.status(400).json({
                    message: "No matches"
                })
            }

            const result = pipe_result.map((item) => {
                delete item.password 
                delete item.email 
                delete item.outgoingFriendRequests 
                delete item.incomingFriendRequests
                delete item.friends
                return item
            })
            
            res.status(200).json(result)
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = pair_user_handler