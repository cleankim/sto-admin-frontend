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