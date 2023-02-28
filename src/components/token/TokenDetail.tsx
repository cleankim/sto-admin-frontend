import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { selectProductTokenList } from "../../api/token";
import Token, { TokenList, TokenListFilter } from "../../interface/Token";
import Pagination, {PaginationProps} from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Block, MoreButton, SearchInput} from "../../assets/GlobalStyle";
import { getStandardDateFormat } from '../../utils/date';

export function CustomPagination(props: PaginationProps) {
    return (
        <Stack>
            <Pagination count={props.count}
                        boundaryCount={props.count}
                        onChange={props.onChange}
            />
        </Stack>
    );
}


export default function TokenDetail() {

    const location = useLocation();
    const productSn = location.pathname.split('/')[3];
    const initialState: TokenListFilter = {
        offset: 0,
        limit: 10
    }
    const [boardData, setBoardData] = useState<Token[]>([]);
    const [listFilter, setListFilter] = useState<TokenListFilter>(initialState);
    const getProductTokenList = async (productSn: string) => {
        let tokenList: Token[] = [];
        let list = await selectProductTokenList(productSn, {...listFilter});
        list.forEach((item: any) => {
            tokenList.push({
                id: list.length--,
                productSn: item.product_sn,
                tradeSn: item.trade_sn,
                userSn: item.user_sn,
                investType: item.invest_type,
                issueToken: item.issue_token,
                trandeAmount: item.trande_amount,
                tradeDt: getStandardDateFormat(item.trade_dt),
            });
        });
        setBoardData(tokenList);
    }

    useEffect(() => {
        (async () => {
            await getProductTokenList(productSn);
        })();
    }, []);

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'No.', width: 60 },
        {field: 'issueToken', headerName: '토큰개수', width: 150,
            renderCell: params => {
                return params.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '개';
            }
        },
        {field: 'tradeDt', headerName: '거래일', width: 200 },
    ];
    
    return (
        <section>
            <h2 style={{marginBottom: '20px', color: '#2b3675'}}>토큰정보관리</h2>
            <Block>
                <h3 style={{color: '#2b3675'}}>리스트</h3>
                <div>
                    <DataGrid
                        rows={boardData}
                        columns={columns}
                        pageSize={boardData.length}
                        sx={{
                            width: '100%',
                            height: '700px',
                            color: 'var(--text-02)',
                            marginBottom: '15px',
                            textAlign: 'center',
                            fontSize: '15px',
                            tableLayout: 'fixed',
                            border: 'none',
                            '& .MuiDataGrid-columnSeparator svg path': {
                                display: 'none',
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                height: '40px',
                                color: '#A3AED0',
                                fontWeight: 500
                            },
                            '& .MuiDataGrid-cell': {
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                color: '#2B3674',
                                fontWeight: 700
                            },
                            '& .MuiDataGrid-cell a:link, a:visited': {
                                color: '#2B3674',
                                textDecoration: 'none'
                            },
                            '.MuiDataGrid-footerContainer': {
                                justifyContent: 'center',
                                borderTop: 0
                            },
                            '.MuiPagination-ul .Mui-selected': {
                                backgroundColor: 'transparent',
                            },
                        }}
                        rowsPerPageOptions={[listFilter.limit as number]}
                        pagination
                        paginationMode={'server'}
                        rowCount={0}
                        keepNonExistentRowsSelected
                        components={{
                            Pagination: CustomPagination
                        }}
                    />
                </div>
            </Block>
        </section>
    );
    
}