import Greeting from '@/components/features/header/components/Greeting';
import SearchTask from '@/components/features/header/components/SearchTask';
import { useAtomValue } from 'jotai';
import { usernameAtom } from '@/lib/jotai';
import TaskSummary from '@/components/features/header/components/TaskSummary';

const Header = () => {
	const username = useAtomValue(usernameAtom);

	return (
		<header>
			<Greeting name={username!!} />
			<TaskSummary />
			<SearchTask />
		</header>
	);
};

export default Header;
