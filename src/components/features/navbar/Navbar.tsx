import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import ListMenu from '@/components/features/navbar/components/FilterTaskList';
import ListMenuItem from '@/components/features/navbar/components/FilterTaskItem';
import FilterTaskButton from '@/components/features/navbar/components/FilterTaskButton';
import AddNewTaskModal from '@/components/features/add-new__task-modal/AddNewTaskModal';
import { useAtom } from 'jotai';
import { taskFilterSelectedAtom } from '@/lib/jotai';
import SettingMenu from './components/SettingMenu';

const Navbar = () => {
	const [open, setOpen] = useState(false);

	const [taskFilterSelected, setTaskFilterSelected] = useAtom(
		taskFilterSelectedAtom
	);

	const navItems = [
		{
			name: 'Semua',
			value: 'all',
			action: () => {
				setTaskFilterSelected('all');
			},
		},
		{
			name: 'Belum Selesai',
			value: 'unDone',
			action: () => {
				setTaskFilterSelected('unDone');
			},
		},
		{
			name: 'Selesai',
			value: 'done',
			action: () => {
				setTaskFilterSelected('done');
			},
		},
		{
			name: 'Kadaluarsa',
			value: 'outOfDate',
			action: () => {
				setTaskFilterSelected('outOfDate');
			},
		},
	];

	return (
		<nav className="mb-4 min-[400px]:mb-6 md:mb-12 relative">
			<div
				role="group"
				aria-label="main navigation"
				className="flex items-center justify-between gap-4"
			>
				<div
					role="group"
					aria-label="left navigation menu"
					className="flex items-center gap-4"
				>
					<FilterTaskButton
						onClick={() => setOpen(!open)}
						className="button-icon"
					/>
					<AddNewTaskModal className="button-icon" />
				</div>
				<SettingMenu className="text-2xl md:text-3xl lg:text-2xl shadow py-[4px] px-[6px]" />
			</div>
			<AnimatePresence>
				{open && (
					<ListMenu>
						{navItems.map((navItem) => (
							<ListMenuItem
								key={navItem.name}
								isActive={taskFilterSelected === navItem.value}
								navItem={navItem}
							/>
						))}
					</ListMenu>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
