import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import '../../styles/LoggedInForm.css';
import bg_video from '../videos/bg-video.mp4';

const LoggedInForm = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
  }
  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken")).token}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized, please login");
      }
    };

    fetchPrivateDate();
  }, []);
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
    <div>
      <video mute="true" loop autoPlay> 
        <source src={bg_video} type="video/mp4"/>
      </video>
      <ul className="logout">
      <button onClick={logOutHandler}> Log Out </button>
      </ul>
      <ul className="dashboard">
        <span>
        <li><Link to="/spending"> Track Spending </Link></li>
        <li><Link to="/todo"> Task Management </Link></li>
        <li><Link to="/exercises"> Track Exercises </Link></li>
        </span>
      </ul>
    </div>

    </>
    
  );
};

export default LoggedInForm;