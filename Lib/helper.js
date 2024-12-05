import { User } from "../Models/User.js";
import { Transfer } from "../Models/Transfer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Transaction } from "../Models/Transaction.js";
import { KYC } from "../Models/KYC.js";
import crypto from "crypto";
import { OTP } from "../Models/OTP.js";

export const generateUniqueAccountNumber = async () => {
  const allAccount = await User.find();
  const allAccountNumbers = allAccount.map((account) => account.accountNumber);
  const getRandomNumber = () => {
    return (
      "5" +
      Math.floor(Math.random() * 1000000000)
        .toString()
        .padStart(9, "0")
    );
  };
  let newAccountNumber = getRandomNumber();
  while (allAccountNumbers.includes(newAccountNumber))
    newAccountNumber = getRandomNumber();
  return newAccountNumber;
};

export const GetAccountByID = async (id) => {
  const account = await User.findById(id);
  return account;
};
export const GetTransactionByID = async (id) => {
  const transaction = await Transaction.findById(id);
  return transaction || null;
};
export const GetAccountByParams = async (params) => {
  const account = await User.findOne({ params });
  return account || null;
};

export const setExpiry = (minutes) => {
  return Date.now() + minutes * 60 * 1000;
};
export const AccountNumberExists = async (accountNumber) => {
  const account = await User.findOne({ accountNumber }).select(
    "-password -pin -createdAt -updatedAt -__v"
  );
  return account;
};
export const GetFullName = async (email) => {
  const account = await User.findOne({ email }).select(
    "-password -pin -createdAt -updatedAt -__v"
  );
  return `${account.firstName} ${account.middleName} ${account.lastName}`;
};

export const KYCExists = async (id) => {
  const account = await KYC.findById(id);
  return account;
};

export const MongoIdValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const EmailExisits = async (email) => {
  const account = await User.findOne({ email });
  return account;
};

export const signJWT = (tokenData) => {
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

export const verification = (minutes) => {
  const expiry = setExpiry(minutes);
  const code = generateRandom5();
  const params = generateRandomByte();
  return {
    params,
    code,
    expiry,
  };
};

export const convertToFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const generateRandomByte = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const generateRandom5 = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const verifyJWT = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return null;
  }
};

export const PhoneNumberExisits = async (phone) => {
  const account = await User.findOne({ phone });
  return account ? account : null;
};

export const IMFExists = async (imf) => {
  const account = await User.findOne({ imf });
  return account;
};

export const TransferExists = async (transferId) => {
  const transfer = await Transfer.findOne({ transferId });
  return transfer || false;
};

export const ConvertToNumber = (value) => {
  return Number(value);
};

export const trimValue = (data) => {
  const dataa = `${data}`;
  return dataa.trim();
};
export const toLowerCaseTrimmed = (data) => {
  return typeof data === "string" ? data.trim().toLowerCase() : "";
};

export const generateRandomFiveDigitNumber = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

export const getAccountName = (firstName, middleName, lastName) => {
  return `${firstName} ${middleName} ${lastName}`;
};

export const convertToDate = (dateString) => {
  // Ensure dateString is a valid string
  if (typeof dateString !== "string" || !dateString.trim()) {
    return false;
  }

  // Split the string based on the delimiter
  const delimiter = dateString.includes("-")
    ? "-"
    : dateString.includes("/")
    ? "/"
    : null;

  if (!delimiter) {
    return false; // Invalid format
  }

  const parts = dateString.split(delimiter);

  // Validate the parts
  if (parts.length !== 3) {
    return false;
  }

  const [day, month, year] = parts.map((part) => part.trim());

  // Validate day, month, and year
  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    day.length > 2 ||
    month.length > 2 ||
    year.length !== 4 ||
    Number(day) < 1 ||
    Number(day) > 31 ||
    Number(month) < 1 ||
    Number(month) > 12
  ) {
    return false;
  }

  // Return the formatted date in DD-MM-YYYY
  return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
};

export const randomOneToNine = () => {
  return Math.floor(Math.random() * 10);
};

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
export const passwordMatch = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const CreateOTP = async (email, minutes) => {
  const currentDate = new Date();
  const expiryDate = new Date(currentDate.getTime() + minutes * 60 * 1000);
  const otp = Math.floor(10000 + Math.random() * 90000)
  try {
    await OTP.create({otp, expiryDate, email})
    return otp
  } catch (error) {
    throw new Error    
  }
};

export const generateAuthToken = async (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "30d"})
  } catch (error) {
    return false
  }
};


export const verifyToken = (token) => {
  if (token) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_SECRET);
      if (tokenData) {
        return tokenData;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  return false;
};


export const OTPExpired = (time) =>  {
  const currentTime = new Date(); 
  return currentTime > time;
}


export const sendJsonResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    message,
    ...(data && { data }),
  });
};
export const sendResponse = (status, message, data) => {
  return {
    message,
    status,
    ...(data && { data }),
  };
};

export const customJsonResponse = (
  res,
  status,
  success,
  data = null,
  message = null
) => {
  res.status(status).json({
    success,
    data,
    message,
  });
};
