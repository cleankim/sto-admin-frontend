import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/gnb/Navbar';
import Navigation from "./components/gnb/Navigation";
import styled from 'styled-components';
import axios from 'axios';
import {GlobalStyle} from "./assets/GlobalStyle";
import { useLocation } from 'react-router';

function App() {
    const location = useLocation();
    const pathname = location.pathname.split('/')[1];

  return (
    <div style={{display: 'flex', width: '100%', height: '100vh'}}>
      <GlobalStyle/>
        { pathname !== '' &&
            <Header>
                <Navigation/>
            </Header>
        }
      <Main>
        <Navbar />
      </Main>
      <footer></footer>
    </div>
  );
}

export default App;

const Header = styled.header`
  top: 0;
  left: 0;
  width: 350px;
  height: 100%;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  background: #f5f7fe;
`;