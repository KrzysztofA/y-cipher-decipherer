import NumberInput from "../UI/NumberInput";

const RailInput = (props) => {
  return (
    <NumberInput
      id="rails"
      label="No. of Rails: "
      value={props.rails}
      min={2}
      max={9999}
      onChange={props.onChange}
    />
  );
};

export default RailInput;
