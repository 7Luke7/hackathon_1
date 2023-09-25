const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId,
  receiverId: mongoose.Schema.Types.ObjectId,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  timestamp: { type: Date, default: Date.now },
});

connectionSchema.index({
  receiverId: 1
})

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection