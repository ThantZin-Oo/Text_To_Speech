const express = require('express');
const gTTS = require('gtts');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// TTS Endpoint
app.post('/speak', (req, res) => {
  const { title, text, lang } = req.body;

  if (!text) return res.status(400).send('Missing text');

  const filename = `output/${title}.mp3` || `output/${Date.now()}.mp3`;
  const gtts = new gTTS(text, lang || 'en');

  gtts.save(filename, function (err) {
    if (err) {
      console.error('❌ Error saving TTS file:', err);
      return res.status(500).send('TTS Error');
    }
    res.sendFile(path.join(__dirname, filename), () => {
      // Optional: delete the file after sending
      fs.unlinkSync(filename);
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
