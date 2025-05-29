import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

const FilterTaskButton = ({
	onClick,
	className,
}: {
	onClick: () => void;
	className?: string;
}) => {
	return (
		<Button
			variant="outline"
			aria-label="Tombol filter tugas"
			onClick={() => {
				if (onClick) onClick();
			}}
			className={`${className}`}
		>
			<Icon
				icon="ic:baseline-filter-alt"
				className="!w-full !h-full flex-none block"
			/>
		</Button>
	);
};

export default FilterTaskButton;
