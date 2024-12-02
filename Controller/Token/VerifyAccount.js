import { customJsonResponse, tokenExpired } from "../../Lib/helper.js";
import { Token } from "../../Models/Token.js";

export const VerifyAcount = async (req, res) => {
  const { token, email } = req.body;
  if (!token || !email)
    return customJsonResponse(
      res,
      200,
      false,
      null,
      "Please fill in all fields"
    );
  const TOKEN = await Token.findOne({ email, token });
  if (!TOKEN) return customJsonResponse(res, 400, false, null, "Invalid OTP");
  const TokenExpired = tokenExpired(TOKEN.expiryDate);
  try {
    if (TokenExpired) {
      await Token.findByIdAndDelete(TOKEN._id);
      return customJsonResponse(res, 400, false, null, "OTP Expired");
    }
    await Token.findByIdAndDelete(TOKEN._id);
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
