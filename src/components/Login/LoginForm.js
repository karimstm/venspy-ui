import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, Spin } from "antd";
import "./LoginForm.css";
import axios from "../../services/axios-default";
import { useSelector, useDispatch } from "react-redux";
import { addToken } from "../../auth";
import { login, LOGIN_PATH } from "../../actions";
import { transform } from "@babel/core";

const LoginForm = props => {
	const isLogged = useSelector(state => state.isLogged);
	const dispatch = useDispatch();
	const [error, setError] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			if (!err) {
				setError(null);
				axios.post(`${LOGIN_PATH}`, values)
					.then(res => {
						//console.log(res);
						addToken(res.data.access);
						setError(false);
						window.location = "/";
					})
					.catch(err => {
						//console.log(err);
						setError(true);
					});
			}
		});
	};

	const { getFieldDecorator } = props.form;
	return (
		<Form onSubmit={handleSubmit} className="login-form">
			<Form.Item>
				{getFieldDecorator('username', {
					rules: [{ required: true, message: 'Please input your username!' }],
				})(
					<Input
						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						placeholder="Username"
					/>,
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

			{error ?  <p style={{ color: "red" }}>password or email not correct, or you are not registered</p> : null}

			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button">
					Log in
        		</Button>
			</Form.Item>
			{error === null ? <Spin style={{ position: "absolute", width: "auto", height: "auto", top: "calc(50% - 50px)", left: "calc(50% - 50px)", transform: "translate(100%, 0)" }} size="large" /> : null}
		</Form>
	);
};

export default withRouter(Form.create({ name: "normal_login" })(LoginForm));
