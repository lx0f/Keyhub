const { info } = require("flash-messenger/Alert")
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "keyhub1@gmail.com",
        pass: "jjbsogehekusztmk"
    },
    secure: true
})


//"ebioweqbivouqfww" is the user password
class Mail {
    static send(res, {to, subject, text} = {}) {
        const mailData = {
            from: "keyhub1@gmail.com",
            to: to,
            subject: subject,
            text: text,
            html: text
        }

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error)
        }
        res.status(200).send({message: "Mail sent", message_id: info.messageId})
    })
 
    }
}

module.exports = Mail