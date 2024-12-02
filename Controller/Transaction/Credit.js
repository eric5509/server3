import {
  AccountNumberExists,
  sendJsonResponse,
  trimValue,
  customJsonResponse,
  GetFullName,
  convertToDate
} from "../../Lib/helper.js";
import { Transaction } from "../../Models/Transaction.js";

export const Credit = async (req, res) => {
  let { amount, accountNumber, description, status, date } = req.body;
  if (
    !trimValue(amount) ||
    !trimValue(date) ||
    !trimValue(accountNumber) ||
    !trimValue(description)
  )
    return sendJsonResponse(res, 400, "Please fill in all fields");
  if (isNaN(amount))
    return sendJsonResponse(res, 400, "Please enter a valid Number");
  
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
  if (!Account) return sendJsonResponse(res, 400, "Account does not exist");

  Account.availableBalance += Number(amount);

  const data = {
    User: Account._id,
    amount,
    accountNumber,
    description,
    transactionType: "credit",
    status: status ? status : "pending",
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
    return sendJsonResponse(res, 400, error.message);
  }
};
