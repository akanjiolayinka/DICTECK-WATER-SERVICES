# Dicteck Water Services

## About

A professional water services website built with modern web technologies and PostgreSQL database.

## Technologies Used

This project is built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- PostgreSQL
- Node.js pg driver

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## Database Setup

1. Install PostgreSQL on your system if not already installed
2. Create a database named `dicteck_water_services`:
```sql
CREATE DATABASE dicteck_water_services;
```

3. Update the `.env` file with your PostgreSQL credentials:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/dicteck_water_services
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=dicteck_water_services
```

## Getting Started

1. Clone the repository:
```sh
git clone https://github.com/akanjiolayinka/DICTECK-WATER-SERVICES.git
```

2. Navigate to the project directory:
```sh
cd DICTECK-WATER-SERVICES
```

3. Install dependencies:
```sh
npm install
```

4. Set up the database:
```sh
npm run db:setup
```

5. Test the database connection:
```sh
npm run db:test
```

6. Start the development server:
```sh
npm run dev
```

## Development

You can use any IDE or code editor of your choice. The project uses:
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Vite for fast development and building

## Deployment

This project can be deployed to any modern hosting platform:

1. Build the project:
```sh
npm run build
```

2. Deploy to your preferred platform:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

## Custom Domain

You can connect your custom domain through your chosen hosting provider's DNS settings.
