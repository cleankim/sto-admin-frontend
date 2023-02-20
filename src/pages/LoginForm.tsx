import {Button, TextField } from "@mui/material";
import {ChangeEvent, useState } from "react";
import styled from "styled-components";
import { requestLogin } from "../api/login";
import Login from "../interface/Login";

export default function LoginForm() {
    const [loginInfo, setLoginInfo] = useState<Login>({id: 'medium', password: 'medium@1234'})

    const login = async () => {
        await requestLogin(loginInfo).then(res => {
            if (res.data.message === 'OK') {
                window.location.href = '/dashboard';
            }
        });
    }

    const setId = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value} = e.target;
        setLoginInfo({...loginInfo, id: value});
    }

    const setPassword = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value} = e.target;
        setLoginInfo({...loginInfo, password: value});
    }

    return (
        <LoginLayout>
            <h1>로그인</h1>
            <div>
                <TextField id="id" label="아이디" variant="outlined" style={{width: '400px'}} onChange={e => setId(e)}/>
            </div>
            <div>
                <TextField type="password" id="password" label="비밀번호" variant="outlined" style={{width: '400px'}} onChange={e => setPassword(e)}/>
            </div>
            <div>
                <Button variant="contained" style={{width: '400px'}} onClick={login}>로그인</Button>
            </div>
        </LoginLayout>
    );
}

const LoginLayout = styled.div`
  text-align: center;
  div {
    margin: 5px 0;
  }
`;
