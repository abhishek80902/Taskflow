const axios = require('axios');

const sendWebhook = async (data, retries = 3) => {
  try {
    await axios.post(process.env.WEBHOOK_URL, data);
    console.log("✅ Webhook sent");
  } catch (err) {
    if (retries > 0) {
      const delay = (4 - retries) * 2000;

      console.log(`Retrying webhook... (${retries})`);

      setTimeout(() => {
        sendWebhook(data, retries - 1);
      }, delay);
    } else {
      console.log("❌ Webhook failed after retries");
    }
  }
};

module.exports = { sendWebhook };