export default interface Product {
    id?: number;
    productSn: string;
    productType: string;
    productNm: string;
    issuerNm: string;
    applyDt: string;
    expiredDt: string;
    securityAmount: number;
    offerAmount: number;
    reviewStatus: string;
    productStatus: string;
    holderNm: string;
}

export interface ProductList {
    list: Product[];
    totalCount: number;
}

export interface ProductListFilter {
    offset?: number;
    limit?: number;
    orderType?: 'latest' | 'oldest';
    productType?: 'EB' | 'TR' | 'CCL' | 'SCF' | 'LOG';
}