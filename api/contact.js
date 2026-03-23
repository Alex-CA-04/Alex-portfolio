import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  created_at: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') return res.status(405).json({ error: 'Not allowed' });

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const { name, email, message } = req.body;
    await Message.create({ name, email, message });
    res.json({ message: 'Sent' });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
};
