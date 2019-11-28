import React, { Component } from "react";
import "./Login.css";
import LoginForm from "./LoginForm";
import { isAuthenticated } from "../../auth";
import { Redirect } from "react-router-dom";

export class Login extends Component {
  render() {
    if (isAuthenticated()) return <Redirect to="/" />;
    return (
      <div id="login-main-div">
        <div id="login-sub-div">
          <div id="login-page-img">
            <center>
              <div id="login-page-logo">
                <img src={require("./OCP_LOGO.png")} alt="" />
              </div>
            </center>
          </div>
          <div id="login-form-wrapper-div">
            <div id="login-form-sub-wrapper">
              <div id="login-form-img">
                <img src={require("./venpy.png")} alt="" />
              </div>
              <LoginForm />
            </div>
          </div>
          <div id="login-page-right-effect"></div>
        </div>
      </div>
    );
  }
}

export default Login;
