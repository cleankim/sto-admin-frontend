import styled from "styled-components";
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import Pagination, {PaginationProps} from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {ChangeEvent, useEffect, useState} from "react";
import Product, { ProductList, ProductListFilter } from "../../interface/Product";
import {Block, MoreButton, SearchInput} from "../../assets/GlobalStyle";
import { getStandardDateFormat } from "../../utils/date";
import { selectTokenList } from "../../api/token";
import Token, { TokenList, TokenListFilter } from "../../interface/Token";

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

export default function TokenListMain() {
    const getPaginationProps = (totalCount: number, pageSize: number, onPageChange: any): PaginationProps => {
        let page = Math.floor(totalCount/pageSize);
        let remainder = Number(totalCount%pageSize);
        if(remainder > 0) page++;
        return {count: page, onChange: onPageChange};
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'No.', width: 60 },
        {field: 'tokenSn', hide: true },
        {field: 'tokenStatus', headerName: '토큰상태', width: 100},
        {field: 'tokenNm', headerName: '토큰명', width: 200,
            renderCell: params => {
                return <a href={`/token/detail/${params.row.tokenSn}`}>{params.value}</a>;
            }},
        {
            field: 'productNm',
            headerName: '투자상품명',
            width: 200
        },
        {field: 'issueCnt', headerName: '발행개수', width: 100,
            renderCell: params => {
                return params.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '개';
            }},
        {field: 'tokenPrice', headerName: '현재 가격', width: 100,
            renderCell: params => {
                return params.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원';
            }},
        {field: 'issueDt', headerName: '발행일', width: 200},
        {field: 'expiredDt', headerName: '소각일', width: 200},
    ];

    const initialState: TokenListFilter = {
        offset: 0,
        limit: 10,
    }
    const [boardData, setBoardData] = useState<TokenList>({list: [], totalCount: 0});
    const [listFilter, setListFilter] = useState<TokenListFilter>(initialState);
    const getTokenList = async () => {
        let boardList: Token[] = [];
        let {list, total_count} = await selectTokenList({...listFilter});
        console.log('selectTokenList >>> ', list);
        let totalCount = Number(total_count);
        if (totalCount > 0) {
            list.forEach((item: any) => {
                boardList.push({
                    id: totalCount--,
                    tokenSn: item.token_sn,
                    productNm: item.product_nm,
                    tokenNm: item.token_nm,
                    issueCnt: item.issue_cnt,
                    tokenStatus: item.token_status,
                    tokenPrice: item.token_price,
                    expiredDt: item.expired_dt,
                    issueDt: item.issue_dt
                });
            });
            setBoardData({list: boardList, totalCount: totalCount});
        }
    }
    const [page, setPage] = useState(1);
    const onPageChange = (newPage: number) => {
        setListFilter(() => ({...listFilter, offset : Number((listFilter.limit as number)*(newPage-1))}));
        setPage(newPage);
    };

    useEffect(() => {
        (async () => {
            await getTokenList();
        })();
    }, []);

    return (
        <section>
            <h2 style={{marginBottom: '20px', color: '#2b3675'}}>토큰정보관리</h2>
            <Block>
                <div>
                    <DataGrid
                        rows={boardData.list}
                        columns={columns}
                        pageSize={boardData.totalCount}
                        sx={{
                            width: '100%',
                            height: '700px',
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