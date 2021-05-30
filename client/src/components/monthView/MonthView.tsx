import React, { useEffect, useState } from 'react';
import "./monthView.scss";
import { Balance } from '../balance/Balance';
import { DateSelect } from '../dateSelect/DateSelect';
import { Doughnut } from '../doughnut/Doughnut';
import { moneyFlowTypes } from '../../resources/scripts/helpers';

const MonthView = () => {
	const [variableCosts, setVariableCosts] = useState<any>();
	const [variableIncomes, setVariableIncomes] = useState<any>();
	const [fixedCosts, setFixedCosts] = useState<any>();
	const [fixedIncomes, setFixedIncomes] = useState<any>();
	const [savings, setSavings] = useState<any>();
	const [date, setDate] = useState<any>();

	useEffect(() => {
		setVariableCosts(null);
		setVariableIncomes(null);
		setFixedCosts(null);
		setFixedIncomes(null);
		setSavings(null);

		if (date) {
			fetch(`/budgetData?type=${moneyFlowTypes.variableCosts}&date=${date.toISOString()}&interval=month`)
				.then((res) => res.json())
				.then((data) => setVariableCosts(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.variableIncomes}&date=${date.toISOString()}&interval=month`)
				.then((res) => res.json())
				.then((data) => setVariableIncomes(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.fixedIncomes}&date=${date.toISOString()}&interval=month`)
				.then((res) => res.json())
				.then((data) => setFixedIncomes(data))
				.catch(e => console.error("fetch error: ", e));
			
			fetch(`/budgetData?type=${moneyFlowTypes.fixedCosts}&date=${date.toISOString()}&interval=month`)
				.then((res) => res.json())
				.then((data) => setFixedCosts(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.savings}&date=${date.toISOString()}&interval=month`)
				.then((res) => res.json())
				.then((data) => setSavings(data))
				.catch(e => console.error("fetch error: ", e));
		}
	}, [date]);

	return (
		<div className="monthView">
			<div className="monthView__header">
				<h2>Month View</h2>
				<DateSelect 
					handleDateChange={(newDate: any) => setDate(newDate)}
					type="month"
				/>
			</div>
			{
				variableCosts &&
				variableIncomes &&
				fixedCosts &&
				fixedIncomes &&
				savings ?
				<div className="monthView__boxes">
					<Balance 
						variableCosts={variableCosts} 
						variableIncomes={variableIncomes}
						fixedCosts={fixedCosts}
						fixedIncomes={fixedIncomes}
						savings={savings}
					/>
					<Doughnut 
						variableCosts={variableCosts} 
						variableIncomes={variableIncomes}
						fixedCosts={fixedCosts}
						fixedIncomes={fixedIncomes}
						savings={savings}
					/>
				</div>
			:
				<div className="monthView__boxes">
					<div className="monthView__skeleton">
						<div className="skeleton--shimmer"></div>
					</div>
					<div className="monthView__skeleton">
						<div className="skeleton--shimmer"></div>
					</div>
				</div>
			}
		</div>
	)
};

export { MonthView }