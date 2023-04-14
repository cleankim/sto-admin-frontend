import {
    Block,
    FileLabelButton,
    InputFileWithButton,
    SubText,
    BlueButton,
    InputTextWithButton, CSButtonLayout,
    Flex
} from '../../assets/GlobalStyle';
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {BoardTypeContext, getBoardTypeText} from "../../pages/CustomerService";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router";
import Board, {FaqType} from "../../interface/Board";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";


export default function CreateBoard() {

    const boardTypeContext = useContext(BoardTypeContext);
    const [boardType, setBoardType] = useState(boardTypeContext.type);

    const location = useLocation();
    const userSn = location.pathname.split('/')[3];

    const [file, setFile] = useState('');
    const initialState: Board = {
        title: '',
        file: '',

    }
    const [boardData, setBoardData] = useState<Board>();
    const onFileChange = (e: ChangeEvent) => {
        const target = (e.target as HTMLInputElement);
        setFile(target.value);
    }

    const insertBoard = () => {
        // go on detail
    }
    const modifyBoard = () => {
        // go on detail
    }
    const navigate = useNavigate();
    const onClickNavigate = () => {
        navigate('/customerService');
    }

    // faq
    const [faqType, setFaqType] = useState<FaqType>('invest');
    const handleChange = (event: SelectChangeEvent) => {
        setFaqType(event.target.value as FaqType);
    };

    useEffect(() => {}, []);

    return (
        <Block>
            <h3>{`${getBoardTypeText(boardType)} ${userSn !== undefined ? '수정' : '등록'}`}</h3>
            <form action="">
                <Flex>
                    {boardType === 'faq' &&
                        <FormControl variant="filled" style={{marginRight: '35px'}}>
                            <Select
                                id="demo-simple-select-filled"
                                value={faqType}
                                onChange={handleChange}
                                style={{width: '150px', height: '100%', marginBottom: '5px'}}
                                sx={{
                                    '& .MuiSelect-select': {
                                    },
                                    '& .MuiFilledInput-input:focus': {
                                        backgroundColor: 'transparent !important'
                                    }
                                }}
                            >
                                <MenuItem value='invest'>투자관련</MenuItem>
                                <MenuItem value='offer'>공모관련</MenuItem>
                                <MenuItem value='membership'>고객정보관련</MenuItem>
                                <MenuItem value='etc'>기타</MenuItem>
                            </Select>
                        </FormControl>
                    }
                    <TextField id="title" label="제목" variant="outlined" style={{width: '100%',  marginBottom: '5px'}}/>
                </Flex>
                <CKEditor
                    editor={ ClassicEditor }
                    config={{placeholder: `${getBoardTypeText(boardType)} 내용 등록`}}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                <div>
                    <SubText>첨부파일 등록</SubText>
                    <div style={{width: '410px', border: '1px solid #DFE2E9', display: 'flex', padding: '9px 12px'}}>
                        <InputTextWithButton value={file} disabled/>
                        <InputFileWithButton id='file' onChange={e => onFileChange(e)} />
                        <FileLabelButton htmlFor={`file`}><BlueButton>파일찾기</BlueButton></FileLabelButton>
                    </div>
                </div>
                <CSButtonLayout>
                    {
                        userSn !== undefined ?
                            <>
                                <Button variant="outlined" style={{width: '160px', height: '50px'}}
                                        onClick={onClickNavigate}>취소</Button>
                                <Button variant="contained" style={{width: '160px', height: '50px'}}
                                        onClick={modifyBoard}>수정 완료</Button>
                            </>
                            :
                            <>
                                <Button variant="outlined" style={{width: '160px', height: '50px'}}
                                        onClick={onClickNavigate}>목록으로</Button>
                                <Button variant="contained" style={{width: '160px', height: '50px'}}
                                        onClick={insertBoard}>등록</Button>
                            </>
                    }
                </CSButtonLayout>
            </form>
        </Block>
    );
}

