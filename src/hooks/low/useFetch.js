import { useState, useMemo } from "react";

const useFetch = (url, query, endpoint) => {
	const [isFetching, setIsFetching] = useState(false);
	const info = useMemo(() => {
		return { url, query, endpoint };
	}, [url, query, endpoint]);
	const abortController = useMemo(() => new AbortController(), []);

	const handleFetch = () => {
		if (isFetching) {
			abortController.abort();
		}
		setIsFetching(true);
		const handle = fetch(
			`${info.url}${info.endpoint}?${new URLSearchParams(info.query)}`
		).then((res) => {
			setIsFetching(false);
			return res;
		});
		return handle;
	};

	return handleFetch;
};

export default useFetch;
