const nodemailer = require("nodemailer");
const key = require("../configs/mail");


module.exports = async function(name, mail, subject, htmlBody) {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: key.email,
				pass: key.passwordEm
			},
			tls: {
				rejectUnauthorized: false
			}
		});
		const info = await transporter.sendMail({
			from: '<backend.2020pharma@gmail.com>',
			to: `${name} <${mail}>`,
			subject: subject,
			html: htmlBody
		});
		console.log(info.messageId)
	}catch (err) {
		console.log(err.message)
	}
}