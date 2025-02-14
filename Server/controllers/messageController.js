//controllers/messageController.js
const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, content } = req.body;
    const message = new Message({ senderId, receiverId, content });
    try {
        await message.save();
        res.status(201).json({ message: 'Message sent successfully', message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get messages between user and trainer
exports.getMessages = async (req, res) => {
    const { userId, trainerId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: trainerId },
                { senderId: trainerId, receiverId: userId }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};