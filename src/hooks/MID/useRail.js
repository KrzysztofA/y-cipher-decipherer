const useRail = () => {
  const [rail, railSetHandler, railsInputHandler] = useInputValue();

  return [rail, railSetHandler, railsInputHandler];
};

export default useRail;
