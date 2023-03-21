import styled from "styled-components";
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import Pagination, {PaginationProps} from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {ChangeEvent, useEffect, useState} from "react";
import Product, {ProductList, ProductListFilter } from "../../interface/Product";
import { selectProductList } from "../../api/product";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Block, MoreButton, SearchInput} from "../../assets/GlobalStyle";
import { getStandardDateFormat } from "../../utils/date";

export interface GridDatas<Type> {
    rows: Type[];
    columns: GridColDef[];
    pageSize: number;
    onPageChange: (event: ChangeEvent<unknown>, page: number) => void;
    totalCount: number;
}

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

export default function ProductListMain() {
    const getPaginationProps = (totalCount: number, pageSize: number, onPageChange: any): PaginationProps => {
        let page = Math.floor(totalCount/pageSize);
        let remainder = Number(totalCount%pageSize);
        if(remainder > 0) page++;
        return {count: page, onChange: onPageChange};
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'No.', width: 50 },
        {
            field: 'productType',
            headerName: '공모요청 종류',
            width: 120,
            renderCell: params => {
                return params.value === 'EB' ? '전자어음' : '';
            }
        },
        {
            field: 'productNm',
            headerName: '공모요청 명',
            width: 220,
            renderCell: params => {
                return <a style={{overflow: 'hidden', textOverflow: 'ellipsis'}} href={`/product/detail/${params.row.productSn}`}>{params.value}</a>;
            }
        },
        {field: 'productSn', headerName: 'productSn', hide: true },
        {
            field: 'issuerNm',
            headerName: '차입자(판매기업)',
            width: 160
        },
        {field: 'holderNm', headerName: '상환의무자(구매기업)', width: 140},
        {field: 'offerAmount', headerName: '상품담보금액', width: 140, renderCell: params => params.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")},
        {field: 'investPeriod', headerName: '투자기간', width: 80},
        {field: 'expiredDt', headerName: '만기일', width: 180},
        {field: 'productStatus', headerName: '현재상태', width: 90,
            renderCell: params => {
                return getProductStatus(params.value);
            }},
        {field: 'reviewStatus', headerName: '진행상태', width: 90,
            renderCell: (params: any) => {
                return getReviewStatus(params.value);
            }}
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
                    productType: item.product_type,
                    productNm: item.product_nm,
                    issuerNm: item.issuer_nm,
                    applyDt: getStandardDateFormat(item.apply_dt),
                    expiredDt: getStandardDateFormat(item.expired_dt),
                    securityAmount: item.security_amount,
                    offerAmount: item.offer_amount,
                    reviewStatus: item.review_status,
                    productStatus: item.product_status,
                    holderNm: item.holder_nm,
                    investPeriod: item.invest_period,
                    productLevel: item.product_level,
                    annualReturn: item.annualReturn
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
            await getProductList();
        })();
    }, []);

    return (
        <section style={{height: '100vh'}}>
            <h2 style={{marginBottom: '20px', color: '#2b3675'}}>투자상품정보</h2>
            <Block>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                    <h3 style={{textAlign: 'start', margin: 0, color: '#2b3675'}}>투자상품 등록</h3>
                    <div style={{display: 'flex'}}>
                        <SearchInput></SearchInput>
                        <MoreButton><MoreHorizIcon></MoreHorizIcon></MoreButton>
                    </div>
                </div>
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


export const getReviewStatus = (value: 'waiting' | 'process' | 'deny' | 'approve' | 'confirm' | 'endorse' | 'contract' | 'register') => {
    const datas = {
        waiting: '심사 대기중',
        process: '심사 중',
        deny: '심사 반려',
        approve: '심사 승인',
        confirm: '공모 확정',
        endorse: '배서 완료',
        contract: '계약 완료',
        register: '상품 등록'
    };

    return datas[value];
}

export const getProductStatus = (value: 'reviewing' | 'reviewed' | 'recruiting' | 'recruited' | 'redeeming' | 'redeemed' | 'overdue' | 'payout') => {
    const datas = {
        reviewing: '심사중',
        reviewed: '심사 완료',
        recruiting: '모집중',
        recruited: '모집완료',
        redeeming: '상환중',
        redeemed: '상환완료',
        overdue: '연체중',
        payout: '지급완료'
    };

    return datas[value];
}


