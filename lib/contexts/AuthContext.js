import React from 'react';
import auth from '../Auth';

export const Auth = auth;

export const AuthContext = React.createContext({
	Auth: Auth,
	isLoggedIn: false,
	isAuthenticated: false,
	handleLoginChange: () => {}
});
