import mongoose from "mongoose";
import { User } from "./User.js";

const LoanSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    accountHolder: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["success","pending","failed"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Loan = mongoose.model("Loan", LoanSchema);
