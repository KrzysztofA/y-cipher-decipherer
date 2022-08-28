const URL = 'http://localhost:8000/';
const HILLENDPOINT = 'decode/hillcipher'; 
const CAESARENDPOINT = 'decode/caesarcipher'; 
const RAILENDPOINT = 'decode/railcipher';

const errorMsgs = {
    // Error Messages present throughout the errors
    MinFour: "Enter minimum four characters",
    MinTwo: "Enter minimum two characters",
    InvalidChar: "Only letters from a to z allowed",
    SubmitCorr: "Correct all errors before submitting",
};

export { URL, HILLENDPOINT, CAESARENDPOINT, RAILENDPOINT, errorMsgs};