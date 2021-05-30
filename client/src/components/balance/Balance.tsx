import React, { useEffect, useState } from 'react';
import { formatter } from '../../resources/scripts/helpers';
import './balance.scss';

interface BalanceProps {
	variableCosts: any,
	variableIncomes: any,
	fixedCosts: any,
	fixedIncomes: any,
	savings: any
}

const Balance = (props: BalanceProps) => {
	const [ variableCostsSum, setVariableCostsSum ] = useState<number>(0);
	const [ fixedCostsSum, setFixedCostsSum ] = useState<number>(0);
	const [ savingsSum, setSavingsSum ] = useState<number>(0);
	const [ variableIncomesSum, setVariableIncomesSum ] = useState<number>(0);
	const [ fixedIncomesSum, setFixedIncomesSum ] = useState<number>(0);

	const [ costsSum, setCostsSum ] = useState<number>(0);
	const [ incomesSum, setIncomesSum ] = useState<number>(0);
	const [ balance, setBalance ] = useState<number>(0);

	useEffect(() => {
		setVariableCostsSum(getRoundedSum(props.variableCosts));
		setFixedCostsSum(getRoundedSum(props.fixedCosts));
		setSavingsSum(getRoundedSum(props.savings));
		setVariableIncomesSum(getRoundedSum(props.variableIncomes));
		setFixedIncomesSum(getRoundedSum(props.fixedIncomes));
	}, [props]);

	useEffect(() => {
		setCostsSum(
			Math.round((variableCostsSum + fixedCostsSum + savingsSum) * 100) / 100
		);
	}, [variableCostsSum, fixedCostsSum, savingsSum]);

	useEffect(() => {
		setIncomesSum(
			Math.round((variableIncomesSum + fixedIncomesSum) * 100) / 100
		);
	}, [variableIncomesSum, fixedIncomesSum]);

	useEffect(() => {
		setBalance(
			Math.round((incomesSum - costsSum) * 100) / 100
		)
	}, [costsSum, incomesSum]);

	const getRoundedSum = (data: any) => {
		let sum: number = 0;
		data?.forEach((entry: any) => {
			sum += entry.amount;
		});
		return Math.round(sum * 100) / 100;
	}

	return (
		<div className="balance">
			<div className="balance__total">
				<h3 className="balance__totalTitle">total balance</h3>
				<div className="balance__totalValue">{formatter.format(balance)}</div>
			</div>
			<ul className="balance__list">
				<li className="balance__listItem">
					<span className="balance__listItemLabel">Variable Costs</span>
					<span className="balance__listItemValue">{formatter.format(variableCostsSum)}</span>
				</li>
				<li className="balance__listItem">
					<span className="balance__listItemLabel">Fixed Costs</span>
					<span className="balance__listItemValue">{formatter.format(fixedCostsSum)}</span>
				</li>
				<li className="balance__listItem">
					<span className="balance__listItemLabel">Savings</span>
					<span className="balance__listItemValue">{formatter.format(savingsSum)}</span>
				</li>
				<li className="balance__listItem">
					<span className="balance__listItemLabel">Costs</span>
					<span className="balance__listItemValue balance__listItemValue--red">{formatter.format(costsSum)}</span>
				</li>
			</ul>
			<ul className="balance__list">
				<li className="balance__listItem">
					<span className="balance__listItemLabel">Variable Incomes</span>
					<span className="balance__listItemValue">{formatter.format(variableIncomesSum)}</span>
				</li>
				<li className="balance__listItem">
					<span className="balance__listItemLabel">Fixed Incomes</span>
					<span className="balance__listItemValue">{formatter.format(fixedIncomesSum)}</span>
				</li>
				<li className="balance__listItem">
					<span className="balance__listItemLabel">Incomes</span>
					<span className="balance__listItemValue  balance__listItemValue--green">{formatter.format(incomesSum)}</span>
				</li>
			</ul>
		</div>
	)
};

export { Balance }