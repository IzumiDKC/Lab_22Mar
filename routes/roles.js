var express = require('express');
var router = express.Router();
var roleController = require('../controllers/roles');
let { CreateSuccessRes } = require('../utils/responseHandler');
let { check_authentication, check_authorization } = require('../utils/check_auth');

/* 🔍 Lấy danh sách quyền (Không cần xác thực) */
router.get('/', async function(req, res, next) {
    try {
        let roles = await roleController.GetAllRoles();
        CreateSuccessRes(res, roles, 200);
    } catch (error) {
        next(error);
    }
});

/* ➕ Tạo quyền (Chỉ Admin) */
router.post('/', check_authentication, check_authorization(['Admin']), async function(req, res, next) {
    try {
        let newRole = await roleController.CreateARole(req.body.name);
        CreateSuccessRes(res, newRole, 200);
    } catch (error) {
        next(error);
    }
});

/* ✏️ Cập nhật quyền (Chỉ Admin) */
router.put('/:id', check_authentication, check_authorization(['Admin']), async function(req, res, next) {
    try {
        let updatedRole = await roleController.UpdateARole(req.params.id, req.body.name);
        CreateSuccessRes(res, updatedRole, 200);
    } catch (error) {
        next(error);
    }
});

/* 🗑 Xóa quyền (Chỉ Admin) */
router.delete('/:id', check_authentication, check_authorization(['Admin']), async function(req, res, next) {
    try {
        let deletedRole = await roleController.DeleteARole(req.params.id);
        CreateSuccessRes(res, deletedRole, 200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
