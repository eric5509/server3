import {
  AccountNumberExists,
  trimValue,
  GetFullName,
  customJsonResponse,
  convertToDate
} from "../../Lib/helper.js";
import { Transaction } from "../../Models/Transaction.js";

export const Debit = async (req, res) => {
  let { amount, accountNumber, description, status, date } = req.body;
  amount = Number(amount);
  let transactionStatus = status || "pending";
  if (
    !trimValue(amount) ||
    !trimValue(date) ||
    !trimValue(accountNumber) ||
    !trimValue(description)
  )
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Please fill in all fields"
    );
  if (isNaN(amount))
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Please enter a valid Number"
    );
  date = convertToDate(date);
  if (!date)
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Please input a valid date"
    );
  const Account = await AccountNumberExists(accountNumber);
  if (!Account)
    return customJsonResponse(res, 400, false, null, "Account does not exist");
  if (Account.availableBalance < amount)
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Transaction failed due to insufficient funds"
    );

  Account.availableBalance -= Number(amount);

  const data = {
    userID: Account._id,
    amount,
    accountNumber,
    description,
    transactionType: "debit",
    status: transactionStatus,
    accountHolder: await GetFullName(Account.email),
  };
  try {
    const newTransaction = await Transaction.create(data);
    const plainTransaction = newTransaction.toObject();
    const { __v, updatedAt, createdAt, ...rest } = plainTransaction;
    const returnData = { ...rest, balance: Account.availableBalance };
    if (newTransaction) await Account.save();
    return customJsonResponse(
      res,
      200,
      true,
      returnData,
      "Transaction Successful"
    );
  } catch (error) {
    return customJsonResponse(res, 500, false, null, error.message);
  }
};
