import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema({
    email:{type: String},
    name:{ type: String },
    to_user:{type: String,},
    oid:{type: String, required: true},
    amount:{type: Number, required: true},
    message:{type: String},
    createdAt:{type: Date, default: Date.now},
    status:{type:Boolean, default: false}
})

const payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema)

export default payment;