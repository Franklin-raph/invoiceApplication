const express = require('express')
const router = express.Router()
const { protectedRoute } = require('../middlewares/authMiddleWare')
const {registerVendor, loginVendor, updateVendorAccount, deleteVendorAccount} = require('../controllers/vendorController')

router.post('/register', registerVendor)
        .post('/login', loginVendor)

// Protected Route
router.patch('/updateAccount/:id', protectedRoute, updateVendorAccount)

// Protected Route
router.post('/deleteAccount/:id', protectedRoute, deleteVendorAccount)

module.exports = router;