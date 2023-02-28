import { TokenListFilter } from "../interface/Token";
import instance from "./axios";

export async function selectProductTokenList(productSn: string, {offset, limit}: TokenListFilter) {
    return instance.get(`/api/v1/admin/products/${productSn}/token`, {
        params: {offset, limit}
    })
    .then(res => {
        console.log('selectProductTokenList res >>>> ', res);
        return res.data.data;
    });
}