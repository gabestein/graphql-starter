import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
// eslint-disable-next-line import/no-named-as-default-member, import/no-named-as-default
import withApollo from '../lib/stores/withApollo';
import auth from '../lib/Auth';
import { AuthContext } from '../lib/contexts/AuthContext';

import '../lib/styles/baseStyles.scss';

class MyApp extends App {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: auth.isAuthenticated(),
			isLoggedIn: auth.isLoggedIn()
		};
		this.handleLoginChange = this.handleLoginChange.bind(this);
	}

	handleLoginChange() {
		this.setState({
			isAuthenticated: auth.isAuthenticated(),
			isLoggedIn: auth.isLoggedIn()
		});
	}

	componentDidMount() {
		if (!auth.isAuthenticated() && auth.isLoggedIn()) {
			auth.renewSession().then(() => {
				this.handleLoginChange();
			});
		}
	}

	render () {
		const { Component, pageProps, apolloClient } = this.props;
		return (
			<Container>
				<ApolloProvider client={apolloClient}>
					<AuthContext.Provider value={{
						auth: auth,
						isAuthenticated: this.state.isAuthenticated,
						isLoggedIn: this.state.isLoggedIn,
						handleLoginChange: this.handleLoginChange
					}}
					>
						<Component {...pageProps} auth={auth} isAuthenticated={this.state.isAuthenticated} isLoggedIn={this.state.isLoggedIn} handleLoginChange={this.handleLoginChange} />
					</AuthContext.Provider>
				</ApolloProvider>
			</Container>
		);
	}
}

export default withApollo(MyApp);
