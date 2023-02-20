const Vendor = require('../models/vendorModel');
const mongoose = require('mongoose');

const authenticateVendor = async (req, res, next, vendorId) => {
    
    const signedInvendorId = await Vendor.findById(req.vendor.id)
    try {
        if(await Vendor.findById(req.vendor) === null){
            return res.status(404).json({Msg: "Vendor not found"})
             
        }else if(!mongoose.Types.ObjectId.isValid(vendorId)){
            return res.status(404).json({Err: "No such vendor found"})
            
        }else if(vendorId !== signedInvendorId._id.toString()){
            return res.status(401).json({Msg: "Not authorized"})
            
        }else{
            return false
        }
        next()
    } catch (error) {
        return res.status(500).json({Err: error.message})
    }
}

module.exports = { authenticateVendor }