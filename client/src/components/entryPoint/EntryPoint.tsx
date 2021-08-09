import React, { useEffect } from 'react';
import './entryPoint.scss';
import { useHistory } from 'react-router-dom';
import { Base64 } from 'js-base64';
const { Client } = require('@notionhq/client');

const EntryPoint = () => {
	const history = useHistory();
	const DATABASE_NAME = 'BudgetData';

	useEffect(() => {
		const accessToken = window.localStorage.getItem('access_token');
		const dataBaseId = window.localStorage.getItem('database_id');
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const code = urlParams.get('code');

		if (accessToken && dataBaseId) {
			// user already has access
			history.push('/app');
		} else if (code) {
			// new login was successful
			saveTokensInLocalStorage(code);
		} else {
			// user needs to log in
			history.push('/login');
		}
	}, []);

	const saveTokensInLocalStorage = (code) => {
		const data = {
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: 'http://localhost:3000/'
		};

		fetch('https://api.notion.com/v1/oauth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + Base64.encode("8ea80354-4594-4c11-b860-6a1dde31b53f:secret_DD6CGmR0aLylLDG6QKGcVhOlX2X20n2GnOeFdkpUUXh") //TODO: SAVE TOKENS IN SECRETS!!
		},
		body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => {
			console.log('data:', data);
			window.localStorage.setItem('access_token', data.access_token);
			
			const notion = new Client({ auth: data.access_token });
			(async () => {
				const response = await notion.search({
					query: DATABASE_NAME,
					sort: {
						direction: 'ascending',
						timestamp: 'last_edited_time',
					},
					filter: {
						value: 'database',
						property: 'object'
					}
				});
				console.log('database', response);
				if (response.results.length > 0) {
					window.localStorage.setItem('database_id', response.results[0]?.id);
					history.push('/app');
				} else {
					// no database with correct name found
					history.push('/error/noDatabase');
				}
			})();
		})
		.catch((error) => {
			console.error('Error:', error);
			history.push('/error');
		});
	};

	return (
		<div className="entryPoint">
			<div className="entryPoint__loading"></div>
		</div>
	)
};

export { EntryPoint }