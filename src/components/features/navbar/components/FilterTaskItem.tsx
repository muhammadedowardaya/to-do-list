import React from 'react';

import { motion } from 'motion/react';
import { Icon } from '@iconify/react';

const FilterTaskItem = ({
	navItem,
	isActive,
}: {
	navItem: { name: string; action: () => void };
	isActive: boolean;
}) => {
	const item = {
		visible: { opacity: 1, x: 0 },
		hidden: { opacity: 0, x: -100 },
	};

	return (
		<motion.li
			variants={item}
			key={navItem.name}
			onClick={navItem.action}
			className={`cursor-pointer text-sm min-[400px]:text-base md:text-xl flex items-center gap-[1px] select-none ${
				isActive ? 'text-[#171717]' : 'text-[#171717]/30'
			}`}
		>
			<Icon
				icon="ic:baseline-arrow-right"
				width="24"
				height="24"
				className={isActive ? 'opacity-100' : 'opacity-0'}
			/>
			<span>{navItem.name}</span>
		</motion.li>
	);
};

export default FilterTaskItem;
