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
        <LoginFormLayout>
            <LoginLayout>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <h1 style={{width: '410px', fontSize: '36px', textAlign: 'start', color: '#2B3674'}}>로그인</h1>
                </div>
                <div>
                    <TextField id="id" label="아이디" variant="outlined" style={{width: '410px'}} onChange={e => setId(e)}/>
                </div>
                <div>
                    <TextField type="password" id="password" label="비밀번호" variant="outlined" style={{width: '410px'}} onChange={e => setPassword(e)}/>
                </div>
                <div>
                    <Button variant="contained" style={{width: '410px', height: '54px', background: '#4318FF', borderRadius: '16px', fontSize: '17px'}} onClick={login}>로그인</Button>
                </div>
            </LoginLayout>
            <MainLayout>
                <AdminLogo/>
                <h1 style={{fontSize: '42px'}}>메타리페 Admin</h1>
                <MainTextLayout>
                    <p>무결점 전자어음 투자, 메타리페와 함께 </p>
                    <p style={{fontSize: '29px', lineHeight: '45px'}}>metaripae.com</p>
                </MainTextLayout>
            </MainLayout>
        </LoginFormLayout>
    );
}


const LoginFormLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const MainLayout = styled.section`
  width: 960px;
  height: 100vh;
  background: no-repeat url("/img/background.svg");
  background-color: #ffffff;
  border-radius: 0px 0px 0px 200px;
  color: #ffffff;
`;

const AdminLogo = styled.div`
  height: 280px;
  background: no-repeat url("/img/admin_logo.svg");
  background-position: center;
  margin-top: 212px;
  margin-bottom: 27.39px;
`;

const MainTextLayout = styled.div`
  width: 468.56px;
  height: 134.05px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2.19751px solid rgba(255, 255, 255, 0.2);
  border-radius: 26.3701px;
  margin: 123px auto 0;
`;

const LoginLayout = styled.section`
  width: 960px;
  div {
    margin: 5px 0;
  }
`;

