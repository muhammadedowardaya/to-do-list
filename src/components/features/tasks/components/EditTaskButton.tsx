import React, { useEffect } from 'react';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import TaskForm from '@/components/features/tasks/components/TaskForm';
import { useAtom, useAtomValue } from 'jotai';
import {
	getTaskByIdAtom,
	selectedIdAtom,
	showTaskEditModalAtom,
} from '@/lib/jotai';

const EditTaskButton = ({
	onClick,
	className,
}: {
	onClick: () => void;
	className?: string;
}) => {
	const selectedId = useAtomValue(selectedIdAtom);
	const task = useAtomValue(getTaskByIdAtom(selectedId));

	const [showTaskEditModal, setShowTaskEditModal] = useAtom(
		showTaskEditModalAtom
	);

	return (
		<Dialog open={showTaskEditModal} onOpenChange={setShowTaskEditModal}>
			<DialogTrigger
				className={className}
				onClick={() => {
					if (onClick) onClick();
				}}
			>
				Edit
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="lg:px-4 lg:pt-2 pb-4 border-b border-slate-300">
					<DialogTitle>Edit Task</DialogTitle>
					<DialogDescription>
						Edit tugas <strong>{`"${task?.name}"`}</strong>
					</DialogDescription>
				</DialogHeader>
				<TaskForm key={selectedId} id={selectedId} className="mt-1" />
			</DialogContent>
		</Dialog>
	);
};

export default EditTaskButton;
