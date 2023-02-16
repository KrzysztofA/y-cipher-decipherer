import NumberInput from "../../UI/NumberInput";

const RailInput = ({ rails, onChange }) => {
	return (
		<NumberInput
			id="rails"
			label="No. of Rails: "
			value={rails}
			min={2}
			max={9999}
			onChange={onChange}
		/>
	);
};

export default RailInput;
