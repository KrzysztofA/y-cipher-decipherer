import { ERRORS } from "../../Constants";
import useErrorText from "./useErrorText";
import useFetch from "./useFetch";

const useSubmit = (url, endpoint, query, condition = () => true) => {
  const [error, setError, resetError] = useErrorText();
  const [callFetch, data, loading] = useFetch(url, endpoint, query, (err) => {
    setError(err.message);
  });

  const submit = (ev) => {
    ev.preventDefault();
    if (!condition) {
      setError(ERRORS.SUBMIT_CORRECT);
      return;
    }
    resetError();
    callFetch();
  };
  return [submit, data, loading, error];
};

export default useSubmit;
