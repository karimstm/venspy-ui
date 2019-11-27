import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { Spin, Icon } from "antd";
import { useSelector } from "react-redux";

export const new_project = "/projects/new";
export const project_list = "/projects";
export const project_models = "/projects/:id/models";
export const project_results = "/projects/:id/results";
export const project_resultcharts = "/projects/:id/results/:resid";
export const charts = "/charts";
export const login_path = "/login";


export const ProtectedRouter = ({ component: Component, ...rest }) => {
	const isLogged = useSelector(state => state.isLogged);
	
	return (
		<Route
			{...rest}
			render={
				props => {
					if (isLogged) {
						return (<Component {...rest} {...props} />)
					}
					else {
						if (isLogged !== null) {
							return <Redirect
								to={{
									pathname: login_path,
								}}
							/>
						}
						else {
							const antSpinIcon = <Icon type="loading" style={{ fontSize: 50, strokeWifth: "2" }} spin />;
							return <Spin indicator={antSpinIcon} style={{ position: "absolute", width: "auto", height: "auto", margin: "0px", top: "calc(50% - 50px)", left: "calc(50% - 50px)", backgroundColor: "white", padding: "20px", borderRadius: "100%" }} size="large" />;
						}
					}
				}
			}
		/>
	)
}

