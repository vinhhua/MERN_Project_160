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
import SpendingForm from "./components/Form/SpendingForm"
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          {/* <PrivateRoute exact path="/" component={LoggedInForm} /> */}
          <Route exact path="/"></Route>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/about" component={AboutForm} />
          <Route exact path="/services" component={ServicesForm} />
          <Route exact path="/contact-us" component={ContactForm} />
          <Route exact path="/spending"><SpendingForm /></Route>
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

export default App;