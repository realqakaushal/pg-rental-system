const db = require('../../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, email, first_name, last_name, phone, role, is_active, created_at FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async create(userData) {
    const { email, password, first_name, last_name, phone, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO users (email, password_hash, first_name, last_name, phone, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, email, first_name, last_name, phone, role, is_active, created_at
    `;
    const values = [email, hashedPassword, first_name, last_name, phone, role || 'tenant'];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async update(id, userData) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    Object.keys(userData).forEach(key => {
      if (userData[key] !== undefined && key !== 'password') {
        fields.push(`${key} = $${paramIndex}`);
        values.push(userData[key]);
        paramIndex++;
      }
    });

    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      fields.push(`password_hash = $${paramIndex}`);
      values.push(hashedPassword);
      paramIndex++;
    }

    values.push(id);
    const query = `
      UPDATE users 
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramIndex}
      RETURNING id, email, first_name, last_name, phone, role, is_active, created_at
    `;
    
    const result = await db.query(query, values);
    return result.rows[0];
  }
}

module.exports = User;