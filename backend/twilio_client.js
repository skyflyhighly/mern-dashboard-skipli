const accountSid = "ACbf6bf4509117581cdd42345da132ed56";
const authToken = "63a8444ea51a770fcd6a4c0093d0ed20";
const twilioClient = require("twilio")(accountSid, authToken);

/**
 * Send SMS message to the specified number
 *
 * @param {string} toNumber
 * @param {string} message
 */
async function sendMessage(toNumber, message) {
  try {
    const sentMessage = await twilioClient.messages.create({
      body: message,
      from: "+16097335988",
      to: toNumber,
    });
    console.info(sentMessage.sid);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  sendMessage,
};
