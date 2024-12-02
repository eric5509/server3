import { Router } from "express";
import { inboundTransfer } from "../Controller/Transfer/inboundTransfer.js";
import { outboundTransfer } from "../Controller/Transfer/outboundTransfer.js";
import { internalTransfer } from "../Controller/Transfer/internalTransfer.js";
import { DeleteTransfer } from "../Controller/Transfer/deleteTransfer.js";
import { FetchAllTransfers } from "../Controller/Transfer/FetchAllTransfers.js";



export const transferRoutes = Router();

transferRoutes.post("/transfer/inbound", inboundTransfer);
transferRoutes.post("/transfer/outbound", outboundTransfer);
transferRoutes.post("/transfer/internal", internalTransfer);
transferRoutes.get("/transfers", FetchAllTransfers);
transferRoutes.delete("/transfer/delete/:id", DeleteTransfer);
