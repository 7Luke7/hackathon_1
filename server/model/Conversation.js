const { default: mongoose } = require("mongoose");

  const ConversationSchema = new mongoose.Schema({
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
  });
  
  ConversationSchema.index({
    sender: 1
  })
const Conversation = mongoose.model('Conversation', ConversationSchema);
  
module.exports = Conversation;