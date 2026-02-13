// src/utils/logger.js

// Check if we are in development mode (standard React setup)
const isDev = typeof process !== 'undefined' 
  ? process.env.NODE_ENV === 'development' 
  : (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV);
/**
 * Centralized Logger Utility
 * usage: logger.info('Message', { data: 'value' })
 */
export const logger = {
  info: (message, data = null) => {
    if (isDev) {
      // Blue for info
      const style = 'color: #007bff; font-weight: bold;';
      data 
        ? console.log(`%c[INFO] ${message}`, style, data)
        : console.log(`%c[INFO] ${message}`, style);
    }
  },

  debug: (message, data = null) => {
    if (isDev) {
      // Grey/Italic for debug noise
      const style = 'color: #6c757d; font-style: italic;';
      data
        ? console.debug(`%c[DEBUG] ${message}`, style, data)
        : console.debug(`%c[DEBUG] ${message}`, style);
    }
  },

  warn: (message, data = null) => {
    // Orange for warnings
    const style = 'color: #ffc107; font-weight: bold;';
    console.warn(`%c[WARN] ${message}`, style, data || '');
  },

  error: (message, error) => {
    // Red for critical errors
    const style = 'color: #dc3545; font-weight: bold; font-size: 1.1em;';
    console.error(`%c[ERROR] ${message}`, style);
    
    if (error) {
      // Log the full stack trace object
      console.error('Stack Trace Details:', error);
      if (error.stack) {
        console.error(error.stack);
      }
    }
  }
};