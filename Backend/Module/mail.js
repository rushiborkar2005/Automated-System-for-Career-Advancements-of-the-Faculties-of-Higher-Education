const nodemailer = require("nodemailer");





async function sendPasswordEmail(receiverEmail, password) {
    // Create a transporter object using SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service (e.g., Gmail, Outlook)
        auth: {
            user: 'appraiselfaculty@gmail.com', // Replace with your email
            pass: 'fntusslmwgvdyayq'  // Replace with your app password (not your email password)
        }
    });

    // Email content
    const mailOptions = {
        from: 'appraiselfaculty@gmail.com',
        to: receiverEmail,
        subject: 'Your Password',
        text: `Hello,\n\nYour password is: ${password}\n\nKeep it secure and do not share it with anyone.`,
    };

    // Send the email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error(`Error sending email: ${error}`);
    }
}

// Replace with the recipient's email and their password
const recipientEmail = "ordhatrak855@gmail.com";
const userPassword = "userSecurePassword123"; // Replace with the actual password

sendPasswordEmail(recipientEmail, userPassword);