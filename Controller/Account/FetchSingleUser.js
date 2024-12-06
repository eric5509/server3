import { customJsonResponse, MongoIdValid, sendJsonResponse } from "../../Lib/helper.js";
import { User } from "../../Models/User.js";

export const FetchSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const UserAccount = await User.findById(id).lean();
    const {_id, __v, createdAt, updatedAt, ...rest} = UserAccount
    const data = {
      ...rest,
      userID: _id,
    }
    if (!UserAccount) return sendJsonResponse(res, 400, "User doesn't exist");
    return customJsonResponse(res, 200, true, data, 'Account found');
  } catch (error) {
    return customJsonResponse(res, 400, false, null, error.message);
    
  }
};
