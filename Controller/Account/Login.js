import { customJsonResponse, generateToken } from "../../Lib/helper.js";
import { User } from "../../Models/User.js";

export const Login = async (req, res) => {
  const { value, password } = req.body;
  console.log(value);
  if (!value.trim() || !password.trim())
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Please fill in all fields"
    );

  const UserAccount = await User.findOne({
    $or: [{ phone: value }, { email: value }],
  });

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

  try {
    const data = await generateToken(UserAccount.email, 15);
    return customJsonResponse(res, 200, data.token, null, "Valid");
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
