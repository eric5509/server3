import {
  customJsonResponse,
  EmailExisits,
  generateAuthToken,
  OTPExpired,
} from "../../Lib/helper.js";
import { OTP } from "../../Models/OTP.js";
export const VerifyOTP = async (req, res) => {
  const { otp, email } = req.body;
  console.log(otp, email)
  if (!otp || !email)
    return customJsonResponse(
      res,
      200,
      false,
      null,
      "Please fill in all fields"
    );
  const Account = await OTP.findOne({ email, otp });
  if (!Account)
    return customJsonResponse(res, 400, false, null, "Incorrect OTP");
  if (OTPExpired(Account.expiryDate))
    return customJsonResponse(res, 400, false, null, "Token Expired OTP");
  const UserAccount = await EmailExisits(email);
  const data = {
    firstName: UserAccount.firstName,
    lastName: UserAccount.lastName,
    middleName: UserAccount.middleName,
    isAdmin: UserAccount.admin,
    email: UserAccount.email,
    phone: UserAccount.phone,
  };
  const token = generateAuthToken(data);
  return customJsonResponse(res, 200, true, token, 'OTP Verified Successfully')
};
