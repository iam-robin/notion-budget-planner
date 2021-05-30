const dotenv = require('dotenv').config();
const {Client} = require('@notionhq/client');

const notion = new Client({
	auth: process.env.NOTION_TOKEN
});

const database_id = process.env.NOTION_DATABASE_ID;

module.exports = async function getBudgetData(options) {

	const moneyFlowTypes = {
		variableCosts: "Variable Kosten",
		fixedCosts: "Fixkosten",
		variableIncomes: "Variables Einkommen",
		fixedIncomes: "Fixes Einkommen",
		savings: "Sparen"
	}

	const date = new Date(options.date);
	let intervalStart;
	let intervalEnd;

	if (options.interval === 'month') {
		intervalStart = new Date(date.getFullYear(), date.getMonth(), 2);
		intervalEnd = new Date(date.getFullYear(), date.getMonth() + 1, 1);
	} else if (options.interval === 'year') {
		intervalStart = new Date(date.getFullYear(), 0, 2);
		intervalEnd = new Date(date.getFullYear(), 11, 32);
	}

	let body;
	if (options.type === moneyFlowTypes.variableCosts || options.type === moneyFlowTypes.variableIncomes) {
		body = {
			filter: {
				"and": [
					{
						"property": "type",
						"select": {
							"equals": options.type
						}
					},
					{
						"property": "date",
						"date": {
							"on_or_after": intervalStart.toISOString()
						}
					},
					{
						"property": "date",
						"date": {
							"on_or_before": intervalEnd.toISOString()
						}
					}
				]
			},
			sorts: [
				{
				  "property": "date",
				  "direction": "ascending"
				}
			]
		};
	} else if (options.type === moneyFlowTypes.fixedIncomes || options.type === moneyFlowTypes.fixedCosts || options.type === moneyFlowTypes.savings) {
		body = {
			filter: {
				and: [
					{
						"property": "type",
						"select": {
							"equals": options.type
						}
					},
					{
						"property": "start",
						"date": {
							"on_or_before": intervalEnd.toISOString()
						}
					},
					{
						or: [
							{
								"property": "end",
								"date": {
									"on_or_after": intervalStart.toISOString()
								}
							},
							{
								"property": "end",
								"date": {
									"is_empty": true
								}
							},
						]
					},
				]
			}
		}
	}
	
	const payload = {
		path: `databases/${database_id}/query`,
		method: 'POST',
		body: body
	};

	const results = await getResults(payload, []);

	const structuredData = results.map(page => {
		return {
			type: page.properties.type?.select.name,
			name: page.properties.name?.title[0].text.content,
			amount: page.properties.amount?.number,
			category: {
				name: page.properties.category?.multi_select[0]?.name,
				color: page.properties.category?.multi_select[0]?.color
			},
			date: {
				start: page.properties.date?.date.start ? page.properties.date?.date.start : page.properties.start?.date.start,
				end: page.properties.end?.date.start
			},
			area: page.properties.area?.select.name,
			cancelDate: page.properties.cancel_on?.date.start
		}
	});

	return structuredData;
};

async function getResults(payload, results) {
	const newPayload = payload;
	const responseData = await notion.request(payload);
	results.push(...responseData.results);
	
	if (responseData.has_more) {
		newPayload.body.start_cursor = responseData.next_cursor;
		return getResults(newPayload, results);
	} else {
		return results;
	}
}