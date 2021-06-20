import React, { useEffect, useRef, useState } from 'react';
import './annualGraph.scss';
import Chart from 'chart.js/auto';

interface AnnualGraphProps {
	variableCosts: any,
	fixedCosts: any,
	variableIncomes: any,
	fixedIncomes: any,
	savings: any,
	year: number
};

const gradientColors = {
	green: {
	  default: "RGBA(32, 191, 107, 1.00)",
	  half: "RGBA(32, 191, 107, 0.50)",
	  quarter: "RGBA(32, 191, 107, 0.25)",
	  zero: "RGBA(32, 191, 107, 0)"
	},
	red: {
	  default: "RGBA(235, 59, 90, 1.00)",
	  half: "RGBA(235, 59, 90, 0.5)",
	  quarter: "RGBA(235, 59, 90, 0.25)",
	  zero: "RGBA(235, 59, 90, 0)"
	},
	blue: {
		default: "RGBA(75, 123, 236, 1.00)",
		half: "RGBA(75, 123, 236, 0.5)",
		quarter: "RGBA(75, 123, 236, 0.25)",
		zero: "RGBA(75, 123, 236, 0.00)"
	}
};

const AnnualGraph = (props: AnnualGraphProps) => {
	const [ chart, setChart] = useState<any>();
	const chartRef = useRef<HTMLCanvasElement>(null);

	const getIncomesByMonths = () => {
		const incomesByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		
		props.variableIncomes.forEach((income: any, index: number) => {
			const month = new Date(income.date.start).getMonth();
			incomesByMonth[month] += income.amount;
		});

		props.fixedIncomes.forEach((income: any, index: number) => {
			const startMonth = new Date(income.date.start).getFullYear() < props.year ? 0 : new Date(income.date.start).getMonth();
			const endMonth = new Date(income.date.end).getFullYear() > props.year || !income.date.end ? 11 :  new Date(income.date.end).getMonth();
			
			for (let month = 0; month <= 11; month++) {
				if (month >= startMonth && month <= endMonth) {
					incomesByMonth[month] += income.amount;
				}
			}
		});

		return incomesByMonth;
	};

	const getCostsByMonth = () => {
		const costsByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		props.variableCosts.forEach((costs: any, index: number) => {
			const month = new Date(costs.date.start).getMonth();
			costsByMonth[month] += costs.amount;
		});

		props.fixedCosts.forEach((costs: any) => {
			const startMonth = new Date(costs.date.start).getFullYear() < props.year ? 0 : new Date(costs.date.start).getMonth();
			const endMonth = new Date(costs.date.end).getFullYear() > props.year || !costs.date.end ? 11 :  new Date(costs.date.end).getMonth();

			for (let month = 0; month <= 11; month++) {
				if (month >= startMonth && month <= endMonth) {
					costsByMonth[month] += costs.amount;
				}
			}
		});

		return costsByMonth;
	};

	const getSavingsByMonth = () => {
		const savingsByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		props.savings.forEach((saving: any) => {
			const startMonth = new Date(saving.date.start).getFullYear() < props.year ? 0 : new Date(saving.date.start).getMonth();
			const endMonth = new Date(saving.date.end).getFullYear() > props.year || !saving.date.end ? 11 :  new Date(saving.date.end).getMonth();

			for (let month = 0; month <= 11; month++) {
				if (month >= startMonth && month <= endMonth) {
					savingsByMonth[month] += saving.amount;
				}
			}
		});

		return savingsByMonth;
	}
	
	useEffect(() => {
		const gradientGreen = chartRef.current?.getContext('2d')?.createLinearGradient(0, 25, 0, 300);
		gradientGreen?.addColorStop(0, gradientColors.green.half);
		gradientGreen?.addColorStop(0.35, gradientColors.green.quarter);
		gradientGreen?.addColorStop(1, gradientColors.green.zero);
	
		const gradientRed = chartRef.current?.getContext('2d')?.createLinearGradient(0, 25, 0, 350);
		gradientRed?.addColorStop(0, gradientColors.red.half);
		gradientRed?.addColorStop(0.35, gradientColors.red.quarter);
		gradientRed?.addColorStop(1, gradientColors.red.zero);
		
		const gradientBlue = chartRef.current?.getContext('2d')?.createLinearGradient(0, 25, 0, 500);
		gradientBlue?.addColorStop(0, gradientColors.blue.half);
		gradientBlue?.addColorStop(0.35, gradientColors.blue.quarter);
		gradientBlue?.addColorStop(1, gradientColors.blue.zero);
		
		if (chart) chart.destroy();
		setChart(new Chart(chartRef.current, {
			type: 'line',
			data: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				datasets: [{
						fill: true,
						label: 'Costs',
						cubicInterpolationMode: 'monotone',
						data: getCostsByMonth(),
						borderWidth: 1,
						borderColor: gradientColors.red.default,
						pointBackgroundColor: gradientColors.red.default,
						backgroundColor: gradientRed,
					},
					{
						fill: true,
						label: 'Income',
						cubicInterpolationMode: 'monotone',
						data: getIncomesByMonths(),
						borderWidth: 1,
						borderColor: gradientColors.green.default,
						pointBackgroundColor: gradientColors.green.default,
						backgroundColor: gradientGreen,
					},
					{
						fill: true,
						label: 'Savings Rate',
						cubicInterpolationMode: 'monotone',
						data: getSavingsByMonth(),
						borderWidth: 1,
						borderColor: gradientColors.blue.default,
						pointBackgroundColor: gradientColors.blue.default,
						backgroundColor: gradientBlue,
					},
				]
			},
			options: {
				plugins: {
					legend: {
						display: false
					}
				},
				scales: {
					y: {
						suggestedMin: 0,
						ticks: {
							callback: function(value: any, index: any, values: any) {
								return value + ' €';
							}
						}
					}
				}
			}
		}));
	}, []);
	

	return (
		<div className="annualGraph">
			<ul className="annualGraph__legend">
				{(props.fixedIncomes || props.variableIncomes) && <li className="annualGraph__legendItem annualGraph__legendItem--income">Income</li>}
				{(props.fixedCosts || props.variableCosts) && <li className="annualGraph__legendItem annualGraph__legendItem--costs">Costs</li>}
				{props.savings && <li className="annualGraph__legendItem annualGraph__legendItem--savings">Savings Rate</li>}
			</ul>
			<div className="annualGraph__chart">
				<canvas ref={chartRef}></canvas>
			</div>
		</div>
	)
};

export { AnnualGraph }