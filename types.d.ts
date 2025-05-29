interface Task {
	id: string;
	name: string;
	description: string;
	isDone: boolean;

	outOfDate: boolean;
	dueDate: Date;
	createdAt: Date;
}
