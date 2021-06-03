import React from 'react';
import { formatter } from '../../resources/scripts/helpers';
import './categoriesList.scss';

interface CategoriesListProps {
	categories: any,
	amountOfMonths: number
};

const colors: any = {
	yellow: '#f7b731',
	red: '#eb3b5a',
	green:'#20bf6b',
	blue: '#4b7bec',
	orange: '#fa8231',
	purple: '#8854d0',
	teal: '#0fb9b1',
	pink: '#FC9EC7',
	brown: '#DABD97',
	default: '#a5b1c2',
}

const CategoriesList = (props: CategoriesListProps) => {

	const getCategoriesList = props.categories?.map((data: any, index: number) => {
		return (
			<li className="categoriesList__item" key={index}>
				<span className="categoriesList__color" style={{backgroundColor: colors[data.color]}}></span>
				<span className="categoriesList__name">{data.name}</span>
				<span className="categoriesList__amount">– {formatter.format(data.amount / props.amountOfMonths)}</span>
			</li>
		);
	});
	
	return (
		<ul className="categoriesList">
			{ getCategoriesList }
		</ul>
	)
};

export { CategoriesList }