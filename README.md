# Flash - AI-Powered PDF Summarizer

Flash is a full-stack app that lets users upload a PDF and receive an AI-generated summary using Google Gemini. The frontend is built with React and Vite, and the backend API runs from the Python app in the api folder.

## Features

- Drag-and-drop PDF upload
- AI-powered summarization with Gemini
- Clear loading and error states
- Basic client-side file validation

## Tech Stack

- Frontend: React, Vite, Axios
- Backend: FastAPI, Python, Google GenAI, PyPDF, PDFMiner

## Local Development

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- A Google Gemini API key

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Set the API base URL for local development:

```bash
VITE_API_URL=http://127.0.0.1:8000
```

### API

```bash
cd api
pip install -r requirements.txt
```

Start the API locally:

```bash
uvicorn index:app --reload --port 8000
```

Set the required environment variables:

```bash
GEMINI_API_KEY=your_api_key_here
ALLOWED_ORIGINS=http://localhost:5173
```

## Deployment on Vercel

This project is configured to deploy as a single Vercel application.

- The frontend is built from the frontend folder.
- The Python API is served from api/index.py through the rewrites in vercel.json.

### Deployment Steps

1. Push the repository to GitHub.
2. In Vercel, create a new project from that repository.
3. Use the repository root as the project root.
4. Add these environment variables in Vercel Project Settings:
   - GEMINI_API_KEY
   - ALLOWED_ORIGINS=https://your-app-name.vercel.app
5. Deploy the project.

After deployment, the app will be available at your Vercel URL, and API requests will use the /api route.

## Project Structure

- api/index.py - FastAPI endpoint for PDF upload and summarization
- frontend/src - React app UI
- vercel.json - Vercel build and rewrite configuration

## API Endpoints

- POST /api/upload - Upload a PDF and receive a summary
- GET /api/health - Health check endpoint
