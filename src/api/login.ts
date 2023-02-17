import axios from "axios";
import Login from "../interface/Login";
import instance from "./axios";

export async function requestLogin({id, password}: Login) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('password', password);
    return instance.post(`/api/v1/admin/login`, formData)
        .then(res => {
            return res;
        });
}