const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  created_at: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') return res.status(405).json({ error: 'Not allowed' });

  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ error: 'MONGODB_URI not set' });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const { name, email, message } = req.body;
    await Message.create({ name, email, message });
    res.json({ message: 'Sent' });
  } catch (err) {
    console.error('Contact API Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
