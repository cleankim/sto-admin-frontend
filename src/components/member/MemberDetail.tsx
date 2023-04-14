import {useContext, useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import {Margin, Block, DataGridStyle} from "../../assets/GlobalStyle";
import {
    selectMember,
    selectMemberBalanceHistory,
    selectMemberInvestHistory, selectMemberProductHistory,
    selectMemberTokenHistory, selectMemberWithdrawHistory
} from '../../api/member';
import Member, {getMemberTypeText, MemberBalance, MemberListFilter, UserType} from '../../interface/Member';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tabs, {TabItems} from "../common/Tabs";
import {UserTypeContext} from "../../pages/Member";
import Token from "../../interface/Token";
import Product from "../../interface/Product";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {ListDatas} from "../../interface/ListDatas";
import {CustomPagination} from "../product/ProductListMain";
import {getDateFormat, getStandardDateFormat} from "../../utils/date";
import List from "../common/List";
import HistoryTab from "../common/HistoryTab";

type SubListType = 'balance' | 'invest' | 'token';

export default function MemberDetail() {
    // 회원 타입 구분
    const userTypeContext = useContext(UserTypeContext);
    const location = useLocation();
    const userSn = location.pathname.split('/')[3];

    // 회원 정보
    const [data, setData] = useState<Member>();

    const [userType, setUserType] = useState(userTypeContext.type);

    const [list, setList] = useState<MemberBalance | Product | Token>();
    const getMember = async (userSn: string) => {
        // 회원정보
        selectMember(userSn)
            .then(res => {
                setData({
                    address: res.address,
                    addressDesc: res.address_desc,
                    joinDate: res.join_date,
                    joinType: res.join_type,
                    lastPwdChanged: res.last_pwd_changed,
                    mobileNo: res.mobile_no,
                    postCode: res.post_code,
                    updateDt: res.update_dt,
                    userCorpYn: res.user_corp_yn,
                    userEmail: res.user_email,
                    userEngNm: res.user_eng_nm,
                    userNm: res.user_nm,
                    userPwd: res.user_pwd,
                    userSn: res.user_sn,
                    userState: res.user_state,
                    userType: res.user_type
                });
            });
    }

    // 리스트
    const initialState: MemberListFilter = {
        offset: 0,
        limit: 5
    }
    const [listFilter, setListFilter] = useState<MemberListFilter>(initialState);
    const [listType, setListType] = useState<SubListType>('balance');
    const [listData, setListData] = useState<ListDatas<MemberBalance | Product | Token>>({list: [], totalCount: 0, columns: BalanceColumns});
    const tabClickEvent = (e: React.MouseEvent) => {
        const target = e.target as HTMLLIElement;
        setListType(target.getAttribute('data-type') as SubListType);
    }

    const getHistory = async (userSn: string, type: SubListType) => {
        console.log('the listType in getHistory >>> ', type);
        let boardList: unknown[] = [];
        let columns: GridColDef[] = BalanceColumns;;
        let totalCount = 0;
        switch(type) {
            case "invest": {
                columns = InvestColumns;
                let {list, total_count} = await selectMemberInvestHistory(userSn, {...listFilter});

                console.log(':: selectMemberInvestHistory :: ', list);
                //
                // totalCount = Number(total_count);
                // if (totalCount > 0) {
                //     list.forEach((item: any) => {
                //         boardList.push({
                //             id: totalCount--,
                //             productNm: item.product_nm,
                //             offerAmount: item.offer_amount,
                //             // joinDate: getStandardDateFormat(item.join_date)
                //         });
                //     });
                // }
                break;
            }
            case "token": {
                columns = TokenColumns;
                let {list, total_count} = await selectMemberTokenHistory(userSn, {...listFilter});

                console.log(':: selectMemberTokenHistory :: ', list);
                //
                // totalCount = Number(total_count);
                // if (totalCount > 0) {
                //     list.forEach((item: any) => {
                //         boardList.push({
                //             id: totalCount--,
                //             productNm: item.product_nm,
                //             offerAmount: item.offer_amount,
                //             // joinDate: getStandardDateFormat(item.join_date)
                //         });
                //     });
                // }
                break;
            }
            default: {
                let {list, total_count} = await selectMemberBalanceHistory(userSn, listFilter);

                console.log(':: selectMemberBalanceHistory :: ', list);

                totalCount = Number(total_count);
                if (totalCount > 0) {
                    list.forEach((item: any) => {
                        boardList.push({
                            id: totalCount--,
                            balanceSn: item.balance_sn,
                            balanceAmount: item.balance_amount,
                            tradeNm: item.trade_nm,
                            tradeType: item.trade_type,
                            completeDt: item.complete_dt,
                            applyDt: item.apply_dt,
                        });
                    });
                }
            }
        }
        setListData((prevState: any) => ({...prevState, list: boardList, totalCount: totalCount, columns: columns}));
    }

    useEffect(() => {
        (async () => {
            await getMember(userSn);
            await getHistory(userSn, listType);
        })();
    }, [listType]);

    return (
        <ProductDetailLayout>
            <div style={{display: 'flex', gap: 'inherit', width: '100%'}}>
                <BlockColumn>
                    <section>
                        <h3>회원정보</h3>
                        <div style={{display: 'flex', gap: '40px', justifyContent: 'space-between'}}>
                            <Gap10>
                                <SpaceBetweenRow>
                                    <ColumnTitle>이메일</ColumnTitle>
                                    <span>{data?.userEmail}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>증빙서류</ColumnTitle>
                                    <span>{}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>이름</ColumnTitle>
                                    <span>{data?.userNm}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>휴대폰번호</ColumnTitle>
                                    <span>{data?.mobileNo}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>주소</ColumnTitle>
                                    <div>
                                        <div>{data?.address}</div>
                                        <div>{data?.addressDesc}</div>
                                    </div>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>가입일</ColumnTitle>
                                    <span>{data?.joinDate}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>마지막 접속일</ColumnTitle>
                                    <span>{data?.lastPwdChanged}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>상태</ColumnTitle>
                                    <span>{data?.userState}</span>
                                </SpaceBetweenRow>
                            </Gap10>
                            <Gap10>
                                <Margin mb={41}>
                                    <Gap10>
                                        <h4>이벤트 정보 수신</h4>
                                        <SpaceBetweenRow>
                                            <ColumnTitle>투자상품 정보</ColumnTitle>
                                            <span>
                                                <FormGroup className="ad-form-group">
                                                  <FormControlLabel name="productAd" control={<Checkbox defaultChecked />} label="SMS" />
                                                  <FormControlLabel name="productAd" control={<Checkbox />} label="카카오톡" />
                                                </FormGroup>
                                            </span>
                                        </SpaceBetweenRow>
                                        <SpaceBetweenRow>
                                            <ColumnTitle>마케팅 정보</ColumnTitle>
                                            <span>
                                                <FormGroup className="ad-form-group">
                                                  <FormControlLabel name="marketingAd" control={<Checkbox defaultChecked />} label="SMS" />
                                                  <FormControlLabel name="marketingAd" control={<Checkbox />} label="카카오톡" />
                                                  <FormControlLabel name="marketingAd" control={<Checkbox />} label="이메일" />
                                                </FormGroup>
                                            </span>
                                        </SpaceBetweenRow>
                                        <SpaceBetweenRow>
                                            <ColumnTitle>투자알림 수신</ColumnTitle>
                                            <span style={{color: 'red', fontWeight: 'bold'}}>수신거부</span>
                                        </SpaceBetweenRow>
                                    </Gap10>
                                </Margin>
                                <Gap10>
                                    <h4>증빙서류</h4>
                                    <DocBlock>
                                        <p>종합소득세 신고서</p>
                                        <p>종합소득과세표준 확정신고</p>
                                        <p>근로소득원천징수 영수증</p>
                                        <p>전문투자자 확인증</p>
                                    </DocBlock>
                                </Gap10>
                            </Gap10>
                        </div>
                    </section>
                </BlockColumn>
                <BlockColumn>
                    <section>
                        <h3>투자정보</h3>
                        <div style={{display: 'flex', gap: '40px'}}>
                            <Gap10>
                                <h4>투자자정보</h4>
                                <SpaceBetweenRow>
                                    <ColumnTitle>투자자격</ColumnTitle>
                                    <span>{data && getMemberTypeText(data as Member)}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>증빙서류</ColumnTitle>
                                    <span>{}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>투자여부</ColumnTitle>
                                    <span>{}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>직업</ColumnTitle>
                                    <span>{}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>거래목적</ColumnTitle>
                                    <span>{}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>자금출처</ColumnTitle>
                                    <span>{}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>입금계좌</ColumnTitle>
                                    <span>{}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>출금계좌</ColumnTitle>
                                    <span>{}</span>
                                </SpaceBetweenRow>
                            </Gap10>
                            <Gap10>
                                <h4>투자정보</h4>
                                <SpaceBetweenRow>
                                    <ColumnTitle>자산</ColumnTitle>
                                    <span>{`47,000,000 원`}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>예치금</ColumnTitle>
                                    <span>{`25,000,000 원`}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>투자금액</ColumnTitle>
                                    <span>{`22,000,000 원`}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>잔여투자한도</ColumnTitle>
                                    <span>{`5,800,000 원`}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>수익률(세전)</ColumnTitle>
                                    <div>총 수익률</div>
                                    <div>{`7.04%`}</div>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>&nbsp;</ColumnTitle>
                                    <div>상환예정 수익률</div>
                                    <div>{`8.10%`}</div>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>상환수익(세전)</ColumnTitle>
                                    <div>총 수익</div>
                                    <div>{`1,360,000원`}</div>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>&nbsp;</ColumnTitle>
                                    <div>상환예정 수익</div>
                                    <div>{`880,000원`}</div>
                                </SpaceBetweenRow>
                            </Gap10>
                        </div>
                    </section>
                </BlockColumn>
            </div>
            <HistoryTab<MemberBalance | Product | Token> tabList={TabList} columns={listData.columns} func={tabClickEvent} list={listData.list} totalCount={listData.totalCount}></HistoryTab>
            {/*<Block>
                <h3>리스트</h3>
                <div>
                    <Margin mb={20}>
                        <Tabs list={TabList} func={tabClickEvent}/>
                    </Margin>
                    <List columns={columns} totalCount={listData?.totalCount} list={listData?.list} />
                </div>
            </Block>*/}
        </ProductDetailLayout>
    )
};

const TabList: TabItems[] = [
    {name: '입출금 내역', value: 'balance'},
    {name: '투자 내역', value: 'invest'},
    {name: '토큰 정보', value: 'token'},
];

const columns: GridColDef[] =  [
    {field: 'id', headerName: 'No.', width: 60 },
    {
        field: 'tradeNm',
        headerName: '상품명',
        width: 200
    },
    {field: 'balanceAmount', headerName: '금액(원)', width: 200
        , renderCell: params => {
            return `${params.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`;
        }},
    {field: 'tradeType', headerName: '거래구분', width: 200},
    {field: 'applyDt', headerName: '거래일시', width: 200
        , renderCell: params => {
            return getStandardDateFormat(params.value);
        }}
];

const BalanceColumns: GridColDef[] = [
    {field: 'id', headerName: 'No.', width: 60 },
    {field: 'tradeNm', headerName: '상품명', width: 200},
    {field: 'balanceAmount', headerName: '금액(원)', width: 100
        , renderCell: params => {
            return `${params.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`;
        }},
    {field: 'tradeType', headerName: '거래구분', width: 100},
    {field: 'applyDt', headerName: '거래일시', width: 200
        , renderCell: params => {
            return getStandardDateFormat(params.value);
        }}
];

const InvestColumns: GridColDef[] =  [
    {field: 'id', headerName: 'No.', width: 60 },
    {field: 'productNm', headerName: '상품명', width: 200},
    {field: 'productLevel', headerName: '상품등급', width: 60},
    {field: 'annualReturn', headerName: '수익률(연)', width: 70
        , renderCell: params => {
            return `${params.value}%`;
        }},
    {field: 'offerAmount', headerName: '투자금액(원)', width: 100
        , renderCell: params => {
            return `${params.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`;
        }},
    {field: 'returnExpect', headerName: '예상수익(세전)', width: 100
        , renderCell: params => {
            return `${params.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`;
        }},
    {field: 'offerStartDate', headerName: '투자실행일', width: 100
        , renderCell: params => {
            return getDateFormat(params.value);
        }},
    {field: 'expiredDt', headerName: '상품만기일', width: 100
        , renderCell: params => {
            return getDateFormat(params.value);
        }},
    {field: 'productStatus', headerName: '현재상태', width: 100},
    {field: 'applyDt', headerName: '투자일자', width: 200
        , renderCell: params => {
            return getStandardDateFormat(params.value);
        }}
];

const TokenColumns: GridColDef[] =  [
    {field: 'id', headerName: 'No.', width: 60 },
    {
        field: 'tokenSn',
        headerName: '주소',
        width: 200
    },
    {field: 'productSn', headerName: 'productSn', hide: true},
    {field: 'tokenNm', headerName: '토큰명', width: 200
        , renderCell: params => {
            return <a href={`/product/detail/${params.row.productSn}`}>{params.value}</a>;
        }},
    {field: 'productNm', headerName: '투자상품명', width: 200},
    {field: 'issueCnt', headerName: '토큰개수', width: 200
        , renderCell: params => {
            return  `${params.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}개`;
        }},
    {field: 'issueDt', headerName: '최종 거래일', width: 200
        , renderCell: params => {
            return getStandardDateFormat(params.value);
        }}
];

const ProductDetailLayout = styled.section`
  display: grid;
  gap: 20px;
  text-align: start;
  
  .ad-form-group {
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    
    .MuiFormControlLabel-root {
      margin-right: 0;
      margin-left: 0;
    }
    .MuiFormControlLabel-label {
      font-size: 14px;
    }
    .MuiCheckbox-root {
      padding: 0 0 0 9px;
    }
  }
`;

const BlockColumn = styled(Block)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 780px;
`;

const ColumnTitle = styled.div`
  min-width: 95px;
  width: fit-content;
  color: #a4afd0;
`;

const Column = styled.div`
  display: inherit; 
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const Row = styled.div`
  display: flex;
  div:first-child {
    width: 110px;
  }
`;

const DataText= styled.span`
  font-weight: 700; 
  font-size: 18px;
  color: #2b3675;
`;

const Gap10 = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const SpaceBetweenRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  word-break: break-all;
  width: 345px;
  
  span {
    text-align: right;
    max-width: 280px;
  }
  
   div:nth-child(2) {
     flex-grow: 1;
     margin-left: 20px;
   }
`;

const DocBlock = styled.div`
  text-align: right;
  display: grid;
  gap: 5px;
`;