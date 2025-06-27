import React, { useState, useEffect, useRef } from 'react';
import './BookingForm.css';

const BookingForm = ({ roomId, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const formStepRef = useRef(null);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    preferredName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    currentAddress: '',
    city: '',
    state: '',
    zip: '',
    
    // Emergency Contact
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    emergencyEmail: '',
    
    // Rental Requirements
    moveInDate: '',
    stayLength: '',
    reasonForMoving: '',
    reasonOther: '',
    monthlyBudgetMin: '',
    monthlyBudgetMax: '',
    paymentMethod: '',
    canPayUpfront: '',
    
    // Background Information
    employmentStatus: '',
    employerName: '',
    position: '',
    monthlyIncome: '',
    canProvideProof: '',
    currentLivingSituation: '',
    currentLivingOther: '',
    currentLandlord: '',
    landlordContact: '',
    hasBeenEvicted: '',
    evictionExplanation: '',
    
    // Lifestyle & Preferences
    workSchedule: '',
    wakeTime: '',
    sleepTime: '',
    smoking: '',
    alcohol: '',
    hasPets: '',
    petDetails: '',
    overnightGuests: '',
    cookingFrequency: '',
    cleanlinessLevel: 5,
    noiseLevel: 5,
    hobbies: '',
    hasInstruments: '',
    instruments: '',
    
    // Room Preferences
    mustHaves: [],
    niceToHaves: [],
    preferredGender: '',
    preferredAgeMin: '',
    preferredAgeMax: '',
    maxHousemates: '',
    okWithChildren: '',
    okWithPets: '',
    okPetTypes: '',
    
    // Verification & References
    idType: '',
    idNumber: '',
    backgroundCheck: '',
    reference1Name: '',
    reference1Relationship: '',
    reference1Phone: '',
    reference1Email: '',
    reference2Name: '',
    reference2Relationship: '',
    reference2Phone: '',
    reference2Email: '',
    
    // Additional Information
    medicalConditions: '',
    hasAccessibilityNeeds: '',
    accessibilityDetails: '',
    aboutYourself: '',
    questionsForLandlord: '',
    
    // Agreement
    certifyAccurate: false,
    understandFalseInfo: false,
    consentChecks: false,
    agreeRules: false,
    understandApplication: false,
    agreeTerms: false,
    digitalSignature: '',
    signatureDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    checkScrollable();
  }, [currentStep]);

  useEffect(() => {
    const handleScroll = () => {
      if (formStepRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = formStepRef.current;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
        setShowScrollIndicator(!isAtBottom && scrollHeight > clientHeight);
      }
    };

    const formStep = formStepRef.current;
    if (formStep) {
      formStep.addEventListener('scroll', handleScroll);
      return () => formStep.removeEventListener('scroll', handleScroll);
    }
  }, [currentStep]);

  const checkScrollable = () => {
    setTimeout(() => {
      if (formStepRef.current) {
        const { scrollHeight, clientHeight } = formStepRef.current;
        setShowScrollIndicator(scrollHeight > clientHeight);
      }
    }, 100);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'mustHaves' || name === 'niceToHaves') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    if (currentStep < 7) {
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
    onSubmit({ ...formData, roomId });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3>Personal Information</h3>
            
            <div className="form-section">
              <h4>Basic Details</h4>
              <div className="form-group">
                <label>Full Legal Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Preferred Name/Nickname</label>
                <input
                  type="text"
                  name="preferredName"
                  value={formData.preferredName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Current Address *</label>
                <input
                  type="text"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>ZIP *</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h4>Emergency Contact</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Relationship *</label>
                  <input
                    type="text"
                    name="emergencyRelationship"
                    value={formData.emergencyRelationship}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="emergencyEmail"
                    value={formData.emergencyEmail}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h3>Rental Requirements</h3>
            
            <div className="form-section">
              <h4>Move-in Details</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Desired Move-in Date *</label>
                  <input
                    type="date"
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Intended Length of Stay *</label>
                  <select
                    name="stayLength"
                    value={formData.stayLength}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="1-3">1-3 months</option>
                    <option value="3-6">3-6 months</option>
                    <option value="6-12">6-12 months</option>
                    <option value="12+">12+ months</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Reason for Moving *</label>
                <select
                  name="reasonForMoving"
                  value={formData.reasonForMoving}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="work">Work/Job</option>
                  <option value="education">Education</option>
                  <option value="relocation">Relocation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              {formData.reasonForMoving === 'other' && (
                <div className="form-group">
                  <label>Please specify</label>
                  <input
                    type="text"
                    name="reasonOther"
                    value={formData.reasonOther}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
            
            <div className="form-section">
              <h4>Budget & Payment</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Monthly Budget Range (₹) *</label>
                  <div className="budget-range">
                    <input
                      type="number"
                      name="monthlyBudgetMin"
                      placeholder="Min"
                      value={formData.monthlyBudgetMin}
                      onChange={handleInputChange}
                      required
                    />
                    <span>to</span>
                    <input
                      type="number"
                      name="monthlyBudgetMax"
                      placeholder="Max"
                      value={formData.monthlyBudgetMax}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Payment Method *</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="cash">Cash</option>
                  <option value="check">Check</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Can you pay first month + security deposit upfront? *</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="canPayUpfront"
                      value="yes"
                      checked={formData.canPayUpfront === 'yes'}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="canPayUpfront"
                      value="no"
                      checked={formData.canPayUpfront === 'no'}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h3>Background Information</h3>
            
            <div className="form-section">
              <h4>Employment/Education</h4>
              <div className="form-group">
                <label>Current Status *</label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="employed">Employed</option>
                  <option value="student">Student</option>
                  <option value="self-employed">Self-employed</option>
                  <option value="unemployed">Unemployed</option>
                </select>
              </div>
              
              {formData.employmentStatus !== 'unemployed' && (
                <>
                  <div className="form-group">
                    <label>Employer/School Name</label>
                    <input
                      type="text"
                      name="employerName"
                      value={formData.employerName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Position/Major</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              
              <div className="form-row">
                <div className="form-group">
                  <label>Monthly Income (₹)</label>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Can provide proof of income?</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="canProvideProof"
                        value="yes"
                        checked={formData.canProvideProof === 'yes'}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="canProvideProof"
                        value="no"
                        checked={formData.canProvideProof === 'no'}
                        onChange={handleInputChange}
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h4>Rental History</h4>
              <div className="form-group">
                <label>Current Living Situation *</label>
                <select
                  name="currentLivingSituation"
                  value={formData.currentLivingSituation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="renting">Renting</option>
                  <option value="own">Own Home</option>
                  <option value="family">Living with Family</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              {formData.currentLivingSituation === 'other' && (
                <div className="form-group">
                  <label>Please specify</label>
                  <input
                    type="text"
                    name="currentLivingOther"
                    value={formData.currentLivingOther}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              
              {formData.currentLivingSituation === 'renting' && (
                <>
                  <div className="form-group">
                    <label>Current Landlord/Reference</label>
                    <input
                      type="text"
                      name="currentLandlord"
                      value={formData.currentLandlord}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      type="tel"
                      name="landlordContact"
                      value={formData.landlordContact}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              
              <div className="form-group">
                <label>Have you ever been evicted?</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="hasBeenEvicted"
                      value="yes"
                      checked={formData.hasBeenEvicted === 'yes'}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="hasBeenEvicted"
                      value="no"
                      checked={formData.hasBeenEvicted === 'no'}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
              
              {formData.hasBeenEvicted === 'yes' && (
                <div className="form-group">
                  <label>Please explain</label>
                  <textarea
                    name="evictionExplanation"
                    value={formData.evictionExplanation}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>
              )}
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h3>Lifestyle & Preferences</h3>
            
            <div className="form-section">
              <h4>Daily Schedule</h4>
              <div className="form-group">
                <label>Work/School Schedule</label>
                <select
                  name="workSchedule"
                  value={formData.workSchedule}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="9-5">9-5</option>
                  <option value="night">Night Shift</option>
                  <option value="flexible">Flexible/Remote</option>
                  <option value="irregular">Irregular</option>
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Typical Wake Time</label>
                  <input
                    type="time"
                    name="wakeTime"
                    value={formData.wakeTime}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Typical Sleep Time</label>
                  <input
                    type="time"
                    name="sleepTime"
                    value={formData.sleepTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h4>Living Habits</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Smoking</label>
                  <select
                    name="smoking"
                    value={formData.smoking}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="outside">Outside only</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Alcohol Consumption</label>
                  <select
                    name="alcohol"
                    value={formData.alcohol}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>
                    <option value="never">Never</option>
                    <option value="socially">Socially</option>
                    <option value="regularly">Regularly</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Pets</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="hasPets"
                      value="yes"
                      checked={formData.hasPets === 'yes'}
                      onChange={handleInputChange}
                    />
                    Have pets
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="hasPets"
                      value="no"
                      checked={formData.hasPets === 'no'}
                      onChange={handleInputChange}
                    />
                    No pets
                  </label>
                </div>
              </div>
              
              {formData.hasPets === 'yes' && (
                <div className="form-group">
                  <label>Please specify</label>
                  <input
                    type="text"
                    name="petDetails"
                    value={formData.petDetails}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              
              <div className="form-row">
                <div className="form-group">
                  <label>Overnight Guests</label>
                  <select
                    name="overnightGuests"
                    value={formData.overnightGuests}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>
                    <option value="never">Never</option>
                    <option value="rarely">Rarely</option>
                    <option value="occasionally">Occasionally</option>
                    <option value="frequently">Frequently</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Cooking Frequency</label>
                  <select
                    name="cookingFrequency"
                    value={formData.cookingFrequency}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>
                    <option value="daily">Daily</option>
                    <option value="few-week">Few times/week</option>
                    <option value="rarely">Rarely</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Cleanliness Level (1-10, 10 being very clean)</label>
                  <input
                    type="range"
                    name="cleanlinessLevel"
                    min="1"
                    max="10"
                    value={formData.cleanlinessLevel}
                    onChange={handleInputChange}
                  />
                  <span className="range-value">{formData.cleanlinessLevel}</span>
                </div>
                
                <div className="form-group">
                  <label>Noise Level (1-10, 10 being very quiet)</label>
                  <input
                    type="range"
                    name="noiseLevel"
                    min="1"
                    max="10"
                    value={formData.noiseLevel}
                    onChange={handleInputChange}
                  />
                  <span className="range-value">{formData.noiseLevel}</span>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h4>Interests & Hobbies</h4>
              <div className="form-group">
                <label>List main hobbies/interests</label>
                <textarea
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleInputChange}
                  rows="2"
                />
              </div>
              
              <div className="form-group">
                <label>Musical Instruments</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="hasInstruments"
                      value="yes"
                      checked={formData.hasInstruments === 'yes'}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="hasInstruments"
                      value="no"
                      checked={formData.hasInstruments === 'no'}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
              
              {formData.hasInstruments === 'yes' && (
                <div className="form-group">
                  <label>Which instruments?</label>
                  <input
                    type="text"
                    name="instruments"
                    value={formData.instruments}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          </>
        );

      case 5:
        return (
          <>
            <h3>Room & Roommate Preferences</h3>
            
            <div className="form-section">
              <h4>Room Must-Haves</h4>
              <div className="checkbox-grid">
                {[
                  { value: 'privateBathroom', label: 'Private Bathroom' },
                  { value: 'kitchenAccess', label: 'Kitchen Access' },
                  { value: 'parkingSpace', label: 'Parking Space' },
                  { value: 'laundryAccess', label: 'Laundry Access' },
                  { value: 'airConditioning', label: 'Air Conditioning' },
                  { value: 'furnished', label: 'Furnished Room' },
                  { value: 'internetIncluded', label: 'Internet Included' },
                  { value: 'utilitiesIncluded', label: 'Utilities Included' },
                  { value: 'privateEntrance', label: 'Private Entrance' }
                ].map(item => (
                  <label key={item.value} className="checkbox-item">
                    <input
                      type="checkbox"
                      name="mustHaves"
                      value={item.value}
                      checked={formData.mustHaves.includes(item.value)}
                      onChange={handleInputChange}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-section">
              <h4>Nice-to-Haves</h4>
              <div className="checkbox-grid">
                {[
                  { value: 'nearTransit', label: 'Near Public Transit' },
                  { value: 'gymAccess', label: 'Gym Access' },
                  { value: 'outdoorSpace', label: 'Outdoor Space' },
                  { value: 'storageSpace', label: 'Storage Space' },
                  { value: 'workArea', label: 'Work/Study Area' },
                  { value: 'tvInRoom', label: 'TV in Room' }
                ].map(item => (
                  <label key={item.value} className="checkbox-item">
                    <input
                      type="checkbox"
                      name="niceToHaves"
                      value={item.value}
                      checked={formData.niceToHaves.includes(item.value)}
                      onChange={handleInputChange}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-section">
              <h4>Roommate Preferences</h4>
              <div className="form-group">
                <label>Preferred Gender of Roommates</label>
                <select
                  name="preferredGender"
                  value={formData.preferredGender}
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="no-preference">No Preference</option>
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Age Range</label>
                  <div className="age-range">
                    <input
                      type="number"
                      name="preferredAgeMin"
                      placeholder="Min"
                      value={formData.preferredAgeMin}
                      onChange={handleInputChange}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      name="preferredAgeMax"
                      placeholder="Max"
                      value={formData.preferredAgeMax}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Maximum Number of Housemates</label>
                  <input
                    type="number"
                    name="maxHousemates"
                    value={formData.maxHousemates}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>OK with Children in House?</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="okWithChildren"
                        value="yes"
                        checked={formData.okWithChildren === 'yes'}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="okWithChildren"
                        value="no"
                        checked={formData.okWithChildren === 'no'}
                        onChange={handleInputChange}
                      />
                      No
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>OK with Pets in House?</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="okWithPets"
                        value="yes"
                        checked={formData.okWithPets === 'yes'}
                        onChange={handleInputChange}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="okWithPets"
                        value="no"
                        checked={formData.okWithPets === 'no'}
                        onChange={handleInputChange}
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
              
              {formData.okWithPets === 'yes' && (
                <div className="form-group">
                  <label>Which types?</label>
                  <input
                    type="text"
                    name="okPetTypes"
                    value={formData.okPetTypes}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          </>
        );

      case 6:
        return (
          <>
            <h3>Verification & Additional Information</h3>
            
            <div className="form-section">
              <h4>Identity Verification</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Government ID Type</label>
                  <select
                    name="idType"
                    value={formData.idType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>
                    <option value="drivers-license">Driver's License</option>
                    <option value="passport">Passport</option>
                    <option value="state-id">State ID</option>
                    <option value="aadhaar">Aadhaar Card</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>ID Number</label>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Willing to undergo background check?</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="backgroundCheck"
                      value="yes"
                      checked={formData.backgroundCheck === 'yes'}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="backgroundCheck"
                      value="no"
                      checked={formData.backgroundCheck === 'no'}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h4>References</h4>
              <div className="reference-block">
                <h5>Reference 1</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="reference1Name"
                      value={formData.reference1Name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Relationship</label>
                    <input
                      type="text"
                      name="reference1Relationship"
                      value={formData.reference1Relationship}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="reference1Phone"
                      value={formData.reference1Phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="reference1Email"
                      value={formData.reference1Email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="reference-block">
                <h5>Reference 2</h5>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="reference2Name"
                      value={formData.reference2Name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Relationship</label>
                    <input
                      type="text"
                      name="reference2Relationship"
                      value={formData.reference2Relationship}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="reference2Phone"
                      value={formData.reference2Phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="reference2Email"
                      value={formData.reference2Email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h4>Additional Information</h4>
              <div className="form-group">
                <label>Any medical conditions/allergies the landlord should know?</label>
                <textarea
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  rows="2"
                />
              </div>
              
              <div className="form-group">
                <label>Any accessibility requirements?</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="hasAccessibilityNeeds"
                      value="yes"
                      checked={formData.hasAccessibilityNeeds === 'yes'}
                      onChange={handleInputChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="hasAccessibilityNeeds"
                      value="no"
                      checked={formData.hasAccessibilityNeeds === 'no'}
                      onChange={handleInputChange}
                    />
                    No
                  </label>
                </div>
              </div>
              
              {formData.hasAccessibilityNeeds === 'yes' && (
                <div className="form-group">
                  <label>Please specify</label>
                  <textarea
                    name="accessibilityDetails"
                    value={formData.accessibilityDetails}
                    onChange={handleInputChange}
                    rows="2"
                  />
                </div>
              )}
              
              <div className="form-group">
                <label>Tell us about yourself (personality, interests, why you'd be a good housemate)</label>
                <textarea
                  name="aboutYourself"
                  value={formData.aboutYourself}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>
              
              <div className="form-group">
                <label>Any specific questions about the room/house?</label>
                <textarea
                  name="questionsForLandlord"
                  value={formData.questionsForLandlord}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
            </div>
          </>
        );

      case 7:
        return (
          <>
            <h3>Agreement & Consent</h3>
            
            <div className="form-section">
              <h4>Terms and Conditions</h4>
              <div className="consent-items">
                <label className="consent-item">
                  <input
                    type="checkbox"
                    name="certifyAccurate"
                    checked={formData.certifyAccurate}
                    onChange={handleInputChange}
                  />
                  I certify that all information provided is accurate and complete
                </label>
                
                <label className="consent-item">
                  <input
                    type="checkbox"
                    name="understandFalseInfo"
                    checked={formData.understandFalseInfo}
                    onChange={handleInputChange}
                  />
                  I understand that false information may result in application rejection
                </label>
                
                <label className="consent-item">
                  <input
                    type="checkbox"
                    name="consentChecks"
                    checked={formData.consentChecks}
                    onChange={handleInputChange}
                  />
                  I consent to background and reference checks
                </label>
                
                <label className="consent-item">
                  <input
                    type="checkbox"
                    name="agreeRules"
                    checked={formData.agreeRules}
                    onChange={handleInputChange}
                  />
                  I agree to abide by house rules if accepted
                </label>
                
                <label className="consent-item">
                  <input
                    type="checkbox"
                    name="understandApplication"
                    checked={formData.understandApplication}
                    onChange={handleInputChange}
                  />
                  I understand this is an application and not a guarantee of acceptance
                </label>
                
                <label className="consent-item">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                  />
                  I agree to the platform's Terms of Service and Privacy Policy
                </label>
              </div>
            </div>
            
            <div className="form-section">
              <h4>Digital Signature</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Digital Signature (Type your full name) *</label>
                  <input
                    type="text"
                    name="digitalSignature"
                    value={formData.digitalSignature}
                    onChange={handleInputChange}
                    placeholder="Type your full legal name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="signatureDate"
                    value={formData.signatureDate}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
              </div>
            </div>
            
            {(!formData.certifyAccurate || !formData.understandFalseInfo || !formData.consentChecks || 
              !formData.agreeRules || !formData.understandApplication || !formData.agreeTerms || 
              !formData.digitalSignature) && (
              <div className="warning-message">
                Please check all boxes and provide your digital signature to proceed.
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  const isLastStepValid = () => {
    return formData.certifyAccurate && 
           formData.understandFalseInfo && 
           formData.consentChecks && 
           formData.agreeRules && 
           formData.understandApplication && 
           formData.agreeTerms && 
           formData.digitalSignature;
  };

  return (
    <div className="booking-form-overlay">
      <div className="booking-form-container">
        <div className="form-header">
          <h2>Room Booking Application</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="form-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / 7) * 100}%` }}
            />
          </div>
          <div className="step-indicator">
            Step {currentStep} of 7
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-step" ref={formStepRef}>
            {renderStep()}
          </div>
          
          {showScrollIndicator && (
            <div className="scroll-indicator" />
          )}
          
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn-prev">
                Previous
              </button>
            )}
            
            {currentStep < 7 ? (
              <button type="button" onClick={nextStep} className="btn-next">
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn-submit"
                disabled={!isLastStepValid()}
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;