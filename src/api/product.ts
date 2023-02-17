import { ProductListFilter } from "../interface/Product";
import instance from "./axios";

export async function selectProductList({offset, limit, productType}: ProductListFilter) {

    return instance.get(`/api/v1/admin/products`, {
        params: {
            offset,
            limit,
            product_type: productType
        }
    }).then(res => {
        return res.data.data;
    });
    

}