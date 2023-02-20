import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { selectProductDetail, updateProduct } from '../../api/product';
import Product from '../../interface/Product';
import { getDateDotFormat, getKoDateFormat } from '../../utils/date';
import { Block, getReviewStatus } from './ProductListMain';
import Button from '@mui/material/Button';

export default function ProductDetail() {
    const location = useLocation();
    const productSn = location.pathname.split('/')[3];
    const [reviewStatus, setReviewStatus] = useState<'waiting' | 'process' | 'deny' | 'approve' | 'confirm' | 'contract' | 'register'>('approve');

    const [data, setData] = useState<Product>();
    const getProductDetail = async (productSn: string) => {
        await selectProductDetail(productSn)
            .then(res => {
                console.log('selectProductDetail >>> ', res);
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
            });
    }

    const onSubmit = () => {
        updateProduct({productSn, reviewStatus});
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
                        <h3>투자상품 심사</h3>
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
                                <ColumnTitle>수익률</ColumnTitle>
                                <span>{data?.annualReturn}</span>
                                <Button variant="contained" size="small">변경</Button>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h3>투자상품 심사</h3>
                        <div>
                            <input type="radio" name="reviewStatus" id="approve" onChange={e => setReviewStatus('approve')} />
                            <label htmlFor="approve">공모요청</label>
                            <input type="radio" name="reviewStatus" id="register" onChange={e => setReviewStatus('register')}/>
                            <label htmlFor="register">투자상품 등록</label>
                            <input type="radio" name="reviewStatus" id="deny" onChange={e => setReviewStatus('deny')}/>
                            <label htmlFor="deny">투자상품 등록불가</label>
                        </div>
                    </section>
                </div>
                <section style={{flexGrow: 25}}>
                    <h3>특이사항</h3>
                    <div>
                        <textarea placeholder={`내용`} name="content" id="content" cols={30} rows={15} style={{width: '100%', border: '1px solid #d9d9d9'}}></textarea>
                    </div>
                    <div style={{textAlign: 'center', marginTop: '20px'}}>
                        <Button variant="outlined" style={{marginRight: '10px'}}>임시저장</Button>
                        <Button variant="contained" onClick={onSubmit}>등록</Button>
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
                        <DataText>{data?.holderNm}</DataText>
                    </Column>
                    <Column>
                        <ColumnTitle>소지인</ColumnTitle>
                        <DataText>{data?.issuerNm}</DataText>
                    </Column>
                    <Column>
                        <ColumnTitle>상품담보금액</ColumnTitle>
                        <DataText>{data?.offerAmount && data.offerAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</DataText>
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
                        <DataText>{}</DataText>
                    </Column>
                </div>
            </Block>
            <Block>
                <h3>전자어음 정보</h3>
                <div style={{display: 'grid', gap: '10px'}}>
                    <Row>
                        <ColumnTitle>발행인</ColumnTitle>
                        <span>{data?.holderNm}</span>
                    </Row>
                    <Row>
                        <ColumnTitle>신용등급</ColumnTitle>
                        <span>{}</span>
                    </Row>
                    <Row>
                        <ColumnTitle>소지인</ColumnTitle>
                        <span>{data?.issuerNm}</span>
                    </Row>
                    <Row>
                        <ColumnTitle>상품담보금액</ColumnTitle>
                        <span>{data?.offerAmount && data.offerAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </Row>
                    <Row>
                        <ColumnTitle>할인율</ColumnTitle>
                        <span>{`10% (메타리페 대부 5%, 메타리페 서비스 5%)`}</span>
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
                            <span>{`${data?.holderNm} | 정윤석 | 134-81-25389`}</span>
                        </Row>
                        <Row>
                            <ColumnTitle>주소</ColumnTitle>
                            <span>충남 천안시 서북구 입장면 연곡길 308</span>
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
                            <span>{`${data?.issuerNm} | 홍길동 | 123-23-34567`}</span>
                        </Row>
                        <Row>
                            <ColumnTitle>주소</ColumnTitle>
                            <span>서울 강남구 논현동 88-9</span>
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

const ProductDetailLayout = styled.section`
  display: grid;
  gap: 20px;
  text-align: start;
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