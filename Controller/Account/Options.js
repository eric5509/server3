import { customJsonResponse } from "../../Lib/helper.js"
import { User } from "../../Models/User.js"

export const Options = async (req, res) => {
    const Users = await User.find().lean()
    const options = Users.map((user) => {
        return {
            label: `${user.firstName} ${user.middleName} ${user.lastName}`,
            value: user.accountNumber,
        }
    })
    const data = [{label: '', value: ''}, ...options]
    return customJsonResponse(res, 200, true, data, 'Accounts Found')
}