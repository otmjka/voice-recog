import { Container } from './MainPage.Parts';
import useMainPage from './useMainPage';
import { useState, type FC } from 'react';

import MemoList from './MemoList';
import { CreateNew } from '../CreateNew';
import { VoiceRecorder } from '../VoiceRecorder';

type Note = {
  blob: Blob;
  url: string;
  created: string;
};

const MainPage: FC = () => {
  const state = useMainPage();
  const [notes, setNotes] = useState<Array<Note>>([]);

  const handleVoiceRecord = async (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const note = { blob, url, created: new Date().toISOString() };
    setNotes((prev) => [...prev, note]);
    // await saveNoteToDB(note);
  };

  return (
    <Container>
      <VoiceRecorder onNewRecord={handleVoiceRecord} />
      <ul className="space-y-2">
        {notes.map((note, i) => (
          <li
            key={i}
            className="flex items-center justify-between p-2 bg-gray-100 rounded"
          >
            <audio controls src={note.url} />
          </li>
        ))}
      </ul>
      <div className="w-[500px] p-4 bg-green-100">
        <CreateNew state={state.createNewState} />
      </div>
      <MemoList state={state.memoListState} />
    </Container>
  );
};

export default MainPage;
