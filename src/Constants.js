const URL = "http://localhost:8000/";
const HILLENDPOINT = "decode/hillcipher";
const CAESARENDPOINT = "decode/caesarcipher";
const RAILENDPOINT = "decode/railcipher";

const ERRORS = {
  // Error Messages present throughout the errors
  MIN_FOUR: "Enter minimum four characters",
  MIN_TWO: "Enter minimum two characters",
  INVALID_CHAR: "Only letters from a to z allowed",
  SUBMIT_CORRECT: "Correct all errors before submitting",
};

export { URL, HILLENDPOINT, CAESARENDPOINT, RAILENDPOINT, ERRORS };
