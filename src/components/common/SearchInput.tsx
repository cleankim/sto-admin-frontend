import styled from "styled-components";

export default function SearchInput() {
    return (
        <SearchInputLayout/>
    );
}

const SearchInputLayout = styled.input.attrs({type: 'text', placeholder: 'Search'})`
  text-indent: 20px;
  width: 250px;
  height: 40px;
  border: none;
  background: #f5f7fe;
  border-radius: 10px;
  margin-right: 15px;
`;