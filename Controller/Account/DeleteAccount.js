import { customJsonResponse, AccountNumberExists } from "../../Lib/helper.js"
import { User } from "../../Models/User.js"


export const DeleteAccount = async (req, res) => {
	if (!req.params.id)
	  return customJsonResponse(res, 400, false, null, "Please send a valid ID");
	try {
	  const user = await User.findById(req.params.id);
	  if (!user) {
		return customJsonResponse(res, 404, false, null, "User not found");
	  }
	  await User.findByIdAndDelete(req.params.id);
	  return customJsonResponse(
		res,
		200,
		true,
		null,
		"User Successfully Deleted"
	  );
	} catch (error) {
	  return customJsonResponse(res, 500, false, null, error.message);
	}
  };
  