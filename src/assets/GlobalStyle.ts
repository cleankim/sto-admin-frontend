import styled, { createGlobalStyle } from "styled-components";

export type MarginProps = {
    margin: string;
    mt: number;
    mr: number;
    mb: number;
    ml: number;
};
export type FlexProps = {
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
};

export const GlobalStyle = createGlobalStyle`
  blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {margin:0;padding:0}
  //h1, h2, h3, h4, h5, h6 {font-size:100%;font-weight:400}
  ul {list-style:none}
  button, input, select {margin:0}
  html {
    box-sizing:border-box;
  }
  html, body {
    height: 100%;
  }
  *, :after, :before {box-sizing:inherit}
  img, video {height:auto;max-width:100%}
  iframe {border:0}
  table {border-collapse:collapse;border-spacing:0}
  td, th {padding:0}
  
  .MuiDataGrid-columnSeparator svg path {
    display: none;
  }
  .MuiDataGrid-columnHeaders {
    height: 40px;
    color: #A3AED0;
    font-weight: 500;
  }
  .MuiDataGrid-row {
    cursor: pointer;
  }
  .MuiDataGrid-cell {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #2B3674;
    font-weight: 700;
  }
  .MuiDataGrid-cell:focus {
    outline: none;
  }
  .MuiDataGrid-cell a:link, a:visited {
    color: #2B3674;
    text-decoration: none;
  }
  .MuiDataGrid-footerContainer {
    justify-content: center !important;
    border-top: none !important;
  }
  .MuiPagination-ul .Mui-selected {
    background-color: transparent !important;
    color: #4690FF;
  }
`;

export const Margin = styled.div<Partial<MarginProps>>`
  margin: ${({ margin }) => margin};
  margin-top: ${({ mt }) => `${mt}px`};
  margin-right: ${({ mr }) => `${mr}px`};
  margin-bottom: ${({ mb }) => `${mb}px`};
  margin-left: ${({ ml }) => `${ml}px`};
`;

export const Flex = styled.div<FlexProps & Partial<MarginProps>>`
  display: flex;
  flex-direction: ${({flexDirection}) => flexDirection};
  justify-content: ${({justifyContent}) => justifyContent ?? `center`};
  align-items: ${({alignItems}) => alignItems ?? `center`};
  margin: ${({ margin }) => margin};
  margin-top: ${({ mt }) => `${mt}px`};
  margin-right: ${({ mr }) => `${mr}px`};
  margin-bottom: ${({ mb }) => `${mb}px`};
  margin-left: ${({ ml }) => `${ml}px`};
  gap: ${({gap}) => `${gap}`};
`;

export const Block = styled.section`
  background: #ffffff;
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  
  h3 {
    font-size: 24px;
    color: #2B3674;
    margin-bottom: 20px;
  }
`;

export const MoreButton = styled.button.attrs({type: 'button'})`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  border: none;
  //flex-wrap: none;
  align-items: center;
  background: #f5f7fe;
  color: #4319ff;
`;

export const DataGridStyle = {
    width: '100%',
    height: '850px',
    marginBottom: '15px',
    textAlign: 'center',
    fontSize: '15px',
    tableLayout: 'fixed',
    border: 'none'
};

export const MenuTitle = styled.h2`
  color: #2b3675;
  margin-bottom: 20px;
`;

export const SubTitle = styled.p`
  color: #2B3674;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`;

export const Gap20Layout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const BoldText = styled.h3`
  color: #2B3674;
  font-weight: 700;
  font-size: 24px;
`;