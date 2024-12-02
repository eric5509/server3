import mongoose from "mongoose";
import { customJsonResponse, AccountNumberExists } from "../../Lib/helper.js";
import { Transaction } from "../../Models/Transaction.js";
import { Transfer } from "../../Models/Transfer.js";
import { User } from "../../Models/User.js";

export const DeleteTransfer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let {id}  = req.params;

    if (!id)
      return customJsonResponse(
        res,
        400,
        false,
        null,
        "Missing required fields"
      );

    const TransferExist = await Transfer.findById(id);

    if (!TransferExist)
      return customJsonResponse(res, 400, false, null, "Invalid Transfer ID");
   
    await Transfer.findByIdAndDelete(id);

    await session.commitTransaction();
    session.endSession();

    return customJsonResponse(
      res,
      200,
      true,
      null,
      "Transfer Successfully Deleted"
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Something went wrong, please try again"
    );
  }
};
