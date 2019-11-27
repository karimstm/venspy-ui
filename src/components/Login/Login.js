import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './Login.css';
import LoginForm from "./LoginForm";

export class Login extends Component {
	render() {
		return (
			<div id='login-main-div'>
				<div id='login-sub-div'>
					<div id='login-page-img'>
						<center>
							<div id="login-page-logo">
								<img src={require("./OCP_LOGO.png")}/>
							</div>
						</center>
					</div>
					<div id='login-form-wrapper-div'>
						<div id="login-form-sub-wrapper">
							<div id="login-form-img">
							<img src={require("./venpy.png")}/>
							</div>
							<LoginForm />
						</div>
					</div>
					<div id='login-page-right-effect'>
					</div>
				</div>
			</div>
		)
	}
}

export default Login;
