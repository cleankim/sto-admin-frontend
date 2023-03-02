export default interface Token {
    id?: number;
    productSn?: string;
    tradeSn?: string;
    userSn?: string;
    investType?: string;
    issueToken?: number;        // 토큰개수
    trandeAmount?: bigint;      // 거래금액
    tradeDt?: string;

    tokenSn?: string;           // 토큰 ID
    tokenNm?: string;           // 토큰명
    tokenStatus?: string;       // 토큰상태
    productNm?: string;          // 상품명
    issueCnt?: number;           // 발행개수
    tokenPrice?: number;        // 토큰가격
    tradeCnt?: number;           // 총 거래량
    tradeAmount?: bigint;         // 총 거래대금
    issueDt?: string;            // 발행일
    expiredDt?: string;          // 소각일
}
export interface TokenList {
    list: Token[];
    totalCount: number;
}

export interface TokenListFilter {
    offset?: number;
    limit?: number;
}