import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routings/PrivateRoute";

// Forms
import LoginForm from "./components/Form/LoginForm";
import RegisterForm from "./components/Form/RegisterForm";
import ForgotPasswordForm from "./components/Form/ForgotPasswordForm";
import ResetPasswordForm from "./components/Form/ResetPasswordForm";
import LoggedInForm from "./components/Form/LoggedInForm";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={LoggedInForm} />
          <Route exact path="/home"><Home /></Route>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordForm}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordForm}
          />
        </Switch>
      </div>
    </Router>
  );
};

function Home() {
  return(
    <h2>
      <h1> Home Page </h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </h2>
  )
}
export default App;