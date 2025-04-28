
import { useState, useEffect, useCallback } from 'react';

interface SpeechRecognitionResult {
  exercise: string;
  count: number;
  personName: string;
}

export const useSpeechRecognition = (onResult: (result: SpeechRecognitionResult) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const toggleListening = useCallback(() => {
    setIsListening(prev => !prev);
    setError(null); // Clear any previous errors when toggling
  }, []);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript.toLowerCase();
      console.log('Speech recognized:', text);

      // Pattern: "just did [count] [exercise] my name is [name]"
      const pattern = /(?:just did|did) (\d+) ([a-zA-Z\s]+?)(?= my name is| $)(?:.*?my name is ([a-zA-Z\s]+))?/i;
      const matches = text.match(pattern);

      if (matches) {
        const [_, count, exercise, name] = matches;
        onResult({
          exercise: exercise.trim(),
          count: parseInt(count, 10),
          personName: name ? name.trim() : ''
        });
        setIsListening(false); // Stop listening after successful recognition
      } else {
        setError("Voice command not recognized. Try saying 'just did 10 pushups my name is John'");
        setTimeout(() => setError(null), 3000);
      }
    };

    recognition.onerror = (event: any) => {
      setError('Error occurred in recognition: ' + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    // Start or stop recognition based on isListening state
    if (isListening) {
      try {
        recognition.start();
        console.log("Speech recognition started");
      } catch (err) {
        console.error("Error starting speech recognition:", err);
        setError('Failed to start speech recognition');
        setIsListening(false);
      }
    } else {
      try {
        recognition.stop();
        console.log("Speech recognition stopped");
      } catch (err) {
        // Ignore errors when stopping (might not be active)
      }
    }

    // Cleanup function
    return () => {
      try {
        recognition.stop();
      } catch (err) {
        // Ignore errors when stopping (might not be active)
      }
    };
  }, [isListening, onResult]);

  return { isListening, error, toggleListening };
};
