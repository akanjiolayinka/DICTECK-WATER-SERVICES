-- Sample data for Dicteck Water Services

-- Insert sample services
INSERT INTO services (name, description, price, duration_hours) VALUES
('Water System Installation', 'Complete water system installation for residential and commercial properties', 1500.00, 8),
('Pipe Repair & Maintenance', 'Professional pipe repair and maintenance services', 250.00, 3),
('Water Quality Testing', 'Comprehensive water quality testing and analysis', 150.00, 2),
('Emergency Plumbing', '24/7 emergency plumbing services', 350.00, 4),
('Drainage System Cleaning', 'Professional drainage system cleaning and maintenance', 200.00, 4)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_requests_user_id ON service_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_service_id ON service_requests(service_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_user_id ON testimonials(user_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_gallery_service_id ON gallery(service_id);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(is_featured);
