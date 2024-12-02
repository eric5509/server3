import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    dob: { type: String, required: true },
    accountNumber: { type: String, required: true },
    occupation: { type: String, required: false },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    availableBalance: { type: Number, default: 0 },
    currentBalance: { type: Number, default: 0 },
    imf: { type: String, required: true },
    cot: { type: String, required: true },
    currency: { type: String, required: true, enum: ["USD", "GBP", "EUR"] },
    nationality: { type: String, required: true },
    active: { type: Boolean, required: true, default: false },
    verified: { type: Boolean, required: true, default: false },
    status: {
      type: String,
      enum: ["pending", "failed", "status"],
      default: "pending",
    },
    maritalStatus: {
      type: String,
      enum: [
        "single",
        "married",
        "complicated",
        "divorced",
        "widowed",
        "separated",
        "domestic partnership",
      ],
    },
    accountType: {
      type: String,
      required: true,
      enum: ["savings", "checking", "business", "student"],
    },
    transferPin: { type: String, required: true },
    authPin: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
