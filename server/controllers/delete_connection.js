const Connection = require("../model/Connection")

const delete_connection = async (req, res, next) => {
    try {
        const delete_con = await Connection.findByIdAndDelete(req.params.id)  
        res.status(200).json({
            message: "Deleted successfully."
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = delete_connection