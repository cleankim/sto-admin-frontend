import {Routes, Route} from 'react-router';
import Dashboard from '../../pages/Dashboard';
import LoginForm from '../../pages/LoginForm';
import Member from '../../pages/Member';
import Product from '../../pages/Product';
import Token from '../../pages/Token';
import MemberDetail from '../member/MemberDetail';
import MemberListMain from '../member/MemberListMain';
import ProductDetail from '../product/ProductDetail';
import ProductListMain from '../product/ProductListMain';
import TokenDetail from '../token/TokenDetail';
import TokenListMain from '../token/TokenListMain';

export default function Navbar() {
    return (
        <Routes>
            <Route path='/' element={<LoginForm />}/>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/product' element={<Product />}>
                <Route path='' element={<ProductListMain />}/>
                <Route path='detail/:id' element={<ProductDetail />}/>
            </Route>
            <Route path='/member' element={<Member />}>
                <Route path='' element={<MemberListMain />}/>
                <Route path='detail/:id' element={<MemberDetail />}/>
            </Route>
            <Route path='/token' element={<Token />}>
                <Route path='' element={<TokenListMain />}/>
                <Route path='detail/:id' element={<TokenDetail />}/>
            </Route>
        </Routes>
    );
}
