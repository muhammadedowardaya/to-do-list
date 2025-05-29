import React from 'react';

import { Icon } from '@iconify/react';
import { useAtom } from 'jotai';
import { searchTaskAtom } from '@/lib/jotai';

const SearchTask = () => {
	const [searchTask, setSearchTask] = useAtom(searchTaskAtom);

	return (
		<form className="bg-gray-100 my-6 flex items-center rounded-lg">
			<Icon
				icon="ic:round-search"
				className="w-6 h-6 md:w-8 md:h-8 m-3 md:ml-4"
			/>
			<input
				type="text"
				placeholder="Cari tugas"
				autoComplete="off"
				id="search"
				className="p-3 w-full text-sm md:text-lg rounded-lg appearance-none bg-transparent focus:outline-none"
				value={searchTask}
				onChange={(e) => setSearchTask(e.target.value)}
			/>
		</form>
	);
};

export default SearchTask;
