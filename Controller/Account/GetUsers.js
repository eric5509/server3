import {
  convertToFormattedDate,
  customJsonResponse,
} from "../../Lib/helper.js";
import { User } from "../../Models/User.js";

export const GetUsers = async (req, res) => {
  try {
    let Users = await User.find().select("-__v -createdAt -updatedAt").lean();
    const data = Users.map(({ _id, ...rest }) => {
      return rest ;
    });
    return customJsonResponse(res, 200, true, data, "Users Found");
  } catch {
    return customJsonResponse(
      res,
      500,
      false,
      null,
      "Something went wrong, please try again later"
    );
  }
};
