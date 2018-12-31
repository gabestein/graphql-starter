import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Login from '../Login/Login';
import { AuthContext } from '../../lib/contexts/AuthContext';

import './layout.scss';

const propTypes = {
	title: PropTypes.string,
	children: PropTypes.object.isRequired,
	public: PropTypes.bool
};

const defaultProps = {
	title: 'Welcome',
	public: false
};


const Layout = (props) => {
	return (
		<div>
			<Head>
				<title>{props.title} | GraphQL Starter</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link href="https://unpkg.com/@blueprintjs/core@^3.0.0/lib/css/blueprint.css" rel="stylesheet" />
				<link href="https://unpkg.com/@blueprintjs/icons@^3.0.0/lib/css/blueprint-icons.css" rel="stylesheet" />
			</Head>
			<div className="layout">
				<Header />
				<div className="container">
					<AuthContext.Consumer>
						{({ isAuthenticated }) => (
							(isAuthenticated || props.public) ?
								props.children
								:
								<Login />
						)}
					</AuthContext.Consumer>
				</div>
			</div>
		</div>
	);
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
