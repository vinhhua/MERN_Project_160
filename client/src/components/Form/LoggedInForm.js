import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

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
      <div>{privateData}</div>
      <li><Link to="/spending"> Spending </Link></li>
      <li><Link to="/todo"> To do </Link></li>
      <button onClick={logOutHandler}> Log Out </button>
    </>
  );
};

export default LoggedInForm;