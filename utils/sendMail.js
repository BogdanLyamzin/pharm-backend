const nodemailer = require("nodemailer");
const {SMTP_EMAIL, SMTP_PASSWORD, FROM_EMAIL, FROM_NAME} = require("../configs/mail");


module.exports = async function(options) {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: SMTP_EMAIL,
				pass: SMTP_PASSWORD
			},
			tls: {
				rejectUnauthorized: false
			}
		});
		const message = {
			from: `${FROM_NAME} <${FROM_EMAIL}>`,
			to: options.email,
			subject: options.subject,
		};

		if(options.text){
			message.text = options.text
		};
		 if(options.html){
		 	message.html = options.html
		 };

		const info =  await transporter.sendMail(message);

		console.log(info.messageId)
	}catch (err) {
		console.log(err.message)
	}
}