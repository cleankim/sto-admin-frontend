import {Outlet} from "react-router-dom";

export default function ProductInfo() {
    return <section style={{padding: '20px'}}>
               <Outlet/>
           </section>;
};
