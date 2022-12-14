const useCaesarAutofill = (codeAutoFill, shiftAutoFill) => {
  const autoFillHandle = (value) => {
    if (value !== " ") {
      let list = value.split(",");
      codeAutoFill(list[0]);
      shiftAutoFill(parseInt(list[1]));
    } else {
      codeAutoFill("");
      shiftAutoFill(parseInt(1));
    }
  };

  return autoFillHandle;
};

export default useCaesarAutofill;
