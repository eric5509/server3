import { AccountNumberExists, customJsonResponse } from "../../Lib/helper.js"
import { validate } from "../../Lib/validate.js"
import { Loan } from "../../Models/Loan.js"

export const ApplyForLoan = async (req, res) => {
    const {accountNumber} = req.body
    const Account = await AccountNumberExists(accountNumber)
    if(!validate(req.body)) return customJsonResponse(res, 400, false, null, 'Please fill in all fields')
    if(!Account) return customJsonResponse(res, 400, false, null, 'Invalid Account Number')
    const accountHolder  = `${Account.firstName} ${Account.middleName} ${Account.lastName}` 
    try {
        const newLoan = await Loan.create({...req.body, user: Account._id, accountHolder})
        return customJsonResponse(res, 200, true,newLoan, 'New Loan Created' )
    } catch (error) {
        return customJsonResponse(res, 500, false,null, error.message )
    }
}