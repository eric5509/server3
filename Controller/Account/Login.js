import { AccountNumberExists, customJsonResponse, generateAuthToken } from "../../Lib/helper.js";
import { User } from "../../Models/User.js";

export const Login = async (req, res) => {
  let { accountNumber, password } = req.body;
  accountNumber = accountNumber.toString()
  if (!accountNumber.trim() || !password.trim())
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Please fill in all fields"
    );

  const UserAccount = await User.findOne({accountNumber})

  if (!UserAccount)
    return customJsonResponse(res, 400, false, null, "Invalid Credentials");

  const PasswordMatch = UserAccount.password === password;
  if (!PasswordMatch)
    return customJsonResponse(res, 400, false, null, "Invalid Credentials");

  if (UserAccount.blocked)
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Sorry, Your account has been blocked, contact support to regain access"
    );

    const data = {
      email: UserAccount.email,
      isAdmin: UserAccount.isAdmin,
      firstName: UserAccount.firstName,
      middleName: UserAccount.middleName,
      lastName: UserAccount.lastName,
      userID: UserAccount._id,
      accountNumber: UserAccount.accountNumber,
      accountBalance: UserAccount.availableBalance,
    }

    const returnData = {
      fullName: `${UserAccount.firstName} ${UserAccount.lastName} ${UserAccount.middleName}`,
      accountNumber: UserAccount.accountNumber,
      email: UserAccount.email
    }

  try {
    return customJsonResponse(res, 200, true, returnData, "Login Successful");
  } catch (error) {
    return customJsonResponse(res, 400, true, null, "Something went wrong, Try again later");
  }

  // const tokenData = {
  //   id: UserAccount._id,
  //   admin: UserAccount.admin,
  //   fullname: getAccountName(
  //     UserAccount.firstName,
  //     UserAccount.middleName,
  //     UserAccount.lastName
  //   ),
  //   phone: UserAccount.phone,
  //   image: UserAccount.image,
  //   email: UserAccount.email,
  // };

  // try {
  //   const token = signJWT(tokenData)
  //   return sendJsonResponse(res, 500, 'Login Successful', token);
  // } catch (error) {
  //   return sendJsonResponse(res, 500, error.message);
  // }
};
