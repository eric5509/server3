import { customJsonResponse, generateAuthToken } from "../../Lib/helper.js";
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
      return customJsonResponse(res, 400, false, null, "Incorrect Authentication PIN");
    }
    const data = {
      email: Account.email,
      userID: Account._id,
      isAdmin: Account.admin,
      accountBalance: Account.availableBalance,
      firstName: Account.firstName,
      middleName: Account.middleName,
      lastName: Account.lastName,
      accountNumber,
    };
    const token = await generateAuthToken(data);
    console.log(token)
    if (token) {
      return customJsonResponse(res, 200, true, token, 'Login successful');
    } else {
      return customJsonResponse(res, 500, false, null, 'Could not create token, please try again later');
    }
  } catch (error) {
    return customJsonResponse(res, 500, false, null, error.message);
  }
};
