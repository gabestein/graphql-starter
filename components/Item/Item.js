/* eslint jsx-a11y/anchor-is-valid: 0 */

import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import './item.scss';

const propTypes = {
	data: PropTypes.object.isRequired
};

const defaultProps = {
};

const Item = ({ data }) => {
	if (data.loading) {
		return (<div>Loading...</div>);
	}
	if (data.error) {
		return (<div>Error...</div>);
	}

	const item = data.items[0];

	return (
		<div className="item" key={item.id}>
			<ul>
				<li>Name: {item.name}</li>
				<li>Description: {item.description}</li>
				<li>User: {item.user_id}</li>
				<li>Created at: {item.created_at}</li>
			</ul>
			{ /* <button type="button" onClick={(e) => handleDelete(item.id, e)}>Delete</button> */ }
		</div>
	);
};

const items = gql`
	query items($id: ID!) {
		items(where: { id: { _eq: $id } }) {
			id
			user_id
			created_at
			name
			description
		}
	}
`;

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default graphql(items, {
	options: (ownProps) => {
		const id = ownProps.id;
		return {
			variables: {
				id: id
			},
			context: {
				headers: {
				}
			}
		};
	}
})(Item);
