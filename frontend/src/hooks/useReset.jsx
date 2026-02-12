// sets the reset for pdf imports after processing occurs

export const useReset = (setFile, setSummary, setError, setLoading = null) => {
  /**
   * Resets application state
   */
  const handleReset = () => {
    setFile(null);
    setSummary('');
    setError('');
    if (setLoading) {
      setLoading(false);
    }
  };

  return handleReset;
};