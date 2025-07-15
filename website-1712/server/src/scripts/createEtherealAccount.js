import nodemailer from 'nodemailer';

async function createEtherealAccount() {
    const testAccount = await nodemailer.createTestAccount();
    console.log('Ethereal account created:', testAccount);
    return testAccount;
}

createEtherealAccount();

/*
gmail - Enable "Less Secure Apps" or App Passwords 
mailgun - paid
ethereal - free, but only for testing. 
After sending an email, Nodemailer generates a preview URL where you can view the email in your browser without delivering it to a real recipient.
credentials will expire.

node scripts/createEtherealAccount.js

Always use nodemailer.getTestMessageUrl(info) to preview the email without sending it to real inboxes.
For production, switch to a real SMTP service like Gmail, SendGrid, or another provider.
 */