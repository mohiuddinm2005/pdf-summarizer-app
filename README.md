# Flash - AI-Powered PDF Summarizer

A modern, full-stack application that uses Google's Gemini AI to generate intelligent summaries of PDF documents.

## 🚀 Features

- **Drag & Drop Upload**: Intuitive file upload with drag-and-drop support
- **AI-Powered Analysis**: Leverages Google Gemini 2.5 Flash for smart summarization
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
cp .env.example .env
```

Edit `.env` and set your API URL:

```
VITE_API_URL=http://localhost:8000
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

### Deploy to Railway (Recommended)

Railway provides a seamless deployment experience for full-stack applications with both frontend and backend.

#### Quick Deploy:

1. **Create Railway Account**: Visit [railway.app](https://railway.app)

2. **Deploy Backend**:
   - New Project → Deploy from GitHub
   - Add environment variable: `GEMINI_API_KEY`
   - Railway auto-detects and deploys FastAPI

3. **Deploy Frontend**:
   - New Service in same project
   - Add environment variable: `VITE_API_URL` (your backend URL)
   - Railway auto-detects and deploys Vite

4. **Update CORS**: Add frontend URL to backend's `allow_origins`

**Detailed Guide**: See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)

#### Using Railway CLI:

```bash
# Install CLI
npm i -g @railway/cli

# Login
railway login

# Initialize and deploy
railway init
railway up
```

### Alternative Deployment Options

#### Render

- Connect GitHub repository
- Set build command: `npm install && npm run build`
- Set start command: `npm run start`

#### Heroku

- Requires `Procfile` (included)
- Deploy via Git push or GitHub integration

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

The backend is configured to accept requests from:

- `http://localhost:3000` (development)
- `https://*.up.railway.app` (Railway deployments)

Update the `allow_origins` list in `main.py` to include your specific Railway frontend URL after deployment.

## 📊 Performance Optimizations

- **Code Splitting**: Vendor chunks separated for better caching
- **Minification**: Production builds are minified with Terser
- **Tree Shaking**: Unused code is removed automatically
- **Lazy Loading**: Components can be lazy-loaded as needed
- **Asset Optimization**: Images and assets are optimized during build

## 🐛 Troubleshooting

### CORS Errors

- Ensure your backend URL is correctly set in `.env`
- Verify CORS middleware in `main.py` includes your frontend URL
- Check for trailing slashes in URLs

### File Upload Issues

- Check file size limits (Railway has generous limits)
- Verify PDF file is valid and not corrupted
- Ensure backend has write permissions for `uploads/` directory

### API Key Issues

- Verify `GEMINI_API_KEY` is set in Railway environment variables
- Check API key has proper permissions
- Ensure you're not exceeding API rate limits

### Environment Variables Not Loading

- Use `VITE_` prefix (not `REACT_APP_`)
- Restart dev server after changing `.env`
- Redeploy on Railway after updating variables

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Deadline**: February 17, 2026
**Status**: ✅ Ready for deployment
