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
    /*  waiting: '대기중',
        process: '심사중',
        deny: '반려',
        approve: '승인',
        contract: '계약 완료',
        register: '상품 등록'
    * */
    reviewStatus?: 'waiting' | 'process' | 'deny' | 'approve' | 'confirm' | 'contract' | 'register';
    /*  reviewing: '심사중',
        reviewed: '심사 완료',
        recruiting: '모집중',
        recruited: '모집완료',
        redeeming: '상환중',
        redeemed: '상환완료',
        overdue: '연체중'
        payout: '지급완료'
    * */
    productStatus?: 'reviewing' | 'reviewed' | 'recruiting' | 'recruited' | 'redeeming' | 'redeemed' | 'overdue' | 'payout';
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