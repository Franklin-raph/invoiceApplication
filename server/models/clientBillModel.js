const mongoose = require('mongoose')

const ClientSchema = mongoose.Schema({
    vendor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    clientPhone:{
        type: String,
    },
    clientName: {
        type: String,
        required: [true, "Please Provide a name"]
    },
    clientEmail: {
        type: String,
        required: [true, "Please Provide an email"]
    },
    clientStreetAddress:{
        type: String,
        required: [true, "Please Provide your client street adress"]
    },
    clientCountry:{
        type: String,
        required: [true, "Please Provide your client country location"]
    },
    clientCity:{
        type: String,
        required: [true, "Please Provide your client city"]
    },
    clientPostalCode:{
        type: String,
        required: [true, "Please Provide your client postal code loaction"]
    },
    invoiceDate:{
        type: String,
        required: [true, "Please Provide the invoice date"]
    },
    paymentTerms:{
        type: String,
        required: [true, "Please Provide the payment terms"]
    },
    productDescription:{
        type: String,
        required: [true, "Please Provide the product desctiption"]
    },
    status:{
        type: String,
        required: [true, "Please add a bill status"]
    },
    itemList: [
         {
            itemName: String,
            itemQuantity: String,
            itemPrice: String,
            total: Number,
        }
    ],
    grandTotal:{
        type: Number
      }
}, {timestamps: true})

module.exports = mongoose.model('ClientBill', ClientSchema)