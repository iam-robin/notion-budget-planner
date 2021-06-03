import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import './navigation.scss';

interface NavigationProps {
	defaultTab: navigationTabType,
	activeTabChanged: Function
}

export type navigationTabType = 'month' | 'year';

const Navigation = (props: NavigationProps) => {
	const [activeTab, setActiveTab] = useState<navigationTabType>(props.defaultTab);

	useEffect(() => {
		props.activeTabChanged(activeTab);
	}, [activeTab])

	return (
		<div className="navigation">
			<h2
				onClick={() => setActiveTab('month')}
				className={clsx('navigation__tab', {
					'navigation__tab--active': activeTab === 'month'
				})}
			>
				Month
			</h2>
			<h2
				onClick={() => setActiveTab('year')}
				className={clsx('navigation__tab', {
					'navigation__tab--active': activeTab === 'year'
				})}
			>
				Year
			</h2>
		</div>
	)
};

export { Navigation }