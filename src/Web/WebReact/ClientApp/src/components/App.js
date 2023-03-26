import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/* eslint-disable */
import ErrorPage from "../pages/error";
/* eslint-enable */

import "../styles/theme.scss";
import LayoutComponent from "../components/Layout";
import Login from "../pages/login";
import Register from "../pages/register";
import { logoutUser } from "../actions/user";

const PrivateRoute = ({ dispatch, component, ...rest }) => {
  if (
    !Login.isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))
  ) {
    dispatch(logoutUser());
    return <Redirect to="/login" />;
  } else {
    return (
      // eslint-disable-line
      <Route
        {...rest}
        render={(props) => React.createElement(component, props)}
      />
    );
  }
};

const CloseButton = ({ closeToast }) => (
  <i onClick={closeToast} className="la la-close notifications-close" />
);

class App extends React.PureComponent {
  // componentDidMount() {
  //   axios.defaults.baseURL = "https://localhost:8081";
  //   axios.defaults.headers.post["Accept"] = `application/json`;
  //   axios.defaults.headers.post["accept"] = `application/json`;
  //   axios.defaults.headers.post["Content-Type"] = `application/json`;

  //   axios.defaults.headers.get[
  //     "Authorization"
  //   ] = `Bearer ${localStorage.getItem("token")}`;
  //   axios.defaults.headers.get["Accept"] = `application/json`;
  //   axios.defaults.headers.get["accept"] = `application/json`;
  //   axios.defaults.headers.get["Content-Type"] = `application/json`;
  // }
  render() {
    return (
      <div>
        <ToastContainer
          autoClose={5000}
          hideProgressBar
          closeButton={<CloseButton />}
        />
        <HashRouter>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/app/order/showorder" />} />
            <Route
              path="/app"
              exact
              render={() => <Redirect to="/app/order/showorder" />}
            />
            <PrivateRoute
              path="/app"
              dispatch={this.props.dispatch}
              component={LayoutComponent}
            />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/error" exact component={ErrorPage} />
            <Route component={ErrorPage} />
            <Redirect from="*" to="/app/order/showorder" />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
