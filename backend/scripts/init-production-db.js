const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Ensure data directory exists
const dataDir = '/var/data';
if (!fs.existsSync(dataDir)) {
  console.log('Creating data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = process.env.DB_PATH || '/var/data/pg_rental.db';

console.log('Initializing production database at:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error creating database:', err);
    process.exit(1);
  }
  console.log('Connected to production SQLite database');
});

// Read and execute schema
const schemaPath = path.join(__dirname, '..', '..', 'database', 'schema-sqlite.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// Split schema into individual statements
const statements = schema.split(';').filter(stmt => stmt.trim());

// Execute each statement
db.serialize(() => {
  statements.forEach((statement, index) => {
    if (statement.trim()) {
      db.run(statement + ';', (err) => {
        if (err) {
          console.error(`Error executing statement ${index + 1}:`, err);
        } else {
          console.log(`Executed statement ${index + 1}`);
        }
      });
    }
  });

  // Insert sample data for production
  db.run(`INSERT OR IGNORE INTO properties (id, owner_id, name, address, city, state, pincode, description, amenities) VALUES 
    (1, 1, 'Green Valley PG', '45, Koramangala 4th Block, Near Forum Mall', 'Bengaluru', 'Karnataka', '560034', 'Premium PG accommodation in the heart of Koramangala with excellent connectivity and modern facilities', 'WiFi,AC,Parking,Laundry,Kitchen')`);

  db.run(`INSERT OR IGNORE INTO rooms (id, property_id, room_number, floor, capacity, monthly_rent, security_deposit, status, amenities, description) VALUES 
    (1, 1, '101', 1, 2, 8000, 16000, 'available', 'AC,WiFi,Attached Bathroom', 'Spacious double sharing room'),
    (2, 1, '102', 1, 3, 6000, 12000, 'available', 'WiFi,Common Bathroom', 'Triple sharing room'),
    (3, 1, '201', 2, 1, 12000, 24000, 'available', 'AC,WiFi,Attached Bathroom,Balcony', 'Premium single room with balcony')`);

  console.log('Production database initialized successfully');
  db.close();
});