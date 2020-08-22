import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { logoutUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Profile from "./components/profile/profile";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing/Landing";
import About from "./components/AboutPage/About";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Contact from "./components/ContactUs/Contact";
import Admin from "./components/Admin/Admin";
import ManageArtwork from "./components/profile/manageArtwork/manageArtwork";
import ResetPage from "./components/auth/resetPage";
import ResetPassword from "./components/auth/resetPassword";
import AdminLogin from "./components/Admin/adminLogin";
import ProfileSetting from "./components/profile/ProfileSetting/ProfileSetting";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/";
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
          <Route
            path="/(.+)"
            render={() => (
              <div>
                <Switch>
                  <Route exact path="/admin" component={Admin} />
                </Switch>
                <Switch>
                  <Route exact path="/2323/admin" component={AdminLogin} />
                </Switch>
                <Switch>
                  <Route path="/profile" component={Profile} />
                  <Route path="/profile-settings" component={ProfileSetting} />
                </Switch>
                <Route path="/manage" component={ManageArtwork} />
                <Route path="/forgot-password" component={ResetPage} />
                <Route path="/reset/:token" component={ResetPassword} />
                <Route path="/about-us" component={About} />
                <Route path="/how-it-works" component={HowItWorks} />
                <Route path="/contact-us" component={Contact} />
              </div>
            )}
          />
          <Route exact path="/" component={Footer} />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
