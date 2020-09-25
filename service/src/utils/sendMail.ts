import nodemailer from 'nodemailer'
import logger from '../config/logger';

export async function sendMail(to: string, subject: string, message: string) {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Tech Test" <tech@test.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: message, // plain text body
    });


    // Preview only available when sending through an Ethereal account
    logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}