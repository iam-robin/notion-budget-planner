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

			console.log('start: ', startMonth, ' – end: ', endMonth);

			for (let month = 0; month <= 11; month++) {
				if (month >= startMonth && month <= endMonth) {
					costsByMonth[month] += costs.amount;
				}
			}
		});

		return costsByMonth;
	};

	
	useEffect(() => {
		const gradientGreen = chartRef.current?.getContext('2d')?.createLinearGradient(0, 25, 0, 300);
		gradientGreen?.addColorStop(0, gradientColors.green.half);
		gradientGreen?.addColorStop(0.35, gradientColors.green.quarter);
		gradientGreen?.addColorStop(1, gradientColors.green.zero);
	
		const gradientRed = chartRef.current?.getContext('2d')?.createLinearGradient(0, 25, 0, 300);
		gradientRed?.addColorStop(0, gradientColors.red.half);
		gradientRed?.addColorStop(0.35, gradientColors.red.quarter);
		gradientRed?.addColorStop(1, gradientColors.red.zero);
		
		if (chart) chart.destroy();
		setChart(new Chart(chartRef.current, {
			type: 'line',
			data: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				datasets: [{
						fill: true,
						label: 'costs',
						cubicInterpolationMode: 'monotone',
						data: getCostsByMonth(),
						borderWidth: 1,
						borderColor: gradientColors.red.default,
						pointBackgroundColor: gradientColors.red.default,
						backgroundColor: gradientRed,
					},
					{
						fill: true,
						label: 'income',
						cubicInterpolationMode: 'monotone',
						data: getIncomesByMonths(),
						borderWidth: 1,
						borderColor: gradientColors.green.default,
						pointBackgroundColor: gradientColors.green.default,
						backgroundColor: gradientGreen,
				}]
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
			<div className="annualGraph__chart">
				<canvas ref={chartRef}></canvas>
			</div>
		</div>
	)
};

export { AnnualGraph }