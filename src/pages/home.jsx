import React, { useState, useEffect } from "react";
import Chat from "../componants/Chat";
import Sidebar from "../componants/Sidebar";
import Welcome from "./welcome";

const Home = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  const handleChatSelect = (status) => {
    setShowWelcome(status);
    console.log(status);
  };

  const openSidebar = () => {
    console.log("open sidebar");
    // setShowWelcome(true);
    document.querySelector(".sidebar").classList.toggle("open");
    const element = document.querySelector(".my-btn");
    element.style.display = "none";


    // Code to close the sidebar (e.g., update state or call a closeSidebar function)
  };

  return (
    <div className="home">
      <div className="container">
        <Sidebar showMenu={handleChatSelect} />
        {!showWelcome ? <Welcome props={openSidebar} /> : <Chat />}
      </div>
    </div>
  );
};

export default Home;
