# Product Requirements Document (PRD)
## PG Rental Management System

### Version 1.0
### Date: January 2024

---

## 1. Executive Summary

The PG (Paying Guest) Rental Management System is a comprehensive web-based platform designed to streamline the process of finding, booking, and managing paying guest accommodations. The system serves both property owners and tenants, providing an efficient digital solution for room rentals, payment processing, and tenant management.

### Key Features
- Room browsing and availability checking
- Online booking application system
- Multiple payment methods (UPI, Card, Net Banking, Cash)
- Tenant profile and booking history
- Payment tracking and receipt generation
- Property management dashboard

---

## 2. Product Overview

### 2.1 Problem Statement
Traditional PG accommodation booking involves manual processes, physical visits, cash transactions, and paper-based documentation. This leads to:
- Time-consuming booking processes
- Lack of transparency in availability
- Difficulty in payment tracking
- Poor communication between owners and tenants
- Manual record keeping

### 2.2 Solution
A digital platform that automates the entire PG rental lifecycle from discovery to payment, providing:
- Real-time room availability
- Digital application process
- Secure online payments
- Automated record keeping
- Transparent communication

### 2.3 Target Users
1. **Tenants**: Students, working professionals seeking PG accommodation
2. **Property Owners**: PG owners and managers
3. **Property Staff**: Reception and administrative staff

---

## 3. Technical Architecture

### 3.1 Technology Stack

#### Frontend
- **Framework**: React.js
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Custom CSS with responsive design
- **State Management**: React Hooks

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (Development), PostgreSQL (Production)
- **Authentication**: JWT tokens
- **API**: RESTful architecture

### 3.2 System Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React App    │────▶│   Express API   │────▶│    Database     │
│   (Frontend)   │◀────│    (Backend)    │◀────│    (SQLite)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 4. Core Features

### 4.1 Room Browsing
- **Grid view** of available rooms
- **Room details**: capacity, rent, amenities, floor
- **Real-time availability** status
- **Property information** display

### 4.2 Booking Application
- **Simplified 3-step form**:
  1. Personal Information
  2. Booking Details
  3. Review & Submit
- **Form validation** and error handling
- **Auto-save** functionality
- **Mobile-responsive** design

### 4.3 Payment System
- **Multiple payment methods**:
  - UPI (GPay, PhonePe, Paytm, BHIM)
  - Credit/Debit Cards
  - Net Banking
  - Cash (with appointment scheduling)
- **Payment breakdown**: Rent + Maintenance + Processing fee
- **Transaction tracking**
- **Receipt generation**

### 4.4 User Profile
- **Booking history** with status tracking
- **Payment history** and receipts
- **Profile statistics**: Active rentals, total bookings, rating
- **Tabbed interface**: Active, Pending, History

### 4.5 Cash Payment Management
- **Appointment scheduling** for offline payments
- **Time slot selection**
- **Office location** and hours
- **Reference ID** generation
- **Appointment slip** download

---

## 5. Database Schema

### 5.1 Core Tables

#### Properties
```sql
- id (PRIMARY KEY)
- name
- address
- city
- state
- amenities
- owner_id
```

#### Rooms
```sql
- id (PRIMARY KEY)
- property_id (FOREIGN KEY)
- room_number
- floor
- capacity
- monthly_rent
- security_deposit
- status
- amenities
```

#### Applications
```sql
- id (PRIMARY KEY)
- room_id (FOREIGN KEY)
- application_data (JSON)
- status
- created_at
- updated_at
```

#### Payments
```sql
- id (PRIMARY KEY)
- application_id (FOREIGN KEY)
- user_id
- amount
- payment_method
- transaction_id
- status
- payment_month
- payment_year
```

---

## 6. API Endpoints

### 6.1 Room Management
- `GET /api/rooms` - List all rooms
- `GET /api/rooms/:id` - Get room details
- `POST /api/rooms` - Create new room (admin)
- `PUT /api/rooms/:id` - Update room (admin)

### 6.2 Applications
- `POST /api/applications` - Submit application
- `GET /api/applications/user/:userId` - User applications
- `PUT /api/applications/:id/status` - Update status (admin)

### 6.3 Payments
- `POST /api/payments` - Process payment
- `GET /api/payments/user/:userId` - Payment history
- `GET /api/payments/:id/receipt` - Get receipt

---

## 7. User Flows

### 7.1 Tenant Booking Flow
```
1. Browse Rooms → 2. Select Room → 3. Fill Application → 4. Submit
                                                      ↓
8. Move In ← 7. Download Receipt ← 6. Payment Success ← 5. Make Payment
```

