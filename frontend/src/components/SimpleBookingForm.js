import React, { useState } from 'react';
import './BookingForm.css';

const SimpleBookingForm = ({ roomId, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    
    // Emergency Contact
    emergencyName: '',
    emergencyPhone: '',
    
    // Move-in Details
    moveInDate: '',
    stayDuration: '',
    occupation: '',
    
    // Preferences
    gender: '',
    age: '',
    foodPreference: '',
    
    // Additional Info
    message: '',
    
    // Agreement
    agreeTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.agreeTerms) {
      onSubmit({ ...formData, roomId });
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.phone && 
               formData.emergencyName && formData.emergencyPhone;
      case 2:
        return formData.moveInDate && formData.stayDuration && formData.occupation;
      case 3:
        return formData.agreeTerms;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3>Contact Information</h3>
            
            <div className="form-section">
              <h4>Personal Details</h4>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h4>Emergency Contact</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Contact Name *</label>
                  <input
                    type="text"
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleInputChange}
                    placeholder="Emergency contact name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Contact Phone *</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h3>Booking Details</h3>
            
            <div className="form-section">
              <h4>Move-in Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Move-in Date *</label>
                  <input
                    type="date"
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Expected Stay Duration *</label>
                  <select
                    name="stayDuration"
                    value={formData.stayDuration}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select duration</option>
                    <option value="1-3">1-3 months</option>
                    <option value="3-6">3-6 months</option>
                    <option value="6-12">6-12 months</option>
                    <option value="12+">12+ months</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Occupation *</label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select occupation</option>
                  <option value="student">Student</option>
                  <option value="working">Working Professional</option>
                  <option value="business">Business Owner</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-section">
              <h4>Basic Preferences</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Your age"
                    min="18"
                    max="100"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Food Preference</label>
                <select
                  name="foodPreference"
                  value={formData.foodPreference}
                  onChange={handleInputChange}
                >
                  <option value="">Select preference</option>
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h3>Review & Submit</h3>
            
            <div className="form-section">
              <h4>Additional Information</h4>
              <div className="form-group">
                <label>Message/Special Requirements</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Any specific requirements or questions?"
                />
              </div>
            </div>
            
            <div className="form-section">
              <h4>Booking Summary</h4>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Name:</span>
                  <span className="summary-value">{formData.fullName}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Email:</span>
                  <span className="summary-value">{formData.email}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Phone:</span>
                  <span className="summary-value">{formData.phone}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Move-in Date:</span>
                  <span className="summary-value">{formData.moveInDate}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Stay Duration:</span>
                  <span className="summary-value">{formData.stayDuration} months</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Occupation:</span>
                  <span className="summary-value">{formData.occupation}</span>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h4>Terms & Conditions</h4>
              <div className="consent-items">
                <label className="consent-item">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                  />
                  I agree to the terms and conditions and understand that this is a booking request, 
                  not a confirmed reservation. The property owner will contact me to finalize the booking.
                </label>
              </div>
              
              {!formData.agreeTerms && (
                <div className="warning-message">
                  Please agree to the terms and conditions to submit your booking request.
                </div>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Contact Information";
      case 2: return "Booking Details";
      case 3: return "Review & Submit";
      default: return "";
    }
  };

  return (
    <div className="booking-form-overlay">
      <div className="booking-form-container">
        <div className="form-header">
          <h2>Quick Booking Request</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="form-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          <div className="step-indicator">
            Step {currentStep} of 3 - {getStepTitle()}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-step">
            {renderStep()}
          </div>
          
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn-prev">
                Previous
              </button>
            )}
            
            {currentStep < 3 ? (
              <button 
                type="button" 
                onClick={nextStep} 
                className="btn-next"
                disabled={!isStepValid()}
              >
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn-submit"
                disabled={!formData.agreeTerms}
              >
                Submit Booking Request
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SimpleBookingForm;