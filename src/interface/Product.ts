export default interface Product {
    id?: number;
    productSn?: string;
    productType?: string;
    productNm?: string;
    issuerNm?: string;          // 소지인
    applyDt?: string;
    expiredDt?: string;
    securityAmount?: number;
    offerAmount?: number;
    reviewStatus?: 'waiting' | 'process' | 'deny' | 'approve' | 'confirm' | 'contract' | 'register';
    productStatus?: 'reviewing' | 'reviewed' | 'recruiting' | 'recruited' | 'redeeming' | 'redeemed' | 'overdue';
    holderNm?: string;          // 발행인
    investPeriod?: number;
    productLevel?: string;
    annualReturn?: number;      // 수익률
    offerStartDate?: string;    // 모집 시작일
    offerEndDate?: string;      // 모집 마지막일
    maturityDate?: string;      // 상환일
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