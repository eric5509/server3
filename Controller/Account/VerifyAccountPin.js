import { customJsonResponse, CreateOTP } from "../../Lib/helper.js";
import { OTP } from "../../Models/OTP.js";
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
    const userHasOTP = await OTP.findOne({email: Account.email})
    if(userHasOTP){
      await OTP.findByIdAndDelete(userHasOTP._id)
    }
    const otp = await CreateOTP(Account.email, 15);
    if (otp) {
      return customJsonResponse(res, 200, true, otp, "Verification successful");
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
