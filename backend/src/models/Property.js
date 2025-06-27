const db = require('../../config/database');

class Property {
  static async findAll(owner_id = null) {
    let query = 'SELECT * FROM properties';
    const params = [];
    
    if (owner_id) {
      query += ' WHERE owner_id = ?';
      params.push(owner_id);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await db.query(query, params);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM properties WHERE id = ?';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async create(propertyData) {
    const { owner_id, name, address, city, state, pincode, description, amenities, rules } = propertyData;
    const query = `
      INSERT INTO properties (owner_id, name, address, city, state, pincode, description, amenities, rules)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [owner_id, name, address, city, state, pincode, description, amenities, rules];
    const result = await db.query(query, values);
    // For SQLite, we need to get the last inserted row
    const newProperty = await this.findById(result.rows[0].id);
    return newProperty;
  }

  static async update(id, propertyData) {
    const fields = [];
    const values = [];

    Object.keys(propertyData).forEach(key => {
      if (propertyData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(propertyData[key]);
      }
    });

    values.push(id);
    const query = `
      UPDATE properties 
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    await db.query(query, values);
    // For SQLite, fetch the updated property
    return await this.findById(id);
  }

  static async delete(id) {
    const query = 'DELETE FROM properties WHERE id = ?';
    await db.query(query, [id]);
  }
}

module.exports = Property;