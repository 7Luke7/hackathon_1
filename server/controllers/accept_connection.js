const FriendRequest = require("../model/Friend");
const UserModel = require("../model/models");

const accept_connection = async (req, res, next) => {
    try {
        const friendRequest = await FriendRequest.findByIdAndUpdate(
            req.params.id,
            { status: "accepted" },
            { new: true }
          );

          const new_friend = await UserModel.findById(friendRequest.recipient)
          new_friend.friends.push(friendRequest.sender)
          await new_friend.save()

          await friendRequest.save().then(() => {
            return res.status(200).json({
                message: `Friend request accepted.`
            })

        }).catch((err) => {
            console.log(err)
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = accept_connection