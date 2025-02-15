# Instagram Hooks Generator

A web application that generates customized Instagram hooks using Gemini AI.

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google Cloud API key for Gemini AI

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/your_database_name

# Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key
```

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd instagram-hooks-generator
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npm run db:push
```

## Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Project Structure

```
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── lib/         # Utility functions and API clients
│   │   └── pages/       # Page components
├── server/               # Backend Express server
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Database operations
│   └── db.ts           # Database connection
└── shared/              # Shared types and schemas
    └── schema.ts       # Database schema and types
```

## Features

- Generate engaging Instagram hooks using AI
- Customize generation with specific prompts
- Business profile management
- Copy-to-clipboard functionality
- Responsive design
- Database persistence for hooks and businesses

## Required Dependencies

The application uses the following main dependencies:
- React + TypeScript
- Express.js
- Drizzle ORM
- @google/generative-ai
- TanStack Query
- Tailwind CSS + shadcn/ui
- PostgreSQL
