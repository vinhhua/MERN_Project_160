import React from 'react';
import LoginForm from './components/Form/LoginForm';
import RegisterForm from './components/Form/RegisterForm';
import ForgotPasswordForm from './components/Form/ForgotPasswordForm';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
    return (
        <Router>
          <div>
            <nav>
              <ul>
                <button>
                  <Link to="/home">Home</Link>
                </button>
                <button>
                  <Link to="/login">Login</Link>
                </button>
                <button>
                  <Link to="/register">Sign Up</Link>
                </button>
              </ul>
            </nav>
    
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/forgotpassword">
                <ForgotPassword />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      );
}

function Home() {
    return <h2>
        <p>Home page</p>
        <p>Place content here</p>
    </h2>
  }
  
  function Login() {
    return <h2>
        <LoginForm />
    </h2>;
  }
  
  function Register() {
    return <h2>
        <RegisterForm />
    </h2>;
  }

  function ForgotPassword() {
    return <ForgotPasswordForm />
  }

export default App;