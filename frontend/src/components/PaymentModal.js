import React, { useState } from 'react';
import './PaymentModal.css';

const PaymentModal = ({ booking, onClose, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    bankAccount: '',
    ifscCode: '',
    collectionDate: '',
    collectionTime: '',
    collectorName: '',
    notes: ''
  });
  const [processing, setProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('details'); // details, processing, success

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateCharges = () => {
    const rentAmount = booking.monthly_rent;
    const maintenanceCharges = Math.round(rentAmount * 0.1); // 10% maintenance
    const processingFee = 99;
    const total = rentAmount + maintenanceCharges + processingFee;

    return {
      rentAmount,
      maintenanceCharges,
      processingFee,
      total
    };
  };

  const charges = calculateCharges();

  const validatePaymentDetails = () => {
    switch (paymentMethod) {
      case 'upi':
        return paymentDetails.upiId && paymentDetails.upiId.includes('@');
      case 'card':
        return paymentDetails.cardNumber.length === 16 && 
               paymentDetails.cardName && 
               paymentDetails.cardExpiry && 
               paymentDetails.cardCvv.length === 3;
      case 'netbanking':
        return paymentDetails.bankAccount && paymentDetails.ifscCode;
      case 'cash':
        return paymentDetails.collectionDate && 
               paymentDetails.collectionTime && 
               paymentDetails.collectorName;
      default:
        return false;
    }
  };

  const handlePayment = async () => {
    if (!validatePaymentDetails()) {
      alert('Please fill in all payment details correctly');
      return;
    }

    setProcessing(true);
    setPaymentStep('processing');

    // Simulate payment processing
    const processingTime = paymentMethod === 'cash' ? 1000 : 3000;
    
    setTimeout(() => {
      setPaymentStep('success');
      setProcessing(false);
      
      // Call success callback after showing success screen
      setTimeout(() => {
        const paymentData = {
          bookingId: booking.id,
          amount: charges.total,
          paymentMethod,
          transactionId: paymentMethod === 'cash' ? `CASH${Date.now()}` : `TXN${Date.now()}`,
          paymentDate: new Date().toISOString()
        };
        
        if (paymentMethod === 'cash') {
          paymentData.cashDetails = {
            collectionDate: paymentDetails.collectionDate,
            collectionTime: paymentDetails.collectionTime,
            collectorName: paymentDetails.collectorName,
            notes: paymentDetails.notes
          };
        }
        
        onPaymentSuccess(paymentData);
      }, 2000);
    }, processingTime);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'upi':
        return (
          <div className="payment-form">
            <div className="form-group">
              <label>UPI ID</label>
              <input
                type="text"
                name="upiId"
                placeholder="yourname@upi"
                value={paymentDetails.upiId}
                onChange={handleInputChange}
                className="payment-input"
              />
            </div>
            <div className="upi-apps">
              <p>Or pay using</p>
              <div className="app-icons">
                <div className="app-icon">GPay</div>
                <div className="app-icon">PhonePe</div>
                <div className="app-icon">Paytm</div>
                <div className="app-icon">BHIM</div>
              </div>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="payment-form">
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                maxLength="16"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                className="payment-input"
              />
            </div>
            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                name="cardName"
                placeholder="John Doe"
                value={paymentDetails.cardName}
                onChange={handleInputChange}
                className="payment-input"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="cardExpiry"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={paymentDetails.cardExpiry}
                  onChange={handleInputChange}
                  className="payment-input"
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cardCvv"
                  placeholder="123"
                  maxLength="3"
                  value={paymentDetails.cardCvv}
                  onChange={handleInputChange}
                  className="payment-input"
                />
              </div>
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div className="payment-form">
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                name="bankAccount"
                placeholder="Enter account number"
                value={paymentDetails.bankAccount}
                onChange={handleInputChange}
                className="payment-input"
              />
            </div>
            <div className="form-group">
              <label>IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                placeholder="ABCD0123456"
                value={paymentDetails.ifscCode}
                onChange={handleInputChange}
                className="payment-input"
              />
            </div>
            <div className="bank-list">
              <p>Popular Banks</p>
              <div className="bank-options">
                <div className="bank-option">SBI</div>
                <div className="bank-option">HDFC</div>
                <div className="bank-option">ICICI</div>
                <div className="bank-option">Axis</div>
              </div>
            </div>
          </div>
        );

      case 'cash':
        return (
          <div className="payment-form">
            <div className="cash-notice">
              <p>📍 Please visit the property office to make cash payment</p>
            </div>
            
            <div className="form-group">
              <label>Preferred Collection Date *</label>
              <input
                type="date"
                name="collectionDate"
                value={paymentDetails.collectionDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="payment-input"
              />
            </div>
            
            <div className="form-group">
              <label>Preferred Time *</label>
              <select
                name="collectionTime"
                value={paymentDetails.collectionTime}
                onChange={handleInputChange}
                className="payment-input"
              >
                <option value="">Select time slot</option>
                <option value="09:00-11:00">9:00 AM - 11:00 AM</option>
                <option value="11:00-13:00">11:00 AM - 1:00 PM</option>
                <option value="14:00-16:00">2:00 PM - 4:00 PM</option>
                <option value="16:00-18:00">4:00 PM - 6:00 PM</option>
                <option value="18:00-20:00">6:00 PM - 8:00 PM</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Person Submitting Payment *</label>
              <input
                type="text"
                name="collectorName"
                placeholder="Enter your name"
                value={paymentDetails.collectorName}
                onChange={handleInputChange}
                className="payment-input"
              />
            </div>
            
            <div className="form-group">
              <label>Additional Notes (Optional)</label>
              <textarea
                name="notes"
                placeholder="Any special instructions or requests"
                value={paymentDetails.notes}
                onChange={handleInputChange}
                className="payment-input"
                rows="3"
              />
            </div>
            
            <div className="cash-info">
              <h4>Office Address:</h4>
              <p>{booking.property_name}</p>
              <p>Ground Floor, Reception Desk</p>
              <p>Office Hours: 9:00 AM - 8:00 PM</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (paymentStep === 'processing') {
    return (
      <div className="payment-modal-overlay">
        <div className="payment-modal processing-modal">
          <div className="processing-content">
            <div className="processing-spinner"></div>
            <h2>{paymentMethod === 'cash' ? 'Scheduling Cash Payment' : 'Processing Payment'}</h2>
            <p>{paymentMethod === 'cash' ? 'Please wait while we schedule your cash payment...' : 'Please wait while we process your payment...'}</p>
            <p className="amount-processing">₹{charges.total}</p>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStep === 'success') {
    return (
      <div className="payment-modal-overlay">
        <div className="payment-modal success-modal">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h2>{paymentMethod === 'cash' ? 'Cash Payment Scheduled!' : 'Payment Successful!'}</h2>
            <p>
              {paymentMethod === 'cash' 
                ? 'Your cash payment appointment has been scheduled successfully.' 
                : 'Your rent payment has been processed successfully.'}
            </p>
            <div className="transaction-details">
              <p><strong>{paymentMethod === 'cash' ? 'Reference ID:' : 'Transaction ID:'}</strong> {paymentMethod === 'cash' ? 'CASH' : 'TXN'}{Date.now()}</p>
              <p><strong>Amount {paymentMethod === 'cash' ? 'Due:' : 'Paid:'}</strong> ₹{charges.total}</p>
              <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              {paymentMethod === 'cash' && paymentDetails.collectionDate && (
                <>
                  <p><strong>Collection Date:</strong> {new Date(paymentDetails.collectionDate).toLocaleDateString()}</p>
                  <p><strong>Time Slot:</strong> {paymentDetails.collectionTime}</p>
                  <p><strong>Collector:</strong> {paymentDetails.collectorName}</p>
                </>
              )}
            </div>
            <button className="btn-download-receipt">
              {paymentMethod === 'cash' ? 'Download Appointment Slip' : 'Download Receipt'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="payment-header">
          <h2>Pay Rent</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="payment-content">
          <div className="booking-info">
            <h3>Payment Details</h3>
            <div className="info-row">
              <span>Property:</span>
              <span>{booking.property_name}</span>
            </div>
            <div className="info-row">
              <span>Room:</span>
              <span>Room {booking.room_number}</span>
            </div>
            <div className="info-row">
              <span>Month:</span>
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="charges-breakdown">
            <h3>Charges Breakdown</h3>
            <div className="charge-row">
              <span>Monthly Rent</span>
              <span>₹{charges.rentAmount}</span>
            </div>
            <div className="charge-row">
              <span>Maintenance Charges</span>
              <span>₹{charges.maintenanceCharges}</span>
            </div>
            <div className="charge-row">
              <span>Processing Fee</span>
              <span>₹{charges.processingFee}</span>
            </div>
            <div className="charge-row total">
              <span>Total Amount</span>
              <span>₹{charges.total}</span>
            </div>
          </div>

          <div className="payment-methods">
            <h3>Select Payment Method</h3>
            <div className="method-tabs">
              <button
                className={`method-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                UPI
              </button>
              <button
                className={`method-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                Credit/Debit Card
              </button>
              <button
                className={`method-tab ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('netbanking')}
              >
                Net Banking
              </button>
              <button
                className={`method-tab ${paymentMethod === 'cash' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('cash')}
              >
                Cash
              </button>
            </div>

            {renderPaymentForm()}
          </div>

          <div className="payment-footer">
            <button 
              className="btn-cancel" 
              onClick={onClose}
              disabled={processing}
            >
              Cancel
            </button>
            <button 
              className="btn-pay"
              onClick={handlePayment}
              disabled={processing || !validatePaymentDetails()}
            >
              {paymentMethod === 'cash' ? `Schedule Payment ₹${charges.total}` : `Pay ₹${charges.total}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;