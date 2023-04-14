import {Block, Flex} from '../../assets/GlobalStyle';
import {BoardType, BoardTypeContext, getBoardTypeText} from "../../pages/CustomerService";
import {useContext, useEffect, useState} from "react";
import Board, {BoardList} from "../../interface/Board";
import {Button} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router";

export default function BoardListView() {

    const boardTypeContext = useContext(BoardTypeContext);
    const [boardType, setBoardType] = useState(boardTypeContext.type);
    const [boardData, setBoardData] = useState<BoardList>({list: [], totalCount: 0});

    const getBoardList = async (type: BoardType) => {
        await getBoardList(type)
            .then(res => {

            })
    }

    const [filter, setFilter] = useState<'latest' | 'oldest'>('latest');
    const handleChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value as 'latest' | 'oldest');
    };
    const navigate = useNavigate();
    const onClickEvent = (e: React.MouseEvent) => {
        navigate('/customerService/create');
    }

    useEffect(() => {
        setBoardType(boardTypeContext.type);
    }, [boardTypeContext.type]);

    return (
        <Block>
            <h3>{getBoardTypeText(boardType)}</h3>
            <Flex justifyContent={`space-between`}>
                <p style={{fontSize: '24px'}}>{`총 ${boardData.totalCount}건이 검색되었습니다.`}</p>
                <div>
                    <FormControl variant="filled">
                    <Select
                        id="demo-simple-select-filled"
                        value={filter}
                        onChange={handleChange}
                        style={{width: '300px', height: '40px'}}
                        sx={{
                            '& .MuiSelect-select': {
                                height: '40px !important'
                            },
                            '& .MuiFilledInput-input:focus': {
                                backgroundColor: 'transparent !important'
                            }
                        }}
                    >
                        <MenuItem value='latest'>최근 등록 순</MenuItem>
                        <MenuItem value='oldest'>오래된 등록 순</MenuItem>
                    </Select>
                    </FormControl>
                    {boardType !== 'qna' && <Button variant="outlined" onClick={onClickEvent} style={{marginLeft: '20px', height: '40px'}}>{getBoardTypeText(boardType)} 등록</Button>}
                </div>
            </Flex>
        </Block>
    );
}