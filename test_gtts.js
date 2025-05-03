const gTTS = require('gtts');
const gtts = new gTTS('Hello world', 'en');

gtts.save('test.mp3', function (err) {
  if (err) throw err;
  console.log('✅ test.mp3 saved successfully!');
});
