import NumberInput from "../../UI/NumberInput";

const ShiftInput = ({ shift, onChange }) => {
	return (
		<NumberInput
			id="shift"
			label="Shift Value: "
			value={shift}
			min={1}
			max={25}
			onChange={onChange}
		/>
	);
};

export default ShiftInput;
