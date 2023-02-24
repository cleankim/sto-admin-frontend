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
    userType?: 'investor' | 'ipo';
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