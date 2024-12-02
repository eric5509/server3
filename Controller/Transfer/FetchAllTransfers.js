import { customJsonResponse, TransferExists } from "../../Lib/helper.js"
import { Transfer } from "../../Models/Transfer.js"

export const FetchAllTransfers = async (req, res) => {
    const allTransfers = await Transfer.find().lean()

    const newArray = allTransfers.map(({_id, __v,createdAt, updatedAt, ...rest}) => {
        return {
            ...rest,
            id: _id
        }
    })
    if(allTransfers.length > 0 ){
        return customJsonResponse(res, 200, true, newArray, 'Transfers Found')
    }
    return customJsonResponse(res, 200, true, allTransfers, 'No Transfers Found')
    
}