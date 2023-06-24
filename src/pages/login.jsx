import React, { useState } from "react";
import Add from "../assets/addAvatar.png";
import defaultUser from "../assets/user.svg";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage} from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Login = () => {
    const [login, setLogin] = useState(true);

    const [selectedFile, setSelectedFile] = useState(null);

    const [load, setLoad] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const [err, setErr] = useState(false);
    const navigate = useNavigate();


    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const changeError = () => {
        setErr(false);
    }

    const handleBtn = () => {
        if (login == true) {
            setLogin(false)
        } else {
            setLogin(true)
        }
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setErr(false)
        setLoad(true)
        e.preventDefault();
        try {
            const email = e.target[0].value;
            const password = e.target[1].value;
            setLoad(true)
            console.log(email,password)
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (err) {
            try {
                const password = e.target[2].value;
                const email = e.target[1].value;
                const displayName = e.target[0].value;
                let file = e.target[3].files[0];

                console.log(displayName, email, password, file)

                try {
                    //Create user
                    const res = await createUserWithEmailAndPassword(auth, email, password);

                    //Create a unique image name
                    const date = new Date().getTime();
                    const storageRef = ref(storage, `${displayName + date}`);

                    let downloadURL = ""

                    if (file) {
                        await uploadBytesResumable(storageRef, file);
                        downloadURL = await getDownloadURL(storageRef);
                    } else {
                        downloadURL = defaultUser;
                    }
                    // Update profile
                    await updateProfile(res.user, {
                        displayName,
                        photoURL: downloadURL,
                    });

                    // Create user on firestore
                    await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                    });

                    await setDoc(doc(db, "userChats", res.user.uid), {});
                    navigate("/");
                } catch (err) {
                    setErr(true);
                    setErrMsg("Email already exists")
                    
                }
            } catch (err) {
                setErrMsg(true)
               setErrMsg("Invalid Credentials")
            }
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <div className="texts">
                    <span className="logo-text">Quick Chat</span>
                    <span className="form-text">
                        {login ? <span>Login</span> : <span>Register</span>}
                    </span>
                </div>
              <form onSubmit={handleSubmit} > 
                    {!login && <input className="inputs" type="text" name="name" id="name" placeholder="Jhone Doe" required />}
                    <input className="inputs" onChange={changeError} type="email" name="email" id="email" placeholder="jhone.doe@quickchat.com" />
                    <input className="inputs" type="password" name="password" id="password" placeholder="**********" />
                    {!login && <div>  <input onChange={handleFileInputChange} style={{ display: "none" }} type="file" id="file" name="file" placeholder="" />
                        <label htmlFor="file">
                            <img src={Add} alt="" />
                            <span>Add Avatar</span>
                            {selectedFile && <span className="selected-file">{selectedFile.name}</span>}
                        </label> </div>}

                    <div className="myBtn">
                        {login ? <input className="btn" type="submit" value="Sign in" /> : <input className="btn" type="submit" value="Register" />}
                        {err && <span>{errMsg}</span>}
                        {!err && load && <div class="loader"></div>}
                        {login ? <p>Don't have an Account? <span className="registerBtn" onClick={handleBtn}>Register</span></p> : <p>Already have an Account? <span className="registerBtn" onClick={handleBtn}>Login</span></p>}

                    </div>
                </form>
                </div>
        </div>
            )
}

            export default Login