import { customJsonResponse, AccountNumberExists } from "../../Lib/helper.js"
import { Transaction } from "../../Models/Transaction.js"
import { User } from "../../Models/User.js"

export const DeleteTransaction = async (req, res) => {
	const {id}  = req.params 
	const transaction = await Transaction.findById(id)
	if(!transaction) return customJsonResponse(res, 404, false, null, 'Transaction Not Found')
	try{
		await Transaction.findByIdAndDelete(id)
		return customJsonResponse(res, 200, true, null, 'Transaction successfully deleted')
	}catch(error){
		return customJsonResponse(res, 500, false, null, 'Something went wrong, please try again later')
	}
}