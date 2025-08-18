import { useCallback, useRef, type FC } from 'react';

import { Mic } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';
import useVoiceRecorder from './useVoiceRecorder';
import type { OnRecordResultHandler } from '@/types';

const VoiceRecorder: FC<{
  onResult: OnRecordResultHandler;
}> = ({ onResult }) => {
  const audio = useRef<null | { result?: Blob; error?: unknown }>(null);
  const speach = useRef<null | { result?: string; error?: unknown }>(null);

  const handleOnNewRecord = useCallback(
    (record: Blob) => {
      audio.current = { result: record };
      if (speach.current) {
        onResult({ audio: audio.current, speach: speach.current });
        speach.current = null;
        audio.current = null;
        return;
      }
    },
    [onResult],
  );

  const handleOnSpeachResult = useCallback(
    ({
      result,
      error,
    }: {
      result?: { finalTranscript: string; interimTranscript: string };
      error?: unknown;
    }) => {
      if (result?.finalTranscript || error) {
        speach.current = { result: result?.finalTranscript, error };
      }

      if (audio.current && speach.current) {
        onResult({ audio: audio.current, speach: speach.current });
        speach.current = null;
        audio.current = null;
      }
    },
    [onResult],
  );

  const { isRec, interimTranscript, onStart, onFinish } = useVoiceRecorder({
    onNewRecord: handleOnNewRecord,
    onSpeachResult: handleOnSpeachResult,
  });
  const handleClick = () => {
    if (isRec) {
      onFinish();
      return;
    }

    onStart();
  };
  return (
    <Tooltip open={!!interimTranscript}>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          className={cn('size-16', {
            'bg-red-500 active:bg-red-500 hover:bg-red-500': isRec,
          })}
          onClick={handleClick}
        >
          <Mic size={64} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{interimTranscript}</TooltipContent>
    </Tooltip>
  );
};

export default VoiceRecorder;
