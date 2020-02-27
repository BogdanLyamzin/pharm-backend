const nodemailer = require("nodemailer");
const key = require("../configs/mail");


module.exports = async function(name, mail, subject, htmlBody) {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: key.email,
				pass: key.passwordEm
			}
		});
		const info = await transporter.sendMail({
			from: '"Admin" <backend.2020pharma@gmail.com>',
			to: `${name} <${mail}>`,
			subject: subject,
			html: htmlBody
		})
	}catch (err) {
		console.log(err.message)
	}
}