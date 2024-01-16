const Router = require('express')
const router = Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require("./middleware/authMiddleware")
const roleMiddleware = require("./middleware/roleMiddleware")

router.post('/registration', [
    check("username", "Ім'я користувача не може бути пустим").notEmpty(),
    check("password", "Пароль повинен бути більше 4 та менше 10 символів").isLength({min: 4, max: 10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(["USER"]), controller.getUsers)  //authMiddleware

module.exports = router