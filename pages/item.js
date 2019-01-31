import PropTypes from 'prop-types';
import Layout from '../components/Layouts/DefaultLayout';
import SingleItem from '../components/Item/Item';

const propTypes = {
	router: PropTypes.object.isRequired,
};

const defaultProps = {
};

function Item({ router }) {
	let id = router.query.id;
	if (typeof window !== 'undefined') {
		id = new URLSearchParams(window.location.search).get('id');
	}
	return (
		<Layout>
			<SingleItem id={id} />
		</Layout>
	);
}

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default Item;
