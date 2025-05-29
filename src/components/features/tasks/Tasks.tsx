import React, { useEffect } from 'react';

import TaskItem from '@/components/features/tasks/components/TaskItem';
import TaskListItem from '@/components/features/tasks/components/TaskListItem';
import EmptyTask from '@/components/features/tasks/components/EmptyTask';

import { useAtomValue, useSetAtom } from 'jotai';
import { nowAtom, filteredTaskAtom } from '@/lib/jotai';

const Tasks = () => {
	const taskListData = useAtomValue(filteredTaskAtom);

	const getBgColor = (index: number): string => {
		const colors = [
			'bg-red-500',
			'bg-blue-500',
			'bg-green-500',
			'bg-yellow-500',
			'bg-indigo-500',
			'bg-pink-500',
			'bg-purple-500',
			'bg-teal-500',
			'bg-orange-500',
			'bg-emerald-500',
		];

		const colorIndex = index % colors.length;
		return colors[colorIndex];
	};

	const setNow = useSetAtom(nowAtom);

	useEffect(() => {
		const interval = setInterval(() => {
			setNow(new Date()); // trigger perubahan setiap menit/detik
		}, 60000); // per menit
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		console.info(taskListData);
	}, [taskListData]);

	return (
		<section className="mb-10">
			<h2 className="text-xl md:text-2xl font-bold mb-4">Tugas</h2>
			<TaskListItem>
				{taskListData && taskListData.length > 0 ? (
					taskListData.map((task, index) => (
						<TaskItem
							key={task.id}
							id={task.id}
							className={`${getBgColor(index)} text-white`}
						/>
					))
				) : (
					<EmptyTask />
				)}
			</TaskListItem>
		</section>
	);
};

export default Tasks;
