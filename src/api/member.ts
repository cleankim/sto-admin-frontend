import { MemberListFilter } from "../interface/Member";
import instance from "./axios";

export async function selectMemberList({offset, limit, orderType, userType}: MemberListFilter) {
    return instance.get(`/api/v1/admin/users`, {
        params: {
            offset,
            limit,
            user_type: userType,
            order_type: 'latest'
        }
    }).then(res => {
        return res.data.data;
    });
}

export async function selectMember(id: string) {
    return instance.get(`/api/v1/admin/users/${id}`)
        .then(res => {
            return res.data.data;
        });
}

export async function selectMemberBalanceHistory(id: string, {offset, limit}: MemberListFilter) {
    return instance.get(`/api/v1/admin/balances/history/${id}`, {
        params: {
            offset,
            limit,
            order_type: 'latest'
        }
    })
        .then(res => {
            return res.data.data;
        });
}

export async function selectMemberInvestHistory(id: string, {offset, limit}: MemberListFilter) {
    return instance.get(`/api/v1/admin/invests/${id}`, {
            params: {
                offset,
                limit,
                order_type: 'latest'
            }
        })
        .then(res => {
            return res.data.data;
        });
}

export async function selectMemberTokenHistory(id: string, {offset, limit}: MemberListFilter) {
    return instance.get(`/api/v1/admin/my-tokens/${id}`, {
        params: {
            offset,
            limit,
            order_type: 'latest'
        }
    })
    .then(res => {
        return res.data.data;
    });
}

export async function selectMemberWithdrawHistory(id: string, {offset, limit}: MemberListFilter) {
    return instance.get(`/api/v1/admin/balances/withdraw/${id}`, {
        params: {
            offset,
            limit,
            order_type: 'latest'
        }
    })
    .then(res => {
        return res.data.data;
    });
}

export async function selectMemberProductHistory(id: string, {offset, limit}: MemberListFilter) {
    return instance.get(`/api/v1/admin/my-products/${id}`, {
        params: {
            offset,
            limit,
            order_type: 'latest'
        }
    })
    .then(res => {
        return res.data.data;
    });
}