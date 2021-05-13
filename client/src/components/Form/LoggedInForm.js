import { useState, useEffect } from "react";
import axios from "axios";
import '../../styles/LoggedInForm.css';
import bg_video from '../videos/bg-video.mp4';

//  importing links, routes, and forms
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoggedInForm = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  //  clear local storage and push to home page
  const logOutHandler = () => {
    localStorage.clear();
    history.push('/');
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ opacity: 0.5 }}>
      <video mute="true" loop autoPlay> 
        <source src={bg_video} type="video/mp4"/>
      </video>
      <ul className="logout">
      <button onClick={logOutHandler}> Log Out </button>
      </ul>
      <span className="dashboard">
        <li><Link to="/spending"> Track Spending </Link></li>
        <li><Link to="/todo"> Task Management </Link></li>
        <li><Link to="/exercises"> Track Exercises </Link></li>
      </span>
    </motion.div>

    </>
    
  );
};

export default LoggedInForm;