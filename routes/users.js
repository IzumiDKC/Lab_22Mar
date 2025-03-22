var express = require('express');
var router = express.Router();
let userController = require('../controllers/users');
let { check_authentication, check_authorization } = require('../utils/check_auth');
let { CreateSuccessRes } = require('../utils/responseHandler');
let constants = require('../utils/constants');

router.get('/', check_authentication, check_authorization(['Mod']), async function (req, res, next) {
    try {
        let users = await userController.GetAllUsers();
        CreateSuccessRes(res, users, 200);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', check_authentication, check_authorization(['Mod']), async function (req, res, next) {
    try {
        if (req.user.id === req.params.id) {
            return res.status(403).json({ message: "Bạn k thể xem info bản thân" });
        }
        let user = await userController.GetUserById(req.params.id);
        CreateSuccessRes(res, user, 200);
    } catch (error) {
        next(error);
    }
});

router.post('/', check_authentication, check_authorization(['Admin']), async function (req, res, next) {
    try {
        let body = req.body;
        let user = await userController.CreateAnUser(body.username, body.password, body.email, body.role);
        CreateSuccessRes(res, user, 200);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', check_authentication, check_authorization(['Admin']), async function (req, res, next) {
    try {
        let body = req.body;
        let user = await userController.UpdateAnUser(req.params.id, body);
        CreateSuccessRes(res, user, 200);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', check_authentication, check_authorization(['Admin']), async function (req, res, next) {
    try {
        let user = await userController.DeleteAnUser(req.params.id);
        CreateSuccessRes(res, user, 200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
