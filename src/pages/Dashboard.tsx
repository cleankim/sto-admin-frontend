import styled from "styled-components";
import {Block} from "../assets/GlobalStyle";
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'

export default function Dashboard() {
    // const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    //
    // const options: Highcharts.Options = {
    //     chart: {
    //         type: 'bar'
    //     },
    //     title: {
    //         text: 'Fruit Consumption'
    //     },
    //     xAxis: {
    //         categories: ['Apples', 'Bananas', 'Oranges']
    //     },
    //     yAxis: {
    //         title: {
    //             text: 'Fruit eaten'
    //         }
    //     },
    //     series: [{
    //         name: 'Jane',
    //         data: [1, 0, 4]
    //     }, {
    //         name: 'John',
    //         data: [5, 7, 3]
    //     }]
    // }

    return (
        <section style={{padding: '20px'}}>
            <h2 style={{marginBottom: '54px', color: '#2b3675'}}>Main Dashboard</h2>

            <div style={{display: 'grid', gap: '17px'}}>
                <div>
                    <DashboardH3>투자상품 중개현황</DashboardH3>
                    <Row>
                        <BlockS>
                            <p>누적 공모액</p>
                            <span>740,990,000원</span>
                        </BlockS>
                        <BlockS>
                            <p>공모잔액</p>
                            <span>40,990,000원</span>
                        </BlockS>
                        <BlockS>
                            <p>상환율</p>
                            <span>92.56%</span>
                        </BlockS>
                        <BlockS>
                            <p>연체율</p>
                            <span>0.00%</span>
                        </BlockS>
                        <BlockS>
                            <p>평균 수익률</p>
                            <span>8.55%</span>
                        </BlockS>
                        <BlockS>
                            <p>부실채권 매각건수</p>
                            <span>0건</span>
                        </BlockS>
                    </Row>
                </div>

                <div>
                    <DashboardH3>메타리페 수익</DashboardH3>
                    <Row>
                        <BlockS>
                            <p>메타리페 대부(연간)</p>
                            <span>500,740,000원</span>
                        </BlockS>
                        <BlockS>
                            <p>메타리페 대부(월간)</p>
                            <span>36,550,200원</span>
                        </BlockS>
                        <BlockS>
                            <p>메타리페 대부(일일)</p>
                            <span>1,120,800원</span>
                        </BlockS>
                        <BlockS>
                            <p>메타리페 플랫폼(연간)</p>
                            <span>100,180,000원</span>
                        </BlockS>
                        <BlockS>
                            <p>메타리페 플랫폼(월간)</p>
                            <span>7,250,080원</span>
                        </BlockS>
                        <BlockS>
                            <p>메타리페 플랫폼(일일)</p>
                            <span>330,500원</span>
                        </BlockS>
                    </Row>
                </div>

                <div>
                    <DashboardH3>회원정보</DashboardH3>
                    <Row>
                        <Block>
                            <DashboardH4>투자회원</DashboardH4>
                            {/*<div>*/}
                            {/*    <HighchartsReact*/}
                            {/*        highcharts={Highcharts}*/}
                            {/*        options={options}*/}
                            {/*        ref={chartComponentRef}*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </Block>
                        <Block>
                            <DashboardH4>공모회원</DashboardH4>
                            <div>
                            </div>
                        </Block>
                    </Row>
                </div>
            </div>

        </section>
    );
}

const DashboardH3 = styled.h3`
  color: #2B3674;
  font-weight: 400;
  font-size: 24px;
  line-height: 42px;
`;

const DashboardH4 = styled.h4`
  color: #2B3674;
  font-weight: 400;
  font-size: 20px;
  line-height: 42px;
  text-align: start;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  text-align: center;
  
  p {
    color: #A3AED0;
  }
  span {
    color: #2B3674;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }
`;

const BlockS = styled(Block)`
  width: 248px;
  height: 97px;
`;