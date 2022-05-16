const User = require("../model/userModel");

exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        const newUser = await User.create({
            username,
            email,
            password
        })
        newUser.password = undefined
        res.status(200).json({
            status: "Success",
            data: {
                user: newUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err
        })
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            status: "Fail",
            message: "please provide email and password!"
        })

    }
    const user = await User.findOne({ username }).select('+password')
    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            status: "Fail",
            message: "Username or password is not correct !"
        })
    }
    console.log(user);
    return res.status(200).json({
        status: "Success",
        message: {
            data: {
                username: user.username,
                email: user.email
            }
        }
    })

}

exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;

        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        }, { new: true })
        console.log(userData)
        return res.status(200).json({
            status: "Success",
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err
        })
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select("username email avatarImage")
        return res.status(200).json({
            status: "Success",
            data: {
                users
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err
        })
    }
}