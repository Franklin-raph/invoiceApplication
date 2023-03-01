const ClientBill = require('../models/clientBillModel')
const Vendor = require('../models/vendorModel')
const mongoose = require('mongoose')

// Register a client purchase item info into the invoice
const registerClientBillInfo = async (req, res) => {
    const {clientName, clientEmail, clientStreetAddress, clientCountry, clientCity, clientPostalCode, 
        invoiceDate, paymentTerms, productDescription, itemList, status, grandTotal} = req.body

        try {
            if(!clientName || !clientEmail || !clientStreetAddress || !clientCountry || !clientCity || !clientPostalCode 
                || !invoiceDate || !paymentTerms || !productDescription || !status) {
                res.status(400).json({msg: "Please fill in all fields"})
                return
            }else{
    
                // creating the client purchase info
                const clientPurchaseInfo = new ClientBill({...req.body, vendor:req.vendor.id})
    
                // saving the client purchase info to the database
                await clientPurchaseInfo.save()
    
                return res.status(201).json(clientPurchaseInfo)
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
}

// View a single item from the invoice
const getBillInfoFromInvoice = async (req, res) => {
    const { billId } = req.params

    try {
        // if(await ClientBill.findById(req.vendor) === null) return res.status(404).json({Msg: "Vendor not found"})
        // const signedInvendorId = await Vendor.findById(req.vendor.id)
        
        if(!mongoose.Types.ObjectId.isValid(billId)) return res.status(404).json({Err: "No such item detail found"})

        const billInfo = await ClientBill.findById(billId)
        if(!billInfo) return res.status(404).json({msg:"No such bill details found"})

        const billWasGivenBy = await Vendor.findById(billInfo.vendor.toString()).select('-password')

        res.status(200).json({billInfo, billWasGivenBy})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

// view all bill info from the invoice
const getAllBillInfoFromInvoice = async (req, res) => {
    try {
        const allBillInfo = await ClientBill.find().sort({ createdAt: -1 })

        res.status(200).json(allBillInfo)
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

// Update a bill info
const deleteABillInfo = async (req, res) => {

    const { billId } = req.params
    
    try {

        if(!mongoose.Types.ObjectId.isValid(billId)) return res.status(404).json({msg: "No such bill details found!!"})

        const signedInvendorId = await Vendor.findById(req.vendor.id)

        const billTodelete = await ClientBill.findById(billId)

        if(!billTodelete) return res.status(404).json({msg:"No such bill details found!"})

        if(await Vendor.findById(req.vendor) === null) return res.status(404).json({msg: "Vendor not found"})
        
        if(billTodelete.vendor.toString() !== signedInvendorId._id.toString()) return res.status(401).json({msg: "Not authorized"})

        await ClientBill.findOneAndDelete({_id: billId})

        res.status(200).json({msg:"Bill details deleted successfully", billId})
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

// update vendor account
const updateBillInfo = async (req, res) => {

    // Take Note: req.vendor is gotten when a vendor is authenticated into the app 
    // and this data contains all the vendors details
    // And this was being set that way from the auth middleware file in the middlewares folder
    const {billId} = req.params
    const { itemList } = req.body

    try {
        
        if(!mongoose.Types.ObjectId.isValid(billId)) return res.status(404).json({msg: "No such bill details found!!"})

        if(await Vendor.findById(req.vendor) === null) return res.status(404).json({msg: "Vendor not found"})

        const signedInvendorId = await Vendor.findById(req.vendor.id)

        const billToupdate = await ClientBill.findById(billId)

        if(!billToupdate) return res.status(404).json({msg:"No such bill details found!"})
        
        if(billToupdate.vendor.toString() !== signedInvendorId._id.toString()) return res.status(401).json({msg: "Not authorized"})

        let grandTotal = 0
        itemList.forEach((i) => {
            grandTotal += i.total
        })
        // console.log(grandTotal)

        // If all checks pass, the account is then updated and then returns the newly updated item
        const clientBillToUpdate = await ClientBill.findOneAndUpdate({_id: billId}, {...req.body, grandTotal}, {new: true})

        console.log(clientBillToUpdate)

        res.status(200).json(clientBillToUpdate)
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

module.exports = {
    registerClientBillInfo,
    getBillInfoFromInvoice,
    getAllBillInfoFromInvoice,
    deleteABillInfo,
    updateBillInfo
}