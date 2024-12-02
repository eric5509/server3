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

export const inboundTransfer = async (req, res) => {
  let {
    recipientAccountNumber,
    senderAccountName,
    senderAccountNumber,
    senderBankName,
    amount,
    date,
    status,
    description,
  } = req.body;
  amount = ConvertToNumber(amount);
  status = status ? status : "pending";
  date = convertToDate(date);
  senderBankName = toLowerCaseTrimmed(senderBankName);

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

  const Recipient = await AccountNumberExists(recipientAccountNumber);
  if (!Recipient)
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Recipient Account Number not Valid"
    );

  Recipient.availableBalance += amount;
  const data = {
    recipientAccountName: await GetFullName(Recipient.email),
    recipientAccountNumber: senderAccountNumber,
    recipientBankName: process.env.BANK_NAME,
    senderAccountName,
    senderAccountNumber,
    senderBankName,
    description,
    amount,
    date,
    type: 'inbound',
    status,
    recipientId: Recipient._id,
  };

  try {
    await Recipient.save();
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
