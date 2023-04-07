import {Block, Flex, SubTitle} from '../../assets/GlobalStyle';
import styled from "styled-components";

export default function TokenDashboard() {
    return (
        <DashboardLayout>
            <div style={{flexGrow: 1, display: 'grid', gap: '10px'}}>
                <div style={{height: '40px'}}>&nbsp;</div>
                <SubTitle style={{height: '40px'}}>토큰 종류</SubTitle>
                <SubTitle style={{height: '40px'}}>발행된 토큰 개수</SubTitle>
            </div>
            <div style={{flexGrow: 2, display: 'grid', gap: '10px'}}>
                <ColorTextBlock style={{height: '40px', textAlign: 'center'}}>
                    <div>발행된 토큰</div>
                    <div>거래중 토큰</div>
                    <div>소각예정 토큰</div>
                    <div>소각완료 토큰</div>
                </ColorTextBlock>
                <Row>
                    <div>
                        <span>5,872개</span>
                        <TextS>
                            <span>총 토큰종류</span>
                            <div>
                                <Triangle/>
                            </div>
                            <span style={{color: '#05CD99'}}>+18개</span>
                        </TextS>
                    </div>
                    <div>480개</div>
                    <div>12개</div>
                    <div>5,372개</div>
                </Row>
                <Row>
                    <div>
                        <span>555,178,040개</span>
                        <TextS>
                            <span>총 토큰개수</span>
                            <Triangle/>
                            <span style={{color: '#05CD99'}}>+22,500개</span>
                        </TextS>
                    </div>
                    <div>42,500,800개</div>
                    <div>1,200,050개</div>
                    <div>511,477,190개</div>
                </Row>
            </div>
        </DashboardLayout>
    )
}

const DashboardLayout = styled(Block)`
  color: #2B3674;
  display: flex;
  height: 200px;
`;

const Row = styled(Flex)`
  justify-content: space-around;
  align-items: baseline;
  font-weight: 700;
  font-size: 24px;
  height: 40px;
  text-align: right;

  div {
    width: 100%;
    
    div {
      width: initial;
      justify-content: end;
    }
  }
`;

const ColorTextBlock = styled(SubTitle)`
  display: flex;
  justify-content: space-around;
  
  div:first-child {
    width: 100%;
    color: #6AD2FF;
  }
  div:nth-child(2) {
    width: 100%;
    color: #898989;
  }
  div:nth-child(3) {
    width: 100%;
    color: #4318FF;
  }
  div:last-child {
    width: 100%;
    color: #FF8888;
  }
`

const Triangle = styled.div`
  width: 0;
  height: 0;
  color: #05CD99;
  border-bottom: 5px solid transparent;
  border-top: 5px solid transparent;
  border-left: 5px solid #05CD99;
  border-right: 5px solid transparent;
  transform: rotate(-90deg);
  margin-bottom: 3px;
`;

const TextS = styled(Flex)`
  color: #A3AED0;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  gap: 5px;
`;