const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  language: String,
  proficiency: String, // "Beginner", "Intermediate", "Fluent"
});

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  email: { type: String, unique: true, required: true },
  password: {type: String, required: true},
  nativeLanguage: String, 
  languagesLearning: [languageSchema],
  bio: String,
  gender: String,
  interests: [String], 
  age: Number,
}, {
    timestamps: true
});

userSchema.index(
  { "languagesLearning.language": 1,
   "learningLanguages.proficiency": 1 
  }
)

userSchema.index(
  { age: 1}
)


userSchema.index(
  {email: 1}, {unique: true}
)

userSchema.index(
  { interests: 1}
)

userSchema.index(
  {username: 1}, 
  {unique: true}
)

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;