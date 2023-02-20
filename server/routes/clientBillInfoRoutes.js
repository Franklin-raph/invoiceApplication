const express = require('express')
const router = express.Router()
const { protectedRoute } = require('../middlewares/authMiddleWare')

const {registerClientPurchaseInfo, getBillInfoFromInvoice, getAllBillInfoFromInvoice, deleteABillInfo, updateBillInfo} = require('../controllers/clientBillController')

router.post('/registerClientPurchaseInfo', protectedRoute, registerClientPurchaseInfo)
router.get('/billInfo/:billId', protectedRoute, getBillInfoFromInvoice)
    .get('/allBillInfo', getAllBillInfoFromInvoice)
router.delete('/deleteBill/:billId', protectedRoute, deleteABillInfo)
router.patch('/updatebillinfo/:billId', protectedRoute, updateBillInfo)

module.exports = router;