import {
  convertToFormattedDate,
  customJsonResponse,
} from "../../Lib/helper.js";
import { Transaction } from "../../Models/Transaction.js";

export const AllTransactions = async (req, res) => {
  const AllTransactions = await Transaction.find()
    .populate("User", "availableBalance")
    .lean();

  if (AllTransactions.length === 0)
    return customJsonResponse(res, 200, true, null, "No Accounts Found");

  const result = AllTransactions.map(
    ({ _id, User, __v, createdAt, updatedAt, ...rest }) => {
      const { _id: userID, availableBalance } = User;
      return {
        ...rest,
        userID,
        transactionID: _id,
        accountBalance: availableBalance,
      };
    })
  return customJsonResponse(res, 200, true, result, "Transactions found");
};

// export type TTransaction = {
//   accountHolder: string;
//   accountNumber: string;
//   transactionType: 'credit' | 'debit';
//   description: string;
//   amount: number;
//   status: 'pending' | 'success' | 'failed';
//   date: number;
//   userID: string;
//   transactionID: string;
//   accountBalance: number;
// };
