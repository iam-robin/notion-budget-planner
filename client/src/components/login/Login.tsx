import React from 'react';
import './login.scss';
import { ReactComponent as NodgetLogo } from '../../resources/icons/nodget-logo.svg';
import { Button } from '../button/Button';

const Login = () => {
	
	const getAuthUrl = () => {
		const oAuthClientId = '8ea80354-4594-4c11-b860-6a1dde31b53f';
		const redirectUrl = encodeURIComponent('http://localhost:3000/');
		return `https://api.notion.com/v1/oauth/authorize?client_id=${oAuthClientId}&redirect_uri=${redirectUrl}&response_type=code`;
	}

	return (
		<div className="login">
			<div className="login__content">
				<NodgetLogo className="login__logo" />
				<p className="login__subline">Notion Budget Planner</p>
				<Button 
					text="Connect with Notion"
					icon="notionLogo"
					link={getAuthUrl()}
				/>
			</div>
		</div>
	)
};

export { Login }