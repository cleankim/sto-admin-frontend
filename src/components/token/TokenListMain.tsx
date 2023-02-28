import styled from "styled-components";
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import Pagination, {PaginationProps} from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {ChangeEvent, useEffect, useState} from "react";
import Product, { ProductList, ProductListFilter } from "../../interface/Product";
import { selectProductList } from "../../api/product";
import {Block, MoreButton, SearchInput} from "../../assets/GlobalStyle";
import { getStandardDateFormat } from "../../utils/date";

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
        {
            field: 'productNm',
            headerName: '투자상품명',
            width: 200,
            renderCell: params => {
                return <a href={`/token/detail/${params.row.productSn}`}>{params.value}</a>;
            }
        },
        {field: 'productSn', hide: true },
    ];

    const initialState: ProductListFilter = {
        offset: 0,
        limit: 10,
        productType: 'EB'
    }
    const [boardData, setBoardData] = useState<ProductList>({list: [], totalCount: 0});
    const [listFilter, setListFilter] = useState<ProductListFilter>(initialState);
    const  getProductList = async () => {
        let boardList: Product[] = [];
        let {list, total_count}= await selectProductList({...listFilter});

        let totalCount = Number(total_count);
        if (totalCount > 0) {
            list.forEach((item: any) => {
                boardList.push({
                    id: totalCount--,
                    productSn: item.product_sn,
                    productNm: item.product_nm,
                });
            });
            setBoardData({list: boardList, totalCount: total_count});
        }
    }
    const [page, setPage] = useState(1);
    const onPageChange = (newPage: number) => {
        setListFilter(() => ({...listFilter, offset : Number((listFilter.limit as number)*(newPage-1))}));
        setPage(newPage);
    };

    useEffect(() => {
        (async () => {
            await getProductList();
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