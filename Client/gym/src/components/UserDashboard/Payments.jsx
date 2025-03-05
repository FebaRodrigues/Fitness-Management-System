// src/components/UserDashboard/Payments.jsx
import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import API from '../../api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ amount, type, trainerId, membershipId }) => {
  const stripe = useStripe();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !amount) return;

    try {
      const { data } = await API.post('/payments', {
        amount: Number(amount),
        type,
        trainerId,
        membershipId,
      });

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        console.error('Stripe error:', error);
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={!stripe || !amount}>
        Pay ${amount || '0'}
      </button>
    </form>
  );
};

const Payments = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [paymentType, setPaymentType] = useState('Membership');
  const [amount, setAmount] = useState('');
  const [trainerId, setTrainerId] = useState('');
  const [membershipId, setMembershipId] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedPlan = location.state?.selectedPlan;

  useEffect(() => {
    if (!user || !user.id) {
      setError('User not authenticated');
      return;
    }

    const fetchPayments = async () => {
      try {
        const response = await API.get(`/payments/user/${user.id}`);
        setPayments(response.data);
      } catch (error) {
        setError('Error fetching payments: ' + error.message);
      }
    };

    fetchPayments();

    if (selectedPlan) {
      setPaymentType('Membership');
      setAmount(selectedPlan.price.toString());
      handleSendOTP();
    }

    const urlParams = new URLSearchParams(location.search);
    const sessionId = urlParams.get('session_id');
    if (sessionId) {
      setSuccessMessage('Payment successful!');
      fetchPayments();
      setTimeout(() => {
        navigate('/user/payments', { replace: true });
      }, 3000);
    }
  }, [user, location, navigate, selectedPlan]);

  const handleSendOTP = async () => {
    try {
      const response = await API.post('/payments/send-otp', { userId: user.id });
      console.log('Send OTP Response:', response.data); // Add this
      setOtpSent(true);
      setError(null);
    } catch (error) {
      console.error('Send OTP Error:', error.response?.data);
      setError('Error sending OTP: ' + error.message);
    }
  };

  const handleVerifyOTP = async () => {
    console.log('Sending OTP to verify:', otp); // Add this
    try {
      const response = await API.post('/payments/verify-otp', { otp });
      if (response.data.message === 'OTP verified successfully') {
        setOtpSent(false);
        setSuccessMessage('OTP verified! Proceeding to payment...');
      }
    } catch (error) {
      console.error('OTP Verification Error:', error.response?.data); // Log server response
      setError(error.response?.data?.message || 'Invalid or expired OTP');
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Payment Management</h2>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

      {selectedPlan && !otpSent && (
        <div>
          <h3>Selected Plan: {selectedPlan.type}</h3>
          <p>Amount: ${selectedPlan.price}</p>
          <Elements stripe={stripePromise}>
            <PaymentForm
              amount={amount}
              type={paymentType}
              trainerId={trainerId || null}
              membershipId={membershipId || null}
            />
          </Elements>
        </div>
      )}

      {otpSent && (
        <div>
          <h3>Enter OTP</h3>
          <p>An OTP has been sent to your Gmail ({user.email}).</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            maxLength={6}
          />
          <button onClick={handleVerifyOTP}>Verify OTP</button>
        </div>
      )}

      {!selectedPlan && (
        <>
          <h3>Your Payment History</h3>
          {payments.length > 0 ? (
            <ul>
              {payments.map((payment) => (
                <li key={payment._id}>
                  {payment.type} - ${payment.amount} - {payment.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No payments yet.</p>
          )}

          <h3>Make a Payment</h3>
          <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
            <option value="Membership">Membership</option>
            <option value="TrainerSession">Trainer Session</option>
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            required
          />
          {paymentType === 'TrainerSession' && (
            <input
              type="text"
              value={trainerId}
              onChange={(e) => setTrainerId(e.target.value)}
              placeholder="Trainer ID (optional)"
            />
          )}
          {paymentType === 'Membership' && (
            <input
              type="text"
              value={membershipId}
              onChange={(e) => setMembershipId(e.target.value)}
              placeholder="Membership ID (optional)"
            />
          )}
          <button onClick={handleSendOTP}>Send OTP</button>
        </>
      )}
    </div>
  );
};

export default Payments;