import React, { useEffect, useState } from "react";
import "./app.scss";
import { DateSelect } from "./components/dateSelect/DateSelect";
import { MonthView } from "./components/monthView/MonthView";
import { Navigation, navigationTabType } from "./components/navigation/Navigation";
import { YearView } from "./components/yearView/YearView";

function App() {
	const defaultTab: navigationTabType = "month"; 
	const [activeTab, setActiveTab] = useState<navigationTabType>(defaultTab);
	const [date, setDate] = useState<Date>(new Date());

	const getContent = () => {
		if (activeTab === 'month') {
			return <MonthView date={date} />
		} else if (activeTab === 'year') {
			return <YearView date={date} />
		}
	};

	return (
		<div className="content">
			<div className="content__header">
				<Navigation
					defaultTab={defaultTab}
					activeTabChanged={(tab: navigationTabType) => setActiveTab(tab)}
				/>
				<DateSelect 
					handleDateChange={(newDate: any) => setDate(newDate)}
					type={activeTab}
				/>
			</div>
			{getContent()}
		</div>
	);
}

export default App;