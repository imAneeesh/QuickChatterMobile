import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const Welcome = ({props}) => {

    const [open, setOpen] = useState(false);

    const openSideBar = () => {
        setOpen(true)
        props(true)
    }

    return (
        <div className="welcome">
            <div className="img">
                <img src="https://img.freepik.com/free-vector/conversation-concept-illustration_114360-1305.jpg?t=st=1687151731~exp=1687152331~hmac=1a0d82e75fe749cca24f67d7743c84bd9ea2a3e8435ba778ecbbb048d2417388" alt="" />
            </div>
            <div className="text">
                <h1>Welcome to QuickChatter</h1>
                <p>A simplest way to connect.</p>
            </div>
            <div className="my-btn">
                <button  onClick={openSideBar} class="btn">Start</button>
            </div>
        </div>
    )
}

export default Welcome