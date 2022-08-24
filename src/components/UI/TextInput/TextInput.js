export default function TextInput({id}) {
    return ( 
        <input
            type="text"
            maxLength="256"
            id={id}
        />
    );
};