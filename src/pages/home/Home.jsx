import React, { useEffect } from "react";
import "./home.scss";
import HomeContent from "../../components/homecontent/HomeContent";
import LeftBar from "../../components/leftbar/LeftBar";
import RightBar from "../../components/rightbar/RightBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../features/post/postSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
