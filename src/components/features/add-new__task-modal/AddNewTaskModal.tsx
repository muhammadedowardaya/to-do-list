import React from 'react';

import { showTaskModalAtom } from '@/lib/jotai';
import { useAtom } from 'jotai';
import useMediaQuery from '@/lib/useMediaQuery';

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import TaskForm from '@/components/features/tasks/components/TaskForm';

const AddNewTaskModal = ({ className }: { className?: string }) => {
	const [showTaskModal, setShowTaskModal] = useAtom(showTaskModalAtom);
	const isDesktop = useMediaQuery('(min-width: 768px)');

	if (isDesktop) {
		return (
			<Dialog open={showTaskModal} onOpenChange={setShowTaskModal}>
				<DialogTrigger asChild>
					<Button variant="outline" className={`${className}`}>
						+
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader className="lg:px-4 lg:py-2 pb-4 border-b border-slate-300">
						<DialogTitle>Buat tugas baru</DialogTitle>
						<DialogDescription>
							Buat tugas baru disini, tekan simpan ketika selesai
						</DialogDescription>
					</DialogHeader>
					<TaskForm />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={showTaskModal} onOpenChange={setShowTaskModal}>
			<DrawerTrigger asChild>
				<Button variant="outline" className={`${className} text-2xl`}>
					+
				</Button>
			</DrawerTrigger>
			<DrawerContent className="min-h-[95svh] min-[360px]:min-h-max mb-4 min-[360px]:mb-6">
				<DrawerHeader
					className={`text-left hidden min-[400px]:block min-[400px]:pb-[30px]`}
				>
					<DrawerTitle>Buat tugas baru</DrawerTitle>
					<DrawerDescription>
						Buat tugas baru disini, tekan simpan ketika selesai
					</DrawerDescription>
				</DrawerHeader>
				<TaskForm />
				<DrawerFooter className="mb-auto mt-0">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default AddNewTaskModal;
