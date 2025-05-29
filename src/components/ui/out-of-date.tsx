import React from 'react';

const OutOfDate = ({ className }: { className?: string }) => {
	return (
		<div
			role="status"
			className={`${className} flex flex-col items-center font-special-elite -rotate-12`}
		>
			<span className="scale-230">OUT</span>
			<span>OF DATE</span>
		</div>
	);
};

export default OutOfDate;
