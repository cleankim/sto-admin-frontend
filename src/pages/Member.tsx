import {Outlet, useNavigate} from "react-router";
import Tabs, {TabItems} from "../components/common/Tabs";
import {useContext, useEffect, useState} from "react";
import {UserType} from "../interface/Member";
import {Gap20Layout, Block} from "../assets/GlobalStyle";
import {createContext} from "react";

export const UserTypeContext = createContext({type: 'investor', setTypeState: (t: UserType) => {}});
export default function Member() {
    const [type, setUserType] = useState('investor');
    const contextValue = useContext(UserTypeContext);
    const setTypeState = (t: UserType) => {
        setUserType(t);
    };

    const navigate = useNavigate();
    const tabClickEvent = (e: React.MouseEvent) => {
        const target = e.target as HTMLLIElement;
        navigate(`/member/`);
        setUserType(target.getAttribute('data-type') as UserType);
        setTypeState(target.getAttribute('data-type') as UserType);
    }

    const context = {
        type: 'investor',
        setType: setTypeState
    }

    const MemberTabList: TabItems[] = [
        {name: '투자회원', value: 'investor'},
        {name: '공모회원', value: 'ipo'}
    ];

    useEffect(() => {}, [type, contextValue.type, setTypeState]);

    return (
            <Gap20Layout>
                <Block>
                    <Tabs list={MemberTabList} func={tabClickEvent}/>
                </Block>
                <UserTypeContext.Provider value={{type, setTypeState}}>
                    <Outlet/>
                </UserTypeContext.Provider>
            </Gap20Layout>
    );
}
