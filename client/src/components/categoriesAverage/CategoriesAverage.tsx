import React, { useEffect, useState } from 'react';
import { formatter, getVariableCostsSortedByCategory } from '../../resources/scripts/helpers';
import { TagSelect } from '../tagSelect/TagSelect';
import './categoriesAverage.scss';

interface CategoriesAverageProps {
	variableCosts: any
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

const CategoriesAverage = (props: CategoriesAverageProps) => {
	const [categories, setCategories] = useState<any>();
	const [amountOfMonths, setAmountOfMonths] = useState<number>(1);
	const [activeTag, setActiveTag] = useState<string>();

	useEffect(() => {
		const dateOfFirstEntry = new Date(props.variableCosts[0]?.date.start);
		const dateOfLastEntry = new Date(props.variableCosts[props.variableCosts.length - 1]?.date.start);
		setCategories(getVariableCostsSortedByCategory(props.variableCosts));
		setAmountOfMonths(differenceInMonth(dateOfFirstEntry, dateOfLastEntry));
	}, [props.variableCosts]);

	const getCategoriesAverage = categories?.map((data: any, index: number) => {
		let amount = data.amount;
		if (activeTag === 'Monthly average') amount /= amountOfMonths;
		return (
			<li className="categoriesAverage__item" key={index}>
				<span className="categoriesAverage__itemColor" style={{backgroundColor: colors[data.color]}}></span>
				<span className="categoriesAverage__itemName">{data.name}</span>
				<span className="categoriesAverage__itemAmount">– {formatter.format(amount)}</span>
			</li>
		);
	});

	return (
		<div className="categoriesAverage">
			<TagSelect 
				tags={['Monthly average', 'Total']}
				activeIndex={0}
				activeTagChanged={(tag: string) => setActiveTag(tag)}
			/>
			<ul>
				{getCategoriesAverage}
			</ul>
		</div>
	)
};

const differenceInMonth = (dt2: Date, dt1: Date) => {
	let diff =(dt2.getTime() - dt1.getTime()) / 1000;
	diff /= (60 * 60 * 24 * 7 * 4);
	return Math.abs(Math.round(diff));
}

export { CategoriesAverage }