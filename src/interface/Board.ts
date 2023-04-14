import {BoardType} from "../pages/CustomerService";

export default interface Board {
    id?: string;
    title?: string;
    file?: string;
    createDt?: string;
    faqType?: FaqType;
}

export interface BoardList {
    list: Board[];
    totalCount: number;
}

export interface BoardListFilter {
    boardType?: BoardType;
    offset?: number;
    limit?: number;
    orderType?: 'latest' | 'oldest';
}

export type FaqType = 'invest' | 'offer' | 'service' | 'membership' | 'etc';