const db = require('../../config/database');

class Room {
  static async findAll(filters = {}) {
    let query = `
      SELECT r.*, p.name as property_name, p.address, p.city, p.state
      FROM rooms r
      JOIN properties p ON r.property_id = p.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.status) {
      query += ` AND r.status = ?`;
      params.push(filters.status);
    }

    if (filters.property_id) {
      query += ` AND r.property_id = ?`;
      params.push(filters.property_id);
    }

    query += ' ORDER BY r.created_at DESC';
    
    const result = await db.query(query, params);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT r.*, p.name as property_name, p.address, p.city, p.state
      FROM rooms r
      JOIN properties p ON r.property_id = p.id
      WHERE r.id = ?
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async create(roomData) {
    const { property_id, room_number, floor, capacity, monthly_rent, security_deposit, amenities, description } = roomData;
    const query = `
      INSERT INTO rooms (property_id, room_number, floor, capacity, monthly_rent, security_deposit, amenities, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [property_id, room_number, floor, capacity, monthly_rent, security_deposit, amenities, description];
    const result = await db.query(query, values);
    // For SQLite, we need to get the last inserted row
    const newRoom = await this.findById(result.rows[0].id);
    return newRoom;
  }

  static async update(id, roomData) {
    const fields = [];
    const values = [];

    Object.keys(roomData).forEach(key => {
      if (roomData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(roomData[key]);
      }
    });

    values.push(id);
    const query = `
      UPDATE rooms 
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    await db.query(query, values);
    // For SQLite, fetch the updated room
    return await this.findById(id);
  }

  static async delete(id) {
    const query = 'DELETE FROM rooms WHERE id = ?';
    await db.query(query, [id]);
  }
}

module.exports = Room;