const express = require('express');
const getBudgetData = require('./notion');

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

app.get('/budgetData', async (req, res) => {
	const options = {
		type: req.query.type,
		date: req.query.date,
		interval: req.query.interval
	}
	
	const data = await getBudgetData(options);
	res.json(data);
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
