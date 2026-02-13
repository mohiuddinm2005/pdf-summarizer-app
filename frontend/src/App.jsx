import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { useFileValidation } from './hooks/useFileValidation';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useAPIHandler } from './hooks/useAPIHandler';
import { useReset } from './hooks/useReset';
import { logger } from './utils/logger'; // Import the new logger

function App() {
  // --- Initialization Logging ---
  useEffect(() => {
    logger.info('Application Mounted: Flash API Summarizer');
    logger.debug('App initialized successfully.'); 
  }, []);

  // --- Hooks ---
  const {
    file, setFile, error, setError, summary, setSummary, handleFileSelect
  } = useFileValidation();

  // Wrap file selection to log the specific file details immediately
  const handleFileSelectWrapper = useCallback((selectedFile) => {
    if (selectedFile) {
      logger.info('File Selection Event', { 
        name: selectedFile.name, 
        type: selectedFile.type, 
        size: `${(selectedFile.size / 1024).toFixed(2)} KB` 
      });
    } else {
      logger.warn('File Selection Event triggered with null file');
    }
    handleFileSelect(selectedFile);
  }, [handleFileSelect]);

  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop
  } = useDragAndDrop(handleFileSelectWrapper);

  const { loading, handleProcessPDF } = useAPIHandler();
  const handleResetHook = useReset(setFile, setSummary, setError);

  // --- State Monitoring & Debugging ---
  
  // Monitor File State
  useEffect(() => {
    if (file) {
      logger.debug('State Update: File set successfully', { name: file.name });
    }
  }, [file]);

  // Monitor Error State (Auto-log any errors that appear in UI)
  useEffect(() => {
    if (error) {
      logger.error('UI Error Displayed', error);
    }
  }, [error]);

  // Monitor Summary State
  useEffect(() => {
    if (summary) {
      logger.info('Summary Generation Complete', { length: summary.length });
    }
  }, [summary]);


  // --- Event Handlers with Logging ---

  const onProcessClick = async () => {
    if (!file) {
      logger.warn('Generate clicked without file present');
      return;
    }

    logger.info('Starting PDF Processing...', { fileName: file.name });
    
    try {
      await handleProcessPDF(file, setError, setSummary);
    } catch (err) {
      logger.error('CRITICAL: Uncaught error in Process Click Handler', err);
      setError('An unexpected error occurred. Please check console logs.');
    }
  };

  const onResetClick = () => {
    logger.info('User initiated Reset');
    try {
      handleResetHook();
      logger.debug('Reset completed successfully');
    } catch (err) {
      logger.error('Error during reset sequence', err);
    }
  };

  const onManualFileUpload = (e) => {
    logger.debug('Manual file input changed');
    if (e.target.files && e.target.files[0]) {
      handleFileSelectWrapper(e.target.files[0]);
    }
  };

  // --- Render ---
  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">Flash API</h1> 
        <h1 className="app-logo">⚡</h1>  
      </header>

      <div className="main-container">
        {/* Left side - PDF Upload */}
        <div className="upload-section">
          <h2>Upload PDF</h2>
          
          <div
            className={`upload-box ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
            onDragOver={(e) => {
              // Optional: Log drag over only once per sec to avoid spam, or keep silent
              handleDragOver(e);
            }}
            onDragLeave={handleDragLeave}
            onDrop={(e) => {
              logger.debug('Drop event detected');
              handleDrop(e);
            }}
            onClick={() => {
              logger.debug('Upload box clicked');
              document.getElementById('file-input').click();
            }}
          >
            <input
              id="file-input"
              type="file"
              accept="application/pdf"
              onChange={onManualFileUpload}
              style={{ display: 'none' }}
            />
            
            {!file ? (
              <div className="upload-placeholder">
                <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p>Drag & Drop PDF here</p>
                <p className="upload-subtext">or click to browse</p>
              </div>
            ) : (
              <div className="file-info">
                <svg className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="file-name">{file.name}</p>
                <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            )}
          </div>

          <div className="button-group">
            <button
              className="btn btn-primary"
              onClick={onProcessClick}
              disabled={!file || loading}
            >
              {loading ? 'Processing...' : 'Generate Summary'}
            </button>
            
            {file && (
              <button
                className="btn btn-secondary"
                onClick={onResetClick}
                disabled={loading}
              >
                Reset
              </button>
            )}
          </div>

          {error && (
            <div className="error-message">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* Right side - Summary Display */}
        <div className="summary-section">
          <h2>Summary</h2>
          <div className="summary-box">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Analyzing PDF with Gemini AI...</p>
              </div>
            ) : summary ? (
              <div className="summary-content">
                {summary}
              </div>
            ) : (
              <div className="summary-placeholder">
                <svg className="summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>Your PDF summary will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;