import {Block, CSButtonLayout, Flex} from '../../assets/GlobalStyle';
import {useContext, useState} from "react";
import {BoardTypeContext, getBoardTypeText} from "../../pages/CustomerService";
import {Button} from "@mui/material";
import {useNavigate} from "react-router";
import styled from "styled-components";

export default function BoardDetail() {

    const boardTypeContext = useContext(BoardTypeContext);
    const [boardType, setBoardType] = useState(boardTypeContext.type);

    const navigate = useNavigate();
    const onClickNavigate = () => {
        navigate(`/customerService`);
    }
    const modifyBoard = () => {
        navigate(`/customerService/create/`);
    }

    return (
        <Block>
            <h3>{`${getBoardTypeText(boardType)} 상세화면`}</h3>
            <BlockContent>
                <Flex justifyContent={`space-between`}>
                    <p>{`title`}</p>
                    <span>{`date`}</span>
                </Flex>
                <div>{`contents`}</div>
                <div style={{height: '100px', display: 'flex', alignContent: 'center', flexWrap: 'wrap'}}>{`첨부파일 없음`}</div>
            </BlockContent>
            <CSButtonLayout>
                <Button variant="outlined" style={{width: '160px', height: '50px'}} onClick={onClickNavigate}>목록으로</Button>
                <Button variant="contained" style={{width: '160px', height: '50px'}} onClick={modifyBoard}>수정</Button>
            </CSButtonLayout>
        </Block>
    );
}

const BlockContent = styled.div`
  div {
    border-bottom: 1px solid #DFE2E9;
    padding: 14px 12px;
  }
`;