### 7.2 Payment Flow
```
1. Click Pay Rent → 2. Select Method → 3. Enter Details → 4. Confirm
                                                        ↓
        7. View in History ← 6. Download Receipt ← 5. Success
```

### 7.3 Cash Payment Flow
```
1. Select Cash → 2. Choose Date/Time → 3. Enter Details → 4. Schedule
                                                        ↓
   8. Mark Complete ← 7. Visit Office ← 6. Download Slip ← 5. Confirmation
```

---

## 8. Installation & Setup

### 8.1 Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### 8.2 Installation Steps

#### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/pg-rental-system.git
cd pg-rental-system
```

#### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

#### Step 3: Setup Environment Variables
```bash
# Create .env file in backend directory
echo "PORT=5001
NODE_ENV=development
JWT_SECRET=your-secret-key
DB_PATH=./pg_rental.db" > .env
```

#### Step 4: Initialize Database
```bash
npm run db:init
```

#### Step 5: Start Backend Server
```bash
npm start
# Server runs on http://localhost:5001
```

#### Step 6: Install Frontend Dependencies
```bash
# In new terminal
cd ../frontend
npm install
```

#### Step 7: Start Frontend Application
```bash
npm start
# App runs on http://localhost:3000
```

---

## 9. Project Structure

```
pg-rental-system/
├── backend/
│   ├── src/
│   │   ├── server.js          # Express server setup
│   │   ├── routes/            # API routes
│   │   │   ├── auth.js
│   │   │   ├── rooms.js
│   │   │   ├── applications.js
│   │   │   └── payments.js
│   │   ├── models/            # Data models
│   │   │   ├── Room.js
│   │   │   ├── Application.js
│   │   │   └── Payment.js
│   │   └── middleware/        # Express middleware
│   ├── config/
│   │   └── database.js        # Database configuration
│   ├── database/
│   │   └── schema-sqlite.sql  # Database schema
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── RoomList.js
│   │   │   ├── SimpleBookingForm.js
│   │   │   ├── RentalProfile.js
│   │   │   └── PaymentModal.js
│   │   ├── services/
│   │   │   └── api.js         # API service layer
│   │   ├── App.js             # Main app component
│   │   └── index.js           # App entry point
│   └── package.json
│
└── PRD.md                     # This document
```

---

## 10. Future Enhancements

### Phase 2 Features
1. **Advanced Search**: Filters for location, price range, amenities
2. **Reviews & Ratings**: Tenant feedback system
3. **Document Upload**: KYC and agreement documents
4. **Notification System**: Email/SMS alerts
5. **Multi-language Support**: Regional language options

### Phase 3 Features
1. **Mobile Apps**: iOS and Android applications
2. **Virtual Tours**: 360° room views
3. **AI Chatbot**: Automated query resolution
4. **Analytics Dashboard**: Occupancy and revenue insights
5. **Maintenance Requests**: Ticket management system

---

## 11. Security Considerations

1. **Authentication**: JWT-based secure authentication
2. **Data Encryption**: HTTPS for all communications
3. **Input Validation**: Server-side validation for all forms
4. **SQL Injection Protection**: Parameterized queries
5. **Payment Security**: PCI compliance for card payments
6. **Data Privacy**: GDPR compliant data handling

---

## 12. Performance Requirements

1. **Page Load Time**: < 3 seconds
2. **API Response Time**: < 500ms
3. **Concurrent Users**: Support 1000+ simultaneous users
4. **Database Optimization**: Indexed queries
5. **Caching**: Redis for session management
6. **CDN**: Static asset delivery

---

## 13. Success Metrics

1. **User Acquisition**: 500+ registered users in 3 months
2. **Booking Conversion**: 30% browse-to-book ratio
3. **Payment Success**: 95% transaction success rate
4. **User Retention**: 80% monthly active users
5. **Customer Satisfaction**: 4.5+ app rating

---

## 14. Conclusion

The PG Rental Management System represents a significant step forward in digitalizing the PG accommodation industry. By providing a seamless, transparent, and efficient platform for both property owners and tenants, we aim to transform how PG accommodations are discovered, booked, and managed.

This PRD serves as a living document that will evolve as we gather user feedback and market insights. Regular updates will ensure the product continues to meet user needs and market demands.

---

## Appendix A: Glossary

- **PG**: Paying Guest accommodation
- **JWT**: JSON Web Token for authentication
- **CRUD**: Create, Read, Update, Delete operations
- **API**: Application Programming Interface
- **UX**: User Experience
- **UI**: User Interface

---

## Appendix B: References

1. React Documentation: https://reactjs.org/
2. Express.js Guide: https://expressjs.com/
3. SQLite Documentation: https://www.sqlite.org/
4. JWT Best Practices: https://jwt.io/introduction/