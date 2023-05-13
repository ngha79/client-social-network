import React from "react";
import "./home.scss";
import HomeContent from "../../components/homecontent/HomeContent";
import LeftBar from "../../components/leftbar/LeftBar";
import RightBar from "../../components/rightbar/RightBar";

const Home = () => {
  return (
    <div className="home-page">
      <LeftBar />
      <HomeContent />
      <RightBar />
    </div>
  );
};

export default Home;
