/**
 * Handles drag events for file upload
 */
import { useState } from 'react';

export const useDragAndDrop = (handleFileSelect) => {
  const [isDragging, setIsDragging] = useState(false);

 //handles drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // handles dragleave event
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // handles file dropping event
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  return {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};