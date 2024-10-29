const nodemailer = require("nodemailer");

const sendMail = async (getEmail, subject, message) => {
    try {
        const { EMAIL_USER, EMAIL_PASS } = process.env;
        console.log(`EMAIL_USER: ${EMAIL_USER}`);
        console.log(`EMAIL_PASS: ${EMAIL_PASS}`);
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            }
        });
        const mailOptions = {
            from: EMAIL_USER, 
            to: getEmail,
            subject: subject,
            html: message,
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);  
        throw error;
    }
};
module.exports = sendMail;


