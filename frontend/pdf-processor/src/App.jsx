import React, { useState } from 'react';
import { Upload, FileText, Loader2, CheckCircle, XCircle, Download } from 'lucide-react';

export default function PDFAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setError(null);
        setResult(null);
      } else {
        setError('Please upload a PDF file');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError(null);
        setResult(null);
      } else {
        setError('Please upload a PDF file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to analyze PDF');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing the PDF');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-5xl font-bold text-white">PDF Analyzer</h1>
          </div>
          <p className="text-gray-300 text-lg">
            Upload your PDF and get AI-powered insights instantly
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!result ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
              {/* Upload Form */}
              <form onSubmit={handleSubmit}>
                {/* Drag & Drop Area */}
                <div
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                    dragActive
                      ? 'border-purple-400 bg-purple-400/10'
                      : 'border-gray-400 hover:border-purple-400 bg-white/5'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-16 h-16 text-purple-400 mb-4" />
                    <p className="text-xl text-white font-semibold mb-2">
                      {file ? file.name : 'Drop your PDF here or click to browse'}
                    </p>
                    <p className="text-gray-300 text-sm">
                      Supports PDF files up to 50MB
                    </p>
                  </label>

                  {file && (
                    <div className="mt-4 flex items-center justify-center text-green-400">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>File ready to upload</span>
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mt-6 bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-center text-red-200">
                    <XCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!file || loading}
                  className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg transition-all hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing PDF...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5 mr-2" />
                      Analyze PDF
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Results Display */
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                  <h2 className="text-3xl font-bold text-white">Analysis Complete</h2>
                </div>
                <button
                  onClick={resetForm}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                >
                  Upload Another
                </button>
              </div>

              {/* File Info */}
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Filename</p>
                    <p className="text-white font-semibold">{result.filename}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Text Length</p>
                    <p className="text-white font-semibold">
                      {result.text_length.toLocaleString()} characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  AI Summary & Analysis
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {result.summary}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400 text-sm">
          <p>Powered by Gemini AI • Secure & Fast Processing</p>
        </div>
      </div>
    </div>
  );
}