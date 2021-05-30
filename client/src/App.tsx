import React from "react";
import "./app.scss";
import { MonthView } from "./components/monthView/MonthView";
import { YearView } from "./components/yearView/YearView";

function App() {
	return (
		<div className="content">
			<MonthView />
			<YearView />
		</div>
	);
}

export default App;