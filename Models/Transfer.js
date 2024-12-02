import mongoose from "mongoose";

const TransferSchema = new mongoose.Schema({
     senderAccountName: {
        type: String,
        required: true 
    },
    senderAccountNumber: {
        type: String,
        required: true 
    },
    senderBankName: {
        type: String,
        required: true 
    },
    recipientAccountName: {
        type: String,
        required: true 
    },
    recipientBankName: {
        type: String,
        required: true 
    },
    recipientAccountNumber: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    type: {
        type: String,
        enum: ['inbound', 'outbound', 'internal'],
        required: true
    },
    amount: {
        type: Number,
        required: true 
    },
    date: {
        type: String,
        required: [true, 'Please input the transfer date']
    },
    status: {
        type: String,
        enum: ['pending', 'failed', 'success'],
        default: 'pending',
        required: [true, 'Please input the status']
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
   
}, { timestamps: true });  

export const Transfer = mongoose.model('Transfer', TransferSchema);
