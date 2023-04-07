import {Outlet} from "react-router-dom";
import TokenDashboard from "../components/token/TokenDashboard";
import { Gap20Layout } from "../assets/GlobalStyle";

export default function Token() {
    return <Gap20Layout>
                <TokenDashboard/>
               <Outlet/>
           </Gap20Layout>;
};