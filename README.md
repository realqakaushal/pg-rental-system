# PG Rental Management System

A modern web application for managing Paying Guest (PG) accommodations, built with React and Node.js.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd pg-rental-system
```

2. **Setup Backend**
```bash
cd backend
npm install
npm start
```

3. **Setup Frontend** (new terminal)
```bash
cd frontend
npm install
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## 🎯 Features

### For Tenants
- 🏠 Browse available rooms with real-time availability
- 📝 Simple 3-step booking application
- 💳 Multiple payment options (UPI, Card, Net Banking, Cash)
- 👤 Personal profile with booking history
- 📱 Mobile-responsive design

### For Property Owners
- 🏢 Property and room management
- 📊 Application tracking and approval
- 💰 Payment monitoring
- 📈 Occupancy insights

## 💻 Technology Stack

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: SQLite (dev), PostgreSQL (prod)
- **Authentication**: JWT
- **Styling**: Custom CSS

## 📸 Screenshots

### Room Listing
Browse available PG rooms with details like rent, capacity, and amenities.

### Booking Form
Simple 3-step form to apply for accommodation:
1. Personal Information
2. Booking Details  
3. Review & Submit

### Payment Options
Multiple payment methods including:
- UPI (GPay, PhonePe, Paytm)
- Credit/Debit Cards
- Net Banking
- Cash (with appointment scheduling)

### User Profile
Track your bookings, payment history, and manage your rentals.

## 🛠️ Project Structure

```
pg-rental-system/
├── backend/
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── models/      # Data models
│   │   └── server.js    # Express server
│   └── database/        # Schema files
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   └── services/    # API services
│   └── public/
└── PRD.md              # Product documentation
```

## 🔧 Configuration

### Backend (.env)
```env
PORT=5001
NODE_ENV=development
JWT_SECRET=your-secret-key
DB_PATH=./pg_rental.db
```

## 📚 API Documentation

### Endpoints

#### Rooms
- `GET /api/rooms` - List all rooms
- `GET /api/rooms/:id` - Get room details

#### Applications  
- `POST /api/applications` - Submit booking application
- `GET /api/applications/user/:userId` - Get user applications

#### Payments
- `POST /api/payments` - Process payment
- `GET /api/payments/user/:userId` - Payment history

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Contact

For questions or support, please contact the development team.

---

Built with ❤️ for the PG rental community