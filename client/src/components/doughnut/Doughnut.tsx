import React, { useEffect, useRef, useState } from 'react';
import { formatter, getVariableCostsSortedByCategory } from '../../resources/scripts/helpers';
import './doughnut.scss';
import Chart from 'chart.js/auto';
import { TagSelect } from '../tagSelect/TagSelect';

interface DoughnutProps {
	variableCosts: any,
	variableIncomes: any,
	fixedCosts: any,
	fixedIncomes: any,
	savings: any
}

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

type MoneyFlowType = 'Variable costs' | 'Fixed costs' | 'Variable incomes' | 'Fixed incomes';

const Doughnut = (props: DoughnutProps) => {
	const chartRef = useRef<HTMLCanvasElement>(null);
	const [ compositionData, setCompositionData] = useState<any>([]);
	const [ chart, setChart] = useState<any>();
	const [ activeMoneyFlowType, setActiveMoneyFlowType ] = useState<MoneyFlowType>();

	
	useEffect(() => {
		if (activeMoneyFlowType === 'Variable costs') {
			setCompositionData(getVariableCostsSortedByCategory(props.variableCosts));
		} else if (activeMoneyFlowType === 'Fixed costs') {
			setCompositionData(getStructuredChartDataOf(props.fixedCosts));
		} else if (activeMoneyFlowType === 'Variable incomes') {
			setCompositionData(getStructuredChartDataOf(props.variableIncomes));
		} else if (activeMoneyFlowType === 'Fixed incomes') {
			setCompositionData(getStructuredChartDataOf(props.fixedIncomes));
		}
	}, [activeMoneyFlowType]);

	useEffect(() => {
		if (chart) chart.destroy();
		setChart(new Chart(chartRef.current, {
			type: 'doughnut',
			data: {
				labels: getCompositionDataValuesByKey('name'),
				datasets: [{
					data: getCompositionDataValuesByKey('amount'),
					backgroundColor: getHexValueForColorName(),
					borderWidth: 0
				}]
			},
			options: {
				maintainAspectRatio : false,
				plugins: {
					legend: {
						display: false
					}
				},
			}
		}));
	}, [compositionData])

	const getStructuredChartDataOf = (apiData: any) => {
		const fixedIncomes = [... apiData];
		let data: any = [];
		fixedIncomes.forEach((entry: any, index: number) => {
			const dataEntry = {
				name: entry.name,
				amount: entry.amount
			}
			data.push(dataEntry);
		});
		data.sort((a: any, b: any) => (a.amount < b.amount) ? 1 : -1);
		data.forEach((entry: any, index: number) => {
			entry.color = Object.keys(colors)[index];
		});
		const maxEntries = 8;
		if (data.length > maxEntries) {
			const rest = {
				name: 'Others',
				amount: 0,
				color: 'default'
			}
			data = data.filter((entry: any, index: number) => {
				if (index >= maxEntries) {
					rest.amount += entry.amount;
				}
				return index < maxEntries;
			});
			data.push(rest);
		}

		return data;
	};

	const getCompositionDataValuesByKey = (key: string) => {
		const values: any = [];
		compositionData.forEach((data: any) => values.push(data[key]));
		return values;
	};

	const getHexValueForColorName = () => {
		const colorsNames = getCompositionDataValuesByKey('color');
		const colorsHex = colorsNames.map((name : string) => colors[name]);
		return colorsHex;
	};

	const getCustomLegend = compositionData.map((data: any, index: number) => {
		return (
			<li className="doughnut__legendItem" key={index}>
				<span className="doughnut__legendColor" style={{backgroundColor: colors[data.color]}}></span>
				<span className="doughnut__legendName">{data.name}</span>
				<span className="doughnut__legendAmount">– {formatter.format(data.amount)}</span>
			</li>
		);
	});

	return (
		<div className="doughnut">
			<div className="doughnut__selectWrapper">
				<TagSelect 
					tags={['Variable costs', 'Fixed costs', 'Variable incomes', 'Fixed incomes']}
					activeIndex={0} 
					activeTagChanged={(tag: MoneyFlowType) => setActiveMoneyFlowType(tag)}
				/>
			</div>
			<div className="doughnut__chartWrapper">
				<div className="doughnut__chart">
					<canvas ref={chartRef}></canvas>
				</div>
				<ul className="doughnut__legend">
					{ getCustomLegend }
				</ul>
			</div>
		</div>
	)
};

export { Doughnut }