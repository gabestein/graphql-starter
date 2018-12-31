/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react';
import { AuthContext } from '../../lib/contexts/AuthContext';


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogin(e) {
		e.preventDefault();
		this.context.auth.login();
	}

	handleLogout(e) {
		e.preventDefault();
		this.context.auth.logout();
	}

	render() {
		const { isAuthenticated } = this.context;
		if (isAuthenticated) {
			return (<a href="" onClick={this.handleLogout}>Logout</a>);
		}
		return (<a href="" onClick={this.handleLogin}>Login</a>);
	}
}

Login.contextType = AuthContext;
export default Login;
