import { useEffect } from "react";
import useErrorText from "./useErrorText";

const useErrorHandler = (condition, errorTextDeterminant = () => "Error") => {
  const [text, setText, resetText] = useErrorText();

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      if (!condition) {
        setText(errorTextDeterminant());
      } else {
        resetText();
      }
    }, 500);
    return () => {
      clearTimeout(errorTimeout);
    };
  }, [condition, errorTextDeterminant, setText, resetText]);

  return text;
};

export default useErrorHandler;
