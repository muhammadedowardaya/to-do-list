'use client';

import { z } from 'zod';

export const taskSchema = z.object({
	name: z.string().min(3).max(30),
	description: z.string().min(3).max(100),
	dueDate: z.date(),
	isDone: z.boolean(),
	createdAt: z.date(),
});
