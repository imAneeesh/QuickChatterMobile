import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chatContext";

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const ref = useRef();
    const [prevDate, setPrevDate] = useState(null);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const dates = message.date.toDate();
    const formattedTime = dates.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    const formattedDate = dates.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    let dayElement = null;
    if (prevDate !== formattedDate) {
        dayElement = <div className="Day">{formattedDate}</div>;
        setPrevDate(formattedDate);
    }

    return (
        <>
            {dayElement}
            <div
                ref={ref}
                className={`message ${message.senderId === currentUser.uid && "owner"}`}
            >
                <div className="messageInfo">
                    <img
                        src={
                            message.senderId === currentUser.uid
                                ? currentUser.photoURL
                                : data.user.photoURL
                        }
                        alt="image"
                    />
                    <span className="message-time">{formattedTime}</span>
                </div>
                <div className="messageContent">
                     <p>{message.text}</p>
                    {message.img && <img src={message.img} alt="" />}
                </div>
            </div>
        </>
    );
};

export default Message;
