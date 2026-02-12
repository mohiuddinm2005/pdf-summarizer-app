// handles valid file type (only PDF or .pdf)
import { useState } from 'react';

export const useFileValidation = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');

  /**
   * Handles valid file type (only PDF or .pdf)
   * @param {File} selectedFile - The file selected by user
   */
  const handleFileSelect = (selectedFile) => {
    // Validate file type
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
      setSummary(''); // Clear previous summary
    } else {
      setError('Please upload a valid PDF file');
      setFile(null);
    }
  };

  return {
    file,
    setFile,
    error,
    setError,
    summary,
    setSummary,
    handleFileSelect
  };
};