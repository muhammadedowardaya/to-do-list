import { useEffect, useState } from 'react';

function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState<boolean>(() => {
		if (typeof window !== 'undefined') {
			return window.matchMedia(query).matches;
		}
		return false;
	});

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);

		const handler = (event: MediaQueryListEvent) => {
			setMatches(event.matches);
		};

		// Add listener
		mediaQuery.addEventListener('change', handler);

		// Set initial value (in case query changes)
		setMatches(mediaQuery.matches);

		// Cleanup
		return () => {
			mediaQuery.removeEventListener('change', handler);
		};
	}, [query]);

	return matches;
}

export default useMediaQuery;
