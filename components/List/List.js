import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import CreateItem from '../CreateItem/CreateItem';

import './list.scss';

const propTypes = {
	data: PropTypes.object.isRequired,
	mutate: PropTypes.func.isRequired
};

const defaultProps = {
};

class List extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete(itemId, e) {
		e.preventDefault();
		this.props.mutate({
			variables: {
				id: itemId
			}
		});
	}

	render() {
		if (this.props.data.loading) {
			return (<div>Loading...</div>);
		}
		if (this.props.data.error) {
			return (<div>Sorry, an error ocurred. {this.props.data.error.toString()}</div>);
		}
		return (
			<div>
				{this.props.data.items.map((item) => (
					<ListItem item={item} key={item.id} handleDelete={this.handleDelete} />
				))}
				<CreateItem />
			</div>
		);
	}
}

const items = gql`
	query {
		items(order_by: {created_at:asc}) {
			id
			user_id
			created_at
			name
			description
		}
	}
`;

const deleteItem = gql`
	mutation delete_items($id: ID!) {
	delete_items(where: { id: { _eq: $id }}) {
		returning {
			id
			user_id
			created_at
			name
			description
		}
	}
	}
`;

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default compose(
	graphql(items, {
		options: (/* ownProps */) => {
			// get stuff on server: let auth = ownProps.auth;
			if (process.browser) {
				// get stuff on client only
			}
			return {
				context: {
					headers: {
					}
				}
			};
		}
	}),
	graphql(deleteItem, {
		options: {
			refetchQueries: [
				{ query: items }
			]
		}
	})
)(List);
