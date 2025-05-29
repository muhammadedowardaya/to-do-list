import React from 'react';

const TaskListItem = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex gap-4 flex-col overflow-x-auto scrollbar-hide">
			{children}
		</div>
	);
};

export default TaskListItem;
