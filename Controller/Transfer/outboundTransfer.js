import {
  AccountNumberExists,
  convertToDate,
  ConvertToNumber,
  customJsonResponse,
  GetFullName,
  toLowerCaseTrimmed,
} from "../../Lib/helper.js";
import { validate } from "../../Lib/validate.js";
import { Transfer } from "../../Models/Transfer.js";

export const outboundTransfer = async (req, res) => {
  let {
    senderAccountNumber,
    recipientAccountName,
    recipientAccountNumber,
    recipientBankName,
    amount,
    date,
    status,
    description,
  } = req.body;
  amount = ConvertToNumber(amount);
  status = status ? status : "pending";
  date = convertToDate(date);
  recipientBankName = toLowerCaseTrimmed(recipientBankName);

  if (!validate(req.body))
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
      "Please input a valid Amount"
    );

  if (!date)
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Please input a valid date"
    );

  if (senderAccountNumber === recipientAccountNumber)
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Sender and Recipient cannot be the same"
    );

  const Sender = await AccountNumberExists(senderAccountNumber);
  if (!Sender)
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Sender Account Number not Valid"
    );

  if (Sender.availableBalance < amount)
    return customJsonResponse(res, 400, false, null, "Insufficient funds");
  Sender.availableBalance -= amount;

  const data = {
    senderAccountName: await GetFullName(Sender.email),
    senderAccountNumber: senderAccountNumber,
    senderBankName: process.env.BANK_NAME,
    recipientAccountName,
    recipientAccountNumber,
    recipientBankName,
    description,
    amount,
    date,
    type: 'outbound',
    status,
    senderId: Sender._id,
  };

  try {
    await Sender.save();
    const newTransfer = await Transfer.create(data);
    return customJsonResponse(
      res,
      200,
      true,
      newTransfer,
      "Transfer Successful"
    );
  } catch (error) {
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Something went worng, please try again later"
    );
  }
};
