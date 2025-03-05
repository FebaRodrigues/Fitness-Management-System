// controllers/membershipController.js
const Membership = require('../models/Membership');

exports.createMembership = async (req, res) => {
  const { planType, duration, price } = req.body;
  const userId = req.user.id;

  try {
    const endDate = new Date();
    if (duration === 'Monthly') endDate.setMonth(endDate.getMonth() + 1);
    else if (duration === 'Quarterly') endDate.setMonth(endDate.getMonth() + 3);
    else if (duration === 'Yearly') endDate.setFullYear(endDate.getFullYear() + 1);

    const membership = new Membership({ userId, planType, duration, price, endDate });
    await membership.save();
    res.status(201).json({ message: 'Membership created', membership });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserMemberships = async (req, res) => {
  const { userId } = req.params;
  try {
    const memberships = await Membership.find({ userId });
    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMembershipStatus = async (req, res) => {
  const { membershipId } = req.params;
  const { status } = req.body;
  try {
    const membership = await Membership.findByIdAndUpdate(
      membershipId,
      { status },
      { new: true }
    );
    if (!membership) return res.status(404).json({ message: 'Membership not found' });
    res.status(200).json({ message: 'Membership status updated', membership });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;