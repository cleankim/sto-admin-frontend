import { useState } from "react";
import { Outlet } from "react-router";

export default function Member() {
    return (
        <section style={{padding: '20px', height: '100vh'}}>
            <Outlet/>
        </section>
    );
}
