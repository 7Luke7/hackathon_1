const Conversation = require("../model/Conversation");
const FriendRequest = require("../model/Friend");
const UserModel = require("../model/models");

const accept_connection = async (req, res, next) => {
    try {
        const friendRequest = await FriendRequest.findById(
            req.params.id,
          );

          const user_sender = await UserModel.findById(friendRequest.sender)
          const user_recipient = await UserModel.findById(friendRequest.recipient)

          await UserModel.findByIdAndUpdate(friendRequest.sender, {$pull: {outgoingFriendRequests: friendRequest.recipient} })
          await UserModel.findByIdAndUpdate(friendRequest.recipient, {$pull: {incomingFriendRequests: friendRequest.sender} })

          user_recipient.friends.push(friendRequest.sender)
          user_sender.friends.push(friendRequest.recipient)

          await user_recipient.save()
          await user_sender.save()

          
          const new_convo = await new Conversation({
            members: [
                user_sender._id.toString(), user_recipient._id.toString()
            ]
          })

          console.log(user_sender)
          const add_conversation_id_to_sender = await UserModel.findByIdAndUpdate(user_sender._id, {
            $push: {conversation: [new_convo._id]}
          })
          const add_conversation_id_to_ricipient = await UserModel.findByIdAndUpdate(user_recipient._id, {
            $push: {conversation: [new_convo._id]}
          })

          new_convo.save()

          friendRequest.deleteOne()

          res.status(200).json({
            message: `You became friends with ${user_sender.username}.`
          })

    } catch (error) {
        console.log(error)
    }
}

module.exports = accept_connection