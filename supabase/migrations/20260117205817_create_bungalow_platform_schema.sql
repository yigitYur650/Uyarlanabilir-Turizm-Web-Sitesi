/*
  # Create Luxury Bungalow Booking Platform Schema

  1. New Tables
    - `bungalows`
      - `id` (uuid, primary key) - Unique identifier for each bungalow
      - `name` (text) - Name of the bungalow
      - `slug` (text, unique) - URL-friendly identifier
      - `type` (text) - Type: Pool, Jacuzzi, Fireplace, etc.
      - `description` (text) - Detailed description
      - `price_per_night` (numeric) - Price per night
      - `capacity` (integer) - Maximum guest capacity
      - `amenities` (jsonb) - Array of amenities
      - `images` (jsonb) - Array of image URLs
      - `featured` (boolean) - Whether it's featured on homepage
      - `available` (boolean) - Current availability status
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `bookings`
      - `id` (uuid, primary key) - Unique identifier for each booking
      - `bungalow_id` (uuid, foreign key) - Reference to bungalow
      - `guest_name` (text) - Guest's full name
      - `guest_email` (text) - Guest's email
      - `guest_phone` (text) - Guest's phone number
      - `check_in` (date) - Check-in date
      - `check_out` (date) - Check-out date
      - `guests` (integer) - Number of guests
      - `total_price` (numeric) - Total booking price
      - `special_requests` (text) - Any special requests
      - `status` (text) - Status: pending, confirmed, cancelled
      - `created_at` (timestamptz) - Booking creation timestamp
    
    - `inquiries`
      - `id` (uuid, primary key) - Unique identifier for each inquiry
      - `name` (text) - Inquirer's name
      - `email` (text) - Inquirer's email
      - `phone` (text) - Inquirer's phone number
      - `message` (text) - Inquiry message
      - `status` (text) - Status: new, read, responded
      - `created_at` (timestamptz) - Inquiry creation timestamp

  2. Security
    - Enable RLS on all tables
    - Public read access for bungalows (anyone can view listings)
    - Public insert access for bookings and inquiries (anyone can submit)
    - Admin-only access for updates and deletes (authenticated users only)
*/

-- Create bungalows table
CREATE TABLE IF NOT EXISTS bungalows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  price_per_night numeric NOT NULL,
  capacity integer NOT NULL DEFAULT 2,
  amenities jsonb DEFAULT '[]'::jsonb,
  images jsonb DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bungalow_id uuid REFERENCES bungalows(id) ON DELETE CASCADE,
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL DEFAULT 2,
  total_price numeric NOT NULL,
  special_requests text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE bungalows ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Bungalows policies: Public read, authenticated admin write
CREATE POLICY "Anyone can view bungalows"
  ON bungalows FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert bungalows"
  ON bungalows FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update bungalows"
  ON bungalows FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete bungalows"
  ON bungalows FOR DELETE
  TO authenticated
  USING (true);

-- Bookings policies: Anyone can insert, authenticated can view/update
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (true);

-- Inquiries policies: Anyone can insert, authenticated can view/update
CREATE POLICY "Anyone can create inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update inquiries"
  ON inquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete inquiries"
  ON inquiries FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bungalows_slug ON bungalows(slug);
CREATE INDEX IF NOT EXISTS idx_bungalows_featured ON bungalows(featured);
CREATE INDEX IF NOT EXISTS idx_bookings_bungalow_id ON bookings(bungalow_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);