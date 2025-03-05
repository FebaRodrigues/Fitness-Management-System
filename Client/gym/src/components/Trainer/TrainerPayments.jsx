// src/components/Trainer/TrainerPayments.jsx
import React, { useContext, useEffect, useState } from 'react';
import API from '../../api';
import { AuthContext } from '../../context/AuthContext';

const TrainerPayments = () => {
  const { trainer } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await API.get(`/payments/trainer/${trainer.id}`);
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching trainer payments:', error);
      }
    };
    fetchPayments();
  }, [trainer]);

  return (
    <div>
      <h2>Your Earnings</h2>
      {payments.length > 0 ? (
        <ul>
          {payments.map((payment) => (
            <li key={payment._id}>
              ${payment.amount} - {payment.status} - Paid by User {payment.userId}
            </li>
          ))}
        </ul>
      ) : (
        <p>No payments received yet.</p>
      )}
    </div>
  );
};

export default TrainerPayments;