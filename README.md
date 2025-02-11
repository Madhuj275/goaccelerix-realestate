# Real Estate CRM

A comprehensive Real Estate CRM system built with React, TypeScript, and Node.js.

## Features

- Dashboard with key metrics
- Lead management with document uploads
- Property management with filtering options
- Beautiful and responsive UI
- Error handling and validation
- Search functionality

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - React Router
  - React Hook Form
  - Lucide React (icons)

- Backend:
  - Node.js
  - Express
  - Multer (file uploads)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev:all
   ```

3. Open http://localhost:5173 in your browser

## Project Structure

- `/src` - Frontend source code
  - `/components` - Reusable UI components
  - `/pages` - Main application pages
  - `/types` - TypeScript type definitions
  - `/lib` - Utility functions
- `/server` - Backend API implementation
- `/uploads` - Uploaded files storage

## API Endpoints

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create a new lead
- `PUT /api/leads/:id` - Update a lead
- `DELETE /api/leads/:id` - Delete a lead
- `POST /api/leads/:id/documents` - Upload a document for a lead

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Create a new property
- `PUT /api/properties/:id` - Update a property
- `DELETE /api /properties/:id` - Delete a property

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT