const Mailgen = require('mailgen');
const mailer = require("./mailer");

 
// REQUIREMENTS: Object: target = {name: String, email: String}
function generator(target) {
  // Configure mailgen by setting a theme and your product info
  var mailGenerator = new Mailgen({
      theme: 'salted',
      product: {
          // Appears in header & footer of e-mails
          name: 'Food Ladder',
          link: 'https://foodladder.org/'
          // Optional product logo
          // logo: 'http://-------'
      }
  });


  var email = {
    body: {
        name: `${target.name}`,
        intro: 'Welcome to Food Ladder! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started with Food Ladder, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Confirm your account',
                link: 'http://localhost:3000'
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
  };

  // Generate an HTML email with the provided contents
  var emailBody = mailGenerator.generate(email);

  console.log("mail file generated.");
  mailer(target, emailBody);
}

module.exports = generator;