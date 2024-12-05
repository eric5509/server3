import mongoose from "mongoose";

const OTPSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please input an Email']
    },
    otp: {
        type: String,
        required: [true, 'Please input a Token']
    },
    expiryDate: {
        type: Date,
        required: [true, 'Please input a Date']
    },
}, {timestamps: true})

export const OTP = mongoose.model('OTP', OTPSchema)