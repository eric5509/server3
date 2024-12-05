import jwt from "jsonwebtoken";
import { customJsonResponse } from "../../Lib/helper.js";

export const DecryptToken = async (req, res) => {
  const { token } = req.params;
  if (!token || token == undefined)
    return customJsonResponse(res, 400, false, null, "Please input a token");
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    return customJsonResponse(res, 200, true, tokenData, "Token Valid");
  } catch (error) {
    return customJsonResponse(res, 400, false, null, "Invalid or Expired Token");
  }
};
