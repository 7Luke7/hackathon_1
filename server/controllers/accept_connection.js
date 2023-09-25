const Connection = require("../model/Connection")

const accept_connection = async (req, res, next) => {
    try {

        console.log(req.body)
        const update_connection = await Connection.findByIdAndUpdate(req.params.id, req.body)  
        res.status(200).json({
            message: "updated successfully."
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = accept_connection