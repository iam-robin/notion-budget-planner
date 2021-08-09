import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DateSelect } from "../dateSelect/DateSelect";
import { MonthView } from "../monthView/MonthView";
import { navigationTabType, Navigation } from "../navigation/Navigation";
import { YearView } from "../yearView/YearView";
import "./authenticatedApp.scss";

function AuthenticatedApp() {
	// const history = useHistory();
	// const accessToken = window.localStorage.getItem('access_token');
	// const dataBaseId = window.localStorage.getItem('database_id');
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

	// if (!accessToken || !dataBaseId) {
	// 	history.push('/');
	// 	return (<></>);
	// } else {
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
	// }
}

export default AuthenticatedApp;