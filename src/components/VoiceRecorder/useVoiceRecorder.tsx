import { useState } from 'react';
import audioRecorder from '@/services/AudioRecorder';
import { speechRecognizer } from '@/services/SpeachRecognizer';
import { useLang } from '@/hooks/useLang';

const useVoiceRecorder = ({
  onNewRecord,
  onSpeachResult,
}: {
  onNewRecord: (result: Blob) => void;
  onSpeachResult: ({
    result,
    error,
  }: {
    result?: {
      finalTranscript: string;
      interimTranscript: string;
    };
    error?: unknown;
  }) => void;
}) => {
  const { language: lang } = useLang();
  const [isRec, setIsRec] = useState(false);
  const [results, setResults] = useState<{
    finalTranscript: string;
    interimTranscript: string;
  }>();

  const handleStartRecording = async () => {
    if (isRec) {
      return;
    }
    setIsRec(true);

    // start
    const audioPromise = audioRecorder.start();
    speechRecognizer.setup();
    speechRecognizer.start({
      lang,
      onResult: ({ error, result }) => {
        setResults(result);
        if (error) {
          console.error(error);
        }

        onSpeachResult({
          error,
          result,
        });
      },
    });

    audioPromise
      .then((recorder) => {
        onNewRecord(recorder.result);
      })
      .catch((err) => console.error('Ошибка записи аудио', err));

    return;
  };

  const handleFinishRecording = () => {
    if (!isRec) {
      return;
    }
    audioRecorder.stop();
    speechRecognizer.stop();
    setIsRec(false);
    setResults(undefined);
  };

  return {
    isRec,
    interimTranscript: results?.interimTranscript,
    onStart: handleStartRecording,
    onFinish: handleFinishRecording,
  };
};

export default useVoiceRecorder;
