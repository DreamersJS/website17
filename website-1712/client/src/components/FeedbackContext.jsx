import React, { createContext, useContext, useState, useCallback } from 'react';

const FeedbackContext = createContext();

export const useFeedback = () => useContext(FeedbackContext);

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const showFeedback = useCallback((message, type = 'info') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
  }, []);

  return (
    <FeedbackContext.Provider value={{ showFeedback }}>
      {children}
      {feedback.message && (
        <div
          className={`fixed bottom-4 left-4 px-4 py-2 rounded text-white shadow-lg z-[1000] ${
            feedback.type === 'success'
              ? 'bg-green-600'
              : feedback.type === 'error'
              ? 'bg-red-600'
              : 'bg-blue-600'
          }`}
        >
          {feedback.message}
        </div>
      )}
    </FeedbackContext.Provider>
  );
};
