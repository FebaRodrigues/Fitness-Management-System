// src/components/UserDashboard/Membership.jsx
import React, { useContext, useEffect, useState } from 'react';
import API from '../../api';
import { AuthContext } from '../../context/AuthContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payments from './Payments';
import UserNavbar from '../Navbar/UserNavbar';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Membership = () => {
  const { user } = useContext(AuthContext);
  const [memberships, setMemberships] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { type: 'Basic', price: 10, duration: 'Monthly' },
    { type: 'Premium', price: 25, duration: 'Monthly' },
    { type: 'Elite', price: 50, duration: 'Monthly' },
  ];

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await API.get(`/memberships/user/${user.id}`);
        setMemberships(response.data);
      } catch (error) {
        console.error('Error fetching memberships:', error);
      }
    };
    fetchMemberships();
  }, [user]);

  const handleSubscribe = async (plan) => {
    setSelectedPlan(plan);
    try {
      await API.post('/memberships', {
        planType: plan.type,
        duration: plan.duration,
        price: plan.price,
      });
    } catch (error) {
      console.error('Error creating membership:', error);
    }
  };

  return (
    <div>
      <UserNavbar />
      <h2>Membership Subscription</h2>
      <h3>Your Current Memberships</h3>
      {memberships.length > 0 ? (
        <ul>
          {memberships.map((membership) => (
            <li key={membership._id}>
              {membership.planType} - {membership.duration} - ${membership.price} - {membership.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No memberships yet.</p>
      )}

      <h3>Choose a Plan</h3>
      <div>
        {plans.map((plan) => (
          <div key={plan.type}>
            <h4>{plan.type}</h4>
            <p>${plan.price} / {plan.duration}</p>
            <button onClick={() => handleSubscribe(plan)}>Subscribe</button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <Elements stripe={stripePromise}>
          <Payments
            amount={selectedPlan.price}
            type="Membership"
            membershipId={memberships[memberships.length - 1]?._id}
          />
        </Elements>
      )}
    </div>
  );
};

export default Membership;