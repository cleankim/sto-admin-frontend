import { TokenListFilter } from "../interface/Token";
import instance from "./axios";

export async function selectTokenList({offset, limit}: TokenListFilter) {
    return instance.get(`/api/v1/admin/tokens`, {
        params: {offset, limit}
    })
    .then(res => {
        return res.data.data;
    });
}

export async function selectProductTokenList(productSn: string, {offset, limit}: TokenListFilter) {
    return instance.get(`/api/v1/admin/products/${productSn}/token`)
    .then(res => {
        return res.data.data;
    });
}

export async function selectTokenDetail(tokenSn: string) {
    return instance.get(`/api/v1/admin/tokens/${tokenSn}`)
    .then(res => {
        return res.data.data;
    });
}