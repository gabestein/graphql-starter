/* eslint jsx-a11y/anchor-is-valid: 0 */

import PropTypes from 'prop-types';
import Link from 'next/link';

import './listItem.scss';

const propTypes = {
	item: PropTypes.object.isRequired,
	handleDelete: PropTypes.func.isRequired
};

const defaultProps = {
};

const ListItem = ({ item, handleDelete }) => (
	<div className="item" key={item.id}>
		<Link href={`/item?id=${item.id}`}><a>View</a></Link>
		<ul>
			<li>Name: {item.name}</li>
			<li>Description: {item.description}</li>
			<li>User: {item.user_id}</li>
			<li>Created at: {item.created_at}</li>
		</ul>
		<button type="button" onClick={(e) => handleDelete(item.id, e)}>Delete</button>
	</div>
);

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;
