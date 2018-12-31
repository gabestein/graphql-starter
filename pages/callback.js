import React from 'react';
import Layout from '../components/Layouts/DefaultLayout';
import { redirect } from '../lib/utilities';
import { AuthContext } from '../lib/contexts/AuthContext';


class Callback extends React.Component {
	componentDidMount() {
		if (process.browser) {
			this.context.auth.handleAuthentication().then(() => {
				this.context.handleLoginChange();
				redirect({}, '/');
			}).catch(err => (console.warn(err)));
		}
	}

	render() {
		return (
			<Layout title="Loading">
				<div>Loading...</div>
			</Layout>
		);
	}
}

Callback.contextType = AuthContext;
export default Callback;
