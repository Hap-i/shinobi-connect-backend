const express = require("express");
const { createUser, login, setAvatar, getAllUsers } = require("../controller/userController");

const router = express.Router();

router.post('/signup', createUser)
router.post('/login', login)
router.post('/setavatar/:id', setAvatar)
router.get('/allusers/:id', getAllUsers)


module.exports = router