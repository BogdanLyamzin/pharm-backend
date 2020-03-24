module.exports = {
	SMTP_HOST: "",
	SMTP_PORT: "",
	SMTP_EMAIL: "backend.2020pharma@gmail.com",
	SMTP_PASSWORD: "0671014275",
	FROM_EMAIL: "noreply.2020pharma@gmail.com",
	FROM_NAME: "Admin",
	letterAddUser(name, email, password){
		return  `<h2>Hello, ${name}</h2>
				 <p>Your account was created on Pharm.</p>
				 <p>Login: ${email}</p>
				 <p>Password: ${password}</p>`;
	},
	letterUpdateUser(name){
		return  `<h2>Hello, ${name}</h2>
				 <p>Your account was updated on Pharm.</p>`
	}

}