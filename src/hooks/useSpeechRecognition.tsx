
import { useState, useEffect } from 'react';

interface SpeechRecognitionResult {
  exercise: string;
  count: number;
  personName: string;
}

export const useSpeechRecognition = (onResult: (result: SpeechRecognitionResult) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      }
    };

    recognition.onerror = (event: any) => {
      setError('Error occurred in recognition: ' + event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    const startListening = () => {
      setError(null);
      setIsListening(true);
      recognition.start();
    };

    const stopListening = () => {
      setIsListening(false);
      recognition.stop();
    };

    return () => {
      stopListening();
    };
  }, [onResult]);

  return { isListening, error };
};
