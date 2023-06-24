import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = (props)=>{

    const getStatus=(status)=>{
        console.log(status)
        props.showMenu(status)
    }

    return (
        <div className="sidebar">
            <Navbar/>
            <Search/>
            <Chats handleSelect={getStatus} />
        </div>
    )
}

export default Sidebar