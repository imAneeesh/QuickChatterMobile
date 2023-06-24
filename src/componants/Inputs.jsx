import React, { useContext, useState, useRef, useEffect } from "react";

import Img from "../assets/img.png"
import Attach from "../assets/attach.png"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chatContext";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Inputs = () => {
    const shouldFocus = false;
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const [imgStatus, setImgStatus] = useState(false);
    const buttonRef = useRef();

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (img) {

            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // You can track the progress of the upload here if needed
                },
                (error) => {
                    //TODO:Handle Error
                    console.log("Upload error:", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
    };
    const handleKey = (e) => {
        e.code === "Enter" && handleSend();
    };

    useEffect(() => {
        if (imgStatus) {
            handleSend();
            setImgStatus(false);
        }
    }, [imgStatus]);

    return (
        <div className="my-input">
            <input type="text" name="" id="" onKeyDown={handleKey} autoFocus={shouldFocus} placeholder="Hello, there" onChange={(e) => setText(e.target.value)}
                value={text} />
            <div className="send">
                <img src={Attach} alt="" />
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => {
                        setImg(e.target.files[0]);
                        setImgStatus(true);
                        console.log(imgStatus);
                    }}
                />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button onClick={handleSend}><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    )
}

export default Inputs