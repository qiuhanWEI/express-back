var express = require("express");
var cors = require("cors");
var mailer = require("express-mailer");
var app = express();

mailer.extend(app, {
    from: "tyfountain_website@163.com",
    host: "smtp.163.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: "SMTP", // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: "tyfountain_website@163.com",
        pass: "tyfountain1018"
    }
});

app.use(cors());

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get("/sendemail", function(req, res, next) {
    app.mailer.send(
        "email",
        {
            to: "tyfountain_website@163.com", // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: "Test Email", // REQUIRED.
            name: "name", // All additional properties are also passed to the template as local variables.
            email: "email", // All additional properties are also passed to the template as local variables.
            mobile: "mobile", // All additional properties are also passed to the template as local variables.
            content: "content" // All additional properties are also passed to the template as local variables.
        },
        function(err) {
            if (err) {
                // handle error
                console.log(err);
                res.json({ msg: "There was an error sending the email" });

                return;
            }
            res.json({ msg: "Email Sent" });
        }
    );
});

app.listen(3001, function() {
    console.log("CORS-enabled web server listening on port 3001");
});
