import { User } from "../../Models/User.js";
import {
  EmailExisits,
  PhoneNumberExisits,
  generateUniqueAccountNumber,
  convertToDate,
  customJsonResponse,
  toLowerCaseTrimmed,
  generateToken,
} from "../../Lib/helper.js";
import { validate } from "../../Lib/validate.js";
export const Register = async (req, res) => {
  let {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    gender,
    dob,
    availableBalance,
    currentBalance,
    occupation,
    state,
    street,
    country,
    city,
    zipCode,
    nationality,
    maritalStatus,
    imf,
    currency,
    cot,
    accountType,
    authPin,
    transferPin,
    password,
  } = req.body;
  email = toLowerCaseTrimmed(email);
  maritalStatus = toLowerCaseTrimmed(maritalStatus);
  gender =
    toLowerCaseTrimmed(gender) === "male" ||
    toLowerCaseTrimmed(gender) === "female"
      ? toLowerCaseTrimmed(gender)
      : "other";
  availableBalance = availableBalance ? Number(availableBalance) : 0;
  firstName = toLowerCaseTrimmed(firstName);
  middleName = toLowerCaseTrimmed(middleName);
  accountType = toLowerCaseTrimmed(accountType)
  lastName = toLowerCaseTrimmed(lastName);
  dob = convertToDate(dob);

  if (!validate(req.body))
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Please fill in all fields"
    );

  if (!dob)
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Please input a valid date"
    );

  const accountExistsEmail = await EmailExisits(email);
  if (accountExistsEmail)
    return customJsonResponse(res, 400, false, null, "Email already exists");
  const phoneNumberExist = await PhoneNumberExisits(phone);
  if (phoneNumberExist)
    return customJsonResponse(
      res,
      400,
      false,
      null,
      "Phone number already exists"
    );

  const accountNumber = await generateUniqueAccountNumber();

  const isAdmin = password.slice(-5) === process.env.ADMIN_SECRET;

  const data = {
    firstName,
    lastName,
    middleName,
    accountNumber,
    email,
    phone,
    gender,
    occupation,
    admin: isAdmin,
    state,
    street,
    country,
    city,
    zipCode,
    dob,
    availableBalance,
    currentBalance,
    imf,
    cot,
    maritalStatus,
    currency,
    accountType,
    authPin,
    transferPin,
    nationality,
    password,
    image: "",
  };
  try {
    const newAccount = await User.create(data);
    const tokenData = await generateToken(newAccount.email, 15);
    if (newAccount && tokenData) {
      return customJsonResponse(
        res,
        200,
        true,
        tokenData.token,
        "Account Created Successfully"
      );
    }
    return customJsonResponse(res, 400, true, null, error.message);
  } catch (error) {
    return customJsonResponse(res, 500, false, null, error.message);
  }
};
