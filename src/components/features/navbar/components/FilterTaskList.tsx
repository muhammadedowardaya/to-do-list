import React from 'react';
import { motion } from 'motion/react';

const FilterTaskList = ({ children }: { children: React.ReactNode }) => {
	// -----
	const list = {
		visible: {
			height: 'max-content',
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1, // Stagger children by .3 seconds
			},
		},
		hidden: {
			height: 0,
			opacity: 0,
			transition: {
				when: 'afterChildren',
				staggerChildren: 0.1,
			},
		},
	};

	return (
		<motion.ul
			variants={list}
			initial="hidden"
			animate="visible"
			exit="hidden"
			className="transition-transform duration-500 mt-4"
		>
			{children}
		</motion.ul>
	);
};

export default FilterTaskList;
