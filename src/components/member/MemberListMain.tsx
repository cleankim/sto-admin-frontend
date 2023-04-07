import { CustomPagination } from "../product/ProductListMain";
import {Block, BoldText, DataGridStyle, MoreButton} from "../../assets/GlobalStyle";
import { DataGrid, GridCallbackDetails, GridColDef, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { PaginationProps } from "@mui/material";
import { ProductListFilter } from "../../interface/Product";
import {useContext, useEffect, useState} from "react";
import Member, {MemberList, MemberListFilter, UserType} from "../../interface/Member";
import { selectMemberList } from "../../api/member";
import { getStandardDateFormat } from "../../utils/date";
import {UserTypeContext} from "../../pages/Member";
import SearchInput from "../common/SearchInput";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {useNavigate} from "react-router";

export default function MemberListMain() {

    const userTypeContext = useContext(UserTypeContext);
    const [userType, setUserType] = useState(userTypeContext.type);

    const getPaginationProps = (totalCount: number, pageSize: number, onPageChange: any): PaginationProps => {
        let page = Math.floor(totalCount/pageSize);
        let remainder = Number(totalCount%pageSize);
        if(remainder > 0) page++;
        return {count: page, onChange: onPageChange};
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'No.', width: 60 },
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

    const initialState: MemberListFilter = {
        offset: 0,
        limit: 10,
        userType: userTypeContext.type as UserType
    }
    const [boardData, setBoardData] = useState<MemberList>({list: [], totalCount: 0});
    const [listFilter, setListFilter] = useState<MemberListFilter>(initialState);
    const getMemberList = async (type: UserType) => {
        let boardList: Member[] = [];
        let {list, total_count} = await selectMemberList(({...listFilter, userType: type}));

        let totalCount = Number(total_count);
        if (totalCount > 0) {
            list.forEach((item: any) => {
                boardList.push({
                    id: totalCount--,
                    userSn: item.user_sn,
                    userType: item.user_type,
                    userEmail: item.user_email,
                    joinDate: getStandardDateFormat(item.join_date),
                    lastPwdChanged: getStandardDateFormat(item.last_pwd_changed)
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

    const navigate = useNavigate();
    const onRowClick = (params: GridRowParams) => {
        navigate(`/member/detail/${params.row.userSn}`);
    }

    useEffect(() => {
        (async () => {
            await getMemberList(userTypeContext.type as UserType);
        })();
    }, [listFilter, userTypeContext.type]);

    return (
        <section>
            <Block>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                    <BoldText style={{marginBottom: 0}}>{userTypeContext.type === 'investor' ? '투자회원' : '공모회원'}</BoldText>
                    <div style={{display: 'flex'}}>
                        <SearchInput/>
                        <MoreButton><MoreHorizIcon/></MoreButton>
                    </div>
                </div>
                <div>
                    <DataGrid
                        rows={boardData.list}
                        columns={columns}
                        pageSize={boardData.totalCount}
                        sx={DataGridStyle}
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