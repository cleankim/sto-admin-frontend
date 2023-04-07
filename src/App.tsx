import React from 'react';
import './App.css';
import Navbar from './components/gnb/Navbar';
import Navigation from "./components/gnb/Navigation";
import styled from 'styled-components';
import {GlobalStyle, MenuTitle} from "./assets/GlobalStyle";
import { useLocation } from 'react-router';
import {getMenuItem, PathText} from "./enum/MenuItems";

function App() {
    const location = useLocation();
    const pathname = location.pathname.split('/')[1];

  return (
    <div style={{display: 'flex', width: '100%', height: '100%'}}>
      <GlobalStyle/>
        { pathname !== '' &&
            <Header>
                <Navigation/>
            </Header>
        }
      <Main>
        <MenuTitle>{getMenuItem(pathname as PathText)}</MenuTitle>
        <Navbar />
      </Main>
      <footer/>
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
  height: 100vh;
  padding: 20px;
  background: #f5f7fe;
  overflow: scroll;
`;