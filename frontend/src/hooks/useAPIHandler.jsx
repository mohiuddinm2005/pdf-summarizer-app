 /**
   * Processes the PDF by sending it to the FastAPI backend
   * Receives and displays the summary from Gemini API
   */
  
import { useState } from 'react';
import api from './api.js';

export const useAPIHandler = () => {
  const [loading, setLoading] = useState(false);

  /**
   * Processes the PDF by sending it to the FastAPI backend
   * @param {File} file - The PDF file to process
   * @param {Function} setError - Error state setter
   * @param {Function} setSummary - Summary state setter
   */
  const handleProcessPDF = async (file, setError, setSummary) => {
    if (!file) {
      setError('Please select a PDF file first');
      return;
    }

    setLoading(true);
    setError('');
    setSummary('');

    try {
      // Create FormData to send file
      const formData = new FormData();
      formData.append('file', file);

      // Call FastAPI endpoint
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Extract summary from response
      if (response.data.status === 'success') {
        setSummary(response.data.summary);
      } else {
        setError('Failed to process PDF');
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        'An error occurred while processing the PDF. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleProcessPDF
  };
};