import { useAtomValue } from 'jotai';
import { getGreetingTime } from '../utils/getGreetingTime';
import { taskFilterSelectedAtom } from '@/lib/jotai';

interface GreetingProps {
	name?: string;
}

const Greeting = ({ name }: GreetingProps) => {
	const greeting = getGreetingTime();

	return (
		<h1 className="text-[#171717]/50 font-semibold text-base min-[400px]:text-lg md:text-2xl">
			{greeting}
			{name ? `, ${name}!` : '!'}
		</h1>
	);
};

export default Greeting;
