const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'This username is already taken']
    },
    email: {
        type: String,
        required: [true, 'Email is required !'],
        unique: [true, 'This email is already used'],
        lowercase: [true, 'password must be atleast 8 chars long']
    },
    password: {
        type: String,
        required: [true, 'Password is Required !'],
        minlength: 8,
        select: false
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: "",
    }
})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)
    next();
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User;