import {Outlet} from "react-router-dom";

export default function Product() {
    return <section style={{padding: '20px'}}>
               <Outlet/>
           </section>;
};
