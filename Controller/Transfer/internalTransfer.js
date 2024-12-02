import {
  AccountNumberExists,
  convertToDate,
  ConvertToNumber,
  customJsonResponse,
  GetFullName,
} from "../../Lib/helper.js";
import { validate } from "../../Lib/validate.js";
import { Transfer } from "../../Models/Transfer.js";

export const internalTransfer = async (req, res) => {
  let {
    senderAccountNumber,
    recipientAccountNumber,
    amount,
    date,
    status,
    description,
  } = req.body;
  amount = ConvertToNumber(amount);
  status = status ? status : "pending";
  date = convertToDate(date);

  if (!validate(req.body))
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Please fill in all fields"
    );

  if (senderAccountNumber === recipientAccountNumber)
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Sender and Recipient cannot be the same"
    );

  if (!date)
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Please input a valid date"
    );

  if (isNaN(amount)) {
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Please input a valid Amount"
    );
  }

  const Sender = await AccountNumberExists(senderAccountNumber);
  if (!Sender) {
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Sender Account Number not Valid"
    );
  }

  const Recipient = await AccountNumberExists(recipientAccountNumber);
  if (!Recipient) {
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Recipient Account Number not Valid"
    );
  }

  if (Sender.availableBalance < amount)
    return customJsonResponse(res, 400, false, null, "Insufficient funds");
  Sender.availableBalance -= amount;
  Recipient.availableBalance += amount;
  const data = {
    senderAccountNumber,
    senderAccountName: await GetFullName(Sender.email),
    senderBankName: process.env.BANK_NAME,
    recipientAccountNumber,
    recipientAccountName: await GetFullName(Recipient.email),
    recipientBankName: process.env.BANK_NAME,
    description,
    amount,
    date,
    type: 'internal',
    status,
    recipientId: Recipient._id,
    senderId: Sender._id,
  };

  try {
    await Recipient.save();
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
      "Something went wrong, please try again later"
    );
  }
};
