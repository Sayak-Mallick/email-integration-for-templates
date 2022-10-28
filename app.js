const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const ejs = require('ejs');

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'sayakmallickkv@gmail.com',
        pass: 'envsnvqqfxfogklk'
    }
});


app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});


app.get('/send-email', (req, res) => {
    

    const sendEmail = (reciever, subject, content) => {
        ejs.renderFile(__dirname + '/templates/welcome.ejs', {
            reciever, subject, content
        },
            (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let email1 = req.query.email1;
                    let subject = req.query.subject;
                    // let message = req.query.message;

                    var mailOptions = {
                        from: 'sayakmallickkv@gmail.com',
                        to: email1,
                        subject: "Happy Halloween 2022",
                        html: data
                    };

                    transport.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message Sent: %s', info.messageId);
                    });
                }
            });
    };

    let email1 = req.query.email1;
    let email2 = req.query.email2;

    sendEmail(
         email1,
        "Happy Halloween 2022",
        "Novac Technology Solutions wishes you and your family a very happy halloween. Hope your day is full of good times and good treats."
    );
    res.sendFile(__dirname + '/index.html');
    // res.sendFile(__dirname + '/index.html');
});

app.listen(4008, () => {
    console.log('The server is running on port http://localhost:4008/send-email');
});