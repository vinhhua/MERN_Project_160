import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bg_video from '../videos/bg-video.mp4';
import "../../styles/LoginForm.css";

import { motion } from 'framer-motion';

//  loading in screen
import { BreedingRhombusSpinner } from 'react-epic-spinners'

const LoginForm = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //  LOAD  ------------------------------------
  let initial = useRef(true);   //  avoid initial render (dupe variable)
  const [loading, setLoading] = useState(false);    //  default false
  const user = JSON.parse(localStorage.getItem("authToken"));   //  null or populated

  //  react hook: loading screen transition
  useEffect(() => {
    if(initial.current) {
      initial.current = false;   
    } else {
      setTimeout(() => {
        setLoading(false);
        if(localStorage.getItem("authToken")) {
          history.push("/dashboard");
        }
      }, 2000);   //  2 seconds
    }
  }, [loading])

  //  ------------------------------------------

  const loginHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", JSON.stringify(data));
      setLoading(true);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("Some error occured");
      }, 5000);
    }
  };

  return (
    <motion.div className={ loading ? "loading-screen" : "login-screen" }
    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} transition={{ duration: 0.5 }}>
      { loading ? 
      <div style={{ margin:"50px"}}>
        <div>
          <h1 className="loading-words">Welcome back
            <span style={{ marginLeft: "25px", color: "#36D7B7" }}>{user?.result?.username}.</span>
          </h1>
        </div>
        <div style={{ marginLeft: "40%" }}> 
          <BreedingRhombusSpinner color={"#36D7B7"} size={150}/>
        </div>
      </div> : 
      <>
      <video mute="true" loop autoPlay> 
        <source src={bg_video} type="video/mp4"/>
      </video>
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
      </> }
    </motion.div>
  );
};

export default LoginForm;