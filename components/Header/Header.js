/* eslint jsx-a11y/anchor-is-valid: 0 */
import Link from 'next/link';
import Login from '../Login/Login';

import './header.scss';

const Header = () => (
	<div className="container header">
		<h1>GraphQL Starter</h1>
		<Link href="/">
			<a>Home</a>
		</Link>
		<Link href="/about">
			<a>About</a>
		</Link>
		<Login />
	</div>
);

export default Header;
