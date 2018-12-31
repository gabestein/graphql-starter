/* eslint jsx-a11y/anchor-is-valid: 0 */

import PropTypes from 'prop-types';

import './item.scss';

const propTypes = {
	item: PropTypes.object.isRequired,
	handleDelete: PropTypes.func.isRequired
};

const defaultProps = {
};

const Item = ({ item, handleDelete }) => (
	<div className="item" key={item.id}>
		<ul>
			<li>Name: {item.name}</li>
			<li>Description: {item.description}</li>
			<li>User: {item.user_id}</li>
			<li>Created at: {item.created_at}</li>
			<button type="button" onClick={(e) => handleDelete(item.id, e)}>Delete</button>
		</ul>
	</div>
);

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default Item;
