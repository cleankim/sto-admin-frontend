import instance from "./axios";
import {BoardListFilter} from "../interface/Board";

export async function getBoardList({boardType, orderType, limit, offset}: BoardListFilter) {
    return instance.get(`/api/v1/admin/${boardType}`, {
        params: {
            offset,
            limit,
            order_type: orderType
        }
    }).then(res => {
        return res.data.data;
    })
}