import styled from "styled-components";

export default function Navigation() {
    return (
        <Nav>
            <ul>
                <li><a href="/dashboard">대시보드</a></li>
                <li><a href="/memberInfo">회원정보</a></li>
                <li><a href="/productInfo">투자상품정보</a></li>
            </ul>
        </Nav>
    );
}

const Nav = styled.nav`
  
  ul {
    list-style: none;
    position: relative;
    
    
    li {
      
    }
  }
`;