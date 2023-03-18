const mongoose = require('mongoose')

const VendorSchema = mongoose.Schema({
    fName: {
        type: String,
        required: [true, "Please Provide a first name"]
    },
    lName: {
        type: String,
        required: [true, "Please Provide a last name"]
    },
    email: {
        type: String,
        required: [true, "Please Provide an email"]
    },
    profilePic: {
        type: String,
    },
    businessContact:{
        type: String,
        required: [true, "Please Provide a business contact number"]
    },
    password: {
        type: String,
        required: [true, "Please Provide a password"]
    },
    businessName:{
        type: String,
        required: [true, "Please Provide a business name"]
    },
    businessType:{
        type: String,
        required: [true, "Please Provide a business type"]
    },
    businessOwnersName:{
        type: String,
        required: [true, "Please Provide a business owner's name"]
    },
    businessWesite:{
        type: String,
    },
    country:{
        type: String,
        required: [true, "Please Provide your business country location"]
    },
    city:{
        type: String,
        required: [true, "Please Provide your business city"]
    },
    streetAddress:{
        type: String,
        required: [true, "Please Provide your business street adress"]
    },
    postalCode:{
        type: String,
        required: [true, "Please Provide your business postal code loaction"]
    }
}, {timestamps: true})

module.exports = mongoose.model('Vendor', VendorSchema) 