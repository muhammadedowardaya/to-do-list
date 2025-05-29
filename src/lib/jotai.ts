import { atom } from 'jotai';
import { atomFamily, atomWithStorage } from 'jotai/utils';

export const taskListAtom = atomWithStorage<Task[]>('tasks', []);

// -----------------------  settings menu   -----------------------
export const showPromptUsernameAtom = atom<boolean>(false);
export const usernameAtom = atomWithStorage<string | null>('username', null);

// -----------------------  get tasks data   -----------------------

export const searchTaskAtom = atom<string>('');

export const taskFilterSelectedAtom = atomWithStorage<
	'done' | 'unDone' | 'all' | 'outOfDate'
>('filter', 'all');

export const nowAtom = atom(new Date());

export const filteredTaskAtom = atom<Task[]>((get) => {
	const filter = get(taskFilterSelectedAtom);
	const now = get(nowAtom);
	const searchTaskInput = get(searchTaskAtom).toLowerCase();
	const rawTasks = get(taskListAtom);

	// Tambahkan properti outOfDate
	const tasksWithFlags = rawTasks.map((task) => {
		const taskDate = new Date(task.dueDate);
		const isOutOfDate = taskDate < now;
		return { ...task, outOfDate: isOutOfDate };
	});

	// Terapkan filter status
	const filteredByStatus = tasksWithFlags.filter((task) => {
		switch (filter) {
			case 'done':
				return task.isDone && task.outOfDate === false;
			case 'unDone':
				return !task.isDone && task.outOfDate === false;
			case 'outOfDate':
				return task.outOfDate;
			default:
				return true;
		}
	});

	// Terapkan pencarian
	const filteredBySearch = filteredByStatus.filter((task) => {
		if (!searchTaskInput) return true;
		return (
			task.name.toLowerCase().includes(searchTaskInput) ||
			task.description.toLowerCase().includes(searchTaskInput)
		);
	});

	// Urutkan berdasarkan tanggal dibuat (terbaru di atas)
	const sortedTasks = filteredBySearch.sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);

	return sortedTasks;
});

export const taskUndoneAtom = atom<Task[]>((get) =>
	get(taskListAtom).filter((task) => !task.isDone)
);

export const taskDoneAtom = atom<Task[]>((get) =>
	get(taskListAtom).filter((task) => task.isDone)
);

export const getTaskByIdAtom = atomFamily((id: string) =>
	atom((get) => get(filteredTaskAtom).find((task) => task.id === id))
);

// -----------------------    actions for task     ------------------------
export const addNewTask = atom([], (get, set, newTask: Task) => {
	const current = get(taskListAtom);
	set(taskListAtom, [...current, newTask]);
});

export const editTaskAtom = atom(null, (get, set, updatedTask: Task) => {
	const current = get(taskListAtom);
	const updated = current.map((task) =>
		task.id === updatedTask.id ? updatedTask : task
	);
	set(taskListAtom, updated);
});

export const deleteTaskAtom = atom(null, (get, set, taskId: string) => {
	const current = get(taskListAtom);
	const filtered = current.filter((task) => task.id !== taskId);
	set(taskListAtom, filtered);
});

export const doneTaskAtom = atom(null, (get, set, taskId: string) => {
	const current = get(taskListAtom);
	const updated = current.map((task) =>
		task.id === taskId ? { ...task, isDone: !task.isDone } : task
	);
	set(taskListAtom, updated);
});

// -----------------------------------   show task modal -------
export const showTaskModalAtom = atom<boolean>(false);

// -----------------------------------   show edit task modal -------
export const showTaskEditModalAtom = atom<boolean>(false);

// -----------------------------------   selected id for edit task modal -------
export const selectedIdAtom = atom<string>('');
