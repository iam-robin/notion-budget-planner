import React, { useEffect, useState } from 'react';
import { formatter, getVariableCostsSortedByCategory } from '../../resources/scripts/helpers';
import { CategoriesList } from '../categoriesList/CategoriesList';
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

type TagType = 'Total' | 'Monthly average';

const CategoriesAverage = (props: CategoriesAverageProps) => {
	const [categories, setCategories] = useState<any>();
	const [amountOfMonths, setAmountOfMonths] = useState<number>(1);
	const [activeTag, setActiveTag] = useState<TagType>();

	useEffect(() => {
		setCategories(getVariableCostsSortedByCategory(props.variableCosts));
	}, [props.variableCosts]);
	
	useEffect(() => {
		if (activeTag === 'Total') {
			setAmountOfMonths(1);
		} else if (activeTag === 'Monthly average') {
			const dateOfFirstEntry = new Date(props.variableCosts[0]?.date.start);
			const dateOfLastEntry = new Date(props.variableCosts[props.variableCosts.length - 1]?.date.start);
			setAmountOfMonths(differenceInMonth(dateOfFirstEntry, dateOfLastEntry));
		}
	}, [activeTag])

	return (
		<div className="categoriesAverage">
			<TagSelect 
				tags={['Monthly average', 'Total']}
				activeIndex={0}
				activeTagChanged={(tag: TagType) => setActiveTag(tag)}
			/>
			<CategoriesList categories={categories} amountOfMonths={amountOfMonths}/>
		</div>
	)
};

const differenceInMonth = (dt2: Date, dt1: Date) => {
	let diff =(dt2.getTime() - dt1.getTime()) / 1000;
	diff /= (60 * 60 * 24 * 7 * 4);
	return Math.abs(Math.round(diff));
}

export { CategoriesAverage }