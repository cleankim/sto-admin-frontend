import {Block} from "../../assets/GlobalStyle";
import styled, {css} from "styled-components";
import {useEffect, useState} from "react";

export interface TabItems {
    name: string;
    value: any;
}

export type TabProps = {
    tabList: TabItems[];
    func: (param: any) => void;
}

export type ActiveTabProps = {
    active: boolean;
}

export default function Tabs({tabList, func}: TabProps) {

    const [activeTab, setActiveTab] = useState(0);

    const clickHandler = (e: React.MouseEvent) => {
        const target = e.target as HTMLLIElement;
        func(e);
        setActiveTab(target.value);
    }

    useEffect(() => {}, [activeTab]);

    return (
        <TabList>
            {tabList.map((item, i) => {
                return <TabItem key={i} onClick={e => clickHandler(e)} data-type={item.value} value={i} active={activeTab === i}>{item.name}</TabItem>;
            })}
        </TabList>
    );
}

const TabList = styled.ul`
  display: flex;
  gap: 30px;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #2B3674;
`;

const TabItem = styled.li<ActiveTabProps>`
  cursor: pointer;
  color: ${({active}) => active ? '#2B3674' : '#A3AED0'};
  ${({active}) => active && css`border-bottom: 2px solid #4318FF;`}
`;