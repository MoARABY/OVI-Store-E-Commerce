const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const sendSMS = async (to, message) => {
try {
    const response = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to,
    });
    console.log('Message sent:', response.sid);
} catch (error) {
    console.error('Error sending message:', error.message);
}
};

module.exports = sendSMS;