import { request } from "../_helper";

export const supplierService = {
    getSupplierList
}

function getSupplierList() {
    return request.get("v2/universities");
}
