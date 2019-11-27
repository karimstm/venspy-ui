import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./LoginForm.css";
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const LoginForm = props => {
	const [error, setError] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			if (!err) {
				console.log(values);
			}
		});
	};

	const { getFieldDecorator } = props.form;
	return (
		<Form onSubmit={handleSubmit} className="login-form">
			<Form.Item>
				{getFieldDecorator("username", {
					rules: [
						{
							type: "email",
							message: "The input is not valid E-mail!"
						},
						{
							required: true,
							message: "Please input your E-mail!"
						}
					]
				})(
					<Input
						prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
						placeholder="Email"
					/>
				)}
			</Form.Item>
			<Form.Item>
				{getFieldDecorator("password", {
					rules: [{ required: true, message: "Please input your Password!" }]
				})(
					<Input
						prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
						type="password"
						placeholder="Password"
					/>
				)}
			</Form.Item>

			{error ? <p style={{color: "red"}}>password or email not correct, or you are not registered</p>: null}

			<Form.Item>
				{getFieldDecorator("remember", {
					valuePropName: "checked",
					initialValue: true
				})(<Checkbox>Remember me</Checkbox>)}
				<a className="login-form-forgot" href="">
					Forgot password
        </a>
				<Button type="primary" htmlType="submit" className="login-form-button">
					Log in
        </Button>
				Or <a href="">register now!</a>
			</Form.Item>
		</Form>
	);
};

export default (Form.create({ name: "normal_login" })(LoginForm));
