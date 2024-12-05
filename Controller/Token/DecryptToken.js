import jwt from "jsonwebtoken";
import { customJsonResponse } from "../../Lib/helper.js";

export const DecryptToken = async (req, res) => {
  const { token } = req.params;
  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  if (!token)
    return customJsonResponse(res, 400, false, null, "Please input a token");
  if (!tokenData) 
    return customJsonResponse(res, 400, false, null, "Invalid or Expired Token");
  return customJsonResponse(res, 200, true, tokenData, "Token Valid");
};
