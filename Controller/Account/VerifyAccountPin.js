import { customJsonResponse, CreateOTP } from "../../Lib/helper.js";
import { User } from "../../Models/User.js";

export const VerifyAccountPin = async (req, res) => {
  const { accountNumber, authPin } = req.body;

  if (!accountNumber || !authPin) {
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Please fill in all fields"
    );
  }

  try {
    const Account = await User.findOne({ accountNumber, authPin });
    if (!Account) {
      return customJsonResponse(
        res,
        400,
        false,
        null,
        "Incorrect Authentication PIN"
      );
    }
    const otp = await CreateOTP(Account.email, 15);
    console.log(otp)

    if (otp) {
      const data = {
        otp,
        firstName: Account.firstName
      }
      return customJsonResponse(res, 200, true, data, "Verification successful");
    } else {
      return customJsonResponse(
        res,
        400,
        false,
        null,
        "Could not create token, please try again later"
      );
    }
  } catch(error){
    return customJsonResponse(res, 500, false, null, error.message);
  }
}
