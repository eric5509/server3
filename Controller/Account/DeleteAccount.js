import { customJsonResponse, AccountNumberExists } from "../../Lib/helper.js"
import { User } from "../../Models/User.js"

export const DeleteAccount = async (req, res) => {
	const {id}  = req.params 
	try{
		const result = await User.deleteOne({ _id: id });
		console.log(result.deletedCount)
		if (result.deletedCount === 0) {
			console.log("No user found with the given ID.");
		} else {
			console.log("User deleted successfully.");
		}		return customJsonResponse(res, 200, true, null, 'User successfully deleted')
	}catch(error){
		return customJsonResponse(res, 500, false, null, 'Something went wrong, please try again later')
	}
}