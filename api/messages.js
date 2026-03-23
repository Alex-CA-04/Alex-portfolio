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
  
  if (req.method !== 'GET') return res.status(405).json({ error: 'Not allowed' });

  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ error: 'MONGODB_URI not set' });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const messages = await Message.find().sort({ created_at: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Messages API Error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
