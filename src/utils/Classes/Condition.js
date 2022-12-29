class Condition {
	#valid = false;
	#check = (input) => {
		return false;
	};
	#error = "";
	constructor(
		check = (input) => {
			return false;
		},
		error = ""
	) {
		this.#check = check;
		this.#error = error;
	}

	#revalidate(input) {
		this.#valid = this.#check(input);
	}

	flag(input) {
		this.#revalidate(input);
		return this.#valid;
	}

	get error() {
		return this.#error;
	}
}

export default Condition;
