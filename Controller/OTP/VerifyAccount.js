import { customJsonResponse, OTPExpired } from "../../Lib/helper.js";
import { OTP } from "../../Models/OTP.js";

export const VerifyAcount = async (req, res) => {
  const { otp, email } = req.body;
  if (!otp || !email)
    return customJsonResponse(
      res,
      200,
      false,
      null,
      "Please fill in all fields"
    );
  const OTPData = await OTP.findOne({ email, token });
  if (!OTPData) return customJsonResponse(res, 400, false, null, "Invalid OTP");
  const expired = OTPExpired(OTPData.expiryDate);
  try {
    if (expired) {
      await OTP.findByIdAndDelete(OTPData._id);
      return customJsonResponse(res, 400, false, null, "OTP Expired");
    }
    await OTP.findByIdAndDelete(OTPData._id);
    return customJsonResponse(
      res,
      200,
      false,
      null,
      "Account Verified Successfully"
    );
  } catch (error) {
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Something went wrong, Please try again later"
    );
  }
};
