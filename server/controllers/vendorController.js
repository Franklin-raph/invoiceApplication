const Vendor = require('../models/vendorModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {authenticateVendor} = require('../middlewares/authenticateVendor')

// generating a token for every authenticated vendor
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// Register a vendor
const registerVendor = async (req, res) => {

    const {fName, lName, email, password, businessName, businessType, businessOwnersName, 
            businessWesite, country, city, streetAddress, postalCode } = req.body

    try {
        if(!fName || !lName || !email || !password || !businessName || !businessType || !businessOwnersName 
            || !businessWesite || !country || !city || !streetAddress || !postalCode) {
            res.status(400).json({msg: "Please fill in all fields"})
            return
        }else{
        
            // CREATING THE VENDORS ACCOUNT

                // checking if the vendors email exists
                let vendorEmail = await Vendor.findOne({email})
                if(vendorEmail) return res.status(400).json({msg:"Vendor with this email already exists"})

                // creating the vendor
                const vendor = new Vendor({...req.body})

                // Hashing the vendors password using the bycrypt library
                const salt = await bcrypt.genSalt(10)
                vendor.password = await bcrypt.hash(password, salt)

                // saving the vendors details to the database
                await vendor.save();

                // signing the token with the newly generated vendors id
                const token = createToken(vendor._id)

                res.status(201).json({vendor, token})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Internal Server Error"})
    }
}

// Login a vendor
const loginVendor = async (req, res) => {
    const { email, password } = req.body

    console.log(req.body)

    try {
        // checking if vendor exists or not
        const vendor = await Vendor.findOne({email})

        if(!vendor) return res.status(400).json({Err: "Invalid login credentials"})
        
        const token = createToken(vendor._id)

        if(vendor && (await bcrypt.compare(password, vendor.password))){
            return res.status(200).json({vendor,token})
        }else{
            res.status(400).json({Err: "Inavlid login credentials"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({Err: error.message})
    }
}


// update vendor account
const updateVendorAccount = async (req, res) => {

    // Take Note: req.vendor is gotten when a vendor is authenticated into the app 
    // and this data contains all the vendors details
    // And this was being set that way from the auth middleware file in the middlewares folder
    const vendorId = req.params.id

    try {
        
        // Checking if the vendor exists
        if(await Vendor.findById(req.vendor) === null) return res.status(404).json({Msg: "Vendor not found"})
        const signedInvendorId = await Vendor.findById(req.vendor.id)

        // checking if the vendors Id is a valid one
        if(!mongoose.Types.ObjectId.isValid(vendorId)) return res.status(404).json({Err: "No such vendor found"})

        // preventing other vendors from updating another vendors account
        if(vendorId !== signedInvendorId._id.toString()) return res.status(401).json({Msg: "Not authorized"})

        // If all checks pass, the account is then updated and then returns the newly updated item
        const vendorAccountToUpdate = await Vendor.findOneAndUpdate({_id: vendorId}, {...req.body}, {new: true})

        res.status(200).json(vendorAccountToUpdate)
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

// Delete vendor account
const deleteVendorAccount = async (req, res) => {

    // Take Note: req.vendor is gotten when a vendor is authenticated into the app 
    // and this data contains all the vendors details
    // And this was being set that way from the auth middleware file in the middlewares folder
    // console.log(req.vendor)
    const vendorId = req.params.id

    try {

        if(await Vendor.findById(req.vendor) === null) return res.status(404).json({Msg: "Vendor not found"})
        const signedInvendorId = await Vendor.findById(req.vendor.id)

        if(!mongoose.Types.ObjectId.isValid(vendorId)) return res.status(404).json({Err: "No such vendor found"})

        if(vendorId !== signedInvendorId._id.toString()) return res.status(401).json({Msg: "Not authorized"})

        await Vendor.findOneAndDelete({_id: vendorId})

        res.status(200).json({msg:"Vendor account deleted successfully", vendorId})
    } catch (error) {
        res.status(500).json({Err: error.message})
    }
}

module.exports = {
    registerVendor,
    loginVendor,
    updateVendorAccount,
    deleteVendorAccount
}
