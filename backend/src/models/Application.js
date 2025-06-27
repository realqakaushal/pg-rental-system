const db = require('../../config/database');

class Application {
  static async create(applicationData) {
    const { roomId, room_id, ...formData } = applicationData;
    const actualRoomId = roomId || room_id;
    
    if (!actualRoomId) {
      throw new Error('Room ID is required');
    }
    
    const query = `
      INSERT INTO applications (room_id, application_data)
      VALUES (?, ?)
    `;
    const values = [actualRoomId, JSON.stringify(formData)];
    const result = await db.query(query, values);
    return this.findById(result.rows[0].id);
  }

  static async findById(id) {
    const query = `
      SELECT a.*, r.room_number, p.name as property_name
      FROM applications a
      JOIN rooms r ON a.room_id = r.id
      JOIN properties p ON r.property_id = p.id
      WHERE a.id = ?
    `;
    const result = await db.query(query, [id]);
    if (result.rows[0]) {
      result.rows[0].application_data = JSON.parse(result.rows[0].application_data);
    }
    return result.rows[0];
  }

  static async findByRoom(roomId) {
    const query = `
      SELECT * FROM applications
      WHERE room_id = ?
      ORDER BY created_at DESC
    `;
    const result = await db.query(query, [roomId]);
    return result.rows.map(row => ({
      ...row,
      application_data: JSON.parse(row.application_data)
    }));
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT a.*, r.room_number, p.name as property_name
      FROM applications a
      JOIN rooms r ON a.room_id = r.id
      JOIN properties p ON r.property_id = p.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.status) {
      query += ` AND a.status = ?`;
      params.push(filters.status);
    }

    if (filters.room_id) {
      query += ` AND a.room_id = ?`;
      params.push(filters.room_id);
    }

    query += ' ORDER BY a.created_at DESC';
    
    const result = await db.query(query, params);
    return result.rows.map(row => ({
      ...row,
      application_data: JSON.parse(row.application_data)
    }));
  }

  static async updateStatus(id, status, notes = null) {
    const query = `
      UPDATE applications 
      SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await db.query(query, [status, notes, id]);
    return this.findById(id);
  }

  static async delete(id) {
    const query = 'DELETE FROM applications WHERE id = ?';
    await db.query(query, [id]);
  }
}

module.exports = Application;