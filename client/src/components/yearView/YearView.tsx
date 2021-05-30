import React, { useEffect, useState } from 'react';
import { moneyFlowTypes } from '../../resources/scripts/helpers';
import { CategoriesAverage } from '../categoriesAverage/CategoriesAverage';
import { DateSelect } from '../dateSelect/DateSelect';
import './yearView.scss';

const YearView = () => {
	const [year, setYear] = useState<any>();
	const [variableCosts, setVariableCosts] = useState<any>();
	const [variableIncomes, setVariableIncomes] = useState<any>();
	const [fixedCosts, setFixedCosts] = useState<any>();
	const [fixedIncomes, setFixedIncomes] = useState<any>();
	const [savings, setSavings] = useState<any>();

	useEffect(() => {
		setVariableCosts(null);
		setVariableIncomes(null);
		setFixedCosts(null);
		setFixedIncomes(null);
		setSavings(null);
		
		if (year) {
			fetch(`/budgetData?type=${moneyFlowTypes.variableCosts}&date=${year.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setVariableCosts(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.variableIncomes}&date=${year.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setVariableIncomes(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.fixedIncomes}&date=${year.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setFixedIncomes(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.fixedCosts}&date=${year.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setFixedCosts(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.savings}&date=${year.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setSavings(data))
				.catch(e => console.error("fetch error: ", e));
		}
	}, [year]);
	
	return (
		<div className="yearView">
			<div className="yearView__header">
				<h2>Year View</h2>
				<DateSelect 
					handleDateChange={(newDate: any) => setYear(newDate)} 
					type="year"
				/>
			</div>
			<div className="yearView__boxes">
				{variableCosts &&
					<CategoriesAverage variableCosts={variableCosts} />
				}
			</div>
		</div>
	)
};

export { YearView }