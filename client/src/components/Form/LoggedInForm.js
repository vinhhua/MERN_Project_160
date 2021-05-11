import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import '../../styles/LoggedInForm.css';

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
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
      <ul className="dashboard">
        <li><Link to="/spending"> Track Spending </Link></li>
        <li><Link to="/todo"> Task Management </Link></li>
        <li><Link to="/exercises"> Track Exercises </Link></li>
        <button onClick={logOutHandler}> Log Out </button>
      </ul>
      
    </>
  );
};

export default LoggedInForm;