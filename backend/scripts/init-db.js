const fs = require('fs');
const path = require('path');
const { db } = require('../config/database-sqlite');

const schemaPath = path.join(__dirname, '../../database/schema-sqlite.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// Split the schema into individual statements
const statements = schema
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0);

console.log('Initializing SQLite database...');

// Execute statements synchronously
db.serialize(() => {
  statements.forEach((statement, index) => {
    db.run(statement, (err) => {
      if (err) {
        console.error(`Error executing statement ${index + 1}:`, err.message);
      }
    });
  });

  console.log('Database schema created!');
  console.log('Adding sample data...');
  
  // Create a sample owner user
  db.run(`
    INSERT INTO users (email, password_hash, first_name, last_name, phone, role)
    VALUES ('owner@example.com', '$2a$10$XQq9kL8N7sGCzH5q4fWFUOE6QHgNVAJpU8T/gJb8Xqe0fzJH2v.Wy', 'John', 'Doe', '1234567890', 'owner')
  `, (err) => {
    if (err && !err.message.includes('UNIQUE constraint failed')) {
      console.error('Error creating owner:', err.message);
    }
  });

  // Create a sample property
  db.run(`
    INSERT INTO properties (owner_id, name, address, city, state, pincode, description, amenities)
    VALUES (1, 'Green Valley PG', '123 Main Street', 'Bangalore', 'Karnataka', '560001', 
            'A comfortable PG accommodation with all modern amenities', 
            'WiFi,AC,Parking,Laundry,Kitchen')
  `, (err) => {
    if (err && !err.message.includes('UNIQUE constraint failed')) {
      console.error('Error creating property:', err.message);
    }
  });

  // Create sample rooms
  db.run(`
    INSERT INTO rooms (property_id, room_number, floor, capacity, monthly_rent, security_deposit, amenities, description)
    VALUES 
      (1, '101', 1, 2, 8000, 16000, 'AC,WiFi,Attached Bathroom', 'Spacious double sharing room'),
      (1, '102', 1, 3, 6000, 12000, 'WiFi,Common Bathroom', 'Triple sharing room'),
      (1, '201', 2, 1, 12000, 24000, 'AC,WiFi,Attached Bathroom,Balcony', 'Premium single room with balcony')
  `, (err) => {
    if (err && !err.message.includes('UNIQUE constraint failed')) {
      console.error('Error creating rooms:', err.message);
    }
  });

  console.log('Sample data added successfully!');
  console.log('\nSample credentials:');
  console.log('Email: owner@example.com');
  console.log('Password: password123');
  
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});