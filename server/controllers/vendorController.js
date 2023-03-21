const Vendor = require('../models/vendorModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
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
            businessWesite, profilePic, country, city, streetAddress, businessContact, postalCode } = req.body

    try {
        if(!fName || !lName || !email || !password || !businessName || !businessType || !businessOwnersName 
            || !businessContact || !country || !city || !streetAddress || !postalCode) {
            res.status(400).json({msg: "Please fill in all fields"})
            return
        }else{
        
            // CREATING THE VENDORS ACCOUNT

                // checking if the vendors email exists
                let vendorEmail = await Vendor.findOne({email})
                if(vendorEmail) return res.status(400).json({err:"Vendor with this email already exists"})

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

    try {
        // checking if vendor exists or not
        const vendor = await Vendor.findOne({email})

        if(!vendor) return res.status(400).json({err: "Invalid login credentials"})
        
        const token = createToken(vendor._id)

        if(vendor && (await bcrypt.compare(password, vendor.password))){
            return res.status(200).json({vendor,token})
        }else{
            res.status(400).json({err: "Inavlid login credentials"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({err: error.message})
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
        if(!mongoose.Types.ObjectId.isValid(vendorId)) return res.status(404).json({err: "No such vendor found"})

        // preventing other vendors from updating another vendors account
        if(vendorId !== signedInvendorId._id.toString()) return res.status(401).json({Msg: "Not authorized"})

        // If all checks pass, the account is then updated and then returns the newly updated item
        const vendorAccountToUpdate = await Vendor.findOneAndUpdate({_id: vendorId}, {...req.body}, {new: true})

        res.status(200).json(vendorAccountToUpdate)
    } catch (error) {
        res.status(500).json({err: error.message})
    }
}

// Delete vendor account
const deleteVendorAccount = async (req, res) => {

    // Take Note: req.vendor is gotten when a vendor is authenticated into the app 
    // and this data contains all the vendors details
    // And this was being set that way from the auth middleware file in the middlewares folder
    // console.log(req.vendor)
    const vendorId = req.params.id

    const { email, password } = req.body

    try {

        if(await Vendor.findById(req.vendor) === null) return res.status(404).json({Msg: "Vendor not found"})
        const signedInvendorId = await Vendor.findById(req.vendor.id)

        if(!mongoose.Types.ObjectId.isValid(vendorId)) return res.status(404).json({err: "No such vendor found"})

        if(vendorId !== signedInvendorId._id.toString()) return res.status(401).json({Msg: "Not authorized"})

        const vendor = await Vendor.findOne({email})

        if(vendor && (await bcrypt.compare(password, vendor.password))){
            await Vendor.findOneAndDelete({_id: vendorId})
            res.status(200).json({msg:"Vendor account deleted successfully", vendorId})
        }else{
            res.status(400).json({err: "Password is incorrect"})
        }

    } catch (error) {
        res.status(500).json({err: error.message})
    }
}


// Vendor Forgot password request
const forgotPassword = async (req, res) => {
   
    const { email } = req.body
    const vendor = await Vendor.findOne({email})

     // check if email exists
    if(vendor === null){
        res.status(404).json({msg:"Email does not exist"})
        return
    }

    // User exist and now create a one time reset link valid for 15hrs
    const secret = process.env.JWT_SECRET + vendor.password
    const payload = {
        email: vendor.email,
        id:vendor._id,
        // used: false
    }

    const token = jwt.sign(payload, secret, {expiresIn: "15h"})
    // const link = `https://invoice-application-three.vercel.app/resetpassword/${vendor._id}/${token}`
    const link = `https://invoice-application-three.vercel.app/resetpassword/${token}/${vendor._id}`

     // Code for sending email
     const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL,
            pass: process.env.INVOICE_APP_PASSWORD,
        }
      });

    //   https://stackoverflow.com/questions/59188483/error-invalid-login-535-5-7-8-username-and-password-not-accepted
      
      const mailOptions = {
        from: "noreply@gmail.com",
        to: vendor.email,
        subject: 'Sending Email From e-invoice app',
        html: `<a href = ${link} style="text-decoration: none; padding:5px 10px; background-color: green; border-radius: 5px; color: white;">Click to reset your password</a>`,
      };
      
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
          console.log(error + "Error here");
        } else {
          console.log('Email sent: ' + info.response);
          console.log(info)
        }
      });

    res.status(200).json({msg:`A one time password reset link has been sent to ${email}, please use the link to reset your password. If you didn't get the link, please resend your request`})
}


// Vendor password reset get route
const getVendorPasswordResetRoute = async (req, res) => {
    const { vendor_id, token } = req.params;
    const vendor = await Vendor.findOne({_id : req.params.vendor_id})

    // check if the studentID exists
    if(vendor_id !== vendor._id.toString()) return res.status(404).send({msg:`Vendor with id ${vendor_id} doesn't exist`})

    // verify the token since we have a valid id and a valid user with the id
    // we would use process.env.JWT_SECRET + student.password to verify the token cos that is what i used in signing the token up
    const secret = process.env.JWT_SECRET + vendor.password
    try {
        const payload = jwt.verify(token, secret)
        return res.status(200).json({vendor})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error.message})
    }
}



// Update vendor password
const updateVendorPassword = async (req, res) => {
    const { vendor_id, token } = req.params;
    const vendor = await Vendor.findOne({_id : req.params.vendor_id})
    // console.log(vendor)

    // check if the vendor_id exists
    if(vendor_id !== vendor._id.toString()) return res.status(404).send({msg:`Vendor with id ${vendor._id} doesn't exist`})

    // verify the token since we have a valid id and a valid user with the id
    // check for the user with this id and update the password field
    const secret = process.env.JWT_SECRET + vendor.password

    try {
        const vendor = await Vendor.findOne({ _id: req.params.vendor_id })
        const payload = jwt.verify(token, secret)

        const salt = await bcrypt.genSalt(10);
        vendor.password = await bcrypt.hash(req.body.password, salt)
        console.log(vendor.password)
        const vendorAccountToUpdate = await Vendor.findOneAndUpdate({_id: vendor_id}, {...req.body, password:vendor.password}, {new: true})
        return res.status(200).json({vendorAccountToUpdate})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error.message})
    }
}




module.exports = {
    registerVendor,
    loginVendor,
    updateVendorAccount,
    deleteVendorAccount,
    forgotPassword,
    getVendorPasswordResetRoute,
    updateVendorPassword
}
