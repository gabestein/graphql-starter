import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
// eslint-disable-next-line import/no-named-as-default-member, import/no-named-as-default
import withApollo from '../lib/stores/withApollo';
import { AuthContext, Auth } from '../lib/contexts/AuthContext';

import '../lib/styles/baseStyles.scss';

class MyApp extends App {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: Auth.isAuthenticated(),
			isLoggedIn: Auth.isLoggedIn()
		};
		this.handleLoginChange = this.handleLoginChange.bind(this);
	}

	handleLoginChange() {
		this.setState({
			isAuthenticated: Auth.isAuthenticated(),
			isLoggedIn: Auth.isLoggedIn()
		});
	}

	componentDidMount() {
		if (!Auth.isAuthenticated() && Auth.isLoggedIn()) {
			Auth.renewSession().then(() => {
				this.handleLoginChange();
			});
		}
	}

	render () {
		const { Component, pageProps, apolloClient, router } = this.props;
		/*
		Passes the router down to the component so it can be read for queries.
		May ultimately want to do this via withRouter: https://github.com/zeit/next-codemod#url-to-withrouter
		*/

		pageProps.router = router;

		return (
			<Container>
				<ApolloProvider client={apolloClient}>
					<AuthContext.Provider value={{
						auth: Auth,
						isAuthenticated: this.state.isAuthenticated,
						isLoggedIn: this.state.isLoggedIn,
						handleLoginChange: this.handleLoginChange
					}}
					>
						<Component
							{...pageProps}
						/>
					</AuthContext.Provider>
				</ApolloProvider>
			</Container>
		);
	}
}

export default withApollo(MyApp);
