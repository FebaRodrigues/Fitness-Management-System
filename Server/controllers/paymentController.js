// controllers/paymentController.js
const Payment = require('../models/Payment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Membership = require('../models/Membership');

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via Gmail
const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Payment OTP',
    text: `Your one-time password (OTP) for payment verification is: ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

// Controller functions
const sendPaymentOTP = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = generateOTP();
    req.session = req.session || {};
    req.session.otp = { code: otp, expires: Date.now() + 5 * 60 * 1000 }; // 5 minutes expiry
    req.session.userId = userId;

    await sendOTP(user.email, otp);
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: error.message });
  }
};

const verifyPaymentOTP = async (req, res) => {
  const { otp } = req.body;
  try {
    if (!req.session || !req.session.otp) {
      return res.status(400).json({ message: 'No OTP session found' });
    }

    const storedOTP = req.session.otp;
    if (Date.now() > storedOTP.expires) {
      delete req.session.otp;
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (storedOTP.code !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    delete req.session.otp;
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPayment = async (req, res) => {
  const { amount, type, trainerId, membershipId } = req.body;
  const userId = req.user.id;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: type === 'Membership' ? 'Membership Payment' : 'Trainer Session',
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/user/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/user/payments/cancel`,
      metadata: { userId, type, trainerId: trainerId || null, membershipId: membershipId || null },
    });

    const payment = new Payment({
      userId,
      trainerId: trainerId || null,
      membershipId: membershipId || null,
      amount,
      type,
      transactionId: session.id,
    });
    await payment.save();

    res.status(201).json({ message: 'Payment session created', sessionId: session.id });
  } catch (error) {
    console.error('Error creating payment session:', error);
    res.status(500).json({ error: error.message });
  }
};

const getUserPayments = async (req, res) => {
  const { userId } = req.params;
  try {
    const payments = await Payment.find({ userId });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrainerPayments = async (req, res) => {
  const { trainerId } = req.params;
  try {
    const payments = await Payment.find({ trainerId });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  const { paymentId } = req.params;
  const { status, transactionId } = req.body;
  try {
    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { status, transactionId },
      { new: true }
    );
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json({ message: 'Payment status updated', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { userId, type, trainerId, membershipId } = session.metadata;

    try {
      console.log('Webhook received:', event.type);
console.log('Session ID:', session.id);
      const payment = await Payment.findOne({ transactionId: session.id });
      console.log('Payment found:', payment);
      if (payment) {
        payment.status = 'Completed';
        await payment.save();
        console.log(`Payment ${session.id} marked as Completed`);
      } else {
        console.error(`Payment with transactionId ${session.id} not found`);
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  }

  res.status(200).json({ received: true });
};

// Export all functions explicitly
module.exports = {
  createPayment,
  getUserPayments,
  getTrainerPayments,
  updatePaymentStatus,
  getAllPayments,
  handleStripeWebhook,
  sendPaymentOTP,
  verifyPaymentOTP,
};