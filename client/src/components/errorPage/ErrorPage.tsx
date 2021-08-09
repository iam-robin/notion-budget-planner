import React from 'react';
import './errorPage.scss';
import { ReactComponent as ErrorTypo } from '../../resources/icons/error.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../button/Button';

const ErrorPage = () => {
	const location = useLocation();
	const errorType: string = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
	const history = useHistory();
	const handleClick = () => history.push('/');

	console.log(errorType);

	const getSublineContent = () => {
		if (errorType === 'noDatabase') {
			return <span>Could not find Nudget database in Notion<br/>Please make sure that the database exists</span>;
		} else {
			return <span>Something went wrong<br/>Please try again</span>;
		}
	};

	return (
		<div className="errorPage">
			<div className="errorPage__content">
				<ErrorTypo className="errorPage__logo" />
				<p className="errorPage__subline">
					{ getSublineContent() }
				</p>
				<Button text="Back" icon="arrowLeft" handleClick={handleClick}/>
			</div>
		</div>
	)
};

export { ErrorPage }