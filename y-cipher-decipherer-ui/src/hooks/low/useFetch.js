import { useState, useMemo } from "react";

const useFetch = (url, endpoint) => {
	const [isFetching, setIsFetching] = useState(false);
	const info = useMemo(() => {
		return { url, endpoint };
	}, [url, endpoint]);
	const abortController = useMemo(() => new AbortController(), []);

	const handleFetch = (query) => {
		if (isFetching) {
			abortController.abort();
		}
		setIsFetching(true);
		const handle = fetch(
			`${info.url}${info.endpoint}?${new URLSearchParams(query)}`
		).then((res) => {
			setIsFetching(false);
			return res;
		});
		return handle;
	};

	return handleFetch;
};

export default useFetch;
