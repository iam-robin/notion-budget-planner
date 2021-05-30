import React, { useEffect, useState } from 'react';
import { moneyFlowTypes } from '../../resources/scripts/helpers';
import { DateSelect } from '../dateSelect/DateSelect';
import './yearView.scss';

const YearView = () => {
	const [year, setYear] = useState<any>();
	const [variableExpenses, setVariableExpenses] = useState<any>();
	const [variableIncomes, setVariableIncomes] = useState<any>();
	const [fixedExpenses, setFixedExpenses] = useState<any>();
	const [fixedIncomes, setFixedIncomes] = useState<any>();
	const [savings, setSavings] = useState<any>();

	useEffect(() => {
		setVariableExpenses(null);
		setVariableIncomes(null);
		setFixedExpenses(null);
		setFixedIncomes(null);
		setSavings(null);
		
		if (year) {
			fetch(`/budgetData?type=${moneyFlowTypes.variableExpenses}&date=${year.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setVariableExpenses(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.variableIncomes}&date=${year.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setVariableIncomes(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.fixedIncomes}&date=${year.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setFixedIncomes(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.fixedExpenses}&date=${year.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setFixedExpenses(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.savings}&date=${year.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setSavings(data))
				.catch(e => console.error("fetch error: ", e));
		}
	}, [year]);

	useEffect(() => {
		if (variableExpenses && variableIncomes && fixedIncomes && fixedExpenses && savings) {
			console.log('variable costs', variableExpenses);
			console.log('variable incomes', variableIncomes);
			console.log('fixed incomes', fixedIncomes);
			console.log('fixed costs', fixedExpenses);
			console.log('savings', savings);
		}
	}, [variableExpenses, variableIncomes, fixedIncomes, fixedExpenses, savings]);
	
	return (
		<div className="yearView">
			<div className="yearView__header">
				<h2>Year View</h2>
				<DateSelect 
					handleDateChange={(newDate: any) => setYear(newDate)} 
					type="year"
				/>
			</div>
		</div>
	)
};

export { YearView }