const fs = require('fs');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const users = {
  keyhub1: { user: 'keyhub1@gmail.com', pass: 'jjbsogehekusztmk' },
  keyhuborg: { user: 'keyhuborg@gmail.com', pass: 'vitdskhmqubwqxsj' },
};
const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: users.keyhuborg.user,
    pass: users.keyhuborg.pass,
  },
  secure: true,
});

class Mail {
  static readHTMLFile(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        callback(err);
        throw err;
      } else {
        callback(null, html);
      }
    });
  }

  static Send({ subject, email_recipient, template_path, context } = {}) {
    const file = fs.readFile(
      path.join(__dirname, template_path),
      { encoding: 'utf-8' },
      (err, html) => {
        if (err) {
          console.log(err);
        } else {
          const template = handlebars.compile(html);
          const contexts = template(context);
          const mailOptions = {
            from: users.keyhuborg.user,
            to: email_recipient,
            subject,
            html: contexts,
          };

          transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
              console.log(error);
            }
          });
        }
      }
    );
  }
}

module.exports = { Mail, transporter };
