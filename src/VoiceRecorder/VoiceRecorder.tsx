import { useState, type FC } from 'react';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import audioRecorder from '@/services/AudioRecorder';
import { cn } from '@/lib/utils';

const VoiceRecorder: FC<{
  onNewRecord: (record: Blob) => void;
}> = ({ onNewRecord }) => {
  const [isRec, setIsRec] = useState(false);

  const handleClick = async () => {
    if (isRec) {
      return;
    }
    setIsRec(true);

    // start
    const recorder = await audioRecorder.start();
    if (recorder.result) {
      onNewRecord(recorder.result);
    }
    // TODO: show error
    return;
  };

  const handleMouseUp = () => {
    if (!isRec) {
      return;
    }
    audioRecorder.stop();
    setIsRec(false);
  };
  console.log('###', isRec);
  return (
    <Button
      size="icon"
      className={cn('size-16', {
        'bg-red-500 active:bg-red-500': isRec,
      })}
      onMouseDown={handleClick}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Mic size={64} />
    </Button>
  );
};

export default VoiceRecorder;
