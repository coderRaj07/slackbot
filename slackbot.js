const express = require('express');
const { WebClient } = require('@slack/web-api');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/send-message', async (req, res) => {
  try {
    const { message } = req.body;
    const webClient = new WebClient(process.env.SLACK_TOKEN);
    const result = await webClient.chat.postMessage({
      text: message,
      channel: process.env.CHANNEL_ID
    });

    console.log('Message sent:', result);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
