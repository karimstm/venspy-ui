import React, {useStatae, useEffect} from 'react';
import './App.css';
import Home from './components/layout/Home';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ProtectedRouter, login_path } from "./Route";
import { Login } from "./components/Login/Login";
import { useSelector, useDispatch } from "react-redux";
import { isAuthenticated } from "./auth";
import { login, reject } from "./actions"



const App = () => {

	const isLogged = useSelector(state => state.isLogged);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isAuthenticated()){
			dispatch(login());
		}
		else {
			dispatch(reject());
		}
	}, [isLogged]);

	return (
		<Router>
			<div className="App">
				<Route path={login_path} exact component={Login} />
				<ProtectedRouter path="/" component={Home} />
			</div>
		</Router>
	);
}

export default App;
