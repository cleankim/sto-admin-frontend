import { CustomPagination } from "../product/ProductListMain";
import {Block, MoreButton, SearchInput} from "../../assets/GlobalStyle";
import { DataGrid, GridCallbackDetails, GridColDef, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { PaginationProps } from "@mui/material";
import { ProductListFilter } from "../../interface/Product";
import {useEffect, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Member, {MemberList} from "../../interface/Member";
import { selectMemberList } from "../../api/member";

export default function MemberListMain() {
    const getPaginationProps = (totalCount: number, pageSize: number, onPageChange: any): PaginationProps => {
        let page = Math.floor(totalCount/pageSize);
        let remainder = Number(totalCount%pageSize);
        if(remainder > 0) page++;
        return {count: page, onChange: onPageChange};
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'No.', width: 200 },
        {
            field: 'userType',
            headerName: '투자자격',
            width: 200,
            renderCell: params => {
                return params.value === 'investor' ? '일반투자자' : '소득적격투자자';
            }
        },
        {field: 'userSn', headerName: 'userSn', hide: true },
        {field: 'userEmail', headerName: '이메일', width: 200},
        // {field: 'offerAmount', headerName: '투자여부', width: 140, renderCell: params => params.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")},
        // {field: 'investPeriod', headerName: '투자금(투자중)', width: 120},
        {field: 'joinDate', headerName: '가입일', width: 200},
        {field: 'lastPwdChanged', headerName: '마지막 접속일', width: 200},
        // {field: 'expiredDt', headerName: '증빙서류', width: 120}
    ];

    const initialState: ProductListFilter = {
        offset: 0,
        limit: 10,
        productType: 'EB'
    }
    const [boardData, setBoardData] = useState<MemberList>({list: [], totalCount: 0});
    const [listFilter, setListFilter] = useState<ProductListFilter>(initialState);
    const getMemberList = async () => {
        let boardList: Member[] = [];
        let {list, total_count}= await selectMemberList({...listFilter});

        console.log('list >> ', list);

        let totalCount = Number(total_count);
        if (totalCount > 0) {
            list.forEach((item: any) => {
                boardList.push({
                    id: totalCount--,
                    userSn: item.user_sn,
                    userType: item.user_type,
                    userEmail: item.user_email,
                    joinDate: item.join_date,
                    lastPwdChanged: item.last_pwd_changed
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

    const onRowClick = (params: GridRowParams) => {
        console.log(`params >>> ${params.row.userSn}`);
        window.location.href = `/memberInfo/memberDetail/${params.row.userSn}`;
    }

    useEffect(() => {
        (async () => {
            await getMemberList();
        })();
    }, []);

    return (
        <section>
            <Block>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                    <h3 style={{textAlign: 'start', margin: 0}}>투자회원</h3>
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
                                color: 'var(--text-01)',
                                backgroundColor: 'var(--ui-03)',
                                boxShadow: 'inset 0px -1px 0px var(--ui-11)',
                                fontWeight: 500
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: '1px solid var(--ui-04)',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap'
                            },
                            '& .MuiDataGrid-cell a:link, a:visited': {
                                color: 'var(--text-02)',
                                textDecoration: 'none'
                            },
                            '.MuiDataGrid-footerContainer': {
                                justifyContent: 'center',
                                borderTop: 0
                            },
                            '.MuiPagination-ul': {
                                color: 'var(--text-02)'
                            },
                            '.MuiPagination-ul .Mui-selected': {
                                backgroundColor: 'transparent',
                                color: 'var(--primary)'
                            },
                            '.MuiPaginationItem-icon': {
                                color: 'var(--ui-07)'
                            }
                        }}
                        rowsPerPageOptions={[listFilter.limit as number]}
                        pagination
                        paginationMode={'server'}
                        rowCount={0}
                        keepNonExistentRowsSelected
                        onRowClick={onRowClick}
                        components={{
                            Pagination: CustomPagination
                        }}
                    />
                </div>
            </Block>
        </section>
    );
}