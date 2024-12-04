import { customJsonResponse } from "../../Lib/helper.js";
import { validate } from "../../Lib/validate.js";
import { Loan } from "../../Models/Loan.js";

export const DeleteLoan = async (req, res) => {

  if (!req.params.id)
    return customJsonResponse(res, 400, false, null, "Please send a valid ID");

  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return customJsonResponse(res, 404, false, null, "Loan not found");
    }
    await Loan.findByIdAndDelete(req.params.id);
    return customJsonResponse(
      res,
      200,
      true,
      null,
      "Loan Successfully Deleted"
    );
  } catch (error) {
    return customJsonResponse(res, 500, false, null, error.message);
  }
};
