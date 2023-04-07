import {GridColDef} from "@mui/x-data-grid";

export default interface Member {
    id?: number;
    address?: string;
    addressDesc?: string;
    joinDate?: string;
    joinType?: 'direct' | 'naver' | 'kakao' | 'google';
    lastPwdChanged?: string;
    mobileNo?: string;
    postCode?: string;
    updateDt?: string;
    userCorpYn?: 'Y' | 'N';
    userEmail?: string;
    userEngNm?: string;
    userNm?: string;
    userPwd?: string;
    userSn?: string;
    userState?: string;
    userType?: UserType;
}

export interface MemberList {
    list: Member[];
    totalCount: number;
}

export interface MemberListFilter {
    offset?: number;
    limit?: number;
    orderType?: 'latest' | 'oldest';
    userType?: 'investor' | 'ipo';
    joinType?: 'direct' | 'naver' | 'kakao' | 'google';
    userCorpYn?: 'Y' | 'N';
    startDate?: string;
    endDate?: string;
}

export const getMemberTypeText = ({userType, userCorpYn}: Member) => {
    switch(userType) {
        case 'investor': return userCorpYn === 'Y' ? '법인투자자' : '개인투자자';
        case 'ipo': return userCorpYn === 'Y' ? '법인공모자' : '개인공모자';
    }
}

export type UserType = 'investor' | 'ipo';

export interface MemberBalance {
    id?: number;
    balanceSn?: string;
    balanceAmount?: number;
    tradeNm?: string;
    tradeType?: string;
    completeDt?: string;
    applyDt?: string;
}