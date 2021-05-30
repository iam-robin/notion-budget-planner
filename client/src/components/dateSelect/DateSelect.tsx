import React from 'react';
import { useEffect, useState } from 'react';
import './dateSelect.scss';
import clsx from 'clsx';
import { ReactComponent as ArrowLeftIcon } from '../../resources/icons/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '../../resources/icons/arrow-right.svg';

interface DateSelectProps {
	handleDateChange: Function,
	type: 'month' | 'year'
}

const DateSelect = (props: DateSelectProps) => {
	const [date, setDate] = useState(new Date());
	const [isNextMonthDisabled, setIsNextMonthDisabled] = useState(true);

	useEffect(() => {
		const currentDate = new Date();
		const firstOfCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
		const firstOfSelectedDate = new Date(date.getFullYear(), date.getMonth(), 1);
		setIsNextMonthDisabled(firstOfCurrentDate <= firstOfSelectedDate ? true : false);

		props.handleDateChange(date);
	}, [date, props]);

	const getFormatedDate = () => {
		const month = date.toLocaleString('en', { month: 'long' });
		const year = date.getFullYear();
		const formatedDate = props.type === 'month' ? `${month} ${year}` : `${year}`;
		return formatedDate;
	};

	const handleArrowLeftClick = () => {
		if (props.type === 'month') {
			const firstOfMonth = new Date(date.setDate(1));
			const prevMonth = firstOfMonth.setMonth(firstOfMonth.getMonth()-1);
			setDate(new Date(prevMonth));
		} else if (props.type === 'year') {
			const prevYear = date.setFullYear(date.getFullYear()-1);
			setDate(new Date(prevYear));
		}
	};

	const handleArrowRightClick = () => {
		if (!isNextMonthDisabled) {
			if (props.type === 'month') {
				const firstOfMonth = new Date(date.setDate(1));
				const nextMonth = firstOfMonth.setMonth(firstOfMonth.getMonth()+1);
				setDate(new Date(nextMonth));
			} else if (props.type === 'year') {
				const prevYear = date.setFullYear(date.getFullYear()+1);
				setDate(new Date(prevYear));
			}
		}
	};

	return (
		<div className="dateSelect">
			<span 
				className="dateSelect__arrow dateSelect__arrow--left"
				onClick={handleArrowLeftClick}
			>
				<ArrowLeftIcon />
			</span>
			<span className="dateSelect__date">{getFormatedDate()}</span>
			<span
				className={clsx('dateSelect__arrow dateSelect__arrow--right', {
					'dateSelect__arrow--disabled': isNextMonthDisabled
				})}
				onClick={handleArrowRightClick}
			>
				<ArrowRightIcon />
			</span>
		</div>
	)
};

export { DateSelect }