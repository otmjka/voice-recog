import { useMemo, type FC } from 'react';

export const AudioCell: FC<{ audio?: null | Blob }> = ({ audio }) => {
  const url = useMemo(() => {
    if (!audio) {
      return;
    }

    return URL.createObjectURL(audio);
  }, [audio]);

  if (!audio) {
    return '-';
  }

  return <audio className="w-[150px]" controls src={url} />;
};
