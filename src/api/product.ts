import Product, { ProductListFilter } from "../interface/Product";
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

export async function selectProductDetail(id: string) {
    return instance.get(`/api/v1/admin/products/${id}`)
        .then(res => {
        return res.data.data;
    });
}

export async function updateProduct({productSn, reviewStatus}: Product) {
    console.log('productSn: ', productSn, ', reviewStatus: ', reviewStatus);

    return instance.patch(`/api/v1/admin/products/${productSn}/status`,
        JSON.stringify({
            "review_status": reviewStatus
        }),
        {
            headers: {'Content-type': 'application/json'}
        })
        .then(res => {
        return res.data.data;
    });
}

