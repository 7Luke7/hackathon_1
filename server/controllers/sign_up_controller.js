require("dotenv").config()
const UserModel = require("../model/models")
const bcrypt = require("bcryptjs")

const sign_up_controller = async (req, res, next) => {
    try {

        if (!(req.body.email && req.body.password && req.body.username)) {
            res.status(400).json({message: "Email, password, and username are required."});
        }

        const check_for_email = await UserModel.findOne({email: req.body.emal})
        if (check_for_email) {
            return res.status(409).json({
                message: "User with email is aleady registered."
            })
        }
        
        const check_for_username = await UserModel.findOne({username: req.body.username})
        if (check_for_username) {
            return res.status(409).json({
                message: "User with username is aleady registered."
            })
        }

        const salt_rounds = 10
        
        bcrypt.genSalt(salt_rounds, (err, salt) => {
        if (err) throw Error(err)
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw Error(err)
            const today = new Date();
            const calculateAge = (birthDate) => {
                const today = new Date();
                const birthDateParts = birthDate.split("-");
                const birthYear = birthDateParts[2];
                const birthMonth = birthDateParts[1] - 1; // Months are 0-indexed in JavaScript
                const birthDay = birthDateParts[0];
                
                const age = today.getFullYear() - birthYear;
                
                // Check if birthday has occurred this year
                if (
                  today.getMonth() < birthMonth ||
                  (today.getMonth() === birthMonth && today.getDate() < birthDay)
                ) {
                  return age - 1;
                }
              
                return age;
              }

              const capitalize = (gender) => {
                const cap_gender = gender[0].toUpperCase() + gender.slice(1)
                return cap_gender
              }
              
            const newUser = new UserModel({
                username: req.body.username, 
                password: hash,
                email: req.body.email.toLowerCase(),
                gender: capitalize(req.body.gender),
                bornIn: calculateAge(req.body.bornIn)
            })
            
            newUser.save().then(() => {
                res.status(200).json({message: "User successfuly created"})
            })
        })
    })

    } catch (error) {
        console.error(error)
    }
}

module.exports = sign_up_controller