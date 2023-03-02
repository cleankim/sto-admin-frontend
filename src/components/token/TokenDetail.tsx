import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { selectProductTokenList, selectTokenDetail } from "../../api/token";
import Token, { TokenList, TokenListFilter } from "../../interface/Token";
import Pagination, {PaginationProps} from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Block, MoreButton, SearchInput} from "../../assets/GlobalStyle";
import {getDateDotFormat, getStandardDateFormat } from '../../utils/date';
import styled from 'styled-components';

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
    const tokenSn = location.pathname.split('/')[3];
    const initialState: TokenListFilter = {
        offset: 0,
        limit: 10
    }
    const [boardData, setBoardData] = useState<Token[]>([]);
    const [listFilter, setListFilter] = useState<TokenListFilter>(initialState);
    const getProductTokenList = async (tokenSn: string) => {
        let tokenList: Token[] = [];
        let list = await selectProductTokenList(tokenSn, {...listFilter});

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
    const [data, setData]  = useState<Token>();
    const getTokenDetail = async (tokenSn: string) => {
        let result = await selectTokenDetail(tokenSn)
            .then(res => {
                setData({
                    tokenSn: res.token_sn,
                    tokenNm: res.token_nm,
                    tokenStatus: res.token_status,
                    productNm: res.product_nm,
                    issueCnt: res.issue_cnt,
                    tokenPrice: res.token_price,
                    tradeCnt: res.trade_cnt,
                    tradeAmount: res.trade_amount,
                    issueDt: getDateDotFormat(res.issue_dt),
                    expiredDt: getDateDotFormat(res.expired_dt),
                });
            });
    }

    useEffect(() => {
        (async () => {
            await getTokenDetail(tokenSn);
            await getProductTokenList(tokenSn);
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
        <TokenDetailLayout>
            <h2 style={{marginBottom: '20px', color: '#2b3675'}}>토큰정보관리</h2>
            <Block>
                <h3 style={{color: '#2b3675'}}>{data?.tokenNm}</h3>
                <Row>
                    <div>
                        <p>발행</p>
                        <span>{`${data?.issueCnt && data.issueCnt.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}개`}</span>
                    </div>
                    <div>
                        <p>투자상품명</p>
                        <span>{data?.productNm}</span>
                    </div>
                    <div>
                        <p>발행가격</p>
                        <span>{`${data?.tokenPrice && data.tokenPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`}</span>
                    </div>
                    <div>
                        <p>발행일</p>
                        <span>{data?.issueDt}</span>
                    </div>
                    <div>
                        <p>소각일</p>
                        <span>{data?.expiredDt}</span>
                    </div>
                </Row>
            </Block>
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
        </TokenDetailLayout>
    );
    
}

const TokenDetailLayout = styled.section`
  display: grid;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  text-align: center;
  justify-content: space-evenly;
  
  div {
      p {
        color: #A3AED0;
      }
      span {
        color: #2B3674;
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
      }
  }
`;