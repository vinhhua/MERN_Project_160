import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import "../../styles/LoggedInForm.css";
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
      <ul>
        <li><Link to="/spending"> Spending </Link></li>
        <li><Link to="/todo"> Task Management</Link></li>
        <li><Link to="/exercises"> Exercises </Link></li>
        <button style={{
                        backgroundColor: "#256ce1",
                        padding: "10px 22px",
                        outline: "none",
                        border: "none",
                        color: "#fff",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                        textDecoration: "none"}} onClick={logOutHandler}> Log Out </button>
      </ul>
    </>
  );
};

export default LoggedInForm;