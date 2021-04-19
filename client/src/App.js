import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routings/PrivateRoute";

// Forms
import LoginForm from "./components/Form/LoginForm";
import RegisterForm from "./components/Form/RegisterForm";
import ForgotPasswordForm from "./components/Form/ForgotPasswordForm";
import ResetPasswordForm from "./components/Form/ResetPasswordForm";
import LoggedInForm from "./components/Form/LoggedInForm";
import Navbar from "./components/Navbar/index";
import AboutForm from "./components/Form/AboutForm";
import ServicesForm from "./components/Form/ServicesForm";
import ContactForm from "./components/Form/ContactForm";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          {/* <PrivateRoute exact path="/" component={LoggedInForm} /> */}
          <Route exact path="/"><Home /></Route>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/about" component={AboutForm} />
          <Route exact path="/services" component={ServicesForm} />
          <Route exact path="/contact-us" component={ContactForm} />
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
    <div>
      <Navbar />
      <h1> Home Page </h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <img src="https://prod-corporate-fe-assets.s3.amazonaws.com/uploads/2018/01/feature-image-a-brief-introduction-to-brand-tracking-2-800x486.jpeg" width="300" height="225" alt="Photo of White Beach in Boracay, Philippines" />
    </div>
  )
}
export default App;