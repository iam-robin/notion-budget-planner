export const formatter = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'EUR'
});

export const moneyFlowTypes = {
	variableExpenses: "Variable Kosten",
	fixedExpenses: "Fixkosten",
	variableIncomes: "Variables Einkommen",
	fixedIncomes: "Fixes Einkommen",
	savings: "Sparen"
}