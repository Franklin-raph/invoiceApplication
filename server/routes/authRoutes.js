const express = require('express')
const router = express.Router()
const { protectedRoute } = require('../middlewares/authMiddleWare')
const {registerVendor, loginVendor, updateVendorAccount, forgotPassword, deleteVendorAccount, getVendorPasswordResetRoute, updateVendorPassword} = require('../controllers/vendorController')

router.post('/register', registerVendor)
        .post('/login', loginVendor)

// Protected Route
router.patch('/updateAccount/:id', protectedRoute, updateVendorAccount)

// Protected Route
router.post('/deleteAccount/:id', protectedRoute, deleteVendorAccount)

router.post('/forgotPassword', forgotPassword)

router.get('/resetpassword/:vendor_id/:token', getVendorPasswordResetRoute)
        // .patch('')

router.patch('/resetpassword/:vendor_id/:token', updateVendorPassword)

module.exports = router;