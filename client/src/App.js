import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routings/PrivateRoute";

// Forms
import LoginForm from "./components/Form/LoginForm";
import RegisterForm from "./components/Form/RegisterForm";
import ForgotPasswordForm from "./components/Form/ForgotPasswordForm";
import ResetPasswordForm from "./components/Form/ResetPasswordForm";
import LoggedInForm from "./components/Form/LoggedInForm";
import SpendingForm from "./components/Form/SpendingForm"
import ExerciseForm from "./components/Form/ExerciseForm"
import "./App.css";
import { LandingPage } from "./components/Form/LandingPage";

//  REDUX!
import { Provider } from 'react-redux';   //  keep track of store
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';  
import reducers from './reducers';
import PostNForm from "./PostNForm";

//  Animation between certain page transitions using framer-motion
import { AnimatePresence } from 'framer-motion';


//  global storage
const store = createStore(reducers, compose(applyMiddleware(thunk)));

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Router>
        <div className="app">
          <Switch>
            <PrivateRoute exact path="/dashboard" component={LoggedInForm} />
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/login" component={LoginForm}/>
            <Route exact path="/register" component={RegisterForm}/>
            <Route exact path="/forgotpassword" component={ForgotPasswordForm}/>
            <Route exact path="/passwordreset/:resetToken" component={ResetPasswordForm}/>
            <Provider store={store}>
              <PrivateRoute exact path="/spending" component={SpendingForm}/>
              <PrivateRoute exact path="/exercises" component={ExerciseForm}/>
              <PrivateRoute exact path="/todo" component={PostNForm}/>
            </Provider> 
          </Switch>
        </div>
      </Router>
    </AnimatePresence>
  );
};


export default App;