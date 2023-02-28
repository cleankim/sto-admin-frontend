export default interface Token {
    id?: number;
    productSn?: string;
    tradeSn?: string;
    userSn?: string;
    investType?: string;
    issueToken?: number;        // 토큰개수
    trandeAmount?: bigint;      // 거래금액
    tradeDt?: string;
}

export interface TokenList {
    list: Token[];
    totalCount: number;
}

export interface TokenListFilter {
    offset?: number;
    limit?: number;
}