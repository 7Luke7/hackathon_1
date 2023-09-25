const UserModel = require("../model/models")

const get_user_controller_handler = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id)
        const {password, ...rest} = user._doc

        res.status(200).json(rest)
    } catch (error) {
        console.error(error)
    }
}

module.exports = get_user_controller_handler