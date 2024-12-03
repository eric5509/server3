import { customJsonResponse } from "../../Lib/helper.js";
import { Loan } from "../../Models/Loan.js";

export const FetchAllLoans = async (req, res) => {
  const loans = await Loan.find().lean();
  const result = loans.map(({ _id, __v, createdAt, updatedAt, ...rest }) => {
    return {
      loadID: _id,
      ...rest,
    };
  });
  if(result.length > 0 ){
      return customJsonResponse(res, 200, true, result, 'Loans Found')
  }
  return customJsonResponse(res, 200, true, result, 'Loans Not Found')
};
