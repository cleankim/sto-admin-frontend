import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/gnb/Navbar';
import Navigation from "./components/gnb/Navigation";
import styled from 'styled-components';
import axios from 'axios';

function App() {
  return (
    <div className="App" style={{display: 'flex', width: '100%', height: '100%'}}>
      <Header>
          <Navigation />
      </Header>
      <Main>
        <Navbar />
        <footer></footer>
      </Main>
    </div>
  );
}

export default App;

const Header = styled.header`
  top: 0;
  left: 0;
  width: 500px;
  height: 100%;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f5f7fe;
  padding: 20px;
`;