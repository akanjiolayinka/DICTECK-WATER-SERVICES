import { query } from '../lib/database';

// User management
export const userService = {
  async createUser(userData: { email: string; name: string; phone?: string }) {
    const result = await query(
      'INSERT INTO users (email, name, phone) VALUES ($1, $2, $3) RETURNING *',
      [userData.email, userData.name, userData.phone]
    );
    return result.rows[0];
  },

  async getUserByEmail(email: string) {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  async getAllUsers() {
    const result = await query('SELECT * FROM users ORDER BY created_at DESC');
    return result.rows;
  }
};

// Service management
export const serviceService = {
  async getAllServices() {
    const result = await query('SELECT * FROM services WHERE is_active = true ORDER BY name');
    return result.rows;
  },

  async getServiceById(id: number) {
    const result = await query('SELECT * FROM services WHERE id = $1', [id]);
    return result.rows[0];
  },

  async createService(serviceData: { 
    name: string; 
    description: string; 
    price: number; 
    duration_hours: number 
  }) {
    const result = await query(
      'INSERT INTO services (name, description, price, duration_hours) VALUES ($1, $2, $3, $4) RETURNING *',
      [serviceData.name, serviceData.description, serviceData.price, serviceData.duration_hours]
    );
    return result.rows[0];
  }
};

// Service request management
export const serviceRequestService = {
  async createServiceRequest(requestData: {
    user_id: number;
    service_id: number;
    scheduled_date?: Date;
    address: string;
    notes?: string;
  }) {
    const result = await query(
      'INSERT INTO service_requests (user_id, service_id, scheduled_date, address, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [requestData.user_id, requestData.service_id, requestData.scheduled_date, requestData.address, requestData.notes]
    );
    return result.rows[0];
  },

  async getServiceRequestsByUser(userId: number) {
    const result = await query(`
      SELECT sr.*, s.name as service_name, s.description as service_description, s.price as service_price
      FROM service_requests sr
      JOIN services s ON sr.service_id = s.id
      WHERE sr.user_id = $1
      ORDER BY sr.created_at DESC
    `, [userId]);
    return result.rows;
  },

  async getAllServiceRequests() {
    const result = await query(`
      SELECT sr.*, u.name as user_name, u.email as user_email, s.name as service_name
      FROM service_requests sr
      JOIN users u ON sr.user_id = u.id
      JOIN services s ON sr.service_id = s.id
      ORDER BY sr.created_at DESC
    `);
    return result.rows;
  },

  async updateServiceRequestStatus(id: number, status: string) {
    const result = await query(
      'UPDATE service_requests SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }
};

// Testimonials management
export const testimonialService = {
  async createTestimonial(testimonialData: {
    user_id: number;
    service_id: number;
    rating: number;
    comment: string;
  }) {
    const result = await query(
      'INSERT INTO testimonials (user_id, service_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [testimonialData.user_id, testimonialData.service_id, testimonialData.rating, testimonialData.comment]
    );
    return result.rows[0];
  },

  async getApprovedTestimonials() {
    const result = await query(`
      SELECT t.*, u.name as user_name, s.name as service_name
      FROM testimonials t
      JOIN users u ON t.user_id = u.id
      JOIN services s ON t.service_id = s.id
      WHERE t.is_approved = true
      ORDER BY t.created_at DESC
    `);
    return result.rows;
  },

  async approveTestimonial(id: number) {
    const result = await query(
      'UPDATE testimonials SET is_approved = true WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
};

// Gallery management
export const galleryService = {
  async getAllGalleryItems() {
    const result = await query(`
      SELECT g.*, s.name as service_name
      FROM gallery g
      LEFT JOIN services s ON g.service_id = s.id
      ORDER BY g.is_featured DESC, g.created_at DESC
    `);
    return result.rows;
  },

  async getFeaturedGalleryItems() {
    const result = await query(`
      SELECT g.*, s.name as service_name
      FROM gallery g
      LEFT JOIN services s ON g.service_id = s.id
      WHERE g.is_featured = true
      ORDER BY g.created_at DESC
    `);
    return result.rows;
  },

  async createGalleryItem(galleryData: {
    title: string;
    description: string;
    image_url: string;
    service_id?: number;
    is_featured?: boolean;
  }) {
    const result = await query(
      'INSERT INTO gallery (title, description, image_url, service_id, is_featured) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [galleryData.title, galleryData.description, galleryData.image_url, galleryData.service_id, galleryData.is_featured || false]
    );
    return result.rows[0];
  }
};
