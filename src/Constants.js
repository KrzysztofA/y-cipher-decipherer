const URL = "http://localhost:8000/";
const HILLENDPOINT = "decode/hillcipher";
const CAESARENDPOINT = "decode/caesarcipher";
const RAILENDPOINT = "decode/railcipher";

const ERRORMESSAGES = {
	// Error Messages present throughout the errors
	MINIMUM_FOUR: "Enter minimum of four characters",
	MINIMUM_TWO: "Enter minimum of two characters",
	INVALID_CHAR: "Only letters from a to z allowed",
	SUBMIT: "Correct all errors before submitting",
};

export { URL, HILLENDPOINT, CAESARENDPOINT, RAILENDPOINT, ERRORMESSAGES };
