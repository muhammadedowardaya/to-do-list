import { filteredTaskAtom, taskFilterSelectedAtom } from '@/lib/jotai';
import { useAtomValue } from 'jotai';
import React, { useEffect } from 'react';

const TaskSummary = () => {
	const tasks = useAtomValue(filteredTaskAtom);

	const [taskCount, setTaskCount] = React.useState(0);
	const taskFilterSelected = useAtomValue(taskFilterSelectedAtom);

	useEffect(() => {
		if (taskFilterSelected === 'unDone' || taskFilterSelected === 'all') {
			setTaskCount(
				tasks.filter((task) => !task.isDone && !task.outOfDate).length
			);
		} else if (taskFilterSelected === 'done') {
			setTaskCount(tasks.filter((task) => task.isDone).length);
		} else if (taskFilterSelected === 'outOfDate') {
			setTaskCount(tasks.filter((task) => task.outOfDate).length);
		}
	}, [taskFilterSelected, tasks]);

	if (taskFilterSelected === 'unDone' || taskFilterSelected === 'all') {
		if (taskCount > 0) {
			return (
				<p className="font-extrabold text-3xl md:text-4xl">
					Masih ada <strong className="text-sky-500">{taskCount} tugas</strong>{' '}
					yang menunggu diselesaikan. Yuk, selesaikan sekarang biar bisa santai!
					👍😎
				</p>
			);
		} else {
			return (
				<p className="font-extrabold text-3xl md:text-4xl">
					Kamu belum punya tugas saat ini. Waktunya membuat rencana dan mulai
					bergerak! 📝
				</p>
			);
		}
	} else if (taskFilterSelected === 'done') {
		if (taskCount > 0) {
			return (
				<p className="font-extrabold text-3xl md:text-4xl">
					Kamu memiliki{' '}
					<strong className="text-emerald-500">{taskCount} tugas</strong> yang
					sudah selesai.
				</p>
			);
		} else {
			return (
				<p className="font-extrabold text-3xl md:text-4xl">
					Kamu belum memiliki tugas yang sudah selesai.
				</p>
			);
		}
	} else if (taskFilterSelected === 'outOfDate') {
		if (taskCount > 0) {
			return (
				<p className="font-extrabold text-3xl md:text-4xl">
					Kamu memiliki{' '}
					<strong className="text-red-500">{taskCount} tugas</strong> yang sudah
					kadaluarsa.
				</p>
			);
		} else {
			return (
				<p className="font-extrabold text-3xl md:text-4xl">
					Kamu belum memiliki tugas yang sudah kadaluarsa.
				</p>
			);
		}
	}
};

export default TaskSummary;
