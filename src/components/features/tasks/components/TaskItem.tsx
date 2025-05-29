import {
	deleteTaskAtom,
	doneTaskAtom,
	getTaskByIdAtom,
	selectedIdAtom,
	showTaskEditModalAtom,
} from '@/lib/jotai';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect, useState } from 'react';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import EditTaskButton from './EditTaskButton';
import OutOfDate from '@/components/ui/out-of-date';
import { Toast } from '@/lib/Toast';

interface TaskItemProps {
	id: string;
	className?: string;
}

const TaskItem = ({ id, className }: TaskItemProps) => {
	const [showActionButton, setShowActionButton] = useState(false);

	const [alertDelete, setAlertDelete] = useState<{ id: string } | null>(null);

	const task = useAtomValue(getTaskByIdAtom(id));
	const doneTask = useSetAtom(doneTaskAtom);
	const deleteTask = useSetAtom(deleteTaskAtom);

	const setSelectedId = useSetAtom(selectedIdAtom);
	const setShowTaskEditModal = useSetAtom(showTaskEditModalAtom);

	const handleDoneTask = (id: string) => {
		doneTask(id);
	};

	const handleShowAlertDelete = (id: string) => {
		setAlertDelete({ id });
	};

	const handleTaskDelete = (id: string) => {
		deleteTask(id);
		Toast.fire({
			icon: 'success',
			title: 'Tugas berhasil dihapus',
		});
	};

	if (!task) return null;

	const { name, description, isDone, outOfDate, dueDate } = task;

	return (
		<>
			<article
				aria-labelledby={`task-${name}`}
				className={`relative ${
					isDone || outOfDate ? 'bg-slate-900 text-white/10' : className
				}  p-4 md:p-6 rounded-2xl w-full h-max flex-none select-none overflow-hidden
                    grid grid-rows-4 min-[400px]:grid-rows-3 grid-cols-[70%_30%]
                `}
			>
				<h3
					id={`task-${name}`}
					className={`${
						isDone ? 'line-through' : ''
					} text-lg md:text-xl font-bold mb-2 col-start-1 row-start-1`}
				>
					{name}
				</h3>
				<p
					className={`${isDone ? 'line-through' : ''} text-sm md:text-base 
                        col-start-1 row-start-2
                    `}
				>
					{description}
				</p>
				<p
					aria-label="due date"
					className={`${
						outOfDate ? 'text-white/30' : 'text-white'
					} col-start-1 row-start-3 mt-auto text-xs md:text-sm lg:text-base`}
				>
					Deadline :{' '}
					<strong
						className={`border ${
							outOfDate ? 'border-white/30' : 'border-white'
						} pt-1 px-1 font-special-elite`}
					>
						{new Date(dueDate).toLocaleDateString('id-ID')}
					</strong>
				</p>
				{isDone || outOfDate ? (
					<button
						onClick={() => handleShowAlertDelete(id)}
						aria-label="hapus tugas"
						className={` absolute top-0 right-0 text-xs md:text-sm lg:text-base rounded-bl-full py-2 px-5 font-semibold bg-red-600 text-white appearance-none m-0`}
					>
						Hapus
					</button>
				) : (
					<button
						disabled={isDone}
						onClick={() => setShowActionButton(!showActionButton)}
						aria-label="Toggle opsi tombol aksi"
						className={`${
							outOfDate ? 'hidden' : ''
						} col-start-2 row-start-1 ml-auto mb-auto flex items-center justify-center text-2xl font-bold`}
					>
						{showActionButton ? (
							<span className="text-red-600 appearance-none bg-red-50 w-6 h-6 flex items-center justify-center p-0">
								x
							</span>
						) : (
							<div role="group" className="h-1 flex items-center gap-[1px]">
								<span>.</span>
								<span>.</span>
								<span>.</span>
							</div>
						)}
					</button>
				)}
				{showActionButton ? (
					<div
						role="group"
						aria-label={`Aksi untuk tugas ${name}`}
						className={`${
							outOfDate ? 'hidden' : ''
						} col-start-2 row-start-3 ml-auto mt-auto text-xs md:text-sm lg:text-base font-semibold flex items-center w-max rounded-full text-[#171717]`}
					>
						<button
							onClick={() => handleShowAlertDelete(id)}
							className="rounded-l-full py-1 px-4 bg-red-600 text-white appearance-none m-0"
						>
							Hapus
						</button>

						<EditTaskButton
							onClick={() => {
								setSelectedId(id);
								setShowTaskEditModal(true);
							}}
							className="rounded-r-full py-1 px-4 bg-yellow-400 text-slate-800 appearance-none m-0"
						/>
					</div>
				) : (
					<div
						role="group"
						className={`${
							outOfDate ? 'hidden' : ''
						} col-start-1 min-[400px]:col-start-2 row-start-4 col-span-2 min-[400px]:col-span-1 min-[400px]:row-start-3 ml-auto mt-auto text-sm md:text-base font-semibold w-max py-1 px-4 rounded-full flex items-center gap-2 bg-sky-50 text-[#171717]`}
					>
						<label htmlFor={`mark-task-${id}`}>Tandai</label>
						<input
							type="checkbox"
							name="mark-task"
							id={`mark-task-${id}`}
							onChange={() => handleDoneTask(id)}
							checked={isDone}
							className="w-4 h-4 ml-1"
						/>
					</div>
				)}

				{outOfDate && (
					<OutOfDate
						className="text-red-700/50 font-bold absolute top-[55%] -translate-y-[45%] right-10
                        border-4 border-red-700/50 rounded-lg p-4 pb-1
                    "
					/>
				)}
			</article>

			{alertDelete?.id && (
				<AlertDialog
					open={!!alertDelete.id}
					onOpenChange={() => setAlertDelete({ id: '' })}
				>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
							<AlertDialogDescription>
								Tugas ini akan dihapus secara permanen
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => handleTaskDelete(alertDelete.id)}
							>
								Hapus
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</>
	);
};

export default TaskItem;
