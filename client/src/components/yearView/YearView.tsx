import React, { useEffect, useState } from 'react';
import { moneyFlowTypes } from '../../resources/scripts/helpers';
import { AnnualGraph } from '../annualGraph/AnnualGraph';
import { CategoriesAverage } from '../categoriesAverage/CategoriesAverage';
import { DateSelect } from '../dateSelect/DateSelect';
import './yearView.scss';

interface YearViewProps {
	date: Date
}

const YearView = (props: YearViewProps) => {
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
			fetch(`/budgetData?type=${moneyFlowTypes.variableCosts}&date=${props.date.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setVariableCosts(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.variableIncomes}&date=${props.date.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setVariableIncomes(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.fixedIncomes}&date=${props.date.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setFixedIncomes(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.fixedCosts}&date=${props.date.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setFixedCosts(data))
				.catch(e => console.error("fetch error: ", e));

			fetch(`/budgetData?type=${moneyFlowTypes.savings}&date=${props.date.toISOString()}&interval=year`)
				.then((res) => res.json())
				.then((data) => setSavings(data))
				.catch(e => console.error("fetch error: ", e));
		}
	}, [props.date]);
	
	return (
		<div className="yearView">
			<div className="yearView__boxes">
				{variableCosts &&
					<CategoriesAverage variableCosts={variableCosts} />
				}
				{variableCosts && fixedCosts && variableIncomes && fixedIncomes && savings &&
					<AnnualGraph
						year={props.date.getFullYear()}
						variableCosts={variableCosts}
						fixedCosts={fixedCosts}
						variableIncomes={variableIncomes}
						fixedIncomes={fixedIncomes}
						savings={savings}
					/>
				}
			</div>
		</div>
	)
};

export { YearView }