module.exports = {
	email: "backend.2020pharma@gmail.com",
	passwordEm: "0671014275",
	letterAddUser(name, password){
		return  `<h2>Hello, ${name}</h2>
				 <p>Your account was created on Pharm.</p>
				 <p>Login: ${name}</p>
				 <p>Password: ${password}</p>`;
	},
	letterUpdateUser(name){
		return  `<h2>Hello, ${name}</h2>
				 <p>Your account was updated on Pharm.</p>
				 <p>Login: ${name}</p>`
	}

}