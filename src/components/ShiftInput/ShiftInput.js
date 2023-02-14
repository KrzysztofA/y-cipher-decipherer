import NumberInput from "../UI/NumberInput";

const ShiftInput = (props) => {
  return (
    <NumberInput
      id="shift"
      label="Shift Value: "
      value={props.shift}
      min={1}
      max={25}
      onChange={props.onChange}
    />
  );
};

export default ShiftInput;
