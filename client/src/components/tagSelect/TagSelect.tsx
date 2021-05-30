import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import './tagSelect.scss';

interface TagSelectInterface {
	tags: string[],
	activeIndex: number,
	activeTagChanged: Function
}

const TagSelect = (props: TagSelectInterface) => {
	const [ activeTag, setActiveTag ] = useState<string>(props.tags[props.activeIndex]);

	useEffect(() => {
		props.activeTagChanged(activeTag);
	}, [activeTag]);

	const getTags = props.tags.map(((tag: string, index: number) => {
		return (
			<span 
				className={clsx('tagSelect__tag', {
					'tagSelect__tag--active': props.tags[index] === activeTag
				})}
				onClick={() => setActiveTag(props.tags[index])}
				key={index}
			>
				{tag}
			</span>
		);
	}));
	
	return (
		<div className="tagSelect">
			{getTags}
		</div>
	)
};

export { TagSelect }