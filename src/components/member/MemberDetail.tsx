import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { getDateDotFormat, getKoDateFormat } from '../../utils/date';
import Button from '@mui/material/Button';
import {Block} from "../../assets/GlobalStyle";
import { selectMember } from '../../api/member';
import Member from '../../interface/Member';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export default function MemberDetail() {
    const location = useLocation();
    const userSn = location.pathname.split('/')[3];

    const [data, setData] = useState<Member>();
    const getMember = async (userSn: string) => {
        await selectMember(userSn)
            .then(res => {
                console.log('selectMember >>> ', res);
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

    useEffect(() => {
        (async () => {
            await getMember(userSn);
        })();
    }, []);

    return (
        <ProductDetailLayout>
            <h2>회원정보 - 투자회원</h2>
            <div style={{display: 'flex', gap: 'inherit', width: '100%'}}>
                <Block>
                    <h3>회원정보</h3>
                    <div style={{display: 'flex', gap: '10px', justifyContent: 'space-between'}}>
                        <GridGap10>
                            <SpaceBetweenRow>
                                <ColumnTitle>이메일</ColumnTitle>
                                <span>{data?.userEmail}</span>
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
                                <span>{`${data?.address} ${data?.addressDesc}`}</span>
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
                        </GridGap10>
                        <GridGap10>
                            <GridGap10>
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
                            </GridGap10>
                            <GridGap10>
                                <h4>증빙서류</h4>
                                <div style={{textAlign: 'right'}}>
                                    <p>종합소득세 신고서</p>
                                    <p>종합소득과세표준 확정신고</p>
                                    <p>근로소득원천징수 영수증</p>
                                    <p>전문투자자 확인증</p>
                                </div>
                            </GridGap10>
                        </GridGap10>
                    </div>
                </Block>
                <BlockColumn>
                    <section>
                        <h3>투자정보</h3>
                        <div style={{display: 'flex', gap: '10px', justifyContent: 'space-around'}}>
                            <GridGap10>
                                <h4>투자자정보</h4>
                                <SpaceBetweenRow>
                                    <ColumnTitle>투자자격</ColumnTitle>
                                    <span>{data?.userEmail}</span>
                                    <span><Button variant="contained" size="small">변경</Button></span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>증빙서류</ColumnTitle>
                                    <span>{data?.userNm}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>투자여부</ColumnTitle>
                                    <span>{data?.mobileNo}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>직업</ColumnTitle>
                                    <span>{`${data?.address} ${data?.addressDesc}`}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>거래목적</ColumnTitle>
                                    <span>{data?.joinDate}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>자금출처</ColumnTitle>
                                    <span>{data?.lastPwdChanged}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>입금계좌</ColumnTitle>
                                    <span>{data?.userState}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>출금계좌</ColumnTitle>
                                    <span>{data?.userState}</span>
                                </SpaceBetweenRow>
                            </GridGap10>
                            <GridGap10>
                                <h4>투자정보</h4>
                                <SpaceBetweenRow>
                                    <ColumnTitle>자산</ColumnTitle>
                                    <span>{data?.userEmail}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>예치금</ColumnTitle>
                                    <span>{data?.userNm}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>투자금액</ColumnTitle>
                                    <span>{data?.mobileNo}</span>
                                </SpaceBetweenRow>
                                <SpaceBetweenRow>
                                    <ColumnTitle>잔여투자한도</ColumnTitle>
                                    <span>{`${data?.address} ${data?.addressDesc}`}</span>
                                </SpaceBetweenRow>
                                <div>
                                    <SpaceBetweenRow>
                                        <ColumnTitle>수익률(세전)</ColumnTitle>
                                        <span>총 수익률</span>
                                        <span>{data?.joinDate}</span>
                                    </SpaceBetweenRow>
                                    <SpaceBetweenRow>
                                        <span>&nbsp;</span>
                                        <span>상환예정 수익률</span>
                                        <span>{data?.joinDate}</span>
                                    </SpaceBetweenRow>
                                </div>
                                <div>
                                    <SpaceBetweenRow>
                                        <ColumnTitle>상환수익(세전)</ColumnTitle>
                                        <span>총 수익률</span>
                                        <span>{data?.joinDate}</span>
                                    </SpaceBetweenRow>
                                    <SpaceBetweenRow>
                                        <span>&nbsp;</span>
                                        <span>상환예정 수익률</span>
                                        <span>{data?.joinDate}</span>
                                    </SpaceBetweenRow>
                                </div>
                            </GridGap10>
                        </div>
                    </section>
                </BlockColumn>
            </div>
            <Block>
                <h3>리스트</h3>
                <div>

                </div>
            </Block>
        </ProductDetailLayout>
    )
};

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

const BlockLayout = styled(Block)`
  display: flex;
  justify-content: flex-start;
`;

const BlockColumn = styled(Block)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ColumnTitle = styled.div`
  min-width: 60px;
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

const GridGap10 = styled.div`
  display: grid;
  gap: 10px;
`;

const SpaceBetweenRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;