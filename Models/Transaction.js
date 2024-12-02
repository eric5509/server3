import mongoose from "mongoose";
import { User } from "./User.js";

const TransactionSchema = new mongoose.Schema({
    accountHolder: {
        type: String,
        required: true 
    },
    accountNumber: {
        type: String,
        required: true 
    },
    transactionType:{
        type: String,
        enum: ['debit', 'credit'],
        required: [true, 'Please whats the type of the Transaction you are tying to perform?']
    },
    description: {
        type: String,
        required: true 
    },
    amount: {
        type: Number,
        required: true 
    },
    date: {
        type: String,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'success'],
        default: 'pending'
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
}, { timestamps: true });  

export const Transaction = mongoose.model('Transaction', TransactionSchema);