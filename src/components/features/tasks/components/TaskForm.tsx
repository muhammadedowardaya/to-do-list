import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from '@/schemas';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
	getTaskByIdAtom,
	showTaskEditModalAtom,
	showTaskModalAtom,
	taskListAtom,
} from '@/lib/jotai';
import { Toast } from '@/lib/Toast';

const TaskForm = ({ className, id }: { className?: string; id?: string }) => {
	const [taskList, setTaskList] = useAtom(taskListAtom);
	const task = useAtomValue(getTaskByIdAtom(id!));

	const setShowTaskModal = useSetAtom(showTaskModalAtom);
	const setShowTaskEditModal = useSetAtom(showTaskEditModalAtom);

	const [dateInput, setDateInput] = useState(
		() => new Date().toISOString().split('T')[0]
	);
	const [timeInput, setTimeInput] = useState(
		() => new Date().toTimeString().slice(0, 5) // format "HH:MM"
	);

	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			name: '',
			description: '',
			isDone: false,
			dueDate: new Date(),
			createdAt: new Date(),
		},
	});

	const onSubmit = (values: z.infer<typeof taskSchema>) => {
		const combinedDueDate = new Date(`${dateInput}T${timeInput}`);

		// Cek apakah ini edit mode
		const isEdit = !!id;

		// Cek duplikasi hanya jika bukan edit, atau nama diganti
		const isDuplicate = taskList.some(
			(task) =>
				task.name.toLowerCase() === values.name.toLowerCase() &&
				(!isEdit || task.id !== id)
		);

		if (isDuplicate) {
			form.setError('name', {
				type: 'validate',
				message: 'Tugas dengan nama yang sama sudah ada',
			});
			return;
		}

		if (isEdit) {
			// Edit task
			const updatedTask = {
				...task,
				...values,
				dueDate: combinedDueDate,
			};

			const updatedList = taskList.map((task) =>
				task.id === id ? updatedTask : task
			);

			setTaskList(updatedList as Task[]);
			setShowTaskEditModal(false);
			Toast.fire({
				icon: 'success',
				title: 'Tugas berhasil diubah',
			});
		} else {
			// Tambah task baru
			const newTask = {
				...values,
				outOfDate: false,
				dueDate: combinedDueDate,
				createdAt: new Date(),
				id: crypto.randomUUID(),
			};

			setTaskList([...taskList, newTask]);
			setShowTaskModal(false);
			Toast.fire({
				icon: 'success',
				title: 'Berhasil menambahkan tugas baru',
			});
		}
	};

	useEffect(() => {
		if (task) {
			form.reset({
				name: task.name,
				description: task.description,
				isDone: task.isDone,
				dueDate: new Date(task.dueDate),
				createdAt: new Date(task.createdAt),
			});

			const iso = new Date(task.dueDate).toISOString();
			setDateInput(iso.split('T')[0]);
			setTimeInput(iso.split('T')[1].slice(0, 5));
		}
	}, [task]);

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					const handler = form.handleSubmit(onSubmit, (errors) => {
						if (errors) {
							Toast.fire({
								icon: 'error',
								title: 'Gagal menyimpan',
							});
						}
					});
					handler(e);
				}}
				className={`flex flex-col gap-2 min-[360px]:gap-4 px-4 ${className}`}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama</FormLabel>
							<FormControl>
								<Input
									placeholder="ketik nama tugas baru disini..."
									{...field}
									autoComplete="off"
								/>
							</FormControl>
							{/* <FormDescription>Tambahkan nama tugas baru</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Deskripsi</FormLabel>
							<FormControl>
								<Input
									placeholder="Ketik deskripsi dari tugas disini..."
									{...field}
									autoComplete="off"
								/>
							</FormControl>
							{/* <FormDescription>
								Tambahkan deskripsi untuk tugas baru
							</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormItem>
					<FormLabel>Tanggal Tenggat</FormLabel>
					<FormControl>
						<Input
							type="date"
							value={dateInput}
							onChange={(e) => setDateInput(e.target.value)}
							className="w-max"
							autoComplete="off"
						/>
					</FormControl>
				</FormItem>

				<FormItem>
					<FormLabel>Jam Tenggat</FormLabel>
					<FormControl>
						<Input
							type="time"
							value={timeInput}
							onChange={(e) => setTimeInput(e.target.value)}
							className="w-max"
							autoComplete="off"
						/>
					</FormControl>
				</FormItem>

				<Button type="submit" className="mt-4 min-[360px]:mt-4">
					Simpan
				</Button>
			</form>
		</Form>
	);
};

export default TaskForm;
