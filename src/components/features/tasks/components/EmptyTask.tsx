import { taskFilterSelectedAtom } from '@/lib/jotai';
import { useAtomValue } from 'jotai';

const EmptyTask = () => {
	const taskFilterSelected = useAtomValue(taskFilterSelectedAtom);

	return (
		<article
			aria-labelledby={`task-is-empty`}
			className={`relative bg-slate-700 text-center text-white/30 p-6 rounded-2xl w-full h-max flex-none select-none`}
		>
			<h3 id={`task-is-empty`} className="text-lg font-bold mb-2">
				{taskFilterSelected === 'done'
					? 'Belum ada tugas selesai'
					: 'Belum ada tugas'}
			</h3>
			<p className="text-sm text-white/40">Cobalah untuk menambahkan tugas</p>
		</article>
	);
};

export default EmptyTask;
