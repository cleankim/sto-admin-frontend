import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {margin:0;padding:0}
  //h1, h2, h3, h4, h5, h6 {font-size:100%;font-weight:400}
  ul {list-style:none}
  button, input, select {margin:0}
  html {
    box-sizing:border-box;

  }
  *, :after, :before {box-sizing:inherit}
  img, video {height:auto;max-width:100%}
  iframe {border:0}
  table {border-collapse:collapse;border-spacing:0}
  td, th {padding:0}
`;

export const Block = styled.section`
  background: #ffffff;
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  
  h3 {
    margin-bottom: 20px;
  }
`;

export const SearchInput = styled.input.attrs({type: 'text', placeholder: 'Search'})`
  text-indent: 20px;
  width: 250px;
  height: 40px;
  border: none;
  background: #f5f7fe;
  border-radius: 10px;
  margin-right: 15px;
`;


export const MoreButton = styled.button.attrs({type: 'button'})`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  border: none;
  flex-wrap: none;
  align-items: center;
  background: #f5f7fe;
  color: #4319ff;
`;
