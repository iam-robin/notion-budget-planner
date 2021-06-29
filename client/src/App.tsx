import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import "./app.scss";
import AuthenticatedApp from "./components/authenticatedApp/AuthenticatedApp";
import { Login } from "./components/login/Login";

function App() {

	return (
		<Router>
			<div>
			<ul className="nav">
				<li>
					<Link to="/">Login</Link>
				</li>
				<li>
					<Link to="/app">App</Link>
				</li>
			</ul>

			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route path="/app">
					<AuthenticatedApp />
				</Route>
			</Switch>
		</div>
		</Router>
	);
}

export default App;