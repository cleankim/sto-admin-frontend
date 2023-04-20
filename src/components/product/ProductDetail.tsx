import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { selectProductDetail, updateReviewStatus, updateProductStatus } from '../../api/product';
import Product, {ReviewStatus} from '../../interface/Product';
import { getDateDotFormat, getKoDateFormat } from '../../utils/date';
import { getReviewStatus } from './ProductListMain';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {Block} from "../../assets/GlobalStyle";

export default function ProductDetail() {
    const location = useLocation();
    const productSn = location.pathname.split('/')[3];
    const [data, setData] = useState<Product>();
    const [reviewStatus, setReviewStatus] = useState<ReviewStatus>();
    const [productStatus, setProductStatus] = useState<'reviewing' | 'reviewed' | 'recruiting' | 'recruited' | 'redeeming' | 'redeemed' | 'overdue' | 'payout'>();

    const getProductDetail = async (productSn: string) => {
        await selectProductDetail(productSn)
            .then(res => {
                console.log(res);
                setData({
                    productSn: res.product_sn,
                    productType: res.product_type,
                    productNm: res.product_nm,
                    issuerNm: res.issuer_nm,
                    applyDt: res.apply_dt,
                    expiredDt: res.expired_dt,
                    securityAmount: res.security_amount,
                    offerAmount: res.offer_amount,
                    reviewStatus: res.review_status,
                    productStatus: res.product_status,
                    productLevel: res.product_level,
                    annualReturn: res.annual_return,
                    investPeriod: res.invest_period,
                    offerStartDate: res.offer_start_date,
                    offerEndDate: res.offer_end_date,
                    maturityDate: res.maturity_date,
                    holderNm: res.holder_nm
                });
                setReviewStatus(res.review_status);
                setProductStatus(res.product_status);
            });
    }

    const reviewStatusClickEvent = (e: React.MouseEvent) => {
        if (e.currentTarget) {
            const reviewStatus = e.currentTarget.getAttribute('value') as ReviewStatus;
            updateReviewStatus({productSn, reviewStatus})
                .then(res => {
                    if(res) alert(getModalText(reviewStatus));
                });
        }
    }

    const changeReviewStatus = () => {
        updateReviewStatus({productSn, reviewStatus})
            .then(res => {
                if(res) alert('등록되었습니다.');
            });
    }

    const changeProductStatus = () => {
        updateProductStatus({productSn, productStatus})
            .then(res => {
                if(res) alert('등록되었습니다.');
            });
    }

    useEffect(() => {
        (async () => {
            await getProductDetail(productSn);
        })();
    }, []);

    return (
        <ProductDetailLayout>
            <h2>투자상품정보 - 투자상품 등록</h2>
            <BlockLayout>
                <div style={{flexGrow: 1, marginRight: '50px'}}>
                    <section style={{marginBottom: '10px'}}>
                        <h3>투자상품 진행상태</h3>
                        <div style={{display: 'grid', gap: '10px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <ColumnTitle>공모명</ColumnTitle>
                                <span>{data?.productNm}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <ColumnTitle>신용등급</ColumnTitle>
                                <span>{data?.productLevel}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <ColumnTitle>상품등급</ColumnTitle>
                                <span>{data?.productLevel}</span>
                                <span><Button variant="contained" size="small">변경</Button></span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <ColumnTitle>투자 수익률</ColumnTitle>
                                <span>{`${data?.annualReturn}%`}</span>
                                <Button variant="contained" size="small">변경</Button>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h3>투자상품 심사</h3>
                        <div>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{width: '100%'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>

                                        <Button variant="contained" size="small" value={`approve`} onClick={e => reviewStatusClickEvent(e)}>승인</Button>

                                        <RadioWrap>
                                            <input type="radio" name="reviewStatus" id="approve" defaultChecked={reviewStatus === 'approve' ? true : undefined} onChange={e => setReviewStatus('approve')} />
                                            <label htmlFor="approve">승인</label>
                                        </RadioWrap>
                                        <RadioWrap>
                                            <input type="radio" name="reviewStatus" id="deny" defaultChecked={reviewStatus === 'deny' ? true : undefined} onChange={e => setReviewStatus('deny')}/>
                                            <label htmlFor="deny">반려</label>
                                        </RadioWrap>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <RadioWrap>
                                            <input type="radio" name="reviewStatus" id="contract" defaultChecked={reviewStatus === 'contract' ? true : undefined} onChange={e => setReviewStatus('contract')}/>
                                            <label htmlFor="contract">배서완료</label>
                                        </RadioWrap>
                                        <RadioWrap>
                                            <input type="radio" name="reviewStatus" id="register" defaultChecked={reviewStatus === 'register' ? true : undefined} onChange={e => setReviewStatus('register')}/>
                                            <label htmlFor="register">상품등록</label>
                                        </RadioWrap>
                                    </div>
                                </div>
                                <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginLeft: '20px'}}>
                                    <Button variant="contained" size="small" onClick={changeReviewStatus}>변경</Button>
                                </div>
                            </div>
                            <hr/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>
                                    <RadioWrap>
                                        <input type="radio" name="productStatus" id="recruited" defaultChecked={productStatus === 'recruited' ? true : undefined} onChange={e => setProductStatus('recruited')}/>
                                        <label htmlFor="recruited">모집완료</label>
                                    </RadioWrap>
                                    <RadioWrap>
                                        <input type="radio" name="productStatus" id="redeemed" defaultChecked={productStatus === 'redeemed' ? true : undefined} onChange={e => setProductStatus('redeemed')}/>
                                        <label htmlFor="redeemed">상환완료</label>
                                    </RadioWrap>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Button variant="contained" size="small" onClick={changeProductStatus}>변경</Button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <section style={{flexGrow: 5}}>
                    <h3>특이사항</h3>
                    <div>
                        <textarea placeholder={`내용`} name="content" id="content" cols={30} rows={15} style={{width: '100%', border: '1px solid #d9d9d9'}}></textarea>
                    </div>
                    <div style={{textAlign: 'center', marginTop: '20px'}}>
                        <Button variant="outlined" style={{marginRight: '10px'}}>임시저장</Button>
                        <Button variant="contained">등록</Button>
                    </div>
                </section>
            </BlockLayout>
            <Block>
                <h3>{data?.productNm}</h3>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <Column>
                        <ColumnTitle>공모요청 종류</ColumnTitle>
                        <DataText>{data?.productType === 'EB' ? '전자어음' : ''}</DataText>
                    </Column>
                    <Column>
                        <ColumnTitle>발행인</ColumnTitle>
                        <DataText>{data?.issuerNm}</DataText>
                    </Column>
                    <Column>
                        <ColumnTitle>소지인</ColumnTitle>
                        <DataText>{data?.holderNm}</DataText>
                    </Column>
                    <Column>
                        <ColumnTitle>상품담보금액</ColumnTitle>
                        <DataText>{`${data?.offerAmount && data.offerAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`}</DataText>
                    </Column>
                    <Column>
                        <ColumnTitle>모집기간</ColumnTitle>
                        <DataText>{`${getDateDotFormat(data?.offerStartDate as string)}~${getDateDotFormat(data?.offerEndDate as string)}`}</DataText>
                    </Column>
                    <Column>
                        <ColumnTitle>상환일자</ColumnTitle>
                        <DataText>{getDateDotFormat(data?.applyDt as string)}</DataText>
                    </Column>
                    <Column>
                        <ColumnTitle>요청일자</ColumnTitle>
                        <DataText>{getDateDotFormat(data?.applyDt as string)}</DataText>
                    </Column>
                    <Column>
                        <ColumnTitle>상태</ColumnTitle>
                        <DataText>{getReviewStatus(data?.reviewStatus as ReviewStatus)}</DataText>
                    </Column>
                </div>
            </Block>
            <Block>
                <h3>전자어음 정보</h3>
                <div style={{display: 'grid', gap: '10px'}}>
                    <Row>
                        <ColumnTitle>발행인</ColumnTitle>
                        <span>{data?.issuerNm}</span>
                    </Row>
                    <Row>
                        <ColumnTitle>신용등급</ColumnTitle>
                        <span>{}</span>
                    </Row>
                    <Row>
                        <ColumnTitle>소지인</ColumnTitle>
                        <span>{data?.holderNm}</span>
                    </Row>
                    <Row>
                        <ColumnTitle>원리금</ColumnTitle>
                        <span>{`${data?.offerAmount && data.offerAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`}</span>
                    </Row>
                    <Row>
                        <ColumnTitle>총 할인율</ColumnTitle>
                        <span>{`(대부 수익 3%, 투자자 수익 n%)`}</span>
                    </Row>
                    <Row>
                        <ColumnTitle>공모목적</ColumnTitle>
                        <span>{`구매자금`}</span>
                    </Row>
                    <Row>
                        <ColumnTitle>상환계획</ColumnTitle>
                        <span>{`${getKoDateFormat(data?.applyDt as string)}에 발행인(${data?.issuerNm}) 으로부터 일시납 받아 원리금 ${data?.offerAmount && data.offerAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원을 상환할 예정`}</span>
                    </Row>
                    <Row>
                        <ColumnTitle>담보설정</ColumnTitle>
                        <span>차입자(소지인)로부터 담보배서 받은 전자어음</span>
                    </Row>
                    <Row>
                        <ColumnTitle>담보처분계획</ColumnTitle>
                        <span>만기일에 상환의무자로부터 상환 받아 공모금액 완제 예정</span>
                    </Row>
                </div>
            </Block>
            <div style={{display: 'flex', gap: 'inherit'}}>
                <Block>
                    <h3>발행인 정보</h3>
                    <div style={{display: 'grid', gap: '10px'}}>
                        <Row>
                            <ColumnTitle>기업명</ColumnTitle>
                            <span>{`${data?.issuerNm} | 구자윤 | 437-87-00988`}</span>
                        </Row>
                        <Row>
                            <ColumnTitle>주소</ColumnTitle>
                            <span>서울특별시 강남구 언주로 136길 26</span>
                        </Row>
                        <Row>
                            <ColumnTitle>기업규모</ColumnTitle>
                            <span>중견기업</span>
                        </Row>
                        <Row>
                            <ColumnTitle>기업형태</ColumnTitle>
                            <span>코스피상장</span>
                        </Row>
                        <Row>
                            <ColumnTitle>신용등급</ColumnTitle>
                            <span>AA</span>
                        </Row>
                        <Row>
                            <ColumnTitle>주요산업</ColumnTitle>
                            <span>가전제품 및 부품 도매업</span>
                        </Row>
                    </div>
                </Block>
                <BlockColumn>
                    <section>
                        <h3>발행인 재무현황</h3>
                        <div style={{display: 'flex', gap: '10px', justifyContent: 'space-around'}}>
                            <Column>
                                <ColumnTitle>자산총계</ColumnTitle>
                                <span>122,089</span>
                            </Column>
                            <Column>
                                <ColumnTitle>부채총계</ColumnTitle>
                                <span>39,482</span>
                            </Column>
                            <Column>
                                <ColumnTitle>매출액</ColumnTitle>
                                <span>193,517</span>
                            </Column>
                            <Column>
                                <ColumnTitle>영업이익</ColumnTitle>
                                <span>9,608</span>
                            </Column>
                            <Column>
                                <ColumnTitle>당기순이익</ColumnTitle>
                                <span>7,978</span>
                            </Column>
                        </div>
                    </section>
                    <section>
                        <h3>발행인 취급이력</h3>
                        <div style={{display: 'flex', gap: '10px', justifyContent: 'space-around'}}>
                            <Column>
                                <ColumnTitle>잔액(상환 중)</ColumnTitle>
                                <span>1,136,550,461원(4건)</span>
                            </Column>
                            <Column>
                                <ColumnTitle>연체율</ColumnTitle>
                                <span>0%(0건)</span>
                            </Column>
                            <Column>
                                <ColumnTitle>전체기간(상환완료)</ColumnTitle>
                                <span>6,665,902,837(29건)</span>
                            </Column>
                        </div>
                    </section>
                </BlockColumn>
            </div>
            <div style={{display: 'flex', gap: 'inherit'}}>
                <Block>
                    <h3>소지인 정보</h3>
                    <div style={{display: 'grid', gap: '10px'}}>
                        <Row>
                            <ColumnTitle>기업명</ColumnTitle>
                            <span>{`${data?.holderNm} | 이민석 | 721-86-00230`}</span>
                        </Row>
                        <Row>
                            <ColumnTitle>주소</ColumnTitle>
                            <span>경기 광명시 새빛공원로 67 자이타워 A동 25층</span>
                        </Row>
                        <Row>
                            <ColumnTitle>기업규모</ColumnTitle>
                            <span>중소기업</span>
                        </Row>
                        <Row>
                            <ColumnTitle>기업형태</ColumnTitle>
                            <span>외감</span>
                        </Row>
                        <Row>
                            <ColumnTitle>신용등급</ColumnTitle>
                            <span>A-</span>
                        </Row>
                        <Row>
                            <ColumnTitle>주요산업</ColumnTitle>
                            <span>소프트웨어의 개발 및 서비스업</span>
                        </Row>
                    </div>
                </Block>
                <BlockColumn>
                    <section>
                        <h3>소지인 재무현황</h3>
                        <div style={{display: 'flex', gap: '10px', justifyContent: 'space-around'}}>
                            <Column>
                                <ColumnTitle>자산총계</ColumnTitle>
                                <span>122,089</span>
                            </Column>
                            <Column>
                                <ColumnTitle>부채총계</ColumnTitle>
                                <span>39,482</span>
                            </Column>
                            <Column>
                                <ColumnTitle>매출액</ColumnTitle>
                                <span>193,517</span>
                            </Column>
                            <Column>
                                <ColumnTitle>영업이익</ColumnTitle>
                                <span>9,608</span>
                            </Column>
                            <Column>
                                <ColumnTitle>당기순이익</ColumnTitle>
                                <span>7,978</span>
                            </Column>
                        </div>
                    </section>
                    <section>
                        <h3>소지인 취급이력</h3>
                        <div style={{display: 'flex', gap: '10px', justifyContent: 'space-around'}}>
                            <Column>
                                <ColumnTitle>잔액(상환 중)</ColumnTitle>
                                <span>1,136,550,461원(4건)</span>
                            </Column>
                            <Column>
                                <ColumnTitle>연체율</ColumnTitle>
                                <span>0%(0건)</span>
                            </Column>
                            <Column>
                                <ColumnTitle>전체기간(상환완료)</ColumnTitle>
                                <span>6,665,902,837(29건)</span>
                            </Column>
                        </div>
                    </section>
                </BlockColumn>
            </div>
        </ProductDetailLayout>
    )
};


const getModalText = (value: string) => {
    switch(value) {
        case "approve": return ModalText['approve'];
        case "deny": return ModalText['deny'];
        case "contract": return ModalText['contract'];
        case "register": return ModalText['register'];
        case "recruited": return ModalText['recruited'];
        case "redeemed": return ModalText['redeemed'];
    }
}

const ModalText = {
    approve: '신청된 어음에 대한 공모가 승인되었습니다.',
    deny: '신청된 어음에 대한 공모가 반려되었습니다.',
    contract: '전자계약 체결 및 전자어음 배서가 완료되었습니다. \n예탁결제원의 토큰증권 등록 프로세스를 진행합니다.',
    register: '투자상품 등록 및 토큰 발행이 완료되었습니다. \n투자하기 메뉴에서 확인해 주세요.',
    recruited: '등록하신 투자상품의 투자금액 모집이 완료되었습니다. \n토큰을 분배합니다.',
    redeemed: '전자어음의 상환이 완료되었습니다. \n투자자가 보유하고 있는 토큰을 회수하고 투자금 및 수익금을 분배합니다.'
}

const ProductDetailLayout = styled.section`
  display: grid;
  gap: 20px;
  text-align: start;
  height: 100%;
  
  h2 {
    font-size: 32px;
    color: #2B3674;
  }
  h3 {
    font-size: 24px;
    color: #2B3674;
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

const RadioWrap = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin: 5px 0;
  
  label {
    margin-left: 5px;
  }
`;