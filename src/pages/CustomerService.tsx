import {Outlet, useNavigate} from "react-router";
import {createContext, useState} from "react";
import Tabs, {TabItems} from "../components/common/Tabs";
import {Gap20Layout, Block} from "../assets/GlobalStyle";

export type BoardType = 'service' | 'notice' | 'press' | 'faq' | 'qna';
export enum BoardTypeEnum {
    SERVICE = '서비스안내',
    NOTICE = '공지사항',
    PRESS = '언론보도',
    FAQ = 'FAQ',
    QNA = 'Q&A'
}
export function getBoardTypeText(text: BoardType) {
    switch(text) {
        case "notice": return BoardTypeEnum.NOTICE;
        case "press" : return BoardTypeEnum.PRESS;
        case "faq" : return BoardTypeEnum.FAQ;
        case "qna" : return BoardTypeEnum.QNA;
        default: return BoardTypeEnum.SERVICE;
    }
}
export const BoardTypeContext = createContext({type: 'notice' as BoardType, setTypeState: (t: BoardType) => {}});
export default function CustomerService() {

    const [type, setType] = useState<BoardType>('service');
    const setTypeState = (type: BoardType) => {
        setType(type);
    }
    const navigate = useNavigate();
    const tabClickEvent = (e: React.MouseEvent) => {
        const target = e.target as HTMLLIElement;
        navigate(`/customerService/`);
        setTypeState(target.getAttribute('data-type') as BoardType);
    }

    return (
        <Gap20Layout>
            <Block>
                <Tabs tabList={CSTabList} func={tabClickEvent}/>
            </Block>
            <BoardTypeContext.Provider value={{type, setTypeState}}>
                <Outlet />
            </BoardTypeContext.Provider>
        </Gap20Layout>
    );
}

const CSTabList: TabItems[] = [
    {name: '서비스안내', value: 'service'},
    {name: '공지사항', value: 'notice'},
    {name: '언론보도', value: 'press'},
    {name: 'FAQ', value: 'faq'},
    {name: 'Q&A', value: 'qna'},
];
