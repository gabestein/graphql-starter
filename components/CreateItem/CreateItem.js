/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { InputGroup, Button } from '@blueprintjs/core';

import './createItem.scss';

const propTypes = {
	mutate: PropTypes.func.isRequired
};

const defaultProps = {
};

class CreateItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			submitted: false,
			error: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
	}

	handleAddClick(e) {
		e.preventDefault();
		this.setState({
			submitted: false
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const itemData = {
			name: '',
			description: ''
		};

		const data = new FormData(e.target);
		itemData.name = data.get('name');
		itemData.description = data.get('description');
		this.props.mutate({
			variables: {
				objects: [itemData]
			}
		}).then(() => (
			this.setState({ submitted: true })
		)).catch(() => (
			this.setState({ error: true })
		));
	}

	render() {
		if (this.state.error) {
			return (
				<div>Something went wrong submitting your item.</div>
			);
		}
		if (this.state.submitted) {
			return (
				<div>Item submitted. <button type="button" onClick={this.handleAddClick}>Add another</button></div>
			);
		}
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<InputGroup type="text" defaultValue="" placeholder="Item Name" name="name" />
					<InputGroup type="text" defaultValue="" placeholder="Item description" name="description" />
					<Button type="submit">Add Item</Button>
				</form>
			</div>
		);
	}
}

CreateItem.propTypes = propTypes;
CreateItem.defaultProps = defaultProps;

const createItem = gql`
	mutation insert_items($objects: [items_insert_input!]!) {
	insert_items(objects: $objects) {
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

const items = gql`
	query {
		items (order_by: {created_at:asc}) {
			id
			user_id
			created_at
			name
			description
		}
	}
`;

export default graphql(createItem, {
	options: {
		refetchQueries: [
			{ query: items }
		]
	}
})(CreateItem);
