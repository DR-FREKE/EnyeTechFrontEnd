import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "../Components/NavBar";
import UserProfile from "../Pages/Profile";

const AppRoute = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/profile" />
          </Route>
          <Route exact path="/profile" component={UserProfile} />
        </Switch>
      </Router>
    </>
  );
};
export default AppRoute;
