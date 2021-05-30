export const formatter = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'EUR'
});

export const moneyFlowTypes = {
	variableCosts: "Variable Kosten",
	fixedCosts: "Fixkosten",
	variableIncomes: "Variables Einkommen",
	fixedIncomes: "Fixes Einkommen",
	savings: "Sparen"
}

export const getVariableCostsSortedByCategory = (variableCosts) => {
	const variableCostsCopy = [...variableCosts];
	const categories = [];
	variableCostsCopy.forEach((entry) => {
		const index = categories.findIndex((x) => x.name === entry.category.name);

		if (index === -1) {
			const dataEntry = {
				name: entry.category.name,
				amount: entry.amount,
				color: entry.category.color
			}
			categories.push(dataEntry);
		} else {
			categories[index].amount += entry.amount;
		}
	});

	categories.sort((a, b) => (a.amount < b.amount) ? 1 : -1);
	return categories;
}

