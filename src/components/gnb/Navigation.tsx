import { useLocation } from "react-router";
import styled from "styled-components";
import { Icon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EqualizerIcon from '@mui/icons-material/Equalizer';

type NavStyle = {
    isActive?: boolean;
}

export default function Navigation() {
    const location = useLocation();
    const pathname = location.pathname.split('/')[1];

    return (
        <Nav>
            <h1>
                <a href={`/`}>Metaripae Admin</a>
            </h1>
            <ul>
                <NavItem isActive={pathname === 'dashboard'}><HomeIcon color={`primary`}></HomeIcon><a href="/dashboard">대시보드</a></NavItem>
                <NavItem isActive={pathname === 'memberInfo'}><PersonIcon color={`primary`}></PersonIcon><a href="/memberInfo">회원정보</a></NavItem>
                <NavItem isActive={pathname === 'productInfo'}><EqualizerIcon color={`primary`}></EqualizerIcon><a href="/productInfo">투자상품정보</a></NavItem>
            </ul>
        </Nav>
    );
}

const Nav = styled.nav`
  display: block;
  
  h1 {
    padding: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #f5f7fe; 
    text-align: center;
    color: #2b3675;
    a:link, a:visited {
      color: #2b3675;
      text-decoration: none;
      font-weight: 700;
      font-size: 26px;
    }
  }
  
  ul {
    gap: 10px;
    display: grid;
    list-style: none;
    position: relative;
    margin: 0;
    padding: 0;
    
  }
`;

const NavItem = styled.li<NavStyle>`
  padding: 12px;
  text-align: start;
  border-right: ${({isActive}) => isActive ? '3px solid #4319ff' : 'none'};
  display: flex;
  align-items: center;
  
  a:link, a:visited {
    padding-left: 10px;
    color: ${({isActive}) => isActive ? '#2b3675' : '#a9b4d3'};
    text-decoration: none;
  }
`;