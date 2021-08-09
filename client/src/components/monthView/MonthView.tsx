import React, { useEffect, useState } from 'react';
import "./monthView.scss";
import { Balance } from '../balance/Balance';
import { Doughnut } from '../doughnut/Doughnut';
import { moneyFlowTypes } from '../../resources/scripts/helpers';

interface MonthViewProps {
	date: Date
}

const MonthView = (props: MonthViewProps) => {
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

		if (props.date) {
			fetch(`/budgetData?type=${moneyFlowTypes.variableCosts}&date=${props.date.toISOString()}&interval=month`)
				.then((res) => res.json())
				.then((data) => setVariableCosts(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.variableIncomes}&date=${props.date.toISOString()}&interval=month`)
				.then((res) => res.json())
				.then((data) => setVariableIncomes(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.fixedIncomes}&date=${props.date.toISOString()}&interval=month`)
				.then((res) => res.json())
				.then((data) => setFixedIncomes(data))
				.catch(e => console.error("fetch error: ", e));
			
			fetch(`/budgetData?type=${moneyFlowTypes.fixedCosts}&date=${props.date.toISOString()}&interval=month`)
				.then((res) => res.json())
				.then((data) => setFixedCosts(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.savings}&date=${props.date.toISOString()}&interval=month`)
				.then((res) => res.json())
				.then((data) => setSavings(data))
				.catch(e => console.error("fetch error: ", e));
		}
	}, [props.date]);

	return (
		<div className="monthView">
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