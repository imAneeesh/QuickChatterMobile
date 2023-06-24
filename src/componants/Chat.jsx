import React, { useContext } from "react";
import Cam from "../assets/cam.png"
import Add from "../assets/add.png"
import More from "../assets/more.png"
import Messages from "./Messages";
import Inputs from "./Inputs";
import { ChatContext } from "../context/chatContext";


const Chat = () => {
    const { data } = useContext(ChatContext);

    const openSideBar = () => {
        document.querySelector(".sidebar").classList.toggle("open");
    }

    return (
        <div className="chat">
            <div className="chat-info">
                <span className="username">
                    <span onClick={openSideBar}><i class="fas fa-solid fa-arrow-left"></i></span>
                    <img src={data.user?.photoURL} alt="img" />
                    <span>{data.user?.displayName}</span>
                </span>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages />
            <Inputs />
        </div>
    )
}

export default Chat