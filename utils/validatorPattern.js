module.exports = {
	name: {
		reg: /^[A-Za-zА-Яа-я\-]{2,}\s[A-Za-zА-Яа-я\-\s]{2,}$/,
		message: "The field must consist of the fist and the last names, more than 2 symbols each.",
		required: "Please add a name"
	},
	email: {
		reg: /^[a-z0-9]+[\w\-\.]*[a-z0-9]+\@[a-z0-9]+[\w\-\.]*[a-z0-9]+\.[a-z]{2,}$/,
		message: "Please enter a valid e-mail address.",
		required: "Please add an e-mail"
	},
	password:{
		reg: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[\w!@#\$%\^&-\*]{6,}$/,
		message: "Password must contain not less than 6 symbols, including upper case, lower case, digits and special" +
				" symbols.",
		required: "Please add a password"
	},

	phone: {
		reg: /^[+\s]?\(?\s?\d*[\s\-]?\)?\(?\s?\d{3,}[\s\-]?\)?\s?\d{1,3}[\s\-]?\d{2}[\s\-]?\d{2}$/,
		message: "Please enter a valid phone number.",
		required: "Please add a phone"
	},

	department: {
		reg: /[\wА-Яа-я\-\&\s]{2,}/,
		message: "Department name must consist of not less than two symbols.",
	}
}