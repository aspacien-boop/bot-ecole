const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// PAGE D'ACCUEIL
app.get('/', (req, res) => res.send('Bot École PNR en ligne ✅'));

// VERIFICATION WEBHOOK POUR META
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = "rachilb_secret_2026";
  
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK_VERIFIED');
    res.status(200).send(challenge);
  } else {
    console.error('Verification failed');
    res.sendStatus(403);
  }
});

// RECEPTION DES MESSAGES
app.post('/webhook', (req, res) => {
  console.log('Message reçu:', req.body);
  res.status(200).send('EVENT_RECEIVED');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
