# Flash - AI-Powered PDF Summarizer

A modern, full-stack application that uses Google's Gemini AI to generate intelligent summaries of PDF documents.

## 🚀 Features

- **Drag & Drop Upload**: Intuitive file upload with drag-and-drop support
- **AI-Powered Analysis**: Leverages Google Gemini 3.0 for smart summarization
- **Error Handling and logging**: Comprehensive error messages and loading states
- **Lightweight**: Optimized build for fast deployment and performance

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS** - Normal style sheets
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
pip install -r requirements.txt
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

### Deploy to Vercel (Frontend) & Railway (Backend)

Full-stack deployment on reliable, scalable platforms.

#### Frontend Deployment (Vercel):

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure Build Settings**:
   - Framework: **Vite**
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm ci`

3. **Set Environment Variables**:
   - Add `VITE_API_URL` = `https://your-railway-backend-url.railway.app`
   - (Get Railway URL from Railway dashboard after backend deployment)

4. **Deploy**:
   - Click "Deploy"
   - Auto-deploys on every push to main branch

#### Backend Deployment (Railway):

1. **Create Railway Account**: Visit [railway.app](https://railway.app)

2. **Create New Project**:
   - Click "Create a new project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account and select this repository

3. **Configure Railway Service**:
   - Railway auto-detects `Procfile`
   - Build Command: Auto (installs from `requirements.txt`)
   - Start Command: Auto (uses `Procfile`)

4. **Set Environment Variables** in Railway Dashboard:
   - `GEMINI_API_KEY` = your Google Gemini API key
   - `PORT` = 8000 (Railway auto-sets this)

5. **Deploy**:
   - Railway auto-deploys on push
   - View deployment logs in Railway dashboard

6. **Get Backend URL**:
   - Copy public URL from Railway dashboard
   - Update `VITE_API_URL` on Vercel with this URL
   - Redeploy frontend on Vercel

**Deployment Configuration Files**:

- `frontend/vercel.json` - Vercel build configuration
- `backend/Procfile` - Railway start command
- `backend/runtime.txt` - Python version specification
- `.vercelignore` - Files to exclude from Vercel
- `backend/.railwayignore` - Files to exclude from Railway

### Alternative Deployment Options

#### Docker Deployment

- Build containerized app for any platform
- Consistent environment across development and production

#### Self-Hosted

- Deploy on AWS, GCP, or Azure
- Full control over infrastructure and scaling

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
├── requirements.txt      # Python dependencies
└── .env.example          # Environment variables template
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎨 Customization

### Update API Endpoint

Edit `App.jsx` and change the `API_URL` constant or set the `VITE_API_URL` environment variable.

### Modify Tailwind Theme

Edit `tailwind.config.js` to customize colors, fonts, and other design tokens.

### Change App Branding

Update the header section in `App.jsx` to change the app name, icon, and description.

## 🔒 CORS Configuration

The backend is configured to accept requests from:

- `http://localhost:3000` (development)
- Your deployed Vercel frontend URL
- Add additional origins as needed in `main.py`

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

- Check file size limits
- Verify PDF file is valid and not corrupted
- Ensure backend has write permissions for `uploads/` directory

### API Key Issues

- Verify `GEMINI_API_KEY` is set in deployment environment variables
- Check API key has proper permissions
- Ensure you're not exceeding API rate limits

### Environment Variables Not Loading

- Use `VITE_` prefix for frontend
- Restart dev server after changing `.env`
- Redeploy after updating environment variables

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Deadline**: February 17, 2026
**Status**: ✅ Ready for deployment
