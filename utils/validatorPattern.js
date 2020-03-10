module.exports = {
	name: {
		reg: /^[A-Za-zА-Яа-я\-]{2,}\s[A-Za-zА-Яа-я\-\s]{2,}$/,
		message: "Name is invalid."
	},
	email: {
		reg: /^[a-z0-9]+[\w\-\.]*[a-z0-9]+\@[a-z0-9]+[\w\-\.]*[a-z0-9]+\.[a-z]{2,}$/,
		message: "Email is invalid."
	},
	password:{
		reg: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[\w!@#\$%\^&-\*]{6,}$/,
		message: "Password is invalid."
	},

	phone: {
		reg: /^[+\s]?\(?\s?\d*[\s\-]?\)?\(?\s?\d{3,}[\s\-]?\)?\s?\d{1,3}[\s\-]?\d{2}[\s\-]?\d{2}$/,
		message: "Phone number is invalid."
	},

	department: {
		reg: /[\wА-Яа-я\-\&\s]{2,}/,
		message: "Department is invalid."
	}
}