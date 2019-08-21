import { request, authHeader } from "../_helper";

export const supplierService = {
    getSupplierList
}

function getSupplierList() {
    return request.get("v2/universities", authHeader.get());
}
