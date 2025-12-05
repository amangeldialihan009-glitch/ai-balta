# DataHub KZ - Университеттер каталогы

Futuristic University Catalog Platform for Kazakhstan with dark mode "Digital Emerald" theme.

## 🚀 Features

- **Advanced Search**: Filter universities by city, major, and price range
- **Interactive Map**: Leaflet-based map showing all universities with custom emerald markers
- **University Cards**: Glassmorphic design with hover animations
- **University Details**: Comprehensive pages with tabs (Overview, Programs, Admissions, 3D Tour)
- **Comparison Tool**: Side-by-side comparison of up to 3 universities
- **User Authentication**: Google Sign-In via Supabase
- **Favorites System**: Save favorite universities
- **Kazakh Localization**: Full support for Kazakh language
- **Smooth Animations**: Framer Motion powered animations

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom Emerald theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Backend/Database**: Supabase (PostgreSQL + Auth)
- **Routing**: React Router DOM
- **Maps**: Leaflet + React-Leaflet (OpenStreetMap tiles)

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:
```bash
npm run dev
```

## 🗄️ Database Schema (Supabase Setup)

Run these SQL commands in your Supabase SQL Editor:

### 1. Universities Table
```sql
CREATE TABLE universities (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  city TEXT NOT NULL,
  description TEXT,
  ranking INTEGER,
  tuition_min INTEGER,
  tuition_max INTEGER,
  has_dorm BOOLEAN DEFAULT false,
  logo TEXT,
  cover_image TEXT,
  coordinates JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO universities (name, name_en, city, description, ranking, tuition_min, tuition_max, has_dorm, logo, cover_image, coordinates) VALUES
('Қазақ Ұлттық Университеті', 'Kazakh National University', 'Алматы', 'Қазақстанның ең көне және беделді университеттерінің бірі.', 1, 500000, 1200000, true, 'https://via.placeholder.com/150', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200', '{"lat": 43.2220, "lng": 76.8512}'),
('Назарбаев Университеті', 'Nazarbayev University', 'Астана', 'Халықаралық стандарттарға сәйкес келетін заманауи университет.', 2, 800000, 2000000, true, 'https://via.placeholder.com/150', 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200', '{"lat": 51.1694, "lng": 71.4491}'),
('Қазақ-Британ Техникалық Университеті', 'Kazakh-British Technical University', 'Алматы', 'Техникалық білім беру саласындағы жетекші оқу орны.', 3, 600000, 1500000, true, 'https://via.placeholder.com/150', 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200', '{"lat": 43.2389, "lng": 76.8897}');
```

### 2. Programs Table
```sql
CREATE TABLE programs (
  id BIGSERIAL PRIMARY KEY,
  university_id BIGINT REFERENCES universities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  degree_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO programs (university_id, name, degree_type) VALUES
(1, 'Ақпараттық технологиялар', 'Бакалавр'),
(1, 'Медицина', 'Бакалавр'),
(1, 'Заң', 'Бакалавр'),
(2, 'Инженерия', 'Бакалавр'),
(2, 'Бизнес', 'Бакалавр'),
(3, 'Компьютерлік ғылымдар', 'Бакалавр'),
(3, 'Электр инженериясы', 'Бакалавр');
```

### 3. Users Favorites Table
```sql
CREATE TABLE users_favorites (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  university_id BIGINT REFERENCES universities(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, university_id)
);

-- Enable Row Level Security
ALTER TABLE users_favorites ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own favorites
CREATE POLICY "Users can view own favorites"
  ON users_favorites FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own favorites
CREATE POLICY "Users can insert own favorites"
  ON users_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own favorites
CREATE POLICY "Users can delete own favorites"
  ON users_favorites FOR DELETE
  USING (auth.uid() = user_id);
```

### 4. Enable Google OAuth in Supabase

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable Google provider
4. Add your Google OAuth credentials (Client ID and Client Secret)
5. Add authorized redirect URLs: `http://localhost:5173` (for development)

## 🎨 Design System

### Colors
- **Deep Black**: `#0a0a0a`
- **Emerald Green**: `#10b981`
- **Neon Cyan**: `#06b6d4`

### Components
- Glassmorphic cards with backdrop blur
- Smooth hover animations
- Staggered list animations
- Glowing effects on interactive elements

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (320px - 767px)

## 🌐 Localization

Currently supports:
- Kazakh (Kazakhstan) - Primary
- English - Secondary

To add more languages, edit `src/lib/localization.js`

## 🚧 Development Notes

- The app uses mock data when Supabase is not configured
- 3D Tour is a placeholder (ready for integration with actual 3D tour service)
- All animations are optimized for performance

## 📝 License

MIT License

## 👨‍💻 Author

Built for Emerald University Ecosystem - DataHub KZ

