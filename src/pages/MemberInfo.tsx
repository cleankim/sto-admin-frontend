import { useState } from "react";
import { Outlet } from "react-router";

export default function MemberInfo() {
    const [userType, setUserType] = useState<'investor' | 'ipo'>('investor');

    return (
        <section>
            <h2 style={{marginBottom: '20px', color: '#2b3675'}}>회원정보 - {userType === 'investor' ? '투자회원' : '공모회원'}</h2>
            <Outlet/>
        </section>
    );
}
