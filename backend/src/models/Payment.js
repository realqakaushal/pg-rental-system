const db = require('../../config/database');

class Payment {
  static async create(paymentData) {
    const {
      applicationId,
      userId,
      amount,
      paymentMethod,
      transactionId,
      paymentMonth,
      paymentYear,
      status = 'completed'
    } = paymentData;

    const query = `
      INSERT INTO payments (
        application_id, user_id, amount, payment_method,
        transaction_id, payment_month, payment_year, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      applicationId, userId, amount, paymentMethod,
      transactionId, paymentMonth, paymentYear, status
    ];
    
    const result = await db.query(query, values);
    return this.findById(result.rows[0].id);
  }

  static async findById(id) {
    const query = `
      SELECT p.*, a.room_id, r.room_number, pr.name as property_name
      FROM payments p
      JOIN applications a ON p.application_id = a.id
      JOIN rooms r ON a.room_id = r.id
      JOIN properties pr ON r.property_id = pr.id
      WHERE p.id = ?
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async findByUser(userId) {
    const query = `
      SELECT p.*, r.room_number, pr.name as property_name
      FROM payments p
      JOIN applications a ON p.application_id = a.id
      JOIN rooms r ON a.room_id = r.id
      JOIN properties pr ON r.property_id = pr.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  static async findByApplication(applicationId) {
    const query = `
      SELECT * FROM payments
      WHERE application_id = ?
      ORDER BY created_at DESC
    `;
    const result = await db.query(query, [applicationId]);
    return result.rows;
  }

  static async findByMonth(userId, month, year) {
    const query = `
      SELECT p.*, r.room_number, pr.name as property_name
      FROM payments p
      JOIN applications a ON p.application_id = a.id
      JOIN rooms r ON a.room_id = r.id
      JOIN properties pr ON r.property_id = pr.id
      WHERE p.user_id = ? AND p.payment_month = ? AND p.payment_year = ?
    `;
    const result = await db.query(query, [userId, month, year]);
    return result.rows[0];
  }

  static async getPaymentSummary(userId) {
    const query = `
      SELECT 
        COUNT(*) as total_payments,
        SUM(amount) as total_amount,
        MAX(created_at) as last_payment_date
      FROM payments
      WHERE user_id = ? AND status = 'completed'
    `;
    const result = await db.query(query, [userId]);
    return result.rows[0];
  }

  static async getPendingPayments(userId) {
    const query = `
      SELECT 
        a.id as application_id,
        a.room_id,
        r.room_number,
        r.monthly_rent,
        pr.name as property_name,
        CASE 
          WHEN p.id IS NULL THEN 'pending'
          ELSE p.status
        END as payment_status
      FROM applications a
      JOIN rooms r ON a.room_id = r.id
      JOIN properties pr ON r.property_id = pr.id
      LEFT JOIN payments p ON a.id = p.application_id 
        AND p.payment_month = ? 
        AND p.payment_year = ?
      WHERE a.status = 'approved' 
        AND (a.user_id = ? OR a.application_data LIKE ?)
        AND (p.id IS NULL OR p.status != 'completed')
    `;
    
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    const result = await db.query(query, [
      currentMonth,
      currentYear,
      userId,
      `%"userId":"${userId}"%`
    ]);
    
    return result.rows;
  }

  static async updateStatus(id, status) {
    const query = `
      UPDATE payments 
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await db.query(query, [status, id]);
    return this.findById(id);
  }
}

module.exports = Payment;