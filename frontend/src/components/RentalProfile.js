import React, { useState, useEffect } from 'react';
import { applications, payments } from '../services/api';
import PaymentModal from './PaymentModal';
import './RentalProfile.css';

const RentalProfile = () => {
  const [userApplications, setUserApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentBooking, setSelectedPaymentBooking] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    fetchUserApplications();
    fetchPaymentHistory();
  }, []);

  const fetchUserApplications = async () => {
    try {
      setLoading(true);
      // For production, implement proper user authentication
      // Currently using sample data for demonstration
      const demoApplications = [
        {
          id: 1,
          room_number: '101',
          property_name: 'Green Valley PG',
          status: 'approved',
          created_at: '2024-01-15T10:30:00Z',
          move_in_date: '2024-02-01',
          monthly_rent: 8000,
          security_deposit: 16000,
          application_data: {
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+91 9876543210',
            occupation: 'Software Engineer',
            duration: '6 months'
          }
        },
        {
          id: 2,
          room_number: '203',
          property_name: 'Sunshine Residency',
          status: 'pending',
          created_at: '2024-01-20T14:45:00Z',
          move_in_date: '2024-02-15',
          monthly_rent: 10000,
          security_deposit: 20000,
          application_data: {
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+91 9876543210',
            occupation: 'Software Engineer',
            duration: '12 months'
          }
        }
      ];
      setUserApplications(demoApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const userId = localStorage.getItem('userId') || 'guest-user';
      const response = await payments.getUserPayments(userId);
      setPaymentHistory(response.data.data || []);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  };

  const handlePayRent = (booking) => {
    setSelectedPaymentBooking(booking);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      await payments.process(paymentData);
      setShowPaymentModal(false);
      setSelectedPaymentBooking(null);
      fetchPaymentHistory(); // Refresh payment history
      alert('Payment successful! Receipt has been sent to your email.');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredApplications = userApplications.filter(app => {
    if (activeTab === 'active') {
      return app.status === 'approved';
    } else if (activeTab === 'pending') {
      return app.status === 'pending';
    } else {
      return app.status === 'rejected' || app.status === 'completed';
    }
  });

  if (loading) {
    return <div className="loading-container">Loading your rental profile...</div>;
  }

  return (
    <div className="rental-profile">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            <span>JD</span>
          </div>
          <div className="profile-details">
            <h1>John Doe</h1>
            <p>john.doe@example.com | +91 9876543210</p>
            <p className="member-since">Member since January 2024</p>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{userApplications.filter(a => a.status === 'approved').length}</span>
            <span className="stat-label">Active Rentals</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{userApplications.length}</span>
            <span className="stat-label">Total Bookings</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">4.8</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>
      </div>

      <div className="bookings-section">
        <div className="section-header">
          <h2>My Bookings</h2>
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Active
            </button>
            <button
              className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending
            </button>
            <button
              className={`tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </div>
        </div>

        <div className="bookings-grid">
          {filteredApplications.length === 0 ? (
            <div className="no-bookings">
              <p>No {activeTab} bookings found</p>
            </div>
          ) : (
            filteredApplications.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <h3>{booking.property_name}</h3>
                  <span className={`status-badge ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="booking-details">
                  <div className="detail-row">
                    <span className="label">Room:</span>
                    <span className="value">Room {booking.room_number}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Move-in Date:</span>
                    <span className="value">{formatDate(booking.move_in_date)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Monthly Rent:</span>
                    <span className="value">₹{booking.monthly_rent}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Duration:</span>
                    <span className="value">{booking.application_data.duration}</span>
                  </div>
                </div>

                <div className="booking-actions">
                  <button
                    className="btn-view-details"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    View Details
                  </button>
                  {booking.status === 'approved' && (
                    <button 
                      className="btn-pay-rent"
                      onClick={() => handlePayRent(booking)}
                    >
                      Pay Rent
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedBooking && (
        <div className="booking-modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Booking Details</h2>
              <button className="close-modal" onClick={() => setSelectedBooking(null)}>
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="modal-section">
                <h3>Property Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Property:</span>
                    <span className="value">{selectedBooking.property_name}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Room Number:</span>
                    <span className="value">{selectedBooking.room_number}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Status:</span>
                    <span className={`value ${getStatusColor(selectedBooking.status)}`}>
                      {selectedBooking.status}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Applied On:</span>
                    <span className="value">{formatDate(selectedBooking.created_at)}</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Rental Details</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Move-in Date:</span>
                    <span className="value">{formatDate(selectedBooking.move_in_date)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Duration:</span>
                    <span className="value">{selectedBooking.application_data.duration}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Monthly Rent:</span>
                    <span className="value">₹{selectedBooking.monthly_rent}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Security Deposit:</span>
                    <span className="value">₹{selectedBooking.security_deposit}</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Name:</span>
                    <span className="value">{selectedBooking.application_data.fullName}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{selectedBooking.application_data.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Phone:</span>
                    <span className="value">{selectedBooking.application_data.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Occupation:</span>
                    <span className="value">{selectedBooking.application_data.occupation}</span>
                  </div>
                </div>
              </div>

              {selectedBooking.status === 'approved' && (
                <div className="modal-actions">
                  <button className="btn-download">Download Agreement</button>
                  <button className="btn-contact">Contact Property</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && selectedPaymentBooking && (
        <PaymentModal
          booking={selectedPaymentBooking}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPaymentBooking(null);
          }}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default RentalProfile;