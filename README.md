# Flash - AI-Powered PDF Summarizer

A modern, full-stack application that uses Google's Gemini AI to generate intelligent summaries of PDF documents.

## 🚀 Features

- **Drag & Drop Upload**: Intuitive file upload with drag-and-drop support
- **AI-Powered Analysis**: Leverages Google Gemini 2.5 Flash for smart summarization
- **Clean UI**: Modern, responsive design built with React and Tailwind CSS
- **Fast Processing**: Quick PDF text extraction and summary generation
- **Error Handling**: Comprehensive error messages and loading states
- **Lightweight**: Optimized build for fast deployment and performance

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library

### Backend

- **FastAPI** - Python web framework
- **Google Gemini AI** - LLM for summarization
- **PyPDF & PDFMiner** - PDF text extraction

## 📦 Installation

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+
- Google Gemini API key

### Frontend Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment:**

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your API URL:

```
REACT_APP_API_URL=http://localhost:8000
```

3. **Run development server:**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Backend Setup

1. **Install Python dependencies:**

```bash
pip install fastapi uvicorn google-generativeai pypdf pdfminer.six python-multipart
```

2. **Set environment variable:**

```bash
export GEMINI_API_KEY=your_api_key_here
```

3. **Run FastAPI server:**

```bash
python main.py
```

The API will be available at `http://localhost:8000`

## 🚢 Deployment

### Deploy Frontend to Vercel

1. **Install Vercel CLI:**

```bash
npm i -g vercel
```

2. **Deploy:**

```bash
vercel
```

3. **Set environment variable in Vercel:**
   - Go to your project settings
   - Add `REACT_APP_API_URL` with your backend URL

### Deploy Backend to Vercel (FastAPI)

1. **Create `requirements.txt`:**

```
fastapi
uvicorn[standard]
google-generativeai
pypdf
pdfminer.six
python-multipart
```

2. **Create `vercel.json` for backend:**

```json
{
  "builds": [
    {
      "src": "main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "main.py"
    }
  ]
}
```

3. **Deploy:**

```bash
vercel --prod
```

4. **Set environment variable:**
   - Add `GEMINI_API_KEY` in Vercel project settings

### Alternative: Deploy Backend to Railway/Render

For Railway:

```bash
railway login
railway init
railway up
```

For Render:

- Connect your GitHub repository
- Select "Web Service"
- Set build command: `pip install -r requirements.txt`
- Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 📁 Project Structure

```
flash-pdf-summarizer/
├── src/
│   ├── main.jsx          # React entry point
│   ├── App.jsx           # Main application component
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS config
├── postcss.config.js     # PostCSS config
├── vercel.json           # Vercel deployment config
└── .env.example          # Environment variables template
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎨 Customization

### Update API Endpoint

Edit `App.jsx` and change the `API_URL` constant or set the `REACT_APP_API_URL` environment variable.

### Modify Tailwind Theme

Edit `tailwind.config.js` to customize colors, fonts, and other design tokens.

### Change App Branding

Update the header section in `App.jsx` to change the app name, icon, and description.

## 🔒 CORS Configuration

The backend is already configured to accept requests from:

- `http://localhost:3000` (development)
- `https://ai-gateway.vercel.sh/v1` (production)

Update the `allow_origins` list in `main.py` to include your Vercel deployment URL.

## 📊 Performance Optimizations

- **Code Splitting**: Vendor chunks separated for better caching
- **Minification**: Production builds are minified with Terser
- **Tree Shaking**: Unused code is removed automatically
- **Lazy Loading**: Components can be lazy-loaded as needed
- **Asset Optimization**: Images and assets are optimized during build

## 🐛 Troubleshooting

### CORS Errors

- Ensure your backend URL is correctly set in `.env.local`
- Verify CORS middleware in `main.py` includes your frontend URL

### File Upload Issues

- Check file size limits (default: no limit, but add if needed)
- Verify PDF file is valid and not corrupted
- Ensure backend has write permissions for `uploads/` directory

### API Key Issues

- Verify `GEMINI_API_KEY` is set correctly
- Check API key has proper permissions
- Ensure you're not exceeding API rate limits

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Deadline**: February 17, 2026
**Status**: ✅ Ready for deployment
