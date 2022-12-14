import { useState, useRef } from "react";

const useFetch = (
  url,
  endpoint,
  query,
  catchCallback = (err) => {
    throw new Error(err.message);
  }
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  const controller = useRef(new AbortController());

  const callFetch = () => {
    if (loading) controller.abort();
    const signal = controller.signal;
    setLoading(true);
    fetch(`${url}${endpoint}?${new URLSearchParams(query())}`, { signal })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        catchCallback(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return [callFetch, data, loading];
};

export default useFetch;
