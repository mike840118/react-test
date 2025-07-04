import React, { useState, useEffect } from 'react';
import Menu from '../components/menu.tsx'
import Title from '../components/title.tsx'
import Footer from '../components/footer.tsx'
import './app.css'; 
function AppData (){
return <><div className="container">
    <Title></Title>
    <div className="main">
        <Menu></Menu>
        <div className="content">
            資料放這
        </div>
    </div>
         <Footer></Footer>
   </div></>
}
export default AppData