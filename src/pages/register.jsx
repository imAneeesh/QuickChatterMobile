import React, { useState } from "react";
import Add from "../assets/addAvatar.png";
import defaultUser from "../assets/user.svg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [selectedFile, setSelectedFile] = useState(null);

  const [load, setLoad] = useState(false);

  const [err, setErr] = useState(false);
  const navigate = useNavigate();


  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };



  const changeError = () => {
    setErr(false);
  }


  const handleSubmit = async (e) => {
    setErr(false)
    setLoad(true)
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    let file = e.target[3].files[0];

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
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="texts">
          <span className="logo-text">Quick Chat</span>
          <span className="form-text">Register</span></div>
      
        <form onSubmit={handleSubmit}>
          <input className="inputs" type="text" name="name" id="name" placeholder="Jhone Doe" required />
          <input className="inputs" onChange={changeError} type="email" name="email" id="email" placeholder="jhone.doe@quickchat.com" required />
          <input className="inputs" type="password" name="password" id="password" placeholder="**********" />
          <input onChange={handleFileInputChange} style={{ display: "none" }} type="file" id="file" name="file" placeholder="" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add Avatar</span>
            {selectedFile && <span className="selected-file">{selectedFile.name}</span>}
          </label>
          <div className="myBtn">
            <button className="btn"> Sign up </button>
            {err && <span>Email already exists</span>}
            {!err && load && <div class="loader"></div>}

            <p>Account already exists? <a href="#/login">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register