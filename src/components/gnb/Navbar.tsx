import {Routes, Route} from 'react-router';
import Dashboard from '../../pages/Dashboard';
import LoginForm from '../../pages/LoginForm';
import MemberInfo from '../../pages/MemberInfo';
import ProductInfo from '../../pages/ProductInfo';

export default function Navbar() {
    return (
        <Routes>
            <Route path='/' element={<LoginForm />}/>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/productInfo' element={<ProductInfo />}/>
            <Route path='/memberInfo' element={<MemberInfo />}/>
        </Routes>
    );
}
